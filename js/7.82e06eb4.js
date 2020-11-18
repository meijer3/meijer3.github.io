(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[7],{d693:function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("q-dialog",{attrs:{"full-height":""},on:{hide:function(t){return e.$router.push("/")}},model:{value:e.visible,callback:function(t){e.visible=t},expression:"visible"}},[a("q-card",{staticClass:"project-card text-center"},[a("q-card-section",{directives:[{name:"close-popup",rawName:"v-close-popup"}],staticClass:"bg-primary text-white ",staticStyle:{height:"70px"}},[a("h1",[e._v("Schiphol indoor wayfinding")]),a("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],staticClass:"absolute-right q-px-md",attrs:{flat:"",label:"X"}})],1),a("q-card-section",{staticClass:"scroll",staticStyle:{"max-height":"calc(100% - 72px)"}},[e._v("\n        Schiphol 'Wayfinding'-API exists of several parts. Every part is a project by it self.\n        "),a("ul",{staticClass:"text-center",staticStyle:{margin:"20px auto 0",width:"380px","list-style":"decimal"}},[a("li",{staticClass:"text-left"},[e._v("A public Basemap IMDF (Indoor Map)")]),a("li",{staticClass:"text-left"},[e._v("Wayfinding API")]),a("li",{staticClass:"text-left"},[e._v("Mesh network")]),a("li",{staticClass:"text-left"},[e._v("BLE (Bluetooth beacons)")]),a("li",{staticClass:"text-left"},[e._v("Location tree")])]),a("h2",[e._v("1 IMDF")]),a("h3",[a("a",{attrs:{href:"https://register.apple.com/resources/imdf/"}},[e._v("Indoor Mapping Data Format")]),e._v(" is becoming  the new OGC standard for indoor GIS "),a("br"),e._v("(At time of writing it still a "),a("a",{attrs:{href:"https://www.ogc.org/standards/requests/202"}},[e._v(" OGC request")]),e._v(") ")]),e._v("\n\n        Apple designed a standard format GIS for indoor buildings like airports called: "),a("a",{attrs:{href:"https://register.apple.com/resources/imdf/"}},[e._v(" IMDF")]),e._v(". We worked closely with Apple Maps and "),a("a",{attrs:{href:"https://www.safe.com/integrate/indoor-mapping-data-format-imdf/"}},[e._v("Safe Software")]),e._v(" (FME) to build the Schiphol IMDF. The conversion from Schiphol data into IMDF is quite complex and ended up in a workspace that exists  of more than 500+ transformers! During the project this decreased due to changes in the workflow. We changed how Schiphol maintained their data and followed the 'Airport API'-model that is based on IMDF. Therefore were less mappings (such as categories) needed in the end.\n        "),a("q-img",{staticStyle:{"max-height":"50vh"},attrs:{alt:"Apples IMDF on a iphones",src:"img/imdf_apple.jpg"}}),a("div",{staticClass:"light"},[e._v(" IMDF seen on an iphone at Apple maps")]),a("h2",[e._v("2 Wayfinding API")]),a("h3",[e._v("A public API endpoint for indoor routing and PointOfInterests")]),e._v("\n\n        This project exists  of two parts.\n        "),a("br"),a("br"),e._v("On one hand we build a new version of the API (Python) and dockerized that. Developing is locally  on a laptop, after that the code pushed into a git repository, build and mounted on the staging environment. After unit-testing and endpoint testing its published to the "),a("a",{attrs:{href:"https://www.google.com/search?q=green+blue+architecture"}},[e._v("green-blue production")]),e._v(". The self-serve-units on Schiphol in the terminal and airliners such as KLK make use of this routing. The API returns -in OSRM format- a walking line and times.\n\n        "),a("br"),a("br"),e._v("On the other hand we created a GeoWeb (geocortex) website for maintaining the Points/Area of interests data. This data can be found in: Schiphol products (like mobile-apps, website), external Airliners (KLM, TUI) and other people.\n\n        "),a("br"),a("br"),e._v(" See main page for a real life demo!\n        "),a("br"),a("br"),e._v("You can play with this data at "),a("a",{attrs:{href:"https://developer.schiphol.nl/"}},[e._v("developer.schiphol.nl")]),a("h2",[e._v("3 Mesh network")]),a("h3",[e._v("The network behind the API")]),e._v("\n\n        To create an indoor 'route' network, we rendered (with FME) a so called mesh-network. It is corrected on the building orientations so the meshnetwork is aligned with how people actually walk in rooms. It is weighted in such a way that it follows the original price winning analog schiphol wayfinding.\n        It includes zones, such as: One-way-filters, different security clearances, dirty/clean passengers and international/Schengen\n\n        "),a("q-img",{staticStyle:{"max-height":"50vh"},attrs:{alt:"FME generated Meshnetwork on IMDF",src:"img/mesh.png"}}),a("div",{staticClass:"light"},[e._v(" It is autogenerated on IMDF with FME")]),a("h2",[e._v("4 Beacon BLE")]),e._v("\n        The beacon API let you enter Minor/Major/RSSI values, and as a result you get a lat-long position. This is not directly used for indoorpositioning, because  Iphones/Androids are way more advanced/better. This API aims for high-amount-low-budget sensors for tracking of assets within the terminal. The assets are often connected to a LoRa network\n        "),a("q-img",{staticStyle:{"max-height":"50vh"},attrs:{alt:"Beacons bluetooth",src:"/img/beacons.png"}}),a("div",{staticClass:"light"},[e._v(" Black is the 'blue dot' and thus the calculated position, based on the green Bluetooth sensors. The blue cross is the real world location ")]),a("h2",[e._v("5 Location Tree")]),e._v("\n        This API is a uniform building/room/zones geolocator. There were so many different room definitions on the airport. Ground floor of the terminal has already 5000+ rooms. The API lets link assets onto a room. They store a UUID. With the API you can get a JSON-representative or rendered image of the room, and\n\n        "),a("span",{staticClass:"foot-tags"},[e._v("Date: 2019 - 2020"),a("br"),e._v("\n        Client: Royal Schiphol Group")]),a("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],staticClass:"bg-primary text-white",attrs:{flat:"",label:"Done"}})],1)],1)],1)},o=[],n={data(){return{visible:!0}}},s=n,r=a("2877"),l=a("24e8"),h=a("f09f"),c=a("a370"),d=a("9c40"),p=a("068f"),u=a("7f67"),g=a("eebe"),f=a.n(g),m=Object(r["a"])(s,i,o,!1,null,null,null);t["default"]=m.exports;f()(m,"components",{QDialog:l["a"],QCard:h["a"],QCardSection:c["a"],QBtn:d["a"],QImg:p["a"]}),f()(m,"directives",{ClosePopup:u["a"]})}}]);