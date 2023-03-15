<script>
import NodeCard from "../components/NodeCard.vue";
import NodeSidebar from "../components/NodeSidebar.vue";
import NodeListResultsTools from "../components/NodeListResultsTools.vue";

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
    try {
      // deal with query params
      if (this.$route.query.keyword) {
        store.filters.keyword = this.$route.query.keyword;
      }
      if (this.$route.query.category) {
        if (Array.isArray(this.$route.query.category)) {
          store.filters.categories = this.$route.query.category;
        } else {
          store.filters.categories = [this.$route.query.category];
        }
      }

      if (this.$route.query.tag) {
        if (Array.isArray(this.$route.query.tag)) {
          store.filters.tags = this.$route.query.tag;
        } else {
          store.filters.tags = [this.$route.query.tag];
        }
      }
      if (this.$route.query.sort) {
        store.pager.sort = this.$route.query.sort;
      }

      await store.fetch_snapshots(this.paged_libraries);
    } catch (error) {
      console.error(error);
    }
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
          Browse a selection of library websites. Results can be filtered and
          sorted by various criteria.
        </p>
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
          <h3 class="visually-hidden pt-5">Search Results</h3>

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
