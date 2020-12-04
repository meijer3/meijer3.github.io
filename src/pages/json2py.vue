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
          ><q-route-tab id="header-title" name="geodev" to="/"
            >GeoDev
          </q-route-tab>
        </q-tabs>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="drawerLeft" elevated>
      <q-toggle v-model="format" label="Format it pretty" class="q-ma-xl" />
    </q-drawer>

    <q-page-container>
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
          This page helps you to convert a JSON into a Python Object. Or
          viseversa <br />
          2020 GeoDev
        </p>
        <q-card
          class="fixed z-top bg-primary text-white q-py-xs q-px-md q-mt-xl "
          >&nbsp;&nbsp;&nbsp;&nbsp;Json
          {{ this.json2Py ? '&rarr' : '&larr' }} Python</q-card
        >
      </q-page>

      <q-page-scroller
        position="bottom-right"
        :scroll-offset="150"
        :offset="[18, 18]"
        ><q-btn fab icon="keyboard_arrow_up" color="primary" />
      </q-page-scroller>
    </q-page-container>
  </q-layout>
</template>

<script>
import { Notify, copyToClipboard } from 'quasar'

export default {
  name: 'json2py',
  data () {
    return {
      drawerLeft: false,
      format: false,
      json2Py: true,
      jsonInput:
        '{ "currentVersion": 10.71, "cimVersion": "2.4.0", "id": 0, "name": "Bouwkundige elementen Lijnen", "type": "Feature Layer", "parentLayer": null, "defaultVisibility": true, "minScale": 144448, "maxScale": 0, "geometryType": "esriGeometryPolyline", "description": "", "copyrightText": "", "editFieldsInfo": null, "syncCanReturnChanges": true, "relationships": [], "isDataVersioned": false, "isDataArchived": false, "isDataBranchVersioned": false, "isCoGoEnabled": false, "supportsRollbackOnFailureParameter": true, "supportsStatistics": true, "supportsAdvancedQueries": true, "supportsValidateSQL": true, "supportsCoordinatesQuantization": true, "supportsCalculate": true, "advancedQueryCapabilities": { "supportsReturningQueryExtent": true, "supportsStatistics": true, "supportsDistinct": true, "supportsPagination": true, "supportsOrderBy": true, "supportsQueryWithDistance": true, "supportsLod": false, "supportsPaginationOnAggregatedQueries": true, "supportsQueryWithResultType": true, "supportsCountDistinct": true, "supportsReturningGeometryCentroid": false, "supportsHavingClause": true, "supportsQueryWithLodSR": false, "supportsTopFeaturesQuery": false, "supportsOrderByOnlyOnLayerFields": false }, "extent": { "xmin": 524801.5154274143, "ymin": 6852562.2518468425, "xmax": 535147.987504378, "ymax": 6861262.08609274, "spatialReference": { "wkid": 102100, "latestWkid": 3857, "xyTolerance": 0.001, "zTolerance": 0.001, "mTolerance": 0.001, "falseX": -20037700, "falseY": -30241100, "xyUnits": 148923141.92838538, "falseZ": -100000, "zUnits": 10000, "falseM": -100000, "mUnits": 10000 } }, "sourceSpatialReference": { "wkid": 102100, "latestWkid": 3857, "xyTolerance": 0.001, "zTolerance": 0.001, "mTolerance": 0.001, "falseX": -20037700, "falseY": -30241100, "xyUnits": 148923141.92838538, "falseZ": -100000, "zUnits": 10000, "falseM": -100000, "mUnits": 10000 }, "drawingInfo": { "renderer": { "type": "simple", "symbol": { "type": "esriSLS", "style": "esriSLSSolid", "color": [ 0, 158, 129, 255 ], "width": 1 } }, "scaleSymbols": true, "transparency": 0, "labelingInfo": null }, "hasM": false, "hasZ": true, "supportsVCSProjection": true, "allowtrueCurvesUpdates": false, "onlyAllowtrueCurveUpdatesBytrueCurveClients": true, "hasAttachments": false, "supportsApplyEditsWithGlobalIds": false, "htmlPopupType": "esriServerHTMLPopupTypeAsHTMLText", "objectIdField": "objectid", "globalIdField": null, "displayField": "sgistype_s", "typeIdField": "", "fields": [ { "name": "objectid", "type": "esriFieldTypeOID", "alias": "GDB_ARCHIVE_OID", "domain": null, "nullable": false, "editable": false }, { "name": "sgistype_s", "type": "esriFieldTypeString", "alias": "SGISTYPE_S", "domain": null, "editable": true, "nullable": true, "length": 50 }, { "name": "sgistype", "type": "esriFieldTypeString", "alias": "SGISTYPE", "domain": null, "editable": true, "nullable": true, "length": 50 }, { "name": "afwerking", "type": "esriFieldTypeString", "alias": "AFWERKING", "domain": null, "editable": true, "nullable": false, "length": 50 }, { "name": "afwerking_s", "type": "esriFieldTypeString", "alias": "AFWERKING_S", "domain": null, "editable": true, "nullable": true, "length": 50 }, { "name": "hoogteniveau", "type": "esriFieldTypeInteger", "alias": "HOOGTENIVEAU", "domain": null, "editable": true, "nullable": true }, { "name": "hoogteobject", "type": "esriFieldTypeDouble", "alias": "HOOGTEOBJECT", "domain": null, "editable": true, "nullable": false }, { "name": "hoogte_rel", "type": "esriFieldTypeDouble", "alias": "HOOGTE_REL", "domain": null, "editable": true, "nullable": true }, { "name": "lengteobject", "type": "esriFieldTypeDouble", "alias": "LENGTEOBJECT", "domain": null, "editable": true, "nullable": true }, { "name": "locatie", "type": "esriFieldTypeString", "alias": "LOCATIE", "domain": null, "editable": true, "nullable": true, "length": 50 }, { "name": "materiaal", "type": "esriFieldTypeString", "alias": "MATERIAAL", "domain": null, "editable": true, "nullable": true, "length": 50 }, { "name": "naam", "type": "esriFieldTypeString", "alias": "NAAM", "domain": null, "editable": true, "nullable": true, "length": 50 }, { "name": "nummer", "type": "esriFieldTypeString", "alias": "NUMMER", "domain": null, "editable": true, "nullable": true, "length": 20 }, { "name": "schoonmaakcluster", "type": "esriFieldTypeString", "alias": "SCHOONMAAKCLUSTER", "domain": null, "editable": true, "nullable": false, "length": 50 }, { "name": "themacode", "type": "esriFieldTypeString", "alias": "THEMACODE", "domain": null, "editable": true, "nullable": false, "length": 50 }, { "name": "themacode_s", "type": "esriFieldTypeString", "alias": "THEMACODE_S", "domain": null, "editable": true, "nullable": true, "length": 50 }, { "name": "typebwkelementspec", "type": "esriFieldTypeString", "alias": "TYPEBWKELEMENTSPEC", "domain": null, "editable": true, "nullable": true, "length": 50 }, { "name": "verdieping_naar", "type": "esriFieldTypeInteger", "alias": "VERDIEPING_NAAR", "domain": null, "editable": true, "nullable": true }, { "name": "verdieping_naar_s", "type": "esriFieldTypeString", "alias": "VERDIEPING_NAAR_S", "domain": null, "editable": true, "nullable": true, "length": 50 }, { "name": "verwijzing", "type": "esriFieldTypeString", "alias": "VERWIJZING", "domain": null, "editable": true, "nullable": true, "length": 50 }, { "name": "verdieping", "type": "esriFieldTypeInteger", "alias": "VERDIEPING", "domain": null, "editable": true, "nullable": false }, { "name": "verdieping_s", "type": "esriFieldTypeString", "alias": "VERDIEPING_S", "domain": null, "editable": true, "nullable": true, "length": 50 }, { "name": "sgisid", "type": "esriFieldTypeString", "alias": "SGISID", "domain": null, "editable": true, "nullable": false, "length": 38 } ], "geometryField": { "name": "shape", "type": "esriFieldTypeGeometry", "alias": "SHAPE", "domain": null, "editable": true, "nullable": true, "defaultValue": null, "modelName": "SHAPE" }, "indexes": [ { "name": "r3323_sde_rowid_uk", "fields": "OBJECTID", "isAscending": true, "isUnique": true, "description": "" }, { "name": "a3289_ix1", "fields": "SHAPE", "isAscending": true, "isUnique": true, "description": "" } ], "dateFieldsTimeReference": { "timeZone": "UTC", "respectsDaylightSaving": false }, "types": [], "templates": [ { "name": "GBW_BWKELEMENT_LIJNEN_RVW", "description": "", "prototype": { "attributes": { "sgisid": " ", "verdieping_s": null, "sgistype_s": null, "sgistype": null, "afwerking": " ", "afwerking_s": null, "hoogteniveau": null, "hoogteobject": 0, "hoogte_rel": null, "lengteobject": null, "locatie": null, "materiaal": null, "naam": null, "nummer": null, "schoonmaakcluster": " ", "themacode": " ", "themacode_s": null, "typebwkelementspec": null, "verdieping_naar": null, "verdieping_naar_s": null, "verwijzing": null, "verdieping": 0 } }, "drawingTool": "esriFeatureEditToolLine" } ], "useStandardizedQueries": true, "standardMaxRecordCount": 2000, "tileMaxRecordCount": 2000, "maxRecordCountFactor": 1, "supportedQueryFormats": "JSON, geoJSON", "maxRecordCount": 2000, "allowGeometryUpdates": true, "capabilities": "Query", "enableZDefaults": true, "zDefault": 0, "allowUpdateWithoutMValues": true, "serviceItemId": "ab76d4a774bf4e8fa62dbf68dd367125", "hasMetadata": true, "supportsAttachmentsByUploadId": true, "supportsAsyncDelete": true, "sqlParserVersion": "PG_10.6.1" }',
      obj: null,
      PyOutput:
        '{ "currentVersion": 10.71, "cimVersion": "2.4.0", "id": 0, "name": "Bouwkundige elementen Lijnen", "type": "Feature Layer", "parentLayer": None, "defaultVisibility": True, "minScale": 144448, "maxScale": 0, "geometryType": "esriGeometryPolyline", "description": "", "copyrightText": "", "editFieldsInfo": None, "syncCanReturnChanges": True }'
    }
  },
  mounted () {},
  methods: {
    aaaa () {
      console.log(123123)
    },
    cleanEsri () {
      //   openURL('https://nl.linkedin.com/in/' + user)
    },
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
<style lang="sass">
body
  font-family: 'Ubuntu'
  font-size: 105%

.q-field__control
    background: #fff

.q-toolbar
  width: 100vw

#header-title
  font-size: 2rem
  padding: 4px 0

.q-header
  transition: 0.2s
  padding: 0 0
  background-color: var(--q-color-primary)

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
