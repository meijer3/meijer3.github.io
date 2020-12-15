<template>
  <q-page-container>
    <q-drawer v-model="drawerState" elevated>
      <q-toggle v-model="format" label="Format it pretty" class="q-ma-xl" />
    </q-drawer>

    <q-page class="fit row wrap justify-evenly items-start ">
      <q-input
        outlined
        v-model="jsonInput"
        label="Raw Json"
        stack-label
        clearable
        autogrow
        class="col-6 q-gutter-xl q-mt-xl"
        @input="this.jsonToPy"
      />

      <q-input
        outlined
        v-model="PyOutput"
        label="Python"
        stack-label
        clearable
        autogrow
        class="col-6  q-gutter-xl q-mt-xl"
        @input="this.pyToJson"
      />

      <p id="help" class="q-my-xl">
        This page helps you to convert a JSON into a Python Object. Or viseversa
        <br />
        2020 GeoDev
        <br />
        <q-breadcrumbs align="center">
          <template v-slot:separator>
            <q-icon size="1.5em" name="chevron_right" color="primary" />
          </template>
          <q-breadcrumbs-el label="GeoDev" to="/" />
          <q-breadcrumbs-el label="maps"></q-breadcrumbs-el>
          <q-breadcrumbs-el :label="this.$route.name" />
        </q-breadcrumbs>
      </p>
      <q-card class="fixed z-top bg-primary text-white q-py-xs q-px-md q-mt-xl "
        >&nbsp;&nbsp;&nbsp;&nbsp;Json
        {{ this.json2Py ? '&rarr;' : '&larr;' }} Python</q-card
      >
    </q-page>

    <q-page-scroller
      position="bottom-right"
      :scroll-offset="150"
      :offset="[18, 18]"
      ><q-btn fab icon="keyboard_arrow_up" color="primary" />
    </q-page-scroller>
  </q-page-container>
</template>

<script>
import { Notify, copyToClipboard } from 'quasar'
import meta from '../utils/meta.js'

export default {
  name: 'json2py',
  meta,
  data () {
    return {
      metaTags: {
        title: 'GeoDev | Reisadvies MinBuZa met Corona',
        description:
          'Deze kaart geeft het reis advies voor landen in Europa en de wereld. Welke landen kunt u op vakantie tijden corona. Kleurcodes zijn groen geel oranje en rood'
      },
      drawerLeft: false,
      format: false,
      json2Py: true,
      jsonInput:
        '{ "currentVersion": 10.71, "cimVersion": "2.4.0", "id": 0, "name": "Bouwkundige elementen Lijnen", "type": "Feature Layer", "parentLayer": null, "defaultVisibility": true, "minScale": 144448, "maxScale": 0, "geometryType": "esriGeometryPolyline", "description": "", "copyrightText": "", "editFieldsInfo": null, "syncCanReturnChange": true }',
      obj: null,
      PyOutput:
        '{ "currentVersion": 10.71, "cimVersion": "2.4.0", "id": 0, "name": "Bouwkundige elementen Lijnen", "type": "Feature Layer", "parentLayer": None, "defaultVisibility": True, "minScale": 144448, "maxScale": 0, "geometryType": "esriGeometryPolyline", "description": "", "copyrightText": "", "editFieldsInfo": None, "syncCanReturnChanges": True }'
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
  },
  mounted () {
    this.$emit('header', {
      drawer: true,
      title: 'Json 2 Python',
      subtitle: 'convert to clipboard'
    })
  },
  methods: {
    jsonToPy () {
      console.log('Going from JSON to python  → ')
      if (this.jsonInput === null || this.jsonInput === '') {
        this.jsonInput = ''
      } else {
        try {
          this.obj = JSON.parse(this.jsonInput)
          if (this.format) {
            this.PyOutput = JSON.stringify(this.obj, null, 4)
          } else {
            this.PyOutput = this.jsonInput
          }
          this.json2Py = true

          this.PyOutput = this.PyOutput.split('false').join('False')
          this.PyOutput = this.PyOutput.split('true').join('True')
          this.PyOutput = this.PyOutput.split('null').join('None')
          this.clipboard(this.PyOutput, 'Copied Python object to clipboard')
        } catch (e) {
          Notify.create({
            message: `Could not parse the JSON: ${e.message}`,
            color: 'red-9'
          })
        }
      }
    },
    pyToJson () {
      console.log('Going from python to json  ← ')
      if (this.PyOutput === null || this.PyOutput === '') {
        this.jsonInput = ''
      } else {
        try {
          var temp = this.PyOutput

          temp = temp.split('False').join('false')
          temp = temp.split('True').join('true')
          temp = temp.split('None').join('null')
          this.obj = JSON.parse(temp)
          if (this.format) {
            this.jsonInput = JSON.stringify(this.obj, null, 4)
          } else {
            this.jsonInput = temp
          }
          this.json2Py = false
          this.clipboard(this.jsonInput, 'Copied JSON to clipboard')
        } catch (e) {
          Notify.create({
            message: `Could not parse the Python object: ${e.message}`,
            color: 'red-9'
          })
        }
      }
    },

    clipboard (data, msg) {
      copyToClipboard(data)
        .then(() => {
          Notify.create({ message: msg, color: 'green-9' })
        })
        .catch(f => {
          console.error(f)
        })
    },
    replacer (match, pIndent, pKey, pVal, pEnd) {
      var key = '<span class=json-key>'
      var val = '<span class=json-value>'
      var str = '<span class=json-string>'
      var r = pIndent || ''
      if (pKey) {
        r = r + key + pKey.replace(/[": ]/g, '') + '</span>: '
      }
      if (pVal) {
        r = r + (pVal[0] === '"' ? str : val) + pVal + '</span>'
      }
      return r + (pEnd || '')
    }
  }
}
</script>
<style lang="sass" scoped>
body
  font-family: 'Ubuntu'
  font-size: 105%

.q-field__control
    background: #fff

#help
    font-size: 80%
    opacity: 0.7
    text-align: center
a
    &:hover
        color: #000

.q-textarea--autogrow .q-field__native
  resize: none
  overflow: hidden
</style>
