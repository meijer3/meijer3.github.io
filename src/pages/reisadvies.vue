<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated class="row wrap justify-start items-start content-start">
      <q-toolbar>
        <q-btn flat @click="drawerLeft = !drawerLeft" round dense icon="menu" />
        <q-tabs
          no-caps
          outside-arrows
          mobile-arrows
          style="width: 100vw"
          class="q-mx-xl"
        >
          <q-route-tab id="header-title" name="geodev" to="/"
            >GeoDev
          </q-route-tab>
        </q-tabs>
      </q-toolbar>
    </q-header>
    <q-page-container padding class="flex">
      <q-page style="flex:1">
        <l-map :zoom="zoom" :center="home">
          <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
          <l-geo-json
            :geojson="geojson"
            :options="options"
            :options-style="styleFunction"
          />
          <l-circle-marker
            :lat-lng="destination"
            :radius="5"
            pane="shadowPane"
          />

          <l-polyline
            :lat-lngs="flight"
            pane="shadowPane"
            class="flight-line"
          />
          <l-control position="topright">
            <q-card
              id="tooltip"
              v-html="tooltip"
              class="q-px-md q-py-sm q-ma-md"
            ></q-card>
          </l-control>
        </l-map>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import {
  LMap,
  LTileLayer,
  LGeoJson,
  LPolyline,
  LCircleMarker,
  LControl
} from 'vue2-leaflet'
// import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { point } from '@turf/helpers'
import greatCircle from '@turf/great-circle'
export default {
  name: 'Map',
  components: {
    LMap,
    LTileLayer,
    LGeoJson,
    LPolyline,
    LCircleMarker,
    LControl
  },
  data () {
    return {
      zoom: 3,
      geojson: null,
      home: [52.4, 4.9],
      destination: [52.5, 4.8],
      tooltip: '<h2>test haha</h2>',
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attribution:
        '&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }
  },
  methods: {
    myPaint: function (attr) {
      if (attr === 'rood') return '#ff0000'
      if (attr === 'oranje') return '#ffa000'
      if (attr === 'geel') return '#fefe00'
      if (attr === 'groen') return '#80eb00'

      if (attr === 'groen,geel') return '#fefe00'
      if (attr === 'groen,geel,oranje') return '#ffa000'
      if (attr === 'groen,geel,oranje,rood') return '#ff0000'

      if (attr === 'geel,oranje') return 'ffa000'
      if (attr === 'geel,oranje,rood') return '#ff0000'

      if (attr === 'oranje,rood') return '#ff0000'

      if (attr === 'unclear') return '#333'
      console.log('No color?', attr)
      return '#ddd'
    },
    colorFlag: function (str) {
      return str
        .replace(
          'groen',
          '<span style="background:' + this.myPaint('groen') + '"></span>'
        )
        .replace(
          'geel',
          '<span style="background:' + this.myPaint('geel') + '"></span>'
        )
        .replace(
          'oranje',
          '<span style="background:' + this.myPaint('oranje') + '"></span>'
        )
        .replace(
          'rood',
          '<span style="background:' + this.myPaint('rood') + '"></span>'
        )
        .replace(
          'unclear',
          '<span style="background:' +
            this.myPaint('unclear') +
            '; color: white; font-size: 100%; font-weight: bold; line-height: 19px;text-align: center;">?</span>'
        )
        .split(',')
        .join('')
    },
    highlightFeature (e) {
      var layer = e.target

      layer.setStyle({
        weight: 3,
        opacity: 0.7
      })
    },
    resetHighlight (e) {
      var layer = e.target

      layer.setStyle({
        weight: 0.3,
        opacity: 0.3
      })
    },
    zoomToFeature (e) {
      // this.map.fitBounds(e.target.getBounds())
    }
  },
  computed: {
    flight () {
      return greatCircle(point(this.home), point(this.destination)).geometry
        .coordinates
    },
    options () {
      return {
        onEachFeature: this.onEachFeatureFunction
      }
    },
    styleFunction (d) {
      return e => {
        return {
          weight: 0.3,
          color: '#000',
          opacity: 0.3,
          fillColor: this.myPaint(e.properties.code),
          fillOpacity: 0.6
        }
      }
    },
    onEachFeatureFunction () {
      return (feature, layer) => {
        layer.on('mouseover', event => {
          var feature = event.target.feature.properties
          this.destination = [feature['city.y'], feature['city.x']]
          this.tooltip = `
          <h1>${feature['main.location']}</h1>
          <h2>${this.colorFlag(feature.code_totaal)}</h2>
          `
        })
        layer
          .on('click', event => {
            var feature = event.target.feature
            console.log(feature.properties)
            this.destinationCountry = feature
            this.destinationCountry.setStyle({ opacity: 1 })
          })
          .on({
            mouseover: this.highlightFeature,
            mouseout: this.resetHighlight
          })
      }
    }
  },
  async created () {
    this.loading = true
    const response = await fetch('../assets/world.geojson')
    const data = await response.json()
    this.geojson = data
    this.loading = false
  }
}
</script>
<style lang="sass">
#tooltip
  text-align: center
  min-width: 130px

  h1
    font-size: 1.2rem
    line-height: 1.2rem

  h2
    font-size: 1em
    line-height: 1em
  span
    width: 25px
    height: 17px
    border: 1px solid rgba(0,0,0,0.2)
    display: inline-block
.leaflet-interactive
    transition: stroke-width 0.3s ease-out
</style>
