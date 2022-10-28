<template>
  <div style="width: 100%; height: 100%">
    <h2 class="absolute-top text-indigo-1 text-h4" style="z-index: 5">
      Schiphol Wayfinding API
      <!-- <q-btn
        color="secondary"
        class="text-black"
        label="Edit"
        @click="drawer = !drawer"
      /> -->
    </h2>

    <!-- <q-drawer v-model="drawer" show-if-above elevated>
      <div class="q-pa-md  column">
        <q-toggle v-model="spinning" label="Spinning" />
        <q-input bottom-slots v-model="start" label="From">
          <template v-slot:before><q-icon name="place"/></template>
          <template v-slot:append
            ><q-icon
              name="close"
              v-if="start !== ''"
              @click="start = ''"
              class="cursor-pointer"
          /></template>
        </q-input>
        <q-input bottom-slots v-model="end" label="To">
          <template v-slot:before><q-icon name="flight_takeoff"/></template>
          <template v-slot:append
            ><q-icon
              name="close"
              v-if="end !== ''"
              @click="end = ''"
              class="cursor-pointer"
          /></template>
        </q-input>
      </div>
    </q-drawer> -->
    <div id="meijermap" ref="map" v-intersection="onIntersection"></div>
  </div>
</template>

<script>
import mapboxgl from "mapbox-gl"; // or "const mapboxgl = require('mapbox-gl');"
mapboxgl.accessToken =
  "pk.eyJ1Ijoic2FuZGVybWVpamVyIiwiYSI6ImNrNjIwdDFpMjA2eTYza3Q2bGRibXlxNHIifQ.wiN3LYeCSfVswOH--fmrkA";
import { imdfStyler } from "./publicbasemap.js";
import length from "@turf/length";
var polyline = require("@mapbox/polyline");
import "mapbox-gl/dist/mapbox-gl.css";

export default {
  name: "mapbox",
  data() {
    return {
      drawer: true,
      start: null,
      end: null,
      visible: false,
      map: null,
      source: null,
      spinning: false,
      center: [4.766805, 52.3091698],
      zoom: 16,
      pitch: 80,
      route_lenght: 450,
      appId: "6b2a69e",
      appKey: "c87b11c9a340f6604cf737d2f6532cd",
    };
  },
  mounted() {
    // this.callAPI().then((data) => {
    //   console.log(data)
    // }).catch(e => { console.error(222, e) })
    this.map = new mapboxgl.Map({
      container: this.$refs.map,
      style: "mapbox://styles/mapbox/dark-v10",
      center: this.center,
      zoom: this.zoom,
      pitch: this.pitch,
    });
    window.map = this.map;
    this.map.on("load", () => {
      // For styling only, remove all other labels and train tunnel
      this.map.getStyle().layers.forEach((lyr) => {
        if (lyr.type === "symbol" || lyr.id.includes("pedestrian")) {
          this.map.removeLayer(lyr.id);
        }
      });

      this.loadRoute("foo", "bar");
      this.loadLayer("/assets/easy.geojson");
      this.map.scrollZoom.disable();
      this.map.scrollZoom.setWheelZoomRate(0.02); // Default 1/450

      this.map.on("wheel", (event) => {
        if (event.originalEvent.ctrlKey) {
          // Check if CTRL key is pressed
          event.originalEvent.preventDefault(); // Prevent chrome/firefox default behavior
          if (!this.map.scrollZoom._enabled) this.map.scrollZoom.enable(); // Enable zoom only if it's disabled
        } else {
          if (this.map.scrollZoom._enabled) this.map.scrollZoom.disable(); // Disable zoom only if it's enabled
        }
      });
    });
  },
  methods: {
    onIntersection(entry) {
      this.visible = entry.isIntersecting;
      if (!this.visible) this.drawer = false;
      if (this.visible) this.spinning = true;
      this.rotateCamera(0);
    },
    rotateCamera: function (timestamp) {
      if (!this.spinning) return;
      var step = Math.ceil((timestamp / 25) % this.route_lenght);
      this.map.setPaintProperty("routepoint", "line-dasharray", [
        0,
        step,
        5,
        this.route_lenght,
      ]);
      // console.log(step, (timestamp     / 100), (timestamp / 100) % this.route_lenght, timestamp)

      // clamp the rotation between 0 -360 degrees
      // Divide timestamp by 100 to slow rotation to ~10 degrees / sec
      this.map.rotateTo((timestamp / 100) % 360, { duration: 0 });
      requestAnimationFrame(this.rotateCamera);
    },
    loadLayer: function (endpoint) {
      fetch(endpoint)
        .then((res) => res.json())
        .then((geojson) => {
          // geojson.features = geojson.features.filter(f => f.properties.category !== 'aerial')
          this.source = this.map.addSource("units", {
            type: "geojson",
            data: geojson,
          });
          this.map.addLayer({
            id: "units",
            type: "fill",
            source: "units",
            layout: {},
            paint: imdfStyler("unit"),
          });
          this.map.moveLayer("route");
          this.map.moveLayer("routepoint");
        });
    },
    loadRoute: function (a, b) {
      fetch("/assets/route.json")
        .then((res) => res.json())
        .then((routeobj) => {
          var geom = null;
          var geomCoords = routeobj.routes.map((route) => {
            return route.legs.map((leg) => {
              return leg.steps.map((step, index) => {
                var stepGeom = polyline.toGeoJSON(step.geometry);
                var el = document.createElement("div");
                el.className = "marker marker-" + index;
                if (leg.steps.length === index + 1) geom = stepGeom;
                if (leg.steps.length === index + 1 || index === 0) {
                  new mapboxgl.Marker(el, { draggable: true })
                    .setLngLat(stepGeom.coordinates[0])
                    .addTo(this.map)
                    .on("dragend", this.markerMove);
                }
                stepGeom.coordinates.map((e) =>
                  e.push(step.maneuver.location[2])
                );
                return stepGeom.coordinates;
              });
            })[0];
          })[0];
          geom.coordinates = geomCoords.flat();
          // console.log(routeobj)
          var geojsons = [...new Set(geom.coordinates.map((e) => e[2]))].map(
            (f) => {
              // 0, 10
              var filteredGeom = JSON.parse(JSON.stringify(geom));
              filteredGeom.coordinates = geom.coordinates
                .filter((e) => e[2] === f)
                .map((e) => e.slice(0, 2));
              return {
                type: "Feature",
                geometry: filteredGeom,
                properties: { floor: f },
              };
            }
          );
          geom.coordinates = geom.coordinates.map((c) => c.slice(0, 2));
          var geojson = [{ type: "Feature", geometry: geom }];
          this.route_lenght = Math.ceil(
            (length(geom).toLocaleString() * 1000) / 5
          ); // Devided by the width
          this.map.addSource("route", {
            type: "geojson",
            lineMetrics: true,
            data: { type: "FeatureCollection", features: geojsons },
          });
          this.map.addSource("routepoint", {
            type: "geojson",
            lineMetrics: true,
            data: { type: "FeatureCollection", features: geojson },
          });

          this.map.addLayer({
            id: "route",
            type: "line",
            source: "route",
            paint: imdfStyler("route"),
          });

          this.map.addLayer({
            id: "routepoint",
            source: "routepoint",
            type: "line",
            // layout: {
            //   'line-join': 'round'
            // },
            paint: {
              "line-color": "#ffff00",
              "line-dasharray": [0, 0],
              "line-width": 10,
            },
          });

          var bounds = geom.coordinates.reduce(function (bounds, coord) {
            return bounds.extend(coord);
          }, new mapboxgl.LngLatBounds(
            geom.coordinates[0],
            geom.coordinates[0]
          ));
          this.map.fitBounds(bounds, {
            padding: 100,
          });
        });
    },
    markerMove: function (e) {
      var coords = e.target.getLngLat();
      var str = `${Math.round(coords.lng * 1e6) / 1e6}, ${
        Math.round(coords.lat * 1e6) / 1e6
      }`;
      if (e.target.getElement().classList.contains("marker-0")) {
        this.start = str;
      } else {
        this.end = str;
      }
    },
    callAPI: async function () {
      var url = "https://api.schiphol.nl/wayfinding/poi/id/plaza";
      const myHeaders = new Headers();
      myHeaders.append("app_id", `${this.appId}b`);
      myHeaders.append("app_key", `${this.appKey}a`);
      // myHeaders.append('X-Custom-Header', 'ProcessThisImmediately')

      const response = await fetch(url, {
        credentials: "include", // include, *same-origin, omit
        // curl -X GET --header "Accept: application/json" --header "app_id: 6b2a69eb" --header "app_key: 3fa88dcf9e3d8fe1bc5744c838db056a" --header "resourceVersion: v3" "https://api.schiphol.nl/wayfinding/poi/id/plaza"
        headers: myHeaders,
      }).catch((e) => {
        console.error(111, e);
      });
      return response; // .json()
    },
  },
};
</script>
<style lang="sass">
#meijermap
  width: 100%
  height: 70vh

.mapboxgl-control-container
  display: none

.marker
  background-image: url('https://cdn.mapmarker.io/api/v1/pin?size=150&background=%23FCDC00&icon=fa-plane&color=%234D4D4D&voffset=0&hoffset=0.5&')
  background-size: cover
  // background-position: 5px 5px
  margin: -20px 0px 0 0px
  width: 50px
  height: 50px
  border-radius: 50%
  cursor: pointer
.marker-0
  background-image: url('https://cdn.mapmarker.io/api/v1/pin?size=150&background=%23FCDC00&icon=fa-bicycle&color=%234D4D4D&voffset=0&hoffset=4&')
</style>
