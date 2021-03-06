<template>
  <q-page-container
    class="fit row wrap justify-center items-start content-start text-center"
    style="padding: 0 0 0 0 !important"
  >
    <router-view />
    <!-- <q-page style="padding-top:0 width:100vw"> -->
    <!-- Header -->

    <section
      class="headerimg"
      title="ArcGIS pro render of the GIS Lights of Schiphol"
    />
    <!-- Services -->
    <section id="services" class="q-py-xl">
      <div class="container">
        <h2 class="section-heading">Services</h2>
        <h3 class="section-subheading light">What we do as GeoDev</h3>
        <div
          class="fit row wrap justify-center items-start content-start text-center"
        >
          <div class="col-4">
            <q-img src="../assets/avatars/avatatars-04.png" />
            <h4>GIS developer</h4>
            <p>
              We develop in Javascript/Typescript/Python. We know open-source
              webviewers/Esri products
            </p>
          </div>
          <div class="col-4">
            <q-img src="../assets/avatars/avatatars-01.png" />
            <h4>FME trainer & specialist</h4>
            <p>
              We can give offical FME trainings. We are certified trainer. We
              can also review. Our trainer has offical Safe FME
              <a
                target="_blank"
                href="https://www.sweco.nl/nieuws/nieuwsartikelen/special-recognition-award-voor-fme-professional-sander-meijer/"
              >
                special recognition</a
              >
              award.
            </p>
          </div>
          <div class="col-4">
            <q-img
              src="../assets/avatars/avatatars-05.png"
              style="margin-left: 35px"
            />
            <h4>Analyst</h4>
            <p>
              We prepare data, make it visible, so conclusions can be made by
              experts
            </p>
          </div>
        </div>

        <div class="row q-mb-xl" style="margin-top:60px">
          <div class="col-sm-3 fme-icon"></div>
          <div
            class="col-sm-2 fme-icon"
            style="background-image:url('https://images.safe.com/logos/fme/fme-certified-professional.png')"
          ></div>
          <div
            class="col-sm-2 fme-icon"
            style="background-image:url('https://images.safe.com/logos/fme/fme-certified-trainer.png')"
          ></div>
          <div
            class="col-sm-2 fme-icon"
            style="background-image:url('https://images.safe.com/logos/fme/fme-certified-server.png')"
          ></div>
        </div>
      </div>
    </section>

    <!-- Map Example-->
    <section style="background:#333">
      <Mapbox />
    </section>

    <!-- Portfolio -->
    <section class="q-py-xl" id="portfolio">
      <div class="container q-mt-xl">
        <h2 class="section-heading">Portfolio</h2>
        <h3 class="section-subheading light">
          A few of the many projects done.
        </h3>

        <div
          class="fit row wrap  justify-around items-start content-start"
          style="position:relative"
        >
          <q-card
            v-for="item in portfolio"
            :key="item.title"
            @click="$router.push('/' + item.url)"
            class="q-mb-xl"
          >
            <q-img :src="item.img" style="max-width:100%" />
            <div class="q-page-footer">
              <div class="text-h6 q-py-md">{{ item.title }}</div>
              <div class="text-subtitle2 q-pb-md light">
                {{ item.subtitle }}
              </div>
            </div>
          </q-card>
        </div>

        <div class="row text-left q-mt-xl">
          Other projects
          <ul class="normallist q-ml-xl q-pl-xl">
            <li>
              Interactive <b>D3JS dashboard</b> for 'tankcooker' project (D3JS
              and FME)
            </li>
            <li><b>Audith of FME</b> usage at Prorail and Rijkswaterstaat</li>
            <li>
              <b
                >Schiphol
                <a href="https://register.apple.com/resources/imdf/">IMDF</a></b
              >
              (Apple's/Standard indoor map format) with FME. So Schiphol indoor
              in Apple's maps on your Iphone
            </li>
            <li>
              <a
                href="https://www.sweco.nl/nieuws/nieuwsartikelen/special-recognition-award-voor-fme-professional-sander-meijer/"
                >Special recgonition</a
              >
              FME Award by Safe
            </li>
            <li>
              Universal script to calculate the
              <a
                href="https://ruimtelijkeadaptatie.nl/hulpmiddelen/staat-straat/"
                >'Staat van je Straat'</a
              >
            </li>
            <li>Make a sync databse for Ruimtelijke Plannen (RO)</li>
            <li>Smart mobility project</li>
            <li>Digitalisation of Dutch 'KLIC meldingen' (.png files)</li>
            <li>Business2Business with Kadaster</li>
            <li>Small self-serve fme services</li>
            <li>FME validations, fme workspace / other documents</li>
            <li>Alot of GeoWeb sites, workflows and such</li>
          </ul>
        </div>
        <div class="row text-left q-mt-xl">
          Handy GeoDev sub-sites
          <ul class="normallist q-ml-xl q-pl-xl">
            <a href="#"
              ><li @click="$router.replace('/reisadvies')">
                Dutch: De reisadvies kaart. Corona overzicht
              </li></a
            >
            <a href="#"
              ><li @click="$router.replace('/json')">
                (ArcGIS) jsons to Python object
              </li></a
            >
          </ul>
        </div>
      </div>
    </section>

    <!-- Team -->
    <section class="q-py-xl" id="about">
      <div class="container">
        <h2 class="section-heading col-12">Who is GeoDev</h2>
        <h3 class="section-subheading text-muted  col-12">
          GeoDev is (for now) a freelance developer.
        </h3>

        <div
          class="team-member col-4"
          onclick="window.open('https://nl.linkedin.com/in/swmeijer', '_blank')"
        >
          <q-avatar style="border: 7px solid rgba(0, 0, 0, 0.1)">
            <img
              class="rounded-circle"
              src="../assets/avatars/sander.png"
              alt=""
            />
          </q-avatar>
          <h4>Sander Meijer</h4>
          <p class="text-muted">Freelance Developer / Trainer / Analyst</p>
          <q-btn
            class="q-mb-xs"
            round
            color="primary"
            icon="fab fa-linkedin-in"
            @click="linkedin('swmeijer')"
          />
        </div>
      </div>
    </section>

    <!-- Scroller-->
    <section class="q-py-xl" id="tools">
      <div class="container fit row wrap justify-center">
        <div class="section-heading col-12 text-h7 text-center">
          What do we use
        </div>
        <div class="section-subheading light ">
          We love to learning new things and technologies
        </div>
        <div class="row text-left q-mt-xl">
          <ul class="normallist q-ml-xl q-pl-xl">
            <li v-for="(row, key) in skills" :key="row">
              <span>{{ key }}</span
              ><span
                v-for="tag in row.split(',')"
                :key="tag"
                v-html="tag.trim()"
              />
            </li>
          </ul>
          <!-- <Scroller /> -->
        </div>
      </div>
    </section>

    <!-- Contact -->
    <section class="q-py-xl" id="contact">
      <div class="container fit row wrap justify-center">
        <h2
          class="section-heading text-uppercase col-12 text-center"
          style="color:white"
        >
          Contact Us
        </h2>
        <h3 style="color: white; font-size:18px; margin:0 padding:0">
          Please contact us via
          <a
            title="Send us an email"
            :href="'mailto:' + email + '@' + emaildomain"
            target="_blank"
            ><span
              class="e-mail"
              data-user="ln.vedoeg"
              data-website="moc.liamg"
            ></span
          ></a>
        </h3>
      </div>
    </section>

    <!-- Footer -->
    <section class="q-py-xl" style="background:white">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-4 text-right">
            <span class="copyright"
              >Copyright &copy; GeoDev 2016-{{ new Date().getFullYear()
              }}<br />kvk: 80974457</span
            >
          </div>
          <div class="col-4">
            <q-btn
              class="q-mb-md"
              round
              color="primary"
              icon="fab fa-linkedin-in"
              @click="linkedin('swmeijer')"
            />
          </div>
          <div class="col-4  text-left credits">
            <span @click="credits = true">Credits & <br />Disclaimer</span>
            <q-dialog v-model="credits">
              <q-card
                ><q-card-section
                  ><div class="text-h6 ">
                    Credits & Disclaimer
                  </div></q-card-section
                >
                <q-card-section class="q-pt-none"
                  >We don't own any of these products used on this website. This
                  site is to show which technologies we use or have build. Any
                  of the products (such as Schiphol Wayfinding) are only
                  intented to show what we are capable of. There are no
                  commerical models behind them. <br /><br />We are gladly
                  making use of open-soucre and open-data! Logos are adjusted to
                  fit the color
                </q-card-section>
                <q-card-actions align="right"
                  ><q-btn flat label="OK" color="primary" v-close-popup
                /></q-card-actions>
              </q-card>
            </q-dialog>
          </div>
          <div class="col-12 q-mt-md text-muted">
            ps. Interested in how we code?<br />
            Take a look at this page on
            <a
              href="https://github.com/meijer3/meijer3.github.io"
              target="_blank"
            >
              https://github.com/meijer3/meijer3.github.io</a
            >
          </div>
        </div>
      </div>
    </section>

    <!-- </q-page> -->
  </q-page-container>
</template>

<script>
import { openURL } from 'quasar'
import Mapbox from '../components/mapbox.vue'
import meta from '../utils/meta.js'

export default {
  name: 'MainPage',
  meta,
  data () {
    return {
      metaTags: {
        title: 'GeoDev | FME & Spatial DevOps',
        description:
          'GeoDev is a Geo Spatial Company that specialize in geo- development and FME training. We are FME certified professionals. We work freelance (ZZP) in Netherlands or Sweden. ',
        image: '/geodev_screenshot.png'
      },
      email: 'geodev.nl',
      emaildomain: 'gmail.com',
      credits: false,
      top_offset: 99,
      margin_bottom: 60,
      portfolioitem: null,
      skills: {
        Scripting: 'Python, Javascript, Typescript',
        Frameworks: 'React js, Vue js, Quasar js',
        Wayofworking: 'DevOps, Scrum, Agile',
        Container: 'Docker, Kubernetes',
        FME: 'FME desktop, FME server, FME Cloud, Custom Transformers, python',
        ESRI:
          'ArcGIS Pro, ArcMap, Enterprise, GeoEvent, AGOL, ArcGIS server, Collector apps, GeoWeb',
        'ESRI Script':
          'Arpcy, ArcGIS API for JavaScript, Jupyter Notebooks, ArcGIS API for Python',
        WebGIS: 'Geoserver, Openlayers, Mapbox (here on this site!), Leaflet',
        Opensource:
          'PostGIS, PGrouting, OSRM, OSM, QGis, GeoPackages, OGC (wms &comma wfs), Mapbox Vectortiles',
        Databases: 'Redis, Postgres, Oracle, SQL, mySQL',
        Website: 'HTML, JS, CSS, SASS, SCSS',
        APIs: 'Swagger, Rest',
        DevTools: 'Git, Node, vs code, pycharm, fork',
        Platforms: 'Linux, Windows, Openshift'
      },
      portfolio: [
        {
          title: 'Does the glacier retreat?',
          img: 'thumbs/thumb-01.svg',
          subtitle: 'Drones in Himalaya',
          url: 'glacier'
        },
        {
          title: 'Go to your gate',
          img: 'thumbs/thumb-02.svg',
          subtitle: 'Wayfinding on Schihol API',
          url: 'wayfinding'
        },
        {
          title: 'How rough is Holland?',
          img: 'thumbs/thumb-03.svg',
          subtitle: 'Input map to tweak radio coms',
          url: 'c2000'
        },
        {
          title: 'No humans involved',
          img: 'thumbs/thumb-04.svg',
          subtitle: "Digitalization of 1980's boreholes",
          url: 'boring'
        },
        {
          subtitle: 'Feature Manipulation Engine',
          img: 'thumbs/thumb-05.svg',
          title: 'Official Trainer for FME courses',
          url: 'fme'
        },
        {
          title: 'Download GIS the easy way',
          img: 'thumbs/thumb-06.svg',
          subtitle: 'ArcGIS, PDOK, Waterschapsdata',
          url: 'datalab'
        }
      ]
    }
  },
  components: {
    Mapbox
  },
  methods: {
    linkedin (user) {
      openURL('https://nl.linkedin.com/in/' + user)
    }
  }
}
</script>

<style lang="sass" scoped>

// .router-placeholder
//   max-height: 0px
//   .router-active
//     max-height: auto
.credits
  cursor: pointer
  &:hover
    opacity: 0.7

.headerimg
  display: block
  text-align: center
  color: white
  background-repeat: no-repeat
  background-attachment: scroll
  background-position: center center
  background-size: cover
  background-image: url(../assets/img/header.png)
  height: 60vh
  width: 100vw

section
  justify-content: center
  align-items: center
  background: white
  display: flex
  // width: 100vw
  width: 100vw
  position: relative

  &:nth-child(2n)
    background: #efefef

  .container
    max-width: $maxwidth
    // width: 100vw
    overflow: hidden
    padding: 0 40px
    box-sizing: content-box

#services
  .col-4
    padding: 0 40px
    box-sizing: border-box
    min-width: 350px
  h4
    font-weight: 700
    font-size: 1.6rem
    margin: 50px 0 0
  p
    font-size: 1rem
    line-height: 1.6rem
    opacity: 0.8
  .q-img
    max-width: 200px

.normallist
    list-style: none
    font-family: 'Ubuntu-Light'
    font-size: 110%
    @media (max-width: $breakpoint-sm-max)
      margin-left: -30px
    li
      &:before
        content: "»"
        left: -7px
        position: relative
        top: -2px
        opacity: 0.5
      span
        transition: 0.4s
        &:after
          content: ', '
        &:first-child
          font-family: 'Ubuntu-Regular'
          width: 150px
          display: inline-block
          &:after
            content: ': '
        &:last-child
          &:after
            content: ''
      &:hover
        span
          color: $primary
          font-weight: 700
          &:nth-child(n+2)
            color: black
            font-weight: 100
          &:hover
            color: $primary
            font-weight: 700

#portfoliocard
  position: absolute
  top: 520px
#contact
  background: $primary
  .e-mail
    color: $secondary
    transition: 0.6s
    &:hover
        color: #fff
    &:before
      content: attr(data-website) "\0040" attr(data-user)
      unicode-bidi: bidi-override
      direction: rtl

.break
  flex-basis: 100%
  height: 0

.section-heading
  font-size: 40px
  margin-top: 0
  margin-bottom: 15px

.section-subheading
  font-size: 16px
  font-weight: 400
  margin-bottom: 50px
  text-transform: none

.team-member
  padding: 50px
  text-align: center
  background: #fff
  max-width: 310px
  margin: 0 auto
  border-radius: 6px
  transition: 0.2s
  &:hover
    background: #efefef
    cursor: pointer

.q-avatar
  font-size: 12rem

.fme-icon
  background-size: contain
  height: 70px
  background-repeat: no-repeat
  background-position: center
  transform: scale(1.2)
  margin-bottom: 10px
  min-height: 90px

.q-card
  min-width: $maxwidth/4
  transition: 1s
  overflow: hidden
  flex: 0 0 31%
  cursor: pointer

  .q-page-footer
    position: relative
    z-index: 1
    &:before
      content: ""
      position: absolute
      background: $primary
      clip-path: polygon(0% 0%, 100% 0, 100% 100%, 100PX 100%)
      width: 200%
      height: 100%
      left: 100%
      top: 0PX
      transition: 0s ease-out
      z-index: -1

  .q-img
    &:before
      content: ""
      position: absolute
      background: rgba(255,255,255,0.6)
      clip-path: polygon(0% 0%, 100% 0, 100% 100%, 0% 100%)
      width: 200%
      height: 200%
      right: -100%
      top: 0PX
      transition: 0s ease-out 0
      z-index: 99

  &:hover
    .q-img
      &:before
          transition: 0.4s ease-out 0s
          right: 100%
    .q-page-footer
      color: white
      &:before
        transition: 0.4s ease-out 0.25s
        left: -100%
</style>
