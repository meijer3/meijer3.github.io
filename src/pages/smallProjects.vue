<template>
  <!-- @hide="$router.push('/')"  -->
  <q-dialog v-model="visible" full-height eager="True">
    <q-card class="project-card text-center">
      <q-card-section
        class="bg-primary text-white "
        style="height:70px;"
        v-close-popup
      >
        <h1>Small Projects</h1>
        <q-btn class="absolute-right q-px-md" flat label="X" v-close-popup />
      </q-card-section>

      <q-card-section style="max-height: calc(100% - 72px);" class="scroll">
        <div class="light">
          Small collection of commericial and private projects
        </div>

        <div
          ref="flags"
          class="fit column wrap justify-center items-center content-center"
        >
          <p class=" q-mt-xl">
            Just a pure CSS flag that can change between Dutch, Swedish and
            English. Feel free to use
            <a href="https://codepen.io/meijer3/pen/GRoLKNy" target="_blank"
              >Codepen</a
            >
          </p>
          <br />
          <div class="flag dutch" @click="nextFlag($event)">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>

        <p class=" q-mt-xl">
          Some css loaders focussed on GIS. Feel free to use
          <a href="https://codepen.io/meijer3/pen/jOMrXOJ" target="_blank"
            >Codepen</a
          >
        </p>

        <gisLoaders />

        <q-btn class="bg-primary text-white" flat label="Done" v-close-popup />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<style lang="scss">
@import "./src/CSS/flags.scss";
</style>
<script>
import { fromEvent, timer } from "rxjs";
import { takeUntil, switchMap, startWith } from "rxjs/operators";
import gisLoaders from "../components/gisloaders";

export default {
  data() {
    return { visible: true };
  },
  components: {
    gisLoaders
  },
  methods: {
    nextFlag(event) {
      const f = event.currentTarget;
      if (f.classList.contains("dutch")) {
        // Swedish
        f.classList.remove("dutch");
        f.classList.add("english");
      } else if (f.classList.contains("english")) {
        f.classList.remove("english");
        f.classList.add("swedish");
      } else {
        // Dutch
        f.classList.remove("swedish");
        f.classList.add("dutch");
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      var start$ = fromEvent(this.$refs.flags, "mouseleave");
      var stop$ = fromEvent(this.$refs.flags, "mouseenter");
      start$
        .pipe(
          startWith(void 0),
          switchMap(() => timer(3000, 4000).pipe(takeUntil(stop$)))
        )
        .subscribe(x => {
          this.$refs.flags.querySelector(".flag").click();
        });
    });
  }
};
</script>
