<template>
  <q-dialog v-model="visible" full-height @hide="$router.push('/')">
    <q-card class="project-card text-center">
      <q-card-section
        class="bg-primary text-white"
        style="height: 70px"
        v-close-popup
      >
        <h1>Dutch Army COP</h1>
        <q-btn class="absolute-right q-px-md" flat label="X" v-close-popup />
      </q-card-section>

      <q-card-section style="max-height: calc(100% - 72px)" class="scroll">
        <div class="light">
          The
          <a
            href="https://en.wikipedia.org/wiki/Common_operational_picture"
            target="_blank"
            >Drone Intel Picture</a
          >
          is an analytical tool for the Dutch army. It is used to monitor and
          analyze drone data.
        </div>
        <br /><br />

        Drones are risks for the operational army. Guarding the airspace,
        controlling money and drugs in prisons, and drone espionage are some of
        the challenges faced.
        <br />
        <br />
        This product is a web application that visualizes drone data. It takes
        raw drone data from sensors and visualizes it in a user-friendly way.
        The user can filter, search, and analyze the data. This project is based
        on an innovation project, it is a proof of concept.
        <ul
          class="text-center"
          style="margin: 20px auto 0; width: 380px; list-style: decimal"
        >
          <li class="text-left">Infinity scroll lists</li>
          <li class="text-left">
            Filtering and sorting (e.g. by time, location, type of violations)
          </li>
          <li class="text-left">
            Exploded relational database. Drones, flights and violations.
          </li>
          <li class="text-left">
            Tenant based. Operators are only allowed to see drones in their
            field.
          </li>
          <li class="text-left">
            Automated violation point system with FME.
          </li>
        </ul>

        <q-img alt="COP" style="max-height: 50vh" src="../assets/img/COP.png" />
        <div class="light q-mb-xl">
          Dummy data. A screenshot during the development stage
        </div>

        <br /><br />
        <span class="foot-tags"
          >Date: 2024 - 2025<br />
          Client: MinDef: KMAR & Luchtmacht (Dutch army)
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
  },
};
</script>
