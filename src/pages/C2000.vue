
<template>
    <q-dialog v-model="visible" full-height  @hide="$router.push('/')" >
      <q-card class="project-card text-center"  >
        <q-card-section class="bg-primary text-white " style="height:70px;"  v-close-popup>
            <h1>The C2000 project</h1><q-btn class="absolute-right q-px-md" flat label="X" v-close-popup />
        </q-card-section>

        <q-card-section  style="max-height: calc(100% - 72px);" class="scroll"  >

        <div class="light">This is the project Sander won his once in 3 years <a target="_blank" href="https://www.sweco.nl/nieuws/nieuwsartikelen/special-recognition-award-voor-fme-professional-sander-meijer/"> special recognition</a> award</div>
        <br><br>

          In the Netherlands we have a lot of dikes. For this one project at we needed data from 1400 boreholes, because they wanted to move the dike. The problem: The previous data everything was based on was analog PDFs and JPGs. The data itself is from 1980s.
            <q-img src="img/c2000_1.jpg" alt="A borehole sheet example"  style="max-height:50vh"  />
          <div class="light q-mb-xl"> A typical sheets with analog boreholes.</div>

          With FME we could change these PDFs and JPEGs into map of pixels (and thus) geometric shapes. With our own rules we mapped vertical lines and horizontal lines. With even more rules we could figure out what the different filling meant.
            <q-img src="img/c2000_2.png" alt="A borehole sheet example"  style="max-height:50vh" contain  class="col-4" />
          <div class="light q-mb-xl"> Borehole with filling. 100% FME, no human interaction involved</div>

        With OGC we can actually read (alot of times) the scale of the graph. Therefore we also know more or less the hight of the boreholes and there ID. Unfortunalyl this project had mixed up IDs in a overview card so there was some manual mapping done to match this. Eventually FME could output to this format called '.GEF' which was text based.
        <br><br> This project was only a succes because it was not meant to be 100% accurate. A wild guess on our side, we think that the sediment in the boreholes where correct on major scale. Not every sediment was map correctly but that was not nesseasry. <br>We like this project because it is an eye-opener for alot of people. FME is way more powerfull than GIS only. GIS was only a small part in this project (and mainly done by hand). FME functioned here as object aware, rulebased borehole reader.

        <q-img src="img/c2000_3.png" alt="A borehole sheet example"  style="max-height:50vh" contain  class="col-12" />
        <div class="light q-mb-xl"> Final product (1 out of 1400) in a GEF viewer</div>

          <span class="foot-tags">Date: 2016<br>
      Client: Sweco</span>
          <q-btn class="bg-primary text-white" flat label="Done" v-close-popup />
        </q-card-section>
      </q-card>
    </q-dialog>
</template>

<script>
export default { data () { return { visible: true } } }
</script>
