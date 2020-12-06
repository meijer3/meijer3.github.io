<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated class="row wrap justify-start items-start content-start">
      <q-toolbar>
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
        <q-card v-if="loading" class="z-top absolute-center q-pa-md "
          ><div class="fit column items-center">
            <q-spinner-pie color="primary" size="3em" /> Even Laden hoor
          </div>
        </q-card>

        <q-btn
          @click="koffie = !koffie"
          round
          color="primary"
          class="coffe-icon"
          icon="local_cafe"
        />
        <l-map :zoom="zoom" :center="home" ref="myMap">
          <l-tile-layer
            url="https://b.tile.opentopomap.org/{z}/{x}/{y}.png"
            :attribution="attribution"
          ></l-tile-layer>

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
        </l-map>
        <q-card
          v-if="this.tooltip !== null"
          id="tooltip"
          class="absolute q-py-sm q-ma-md"
        >
          <div v-html="tooltip" class="dynamicText q-px-md" />
        </q-card>
        <q-dialog
          v-model="clicked"
          id="info"
          class="absolute-top q-my-sm q-ma-md z-top"
        >
          <q-card>
            <q-card-section>
              <div class="text-h4">
                {{ this.destinationCountry.properties['main.location'] }}
              </div>
              {{ this.destinationCountry.properties['modificationdate'] }}
            </q-card-section>
            <q-separator />
            <q-card-section>
              <q-img
                :src="this.destinationCountry.properties['png']"
                spinner-color="white"
                style="max-height: 60vh;"
                contain
                @click="() => (this.imageDialog = true)"
              />
              <p
                id="mibuza"
                v-html="this.destinationCountry.properties['coronatext']"
              ></p>
              <a :href="this.destinationCountry.properties['canonical']"
                >Lees meer op MinBuZa
                <q-badge><q-icon name="launch" color="white"/></q-badge>
              </a>
            </q-card-section>
            <q-separator />
            <q-card-actions align="right">
              <q-btn
                flat
                class="fixed"
                label="Ik weet Genoeg!"
                color="primary"
                v-close-popup
              />
            </q-card-actions>
          </q-card>
        </q-dialog>
        <q-dialog
          v-model="imageDialog"
          full-width
          full-height
          transition-show="scale"
          transition-hide="scale"
          @click="() => (this.imageDialog = false)"
        >
          <q-card>
            <q-img
              :src="this.destinationCountry.properties['png']"
              spinner-color="white"
              contain
            />
          </q-card>
        </q-dialog>
        <q-dialog
          v-model="koffie"
          id="betaalverzoek"
          persistent
          class="absolute-top q-py-sm q-ma-md z-top "
        >
          <q-card>
            <q-card-section class="bg-primary text-white">
              <div class="text-h4 ">
                Koffie ipv cookies!
              </div>
            </q-card-section>
            <q-separator />
            <q-card-section class="scroll q-pt-md">
              Word je al gek van elke site die om cookies vraagt?

              <br />
              Ik doe het anders,<br />
              <span class="vertical-middle">en vraag om een koffie</span>
              <q-img
                style="margin-top:-10px;margin-left:10px"
                height="42px"
                width="42px"
                src="../assets/img/koffie.png"
              />

              <div
                class="fit row wrap justify-around   content-start betaalverzoekjes"
              >
                <a href="https://tikkie.me/pay/2rrnp09r3drfohprnp2i"
                  >Koffietje <br />~ 2.5 euro
                  <q-img
                    src="https://u39639p35134.web0087.zxcs-klant.nl/reisadvies/tikkie_25.png"
                    target="_blank"
                    title="Fijn betaalverzoek"
                  />
                </a>
                <a href="https://tikkie.me/pay/2rrnp09r3drfohprnp2i"
                  >Doneer wat je wilt, <br />
                  meer of minder!
                  <q-img
                    src="https://u39639p35134.web0087.zxcs-klant.nl/reisadvies/tikkie_open.png"
                    target="_blank"
                    title="Geweldig betaalverzoek"
                  />
                </a>
              </div>
              Dit helpt mij om bijvoorbeeld deze site te bouwen en geen
              advertenties te plaatsen. Je zit nergens aan vast. Het is zelfs
              geheel
              <b>anoniem</b>!

              <!-- <q-img src="../assets/img/koffie.jpg" /> -->
            </q-card-section>
            <q-card-actions align="right">
              <q-btn
                flat
                label="Nee bedankt"
                color="primary"
                v-close-popup
                no-caps
                class="bg-primary text-white"
              />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script>
import { LMap, LTileLayer, LGeoJson, LCircleMarker } from 'vue2-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import * as d3 from 'd3'
import 'leaflet.geodesic'
export default {
  name: 'Map',
  components: {
    LMap,
    LTileLayer,
    LGeoJson,
    LCircleMarker
  },
  data () {
    return {
      zoom: 3,
      koffie: false,
      loading: true,
      geojson: null,
      imageDialog: false,
      home: [52.4, 4.9],
      destination: [52.5, 4.8],
      tooltip: null,
      direction: true,
      destinationCountry: { properties: { 'main.location': 'start' } },
      clicked: false,
      attribution:
        '&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors | <a href="">MinBuZa</a>',
      defaultStyle: {
        weight: 0.3,
        color: '#000',
        opacity: 0.8,
        fillOpacity: 0.6
      }
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
      console.warn('No color?', attr)
      return '#ddd'
    },
    colorFlag: function (str) {
      return str
        .replace(
          'groen',
          '<span style="background:' + this.myPaint('groen') + '"></span> Gaan!'
        )
        .replace(
          'geel',
          '<span style="background:' + this.myPaint('geel') + '"></span> Let op'
        )
        .replace(
          'oranje',
          '<span style="background:' +
            this.myPaint('oranje') +
            '"></span> Alleen noodzakelijk'
        )
        .replace(
          'rood',
          '<span style="background:' +
            this.myPaint('rood') +
            '"></span> Niet reizen'
        )
        .replace(
          'unclear',
          '<span style="background:' +
            this.myPaint('unclear') +
            '; color: white; font-size: 100%; font-weight: bold; line-height: 19px;text-align: center;">?</span> Onduidelijk, Klik op het land'
        )
        .split(',')
        .join('<br/>')
    },
    mouseOver (e) {
      var layer = e.target
      if (this.clicked) return
      var feature = e.target.feature.properties
      this.direction = !feature.code_totaal.includes('oranje')
      this.destination = [
        parseFloat(feature['city.y']),
        parseFloat(feature['city.x'])
      ]

      this.tooltip = `
          <h1>${feature['main.location']}</h1>
          <h2>${this.colorFlag(feature.code_totaal)}</h2>
          `

      this.features = Object.entries(layer._map._layers)
        .filter(a => a[1].feature)
        .filter(a => a[1].feature.properties['main.id'] === feature['main.id'])
        .map(a => a[1])

      this.features.forEach(l => {
        l.setStyle({
          weight: 3,
          opacity: 0.7,
          fillOpacity: 0.4
        })
      })
      // this.flightLine.setLatLngs([this.home, this.destination])
    },
    mouseOut () {
      if (this.clicked) return
      this.features.forEach(l => {
        l.selected = false
        l.setStyle(this.defaultStyle)
      })
    },
    mouseClick (e) {
      var layer = e.target
      this.clicked = true
      this.destinationCountry = layer.feature
      this.features.forEach(l => {
        l.setStyle({
          weight: 3,
          opacity: 1,
          fillOpacity: 0
        })
      })
    },
    zoomToFeature (e) {
      // this.map.fitBounds(e.target.getBounds())
    },
    loadAnamation () {
      console.clear()
      // this.flightLine._path.id = ['flight-line']
      var xmlns = 'http://www.w3.org/2000/svg'
      var svg = document.querySelector('.leaflet-shadow-pane svg')
      svg.setAttribute('xmlns', xmlns)
      svg.querySelector('g').setAttribute('xmlns', xmlns)

      this.flyingObject = document.createElementNS(xmlns, 'image')
      this.flyingObject.setAttribute('x', 10)
      this.flyingObject.setAttribute('y', 20)
      this.flyingObject.setAttribute('href', '../assets/Corona.svg')
      this.flyingObject.setAttribute('height', 80)
      this.flyingObject.setAttribute('width', 80)
      this.flyingObject.setAttribute('id', 'flying-object')
      svg.appendChild(this.flyingObject)
      var str =
        '<animateMotion xlink:href="#flying-object" dur="3s" begin="0s" fill="freeze" repeatCount="indefinite" rotate="auto"  id="UFOAnimate"><mpath xlink:href="#flight-line"></mpath></animateMotion>'
      svg.insertAdjacentHTML('beforeend', str)
      console.log(this.flyingObject)
      // var animateMotion = document.createElementNS(xmlns, 'animateMotion')
      // animateMotion.setAttribute('xlink:href', '#flying-object')
      // animateMotion.setAttribute('dur', '3s')
      // animateMotion.setAttribute('begin', '0s')
      // animateMotion.setAttribute('fill', 'freeze')
      // animateMotion.setAttributeNS(null, 'repeatCount', 'indefinite')
      // animateMotion.setAttribute('rotate', 'auto')
      // animateMotion.setAttribute('id', 'UFOAnimate')

      // svg.appendChild(animateMotion)

      // var mpath = document.createElementNS(xmlns, 'mpath')
      // mpath.setAttribute('xlink:href', '#flight-line')
      // animateMotion.appendChild(mpath)
      // console.log(mpath)
    },
    translateAlong: function (path, l) {
      return (d, i, a) => {
        return t => {
          var atLength = this.direction ? t * l : -1 * -l + t - t * l

          if (atLength === 0 || l === 0) return
          var p1 = path.getPointAtLength(atLength)
          var p2 = path.getPointAtLength(atLength + 1)
          var angle = (Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180) / Math.PI
          angle = this.direction ? angle : angle - 180
          return (
            'translate(' +
            (p1.x - this.flyingObject.attr('width') / 2) +
            ',' +
            (p1.y - this.flyingObject.attr('height') / 2) +
            ')rotate(' +
            (angle + 135) +
            ')'
          ) // scale(' + scale + ')
        }
      }
    },
    transition: function () {
      var pathNode = this.flight.node()
      var l = pathNode.getTotalLength()
      this.flyingObject
        .transition()
        .ease(d3.easePolyInOut)
        .duration(3000)
        .attrTween('transform', this.translateAlong(pathNode, l))
        .on('end', this.transition)
    },
    reset () {
      var line = {
        type: 'LineString',
        coordinates: [
          [this.home[1], this.home[0]],
          [this.destination[1], this.destination[0]]
        ]
      }
      var bounds = this.path.bounds(line)

      var topLeft = bounds[0],
        bottomRight = bounds[1]
      this.svgD3
        .attr('width', bottomRight[0] - topLeft[0])
        .attr('height', bottomRight[1] - topLeft[1])
        .style('left', topLeft[0] + 'px')
        .style('top', topLeft[1] + 'px')

      this.gD3.attr(
        'transform',
        'translate(' + -topLeft[0] + ',' + -topLeft[1] + ')'
      )

      this.flight.attr('d', this.path(line))
      this.flyingObject.classed('besmet', !this.direction)
      this.transition()
    },
    async loadD3 () {
      this.svgD3 = d3.select(this.map.getPanes().shadowPane).append('svg')
      this.gD3 = this.svgD3.append('g').attr('class', 'leaflet-zoom-hide')
      function projectPoint (x, y) {
        var point = window.map.latLngToLayerPoint(new L.LatLng(y, x))
        this.stream.point(point.x, point.y)
      }
      var transform = d3.geoTransform({ point: projectPoint })
      this.path = d3.geoPath().projection(transform)
      var icon = await d3.xml('../assets/Plane.svg')

      d3.select(this.map.getPanes().shadowPane)
        .node()
        .append(icon.documentElement)
      this.flyingObject = d3
        .select('#icons')
        .attr('height', 60)
        .attr('width', 60)

      this.flight = this.gD3
        .append('path')
        .style('fill-opacity', 0.7)
        .attr('fill', 'blue')
        .attr('stroke', 'blue')
      this.map.on('zoom', this.reset)
      this.reset()
    }
  },
  computed: {
    options () {
      return {
        onEachFeature: this.onEachFeatureFunction
      }
    },
    styleFunction (d) {
      return e => {
        return {
          ...this.defaultStyle,
          ...{ fillColor: this.myPaint(e.properties.code) }
        }
      }
    },
    onEachFeatureFunction () {
      return (feature, layer) => {
        layer._polygonId = feature.properties['main.id']
        layer.on({
          click: this.mouseClick,
          mouseover: this.mouseOver,
          mouseout: this.mouseOut
        })
      }
    }
  },
  watch: {
    clicked: function () {
      if (!this.clicked) {
        this.features.forEach(l => {
          l.setStyle(this.defaultStyle)
        })
      }
    },
    koffie: function () {
      if (this.koffie) {
        this.tooltip = null
        this.destination = [52.5, 4.8]
      }
    },
    destination: function () {
      this.reset()
    }
  },
  async created () {
    this.$nextTick(() => {
      this.map = this.$refs.myMap.mapObject
      window.map = this.map
      // this.flightLine = new L.Geodesic([], {
      //   pane: 'shadowPane',
      //   steps: 8
      // }).addTo(this.map)
      this.loadD3()
    })
    //
    const response = await fetch(
      'https://u39639p35134.web0087.zxcs-klant.nl/reisadvies/world.geojson'
    )
    // const response = await fetch('../assets/world.geojson')
    const data = await response.json()

    this.geojson = data
    this.loading = false
  }
}
</script>
<style lang="sass">
.coffe-icon
  position: absolute
  top: 30px
  right: 10px
  z-index: 9999
  animation: blink-animation 5s  infinite
  animation-delay: 2s
@keyframes blink-animation
  5%
    top: 25px
  10%
    top: 30px

#betaalverzoek
  font-size: 1.1em
  text-align: center
  .betaalverzoekjes
    transition: 0.5s

    a
      color: #424284
      width:50%
      max-width: 210px
      padding: 20px 30px
      font-weight: bold
      &:hover
        background: #eee

#info
  min-width: 130px
  top: 0px
  right: 0px
  .q-dialog__inner--minimized > div
    max-width:700px
  #mibuza

    h1,h2,h3
      font-size:1.3em
      line-height: 1.1em
      margin: 30px 0px 5px
    p
      margin: 10px 10px 0px

#tooltip
  min-width: 130px
  top: -5px
  left: 30px
  z-index: 3000

  .dynamicText
    overflow-y: auto
    max-height: 70vh
    h1
      text-align: center
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

.vue2leaflet-map
  .leaflet-tile-pane
    &:after
      content: ""
      height: 1000vh
      width: 1000vw
      left: -500vw
      top: -500vh
      background: rgba(255,255,255,0.9)
      z-index: 9999
      position: fixed
      mix-blend-mode: saturation
      opacity:0.9

  .leaflet-shadow-pane
    pointer-events: none
    g
      pointer-events: none
      path
        pointer-events: none
        stroke: $primary
    #icons
      #plane path
        fill: $primary
        stroke: none
      #corona
        visibility: hidden
        *
          fill: green
          stroke: green
      &.besmet
        #plane path
          fill: red
        #corona
          visibility: inherit

  .leaflet-overlay-pane
    pointer-events: none
    &:after
      content: ""
      height: 1000vh
      width: 1000vw
      left: -500vw
      top: -500vh
      background: rgb(129 160 159 / 29%)
      z-index: 9999
      position: fixed
      mix-blend-mode: saturation
      opacity:0.6
  .leaflet-interactive
    transition: stroke-width 0.3s ease-out, fillOpacity 0.3s ease-out
</style>
