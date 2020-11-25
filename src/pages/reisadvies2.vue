<template>
  <q-layout view="hHh Lpr lFf" >
    <q-header elevated class="row wrap justify-start items-start content-start">
      <q-toolbar>
          <q-btn flat @click="drawerLeft = !drawerLeft" round dense icon="menu" />
        <q-tabs no-caps outside-arrows mobile-arrows style="width: 100vw;"  class="q-mx-xl">
          <q-route-tab id="header-title" name="geodev" to="/"  >GeoDev </q-route-tab>
        </q-tabs>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <q-page id="themap" class="row justify-center full-height full-width text-center">

        <!-- <svg id="map">
        <defs>
        <linearGradient  id="gradient" x1="0%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%" style="stop-color:rgb(255, 0, 0);stop-opacity:1;" />
        <stop offset="100%" style="stop-color:rgb(0, 0, 255);stop-opacity:1;" />
        </linearGradient>
          </defs>
          <g class="projection">
            <path class="globe"></path>
            <g class="countries"></g>
            <g class="minbuzaGeom"></g>
            <path class="flight" id="flight"></path>
            <path class="desitiny" id="desitiny"></path>
            <image class="icon" id="icon" ></image>
          </g>
        </svg> -->
        <canvas id="this.canvas" ref="myref" ></canvas>
        <div class="tooltip hidden colorflag"></div>
        <q-drawer v-model="drawerLeft" elevated>
          <q-toggle  v-model="northup" label="North is up?" class="q-ma-md q-mt-xl" />
          <q-select filled v-model="projectionPick" :options="projectionOptions" label="Projection" stack-label  class="q-ma-md" />
        </q-drawer>
        <q-card class="q-pa-md fixed q-mt-md" style="bottom:30px">

          <span class="colorflag" v-html="this.colorFlag(this.clickedCountry.properties.advies)"></span><br>
            <q-btn :label="this.clickedCountry.properties.NAME_NL+': MinBuZa'" color="primary" @click="advies = true" />
            <q-dialog v-model="advies">
      <q-card class="advies">
        <q-card-section>
          <div class="text-h6">Advies: Ministerie van Buitenlandse zaken</div>
        </q-card-section>
        <q-card-section class="q-pt-none"  v-html="this.selectedCountry.properties.coronatext"/>
        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script>
import * as d3 from 'd3'
import d3GeoZoom from 'd3-geo-zoom'
import { feature, mesh } from 'topojson'

export default {
  name: 'reisadvies',
  data () {
    return {
      projectionOptions: [{
        label: 'Orthographic',
        value: d3.geoOrthographic()
      },
      {
        label: 'EqualEarth',
        value: d3.geoEqualEarth()
      }],

      projectionPick: {
        label: 'Orthographic',
        value: d3.geoOrthographic()
      },
      advies: false,
      northup: true,
      adviesText: null,
      drawerLeft: false,
      home: [4.9, 52.4],
      direction: null,
      distance: null,
      animate: false,
      selectedCountry: { properties: { NAME_NL: 'Thuis' } },
      clickedCountry: { properties: { NAME_NL: 'Thuis', advies: '-' } }
    }
  },
  beforeMount () {
    window.addEventListener('resize', this.onResize)
  },
  mounted () {
    this.width = innerWidth
    this.height = innerHeight
    this.tooltip = d3.select('.tooltip')
    /* BOTH up here */

    this.canvas = document.getElementById('this.canvas')
    this.canvas = d3.select(this.canvas)
      .attr('width', this.width)
      .attr('height', this.height)
      .on('mousemove', this.mousemove)
      .on('click', this.pointerEvent)
    this.ctx = this.canvas.node().getContext('2d')

    // var url = '../assets/world.geojson'
    // var url1 = '../assets/countries.json'
    var url1 = 'https://cdn.jsdelivr.net/npm/world-atlas@2/land-110m.json'
    var url2 = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'
    var url3 = 'https://cdn.jsdelivr.net/npm/world-atlas@2/land-50m.json'
    var url4 = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json'

    d3.json(url1).then(land110 => {
      d3.json(url2).then(countries110 => {
        this.land110 = feature(land110, land110.objects.land)
        this.countries110 = feature(countries110, countries110.objects.countries)
        this.borders110 = mesh(countries110, countries110.objects.countries, (a, b) => a !== b)
        // this.sphere = ({ type: 'Sphere' })
        this.reprojection()

        this.flyingObject = new Image()
        this.flyingObject.onload = () => { this.ctx.drawImage(this.flyingObject, 0, 0) }

        this.render()

        console.log(this.flyingObject)
        d3.json(url3).then(land50 => {
          d3.json(url4).then(countries50 => {
            this.land50 = feature(land50, land50.objects.land)
            this.countries50 = feature(countries50, countries50.objects.countries)
            this.borders50 = mesh(countries50, countries50.objects.countries, (a, b) => a !== b)
          })
        })
      })
    })

    /* SVG SVG SVG */
    this.svg = d3.select('#map')
      .attr('width', this.width)
      .attr('height', this.height)
    this.g = this.svg.select('.projection')
    this.flight = this.svg.select('.flight')
    this.destiny = this.svg.select('.desitiny')
    this.icon = this.svg.select('.icon')
    this.minbuzaGeom = this.svg.select('.minbuzaGeom')
    d3.json(url).then((geojson) => {
      d3.select('.globe').data([{ type: 'Sphere' }]).enter().attr('d', this.path)

      this.reprojection()
      d3.select('.countries').selectAll('countries')
        .data(geojson.features).enter()
        .append('path').attr('class', 'land')
        .attr('name', function (d) { return d.properties.ADM0_A3 })
        .attr('id', function (d) { return d.properties.ADM0_A3 })
        .on('mousemove', this.onHover)
        .on('click', (e, d) => { this.clickCountry(d) })
        .attr('fill', (d) => this.myPaint(d.properties.advies))
        .attr('d', this.path)
        .filter((d) => { if (d.properties.ADM0_A3 === 'SWE') { console.log(d); this.selectCountry(d); this.Country(d) } })
    })
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

      console.log('No color?', attr)
      return '#ddd'
    },
    getBackground: function () {
      console.clear()
      this.minbuzaGeom.selectAll('.minbuzaGeom').remove()
      console.log('this.getBackground()', this.clickedCountry.properties)
      var url = `../assets/countries/${this.clickedCountry.properties.id}.geojson`
      d3.json(url)
        .then((geojson) => {
          console.log(geojson.features)
          this.minbuzaGeom.selectAll('minbuzaGeom')
            .data(geojson.features).enter()
            .append('path')
            .attr('class', 'minbuzaGeom')
            .attr('fill', (d) => this.myPaint(d.properties.code))
            .attr('d', this.path)
        })
        .catch(e => {
          console.error(e)
        })
    },
    translateAlong: function (path, l) {
      return (d, i, a) => {
        return (t) => {
          var atLength = this.direction === 1 ? (t * l) : ((this.direction * -l + t) - t * l)
          if (atLength === 0) return
          var p1 = path.getPointAtLength(atLength)
          var p2 = path.getPointAtLength((atLength) + 1)
          var angle = Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI
          angle = this.direction === 1 ? angle : angle - 180
          return 'translate(' + p1.x + ',' + p1.y + ')rotate(' + (angle + 135) + ')'// scale(' + scale + ')
        }
      }
    },
    transition: function () {
      var pathNode = this.flight.node()
      var l = pathNode.getTotalLength()
      this.flyingObject.transition()
        .ease(d3.easePolyInOut)
        .duration(3000)
        .attrTween('transform', this.translateAlong(pathNode, l))
        .on('end', this.transition)
    },
    onResize () {
      this.width = window.innerWidth
      this.height = window.innerHeight
      this.canvas
        .attr('width', this.width)
        .attr('height', this.height)
      this.reprojection()
    },
    reprojection: function () {
      var margin = 50
      this.projection = this.projectionPick.value
        .scale((this.height - 2 * margin) / 2)
        .translate([this.width / 2, this.height / 2 - margin / 2])
        .precision(0.1)
        .rotate([-this.home[0], -this.home[1]])
      this.path = d3.geoPath()
        .projection(this.projection)
        .context(this.ctx)

      d3GeoZoom()
        .projection(this.projection)
        .northUp(this.northup)
        .onMove(this.render)(this.canvas.node())
    },
    selectCountry: function (d) {
      console.log('selectCountry', d)
      d3.selectAll('path').classed('highlight', false)
      this.selectedCountry = d
      this.selectedCountry.advies = d.properties.NAME_NL.includes('u')
      try { this.selectedCountry.city = [d.properties['city.x'], d.properties['city.y']] } catch (e) {}
      this.flight.attr('d', this.flightPath())
      this.distance = Math.round(d3.geoDistance(this.selectedCountry.city, this.home) * 6371)
      this.animate = true
      d3.select('#' + d.properties.ADM0_A3).classed('highlight', true)
      if (this.selectedCountry.advies) {
        // this.g.classed('corona', true)
        // this.icon.attr('href', '../assets/Corona.svg').attr('x', -10).attr('y', -10).attr('height', 35).attr('width', 35)
        this.direction = -1
      } else {
        // this.g.classed('corona', false)
        this.direction = 1
        // this.icon.attr('href', '../assets/Plane.svg').attr('x/', -20).attr('y', -20).attr('height', 40).attr('width', 40)
      }
      this.transition()
    },
    onHover: function (e, d) {
      if (this.selectedCountry.properties.ADM0_A3 === d.properties.ADM0_A3) return // Prevent reselect
      this.selectCountry(d)

      this.tooltip.classed('hidden', false).attr('style', 'left:' + (e.offsetX) + 'px;top:' + (e.offsetY + 10) + 'px').html(
       `${d.properties.NAME_NL} (${this.distance}km)<br>${this.colorFlag(d.properties.advies)}`
      )
    },
    pointerEvent: function (e, d) {
      var a = this.getCountry(e)
      if (typeof a !== 'undefined') {
        if (this.selectedCountry !== a) {
          this.selectedCountry = a

          this.render()
        }
      }
    },
    mousemove: function (e) {
      var d = this.getCountry(e)
      if (typeof d !== 'undefined') {
        if (this.highlightCountry !== d) {
          this.highlightCountry = d
          this.render()
          this.tooltip.classed('hidden', false).attr('style', 'left:' + (e.offsetX) + 'px;top:' + (e.offsetY + 10) + 'px').html(
              `${d.properties.id} (${this.distance}km)<br>${this.colorFlag('TODO')}`
          )
          if (this.selectedCountry.id > 7) {
            // this.g.classed('corona', true)
            this.flyingObject.src = '../assets/Corona.svg'// this.icon.attr('href', '../assets/Corona.svg').attr('x', -10).attr('y', -10).attr('height', 35).attr('width', 35)
            this.direction = -1
          } else {
            // this.g.classed('corona', false)
            this.direction = 1
            this.flyingObject.src = '../assets/Plane.svg'// this.icon.attr('href', '../assets/Plane.svg').attr('x/', -20).attr('y', -20).attr('height', 40).attr('width', 40)
          }
          console.log(this.flyingObject)
          this.transition()
        }
      }
    },
    getCountry: function (event) {
      var pos = this.projection.invert(d3.pointer(event))
      var dataset = (this.zoomedin) ? this.countries110 : this.countries50
      return dataset.features.find((f) => {
        return f.geometry.coordinates.find((c1) => {
          return this.polygonContains(c1, pos) || c1.find((c2) => this.polygonContains(c2, pos))
        })
      })
    },
    polygonContains: function (polygon, point) {
      var n = polygon.length
      var p = polygon[n - 1]
      var x = point[0], y = point[1]
      var x0 = p[0], y0 = p[1]
      var x1, y1
      var inside = false
      for (var i = 0; i < n; ++i) {
        p = polygon[i]
        x1 = p[0]
        y1 = p[1]
        if (((y1 > y) !== (y0 > y)) && (x < (x0 - x1) * (y - y1) / (y0 - y1) + x1)) inside = !inside
        x0 = x1
        y0 = y1
      }
      return inside
    },
    colorFlag: function (str) {
      return str
        .replace('groen', '<span style="background:' + this.myPaint('groen') + '"></span>')
        .replace('geel', '<span style="background:' + this.myPaint('geel') + '"></span>')
        .replace('oranje', '<span style="background:' + this.myPaint('oranje') + '"></span>')
        .replace('rood', '<span style="background:' + this.myPaint('rood') + '"></span>').split(',').join('')
    },
    flightPath: function () {
      var coords = [this.highlightCountry.geometry.coordinates.flat(999)[0], this.highlightCountry.geometry.coordinates.flat(999)[1]]
      this.distance = Math.round(d3.geoDistance(coords, this.home) * 6371)

      this.ctx.beginPath()
      this.ctx.lineWidth = 3
      this.ctx.strokeStyle = '#aaa'
      this.path({ type: 'LineString', coordinates: [this.home, coords] })
      this.ctx.stroke()

      this.ctx.beginPath()
      this.ctx.lineWidth = 1
      this.ctx.strokeStyle = '#aaa'
      this.path({ type: 'Point', coordinates: coords })
      this.ctx.stroke()
    },
    fill: function (obj, color) {
      this.ctx.beginPath()
      this.path(obj)
      this.ctx.fillStyle = color
      this.ctx.fill()
    },

    stroke: function (obj, color) {
      this.ctx.beginPath()
      this.path(obj)
      this.ctx.strokeStyle = color
      this.ctx.stroke()
    },
    strokeandfill: function (obj, color, color2) {
      this.ctx.beginPath()
      this.path(obj)
      this.ctx.strokeStyle = color2
      this.ctx.stroke()
      this.ctx.fillStyle = color
      this.ctx.fill()
    },
    render: function () {
      this.ctx.clearRect(0, 0, this.canvas.attr('width'), this.canvas.attr('height'))

      // this.stroke(this.graticule, '#ccc')
      // this.fill(this.sphere, '#eee')
      // this.strokeandfill(this.countries110, '#fff', '#999')

      if (this.projection.scale() < 2000) {
        this.zoomedin = true
        this.strokeandfill(this.land110, '#fff', '#999')
        this.stroke(this.borders110, '#ddd')
      } else {
        this.zoomedin = false
        this.strokeandfill(this.land50, '#fff', '#999')
        this.stroke(this.borders110, '#ddd')
      }
      this.fill(this.highlightCountry, '#016293')
      this.fill(this.selectedCountry, '#016293')
      this.flightPath()
    }
  },
  watch: {
    northup: function () {
      this.reprojection()
      this.refresh()
    },
    projectionPick: function () {
      this.reprojection()
      this.refresh()
    },
    advies: function () {
      this.animate = !this.advies
    }
  }
}

</script>
<style lang="sass">
$corona-color: #f05400;
$travel-color: #0b9b48;

canvas
    width: 100%;
    height: 100%;
#themap
    overflow: hidden
    background: #eee

    .tooltip
        color: #222;
        background: rgba(255,255,255,0.9);
        border-radius: 3px;
        box-shadow: 0px 0px 6px 0px #7d7d7d;
        padding: .2em;
        text-shadow: #f5f5f5 0 1px 0;
        position: absolute;
        pointer-events: none
        transform: translateX(calc(-50% + 10px));
    .globe
        fill: white;
        stroke: #e3ffe194;
        stroke-width: 3px;

    .land
        fill-opacity: 0.4
        stroke: black
        stroke-width: 0.4px
        transition: fill-opacity 0.3s
        cursor: pointer
    .minbuzaGeom
        stroke: black
        stroke-width: 0.4px
        pointer-events: none

    .highlight
        stroke-width: 1px
        fill-opacity: 0.3
    .perment-highlight
        fill-opacity: 0.0
        stroke-width: 0px
        cursor: initial
    .flight
        stroke: $travel-color;
        stroke-width: 3px
        fill: none
        pointer-events: none
    .desitiny
        stroke: black
        opacity: 0.4
    .icon
        fill: $travel-color;
        pointer-events: none
    .atmosphere
        fill: rgba(0,0,0,0.2)
        pointer-events: none
        mask-image: linear-gradient(to bottom, transparent 10%, black);
    .corona
        .icon
            fill:  $corona-color;
        .flight
            stroke:  $corona-color;
.colorflag
  span
    width: 30px
    height: 20px
    border: 1px solid rgba(0,0,0,0.2)
    display: inline-block;
.advies
  // background: rgba(0,0,0,0.3)
  // border-radius: 30px
  // color: white

  h3
    font-size: 140%;
    line-height: 100%;
    font-weight: 700;
  a
    color: blue

</style>
