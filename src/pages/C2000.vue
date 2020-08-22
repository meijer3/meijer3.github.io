
<template>
    <q-dialog v-model="visible" full-height  @hide="$router.push('/')" >
      <q-card class="project-card text-center"  >
        <q-card-section class="bg-primary text-white " style="height:70px;"  v-close-popup>
            <h1>The C2000 project</h1><q-btn class="absolute-right q-px-md" flat label="X" v-close-popup />
        </q-card-section>

        <q-card-section  style="max-height: calc(100% - 72px);" class="scroll"  >

        <div class="light">This is the project Sander won his once in 3 years <a target="_blank" href="https://www.sweco.nl/nieuws/nieuwsartikelen/special-recognition-award-voor-fme-professional-sander-meijer/"> special recognition</a> award</div>
        <br><br>

         A government organization needed an input map for their process to calibrate the C2000 system. (Communications used by police, ambulances, military, firefighters). The input map says more or less what kind of 'radio-wave-resistance' is in certain area. The result map is down below. Altho the real end product has way smaller pixels and more detailed information. For security reasons is a other render used.
            <q-img src="../assets/img/c2000_1.jpg" alt="A borehole sheet example"  style="max-height:50vh"  />
          <div class="light q-mb-xl"> Different categories like: open fields, high urban, low urban, forest, fresh water, salt water</div>

          This project is purely based on open-data products of PDOK. The calculating process is so heavy, that we used sheets (dutch: Kaartbladen) to calculate parts of the Netherlands. They are merged later into one map. We are talking about hundreds of gigabytes. The FME workspace was designed to work with sub-processes and where possible in parallel. (Nowadays this is the perfect showcase for FME Cloud!)
            <q-img src="../assets/img/c2000_2.png" alt="A borehole sheet example"  style="max-height:50vh" contain  class="col-4" />
          <div class="light q-mb-xl"> 'Kaartbladen' according to the AHN</div>

        Sander handed in this workspace for his fme-professoinal certificate. He received his award because of the many different inputs from PDOK and the size and complexity of the script.
        <q-img src="../assets/img/c2000_3.png" alt="A borehole sheet example"  style="max-height:50vh" contain  class="col-12" />
        <div class="light q-mb-xl"> FME script</div>

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
