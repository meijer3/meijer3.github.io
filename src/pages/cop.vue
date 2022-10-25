<template>
  <q-dialog v-model="visible" full-height @hide="$router.push('/')">
    <q-card class="project-card text-center">
      <q-card-section
        class="bg-primary text-white "
        style="height:70px;"
        v-close-popup
      >
        <h1>Dutch Army COP</h1>
        <q-btn class="absolute-right q-px-md" flat label="X" v-close-popup />
      </q-card-section>

      <q-card-section style="max-height: calc(100% - 72px);" class="scroll">
        <div class="light">
          At the operational center (OpCent) of the Military Police in the
          Netherlands they have a video wall with all active units and
          incidents. Sander build a new version with this live data.
        </div>
        <br /><br />

        The
        <a
          href="https://en.wikipedia.org/wiki/Common_operational_picture"
          target="_blank"
          >Common Operational Picture (COP)</a
        >
        contains live data of units, incidents and a lot more. The website was
        build with Angular and open layers to replace and older website. Of
        course it contains sensitive data, and most is secret. We as develop
        team were not allowed to work with the live data, nor were we allowed to
        deploy the application our selfs. Here are the improvements related to the old
        website:
        <ul
          class="text-center"
          style="margin:20px auto 0 ; width: 380px;  list-style: decimal;"
        >
          <li class="text-left">Infinity scroll lists</li>
          <li class="text-left">
            Filtering done on the client (faster and keep relations)
          </li>
          <li class="text-left">
            Visual relations (e.g. lines between units and incidents)
          </li>
          <li class="text-left">Drive time clouds | isochromes</li>
          <li class="text-left">Improved search / coordinate handling</li>
        </ul>

        <q-img alt="COP" style="max-height:50vh" src="../assets/img/COP.png" />
        <div class="light q-mb-xl">
          Dummy data and blurred. A screenshot during the development stage
        </div>

        <br /><br />
        <span class="foot-tags"
          >Date: 2020 - 2023<br />
          Client: MinDef/ KMAR (Dutch army)
        </span>

        <q-btn class="bg-primary text-white" flat label="Done" v-close-popup />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  data() {
    return { visible: true };
  }
};
</script>
