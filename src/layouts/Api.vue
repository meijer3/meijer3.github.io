
<template>
  <pre v-html="data"/>
</template>

<script>

export default {
  name: 'MainLayout',
  components: { },
  data () {
    return {
      data: 123,
      appId: '333',
      appKey: '333'
    }
  },
  mounted  () {
    this.callAPI().then((data) => {
      this.data = data
    }).catch(e => { console.error(222, e) })
    // fetch('https://www.safe.com/fme/formats-matrix/')
    //   .then(res => res.text())
    //   .then(text => {
    //     this.data = { test: 'whaat' }
    //   })
  },
  methods: {
    callAPI: async function () {
      var url = 'https://api.schiphol.nl/wayfinding/poi/id/plaza'
      const myHeaders = new Headers()
      myHeaders.append('app_id', `${this.appId}b`)
      myHeaders.append('app_key', `${this.appKey}a`)
      // myHeaders.append('X-Custom-Header', 'ProcessThisImmediately')

      const response = await fetch(url, {
        redirect: 'manual', // manual, *follow, error
        // credentials: 'include', // include, *same-origin, omit
        // curl -X GET --header "Accept: application/json" --header "app_id: 6b2a69eb" --header "app_key: 3fa88dcf9e3d8fe1bc5744c838db056a" --header "resourceVersion: v3" "https://api.schiphol.nl/wayfinding/poi/id/plaza"
        referrerPolicy: 'origin', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        headers: myHeaders
      }).catch(e => { console.error(111, e) })
      return response.json()
    },

    callAPI2: function (endpoint) {
      return new Promise((resolve, reject) => {
        var request = new XMLHttpRequest()
        request.onreadystatechange = function () {
          if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
              resolve(request)
            } else {
              console.warn(request)
              reject(request)
            }
          }
        }
        endpoint = 'https://api.schiphol.nl/wayfinding/poi/id/plaza'

        // return resolve(temp)
        request.open('GET', 'https://api.schiphol.nl' + endpoint, true)
        request.setRequestHeader('app_id', '6b2a69eb')
        request.setRequestHeader('app_key', '3fa88dcf9e3d8fe1bc5744c838db056a')
        request.setRequestHeader('resourceVersion', 'v3')
        request.setRequestHeader('Accept', 'application/json')
        request.send()
      })
    }
  }

}
</script>
