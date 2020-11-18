<template>
<q-layout view="lHh Lpr lFf" >
    <q-header elevated class="row wrap justify-center items-start content-start">
      <q-toolbar>
        <q-tabs no-caps outside-arrows mobile-arrows style="width: 100vw;"  class="q-mx-xl">
            <q-route-tab id="header-title" name="geodev" to="/"  >GeoDev </q-route-tab>
        </q-tabs>
      </q-toolbar>
    </q-header>

    <q-page  class="fit row wrap justify-evenly ">
    <q-input outlined v-model="input" label="Raw Json" stack-label clearable  autogrow  class="col-6 q-gutter-xl q-mt-xl"/>
    <q-input outlined v-model="output" label="Python" stack-label clearable  autogrow  class="col-6  q-gutter-xl q-mt-xl"/>
    <p id="help" class="">This page helps you to convert a JSON object into a Python Object. Or viseversa <br/> 2020 GeoDev</p>
    <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[18, 18]"><q-btn fab icon="keyboard_arrow_up" color="primary" />
    </q-page-scroller>
    </q-page>
</q-layout>
</template>

<script>
import { Notify, copyToClipboard } from 'quasar'

export default {

  name: 'json2py',
  data () {
    return {
      input: '{ "currentVersion": 10.71, "cimVersion": "2.4.0", "id": 0, "name": "Bouwkundige elementen Lijnen", "type": "Feature Layer", "parentLayer": null, "defaultVisibility": true, "minScale": 144448, "maxScale": 0, "geometryType": "esriGeometryPolyline", "description": "", "copyrightText": "", "editFieldsInfo": null, "syncCanReturnChanges": true }',
      obj: null,
      output: '{ "currentVersion": 10.71, "cimVersion": "2.4.0", "id": 0, "name": "Bouwkundige elementen Lijnen", "type": "Feature Layer", "parentLayer": None, "defaultVisibility": True, "minScale": 144448, "maxScale": 0, "geometryType": "esriGeometryPolyline", "description": "", "copyrightText": "", "editFieldsInfo": None, "syncCanReturnChanges": True }'
    }
  },
  mounted () {
  },
  methods: {
    error (user) {
    //   openURL('https://nl.linkedin.com/in/' + user)
    }
  },
  watch: {
    input: {
      handler: function () {
        console.log(this.obj)
        try {
          this.obj = JSON.parse(this.input)
          console.log('json object:', this.obj)
          this.output = JSON.stringify(this.obj, null, 4)
          this.output = this.output.split('false').join('False')
          this.output = this.output.split('true').join('True')
          this.output = this.output.split('null').join('None')
          copyToClipboard(this.output).then(() => {}).catch((f) => { console.error(f) })
          Notify.create({ message: 'Copied JSON to clipboard', color: 'green-9' })
        } catch (e) {
          Notify.create({ message: `Could not parse the JSON: ${e.message}`, color: 'red-9', multiLine: true })
        }
      }
    //   immediate: true /* handy for debugging */
    },

    output: {
      handler: function () {
        console.log(this.obj)
        try {
          this.output = this.output.split('False').join('false')
          this.output = this.output.split('True').join('true')
          this.output = this.output.split('None').join('null')
          this.obj = JSON.parse(this.output)
          console.log('json object:', this.obj)
          this.input = JSON.stringify(this.obj, null, 4)
          copyToClipboard(this.output).then(() => {}).catch((f) => { console.error(f) })
          Notify.create({ message: 'Copied python to clipboard', color: 'green-9' })
        //
        } catch (e) {
          Notify.create({ message: `Could not parse the Python: ${e.message}`, color: 'red-9', multiLine: true })
        }
      }
    //   immediate: true /* handy for debugging */
    }
  }
}

</script>
<style lang="sass" >
body
  font-family: 'Ubuntu';
  font-size: 105%

.q-field__control
    background: #fff

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

#help
    font-size: 80%
    opacity: 0.7
    text-align: center
a
    &:hover
        color: #000
</style>
