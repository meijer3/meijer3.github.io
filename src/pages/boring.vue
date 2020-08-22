
<template>
    <q-dialog v-model="visible" full-height  @hide="$router.push('/')" >
      <q-card class="project-card text-center"  >
        <q-card-section class="bg-primary text-white " style="height:70px;"  v-close-popup>
            <h1>Drill holes: PDFs/JPEGs ->  digital format</h1><q-btn class="absolute-right q-px-md" flat label="X" v-close-popup />
        </q-card-section>

        <q-card-section  style="max-height: calc(100% - 72px);" class="scroll"  >

        <div class="light">Some may reconize this project. Because it was presented by Sander on FME worldtours in Utrecht, Copenhagen and Stockholm in 2018</div>
        <br><br>
          In the Netherlands we have a lot of dikes. For this one project at we needed data from 1400 boreholes, because they wanted to move the dike. The problem: The previous data everything was based on was analog PDFs and JPGs. The data itself is from 1980s.
          <div class="row">
              <q-img src="../assets/img/boring_1.png" class="col-8" alt="A borehole sheet example"  style="max-height:50vh" contain /><q-img src="../assets/img/boring_4.png" alt="A borehole sheet example"  style="max-height:50vh" contain  class="col-4"/>
          </div>
          <div class="light q-mb-xl"> A typical sheets with analog boreholes.</div>

          With FME we could change these PDFs and JPEGs into map of pixels (and thus) geometric shapes. With our own rules we mapped vertical lines and horizontal lines. With even more rules we could figure out what the different filling meant.
          <div class="row">
            <q-img src="img/boring_thumb.jpg" alt="A borehole sheet example"  style="max-height:50vh" contain class="col-8"  />
            <q-img src="../assets/img/boring_2.png" alt="A borehole sheet example"  style="max-height:50vh" contain  class="col-4" />
            </div>
          <div class="light q-mb-xl"> Borehole with filling. 100% FME, no human interaction involved</div>

        With OGC we can actually read (a lot of times) the scale of the graph. Therefore we also know more or less the height of the boreholes and there ID. Unfortunately this project had mixed up IDs in a overview card so there was some manual mapping done to match this. Eventually FME could output to this format called '.GEF' which was text based.
        <br><br> This project was only a success because it was not meant to be 100% accurate. A wild guess on our side, we think that the sediment in the boreholes where correct on major scale. Not every sediment was map correctly but that was not necessary. <br><br>We like this project because it is an eye-opener for a lot of people. FME is way more powerful than GIS only. GIS was only a small part in this project (and mainly done by hand). FME functioned here as object aware, rule based borehole reader.

        <q-img src="../assets/img/boring_3.png" alt="A borehole sheet example"  style="max-height:50vh" contain  class="col-12" />
        <div class="light q-mb-xl"> Final product (1 out of 1400) in a GEF viewer</div>

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
