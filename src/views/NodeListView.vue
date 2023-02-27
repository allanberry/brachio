<script>
import NodeCard from "../components/NodeCard.vue";
import NodeSidebar from "../components/NodeSidebar.vue";
import NodeListResultsTools from "../components/NodeListResultsTools.vue";
import ToolTip from "../components/ToolTip.vue";

import { useBrachioStore } from "@/stores/brachioStore";
const store = useBrachioStore();

export default {
  components: {
    NodeCard,
    NodeSidebar,
    NodeListResultsTools,
    // ToolTip,
  },
  data() {
    return {};
  },
  computed: {
    paged_libraries: () => store.paged_libraries,
  },
  methods: {},
  async mounted() {
    await store.fetch_snapshots(this.paged_libraries);
  },
  async updated() {
    await store.fetch_snapshots(this.paged_libraries);
  },
};
</script>

<template>
  <section class="container">
    <div class="row py-lg-5">
      <div class="col">
        <h1 class="fw-light">Library Websites</h1>

        

        <p>
          Browse a selection of library websites. Results can be filtered and sorted by various criteria.
          
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

  <div class="album pb-5">
    <div class="container">
      <div class="row">
        <div class="col-12 col-md-4 col-lg-3">
          <NodeSidebar />
        </div>

        <div class="col-12 col-md-8 col-lg-9">
          <h3 class="pt-5">Results</h3>

          <div v-if="paged_libraries && paged_libraries.length > 0">
            <NodeListResultsTools
              placement="precontent"
              title="Results Tools, pre-content"
            />

            <div id="content" class="rowg-4 mb-4">
              <div
                class="col"
                v-for="library in paged_libraries"
                :key="library._id"
              >
                <NodeCard :node="library" />
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
