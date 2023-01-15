<script setup>
// import { ref } from "vue";
import NodeCard from "../components/NodeCard.vue";
import NodeSidebar from "../components/NodeSidebar.vue";
import NodeListResultsTools from "../components/NodeListResultsTools.vue";

import axios from "axios";
import { useRoute } from "vue-router";
import { useBrachioStore } from "@/stores/brachioStore";

const store = useBrachioStore();
</script>

<template>
  <section class="container">
    <div class="row py-lg-5">
      <div class="col">
        <h1 class="fw-light">Nodes</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut
          ullamcorper dolor.
        </p>
        <!-- <p class="lead text-muted">
          Something short and leading about the collection below—its contents,
          the creator, etc. Make it short and sweet, but not too short so folks
          don’t simply skip over it entirely.
        </p>
        <p>
          <a href="#" class="btn btn-primary my-2">Main call to action</a>
          <a href="#" class="btn btn-secondary my-2">Secondary action</a>
        </p> -->
      </div>
    </div>
  </section>

  <div class="album py-5 bg-light">
    <div class="container">
      <div class="row">
        <div class="col-12 col-md-4 col-lg-3">
          <NodeSidebar />
        </div>

        <div class="col-12 col-md-8 col-lg-9">
          <h3 class="">Results</h3>

          <div v-if="store.nodes && store.nodes.length > 0">
            <NodeListResultsTools
              placement="precontent"
              title="Results Tools, pre-content"
            />

            <div id="content" class="row row-cols-1 row-cols-lg-2 g-3">
              <div class="col" v-for="node in store.nodes" :key="node._id">
                <NodeCard :id="node._id" :node="node" />
              </div>
            </div>

            <NodeListResultsTools
              placement="postcontent"
              title="Results Tools, post-content"
            />
          </div>
          <p v-else>loading...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
select.form-select {
  // width: unset;
}
</style>
