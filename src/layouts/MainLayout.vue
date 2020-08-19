<template>
  <q-layout view="hHh Lpr lFf" @scroll="checkScroll" id="geodev">
    <q-header elevated :class="hitTop?'hittop':''" class="row wrap justify-center items-start content-start">
      <q-toolbar>

      <q-tabs v-model="tab" no-caps outside-arrows mobile-arrows style="width: 100vw;"  class="q-mx-xl">
        <q-tab id="header-title" name="geodev" @click="scrollToElement('body')"  >GeoDev </q-tab>
        <q-space />
        <q-tab class="gt-xs" name="services" label="Services"  @click="scrollToElement('#services')" />
        <q-tab class="gt-xs" name="portfolio" label="Portfolio"  @click="scrollToElement('#portfolio')" />
        <q-tab class="gt-xs" name="about" label="About"  @click="scrollToElement('#about')" />
        <q-tab class="gt-xs" name="contact" label="Contact"  @click="scrollToElement('#contact')" />
      </q-tabs>

      </q-toolbar>
    </q-header>
    <router-view />
  </q-layout>
</template>

<script>
import { scroll } from 'quasar'
const { getScrollTarget, setScrollPosition } = scroll

export default {
  name: 'MainLayout',
  components: { },
  data () {
    return {
      hitTop: true,
      tab: 'geodev',
      leftDrawerOpen: false
    }
  },
  methods: {

    scrollToElement (selector) {
      const duration = 1000

      const el = document.querySelectorAll(selector)[0]
      const target = getScrollTarget(el)
      const offset = el.offsetTop + (window.innerHeight / 2) - 60 // -60 for padding title

      setScrollPosition(target, offset, duration)
    },

    checkScroll (e) {
      this.hitTop = e.position < 150
      Array.prototype.slice.call(document.querySelectorAll('section'))
        .filter(s => ['geodev', 'services', 'portfolio', 'about', 'contact'].includes(s.id))
        .filter(s => {
          var el = s.getBoundingClientRect()
          return (el.top < 0 && el.top + el.height > 150) ||
          (el.top > 0 && el.top < 100) ||
          (el.top < 600 && s.id === 'contact') || // Contact is visible
          (e.position < 100 && s.id === 'geodev') // If the upperone is near
        }
        )
        .map(s => { this.tab = s.id })
    }
  }
}
</script>
<style lang="sass">
body
  font-family: 'Ubuntu';
  font-size: 105%

.q-toolbar
  max-width: $maxwidth
  width: 100vw

#header-title
  font-size: 2rem
  padding: 4px 0

.q-header
  transition: 0.2s
  padding: 0 0
  background-color: var(--q-color-primary);

body:not(.q-body--prevent-scroll) .q-header.hittop
  background-color: rgba(0, 0, 0, 0.6);
  // .q-layout__shadow
  //   opacity: 0

</style>
