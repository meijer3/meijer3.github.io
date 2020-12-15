<template>
  <q-layout view="hHh Lpr fFf">
    <q-header
      elevated
      class="row wrap justify-center items-start content-start"
    >
      <q-toolbar>
        <q-btn
          @click="toggleDrawer"
          round
          dense
          flat
          :icon="drawerState ? 'close' : 'menu'"
          class="q-mr-xl"
          v-if="childHasDrawer"
        />
        <q-breadcrumbs class="vertical-bottom" gutter="xs">
          <q-breadcrumbs-el
            id="header-geodev"
            label="GeoDev"
            class="text-white"
            to="/"
          />
          <q-breadcrumbs-el label="Maps" class="text-white">
            <q-menu auto-close>
              <q-list style="min-width: 100px">
                <q-item clickable
                  ><q-item-section>Home page</q-item-section>
                </q-item>
                <q-item clickable to="/maps/reisadvies"
                  ><q-item-section>Reisadvies</q-item-section>
                </q-item>
                <q-item clickable to="/maps/json2python"
                  ><q-item-section>Python 2 Json</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-breadcrumbs-el>
          <q-breadcrumbs-el
            v-if="this.$route.name !== 'maps'"
            :label="this.title"
            class="text-white"
            id="header-page"
          />
          <span class="subtitle"> {{ this.subtitle }} </span>
        </q-breadcrumbs>
      </q-toolbar>
      <div
        v-if="info"
        class="header-drawer row wrap justify-center items-start content-start"
        :class="expanded ? 'expanded' : ''"
      >
        <div class="header-drawer-button" @click="expanded = !expanded"></div>

        <div class="more-info" v-html="info" />
      </div>
    </q-header>
    <router-view @header="header" />
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout',
  data () {
    return {
      expanded: false,
      childHasDrawer: null,
      title: '',
      subtitle: '',
      info: null
    }
  },
  methods: {
    toggleDrawer: function () {
      this.drawerState = !this.drawerState
    },

    header (child) {
      this.childHasDrawer = child.drawer
      this.title = child.title
      this.subtitle = child.subtitle
      this.info = child.info
    }
  },
  computed: {
    drawerState: {
      get () {
        return this.$store.state.pagesStore.drawerState
      },
      set (val) {
        this.$store.commit('pagesStore/updateDrawerState', val)
      }
    }
  }
}
</script>
<style lang="sass" scoped>

.q-header
  transition: 0.2s
  padding: 0 0
  .q-toolbar
    background-color: var(--q-color-primary)
    max-width: $maxwidth
    .q-breadcrumbs
      font-size:0.8rem
      height: 100%
      .q-breadcrumbs__el
        height: 50px
        cursor: pointer
        padding: 0 5px
        border-bottom: 2px solid transparent
        &:hover
          border-bottom: 2px solid white
      #header-geodev
        font-size: 1.1rem
      #header-page
        font-size: 1.8rem
    .subtitle
      border-bottom: 2px solid transparent
      opacity: 0.8
      font-size: 0.8rem

  .header-drawer
    background: white
    width: 100%
    color: black
    max-height:0px
    // position: absolute
    overflow: hidden
    transition: 0.5s
    .more-info
      padding: 30px 0 30px
      max-width: 600
      @media (max-width: $breakpoint-sm-max)
        padding: 30px
    .header-drawer-button
      cursor: pointer
      width: 80px
      height: 40px
      background: var(--q-color-primary)
      position: absolute
      bottom: -17px
      border-radius: 100%
      z-index: -1
      clip-path: polygon(0% 0%, 100% 0%, 80% 100%,20% 100%)
      opacity: 0.8
      &::after
        content: "info"
        height: 100%
        text-align: center
        width: 100%
        position: absolute
        top: 20px
        color: white
      &:hover
        opacity: 1

  .header-drawer.expanded
    max-height:300px
    .header-drawer-button
      &::after
        content: "close"

.q-header:hover
  .header-drawer
    // max-height:100vh
</style>
