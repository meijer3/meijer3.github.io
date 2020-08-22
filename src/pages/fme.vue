
<template>
    <q-dialog v-model="visible" full-height  @hide="$router.push('/')" >
      <q-card class="project-card text-center"  >
        <q-card-section class="bg-primary text-white " style="height:70px;"  v-close-popup>
            <h1>We and FME</h1><q-btn class="absolute-right q-px-md" flat label="X" v-close-popup />
        </q-card-section>

        <q-card-section  style="max-height: calc(100% - 72px);" class="scroll"  >
          <h3> It feels like we know FME. We worked alot with it and gave alot of people training in Netherlands, Denmark and Sweden. Sander is certified 3 out of 3 certificates by Safe Software and got a spectial recontion for his 'C2000' project. We like to dive in complex geometical problems, out-of-the-box solutions or simple consultancy how to use FME in the best way.
          </h3>
          <h2>Training</h2>
          If you are new or expert, you can always learn by taking a course in FME. Even other certified profesionals can provid from courses. During a course we look into the theory, but we work alot with the program it self. To get inspired we can provide live demos with your data (if avaidable) or open data.

          <br><br>We prefer to give trainings at you. Most common trainings are the basic or advanced training. We can also add custom trainings. Or shift the focus if you use e.g. alot of FME server.

          <q-img src="img/training_thumb.jpg" alt="FME training" />
          <div class="light q-mb-xl"> A training can be in small groups or big groups </div>
          <h2>Consultancy</h2>
          The time that flies is the time working with FME. Atleast for us. We use it for everything, even outside our work. We know it qualities and limits. But we never forget the users around it. If a product is not 'usable', people will turn away and start using other products. User experience is key. The process around FME is as important as the workspace itself. How is the data deliverd and how do we output it. We are more than happy to help with your problems.

          <h2> FME?</h2>
          If we needed to pick one tool to do our daily GIS, it would without a doubt FME.
          <br>Automation, validation, read files without the required software (e.g. CAD) and even non-gis projects are possible in FME.
          <br><br> We like the makers of fme, Safe Software, If you want to know orientate, the best thing to do is to go to safe.com.

          <a href="https://www.safe.com/" target="_blank"><q-img src="../assets/img/safecom.png" alt="Safe software"  style="max-height:50vh" contain /></a>
          <div class="light q-mb-xl"> The 3 of FME</div>

          ps. FME is everything for us. It can move mountains on the map atleast<br>

          <span class="foot-tags">Date: Since 2017<br>
      Client: Many</span>
          <q-btn class="bg-primary text-white" flat label="Done" v-close-popup />
        </q-card-section>
      </q-card>
    </q-dialog>
</template>

<script>
export default { data () { return { visible: true } } }
</script>
