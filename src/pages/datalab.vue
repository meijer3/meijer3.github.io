
<template>
    <q-dialog v-model="visible" full-height  @hide="$router.push('/')" >
      <q-card class="project-card text-center"  >
        <q-card-section class="bg-primary text-white " style="height:70px;"  v-close-popup>
            <h1>Download <b>everything</b> in one simple GIS viewer</h1><q-btn class="absolute-right q-px-md" flat label="X" v-close-popup />
        </q-card-section>

        <q-card-section  style="max-height: calc(100% - 72px);" class="scroll"  >

        <div class="light">It is similar to the PDOK viewer + your own data + all other public data </div>
        <br><br>
          Datalab is a viewer (original based on GeoWeb) that allows you to download any public data. It is made for people that have no GIS knowledge. User follow 4 simple steps

            <ul class="text-center" style="margin:20px auto 0 ; width:680px;  list-style: decimal;">
                <li class="text-left" ><span>Search:</span> for a dataset by keywords, title or tags</li>
                <li class="text-left" ><span>Draw:</span> your extent (or upload a shapefile, or many other formats)</li>
                <li class="text-left" ><span>Select:</span> your output format <a href="https://www.safe.com/integrate/" target="_blank"> one out 385+ formats</a> </li>
                <li class="text-left" ><span>Download:</span> and spend your saved time on your project</li>
            </ul>

Which these 4 steps everyone can download data and convert it to what uou need. You don’t need to know what kind of format it is. Any technical download limits are taken care of by FME. Datalab is more or less, one script that reads all public datasets and allows you to map it back to anything you want. For example a BAG shapfile used in Adobe illustrator or a AHN3 into CAD in a TIN format. Examples of public sites are:

            <ul class="text-center" style="margin:20px auto 0 ; width:680px;  list-style: none;">
                <li class="text-left" >
                    <span>ArcGIS rest</span>
                    <ul>
                        <li class="text-left" ><a href="https://mapservices.prorail.nl/arcgis/rest/" target="_blank">ProRail </a></li>
                        <li class="text-left" ><a href="https://geoservices.rijkswaterstaat.nl/arcgis/rest/" target="_blank">Rijkswaterstaat</a></li>
                        <li class="text-left" ><a href="https://geoservice.pbl.nl/arcgis/rest/services" target="_blank">PBL</a></li>
                        <li class="text-left" ><a href="https://kaarten.vechtstromen.nl/arcgis/rest/" target="_blank">Vechtstromen</a></li>
                    </ul>
                </li>
                <li class="text-left" >
                    <span>PDOK</span>
                    <ul>
                        <li class="text-left" ><a href="https://www.pdok.nl/introductie/-/article/actueel-hoogtebestand-nederland-ahn3-/" target="_blank">AHN3 (in Pointcloud/Raster/TIN)</a></li>
                        <li class="text-left" ><a href="https://www.pdok.nl/introductie/-/article/basisregistratie-adressen-en-gebouwen-ba-1" target="_blank">BAG (in 3D...? combined with own data ...?)</a></li>
                        <li class="text-left" ><a href="https://www.pdok.nl/introductie/-/article/basisregistratie-grootschalige-topografie-bgt-" target="_blank">BGT</a></li>
                        <li> Almost anything is possible. Especially formats like WMS, WMTS, WCS, WFS, Pointclouds, REST<br>Datalab allows you to download without the typical 1000 feature limits. </li>
                    </ul>
                </li>
                <li class="text-left" >
                    <span>Other</span>
                    <ul>
                        <li class="text-left" ><a href="https://www.rijkswaterstaat.nl/apps/geoservices/geodata/dmc/dtb/geogegevens/cad/" target="_blank">Rijkswaterstaat DTB CAD drawings, in datalab you download your extent, not 'kaartbladen'</a></li>
                        <li> There are so many datasets available. If you know where to find it. It can actually overwhelming</li>
                    </ul>
                </li>
            </ul>

          <span class="foot-tags">Date: 2017<br>
      Client: Sweco</span>
          <q-btn class="bg-primary text-white" flat label="Done" v-close-popup />
        </q-card-section>
      </q-card>
    </q-dialog>
</template>

<script>
export default { data () { return { visible: true } } }
</script>
