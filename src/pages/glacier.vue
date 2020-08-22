
<template>
    <q-dialog v-model="visible" full-height  @hide="$router.push('/')" >
      <q-card class="project-card text-center"  >
        <q-card-section class="bg-primary text-white " style="height:70px;"  v-close-popup>
            <h1>Drone imagery for glacier movement</h1><q-btn class="absolute-right q-px-md" flat label="X" v-close-popup />
        </q-card-section>

        <q-card-section  style="max-height: calc(100% - 72px);" class="scroll"  >

          <div class="light">
          This is a scientific research with a UAV done in Nepal. This research is published in Annals of Glaciology: <a href="https://www.cambridge.org/core/services/aop-cambridge-core/content/view/836B5F297408CC02130D7AC86B214338/S0260305500000124a.pdf/seasonal_surface_velocities_of_a_himalayan_glacier_derived_by_automated_correlation_of_unmanned_aerial_vehicle_imagery.pdf">Seasonal surface velocities of a Himalayan glacier derived by automated correlation of unmanned aerial vehicle imagery</a>
          </div>
          <q-img src="../assets/img/nepal (1).jpg" alt="Lirung Glacier"  style="max-height:50vh" contain />
          <div class="light q-mb-xl"> The lirung (7234m) with the lirung glacier. The glacier is debris covered (see the grey 'river').</div>

          The goal of this research is -still- to check the flow of the Lirung glacier in Nepal. This can be done by flying a Drone/UAV (unmanned aerial vehicle) a few times every year to record an aerial-photograph. These images contains big boulders and stones on the glacier and therefore they can be track and traced. With cross-correlation the movements over time can be found. We reviewed types of correlation models and compare these with a GPS based ground-truth, which were done by hand. Further research included finding the best interpolation. This resulted in the following human readable map:

          <q-img src="../assets/img/nepal_2.jpg" alt="Glacier flow" />
          <div class="light q-mb-xl"> All of this is done with remote sensing software ENVI. Because this research is continuing for a long time, everything is written in programming code IDL (Interactive Data Language) </div>

          <span class="foot-tags">Date: January 2017<br>
      Client: Utrecht University</span>
          <q-btn class="bg-primary text-white" flat label="Done" v-close-popup />
        </q-card-section>
      </q-card>
    </q-dialog>
</template>

<script>
export default { data () { return { visible: true } } }
</script>
