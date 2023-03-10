<script>
import ChartURL from "@/components/ChartURL.vue";

import { useBrachioStore } from "@/stores/brachioStore";
const store = useBrachioStore();

export default {
  components: {
    ChartURL,
  },
  data() {
    return {
      nodes: store.select_nodes([
        "umich_library",
        "uic_library",
        "harvard_library",
      ]),
    };
  },
  async mounted() {
    store.fetch_snapshots(this.nodes);

    try {
      for (const node of this.nodes) {
        for (const url of node.urls) {
          await url.fetchVisits();
        }
      }
    } catch (error) {
      console.error(error);
    }
  },
};

//
</script>

<template>
  <section class="container col-xxl-8 px-4 py-5">
    <div class="row flex-lg-row-reverse align-items-center g-5 py-5">
      <div class="col-10 col-sm-8 col-lg-6">
        <img
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa"
          class="d-block mx-lg-auto img-fluid"
          alt="Bootstrap Themes"
          loading="lazy"
          width="700"
          height="500"
        />
      </div>
      <div class="col-lg-6">
        <h1 class="display-5 fw-bold lh-1 mb-3">Welcome!</h1>
        <p class="lead">
          <span class="h3">Brachio</span> is an experimental online research catalog of library websites selected from the Internet Archive's
          <a href="https://archive.org/web/">Wayback Machine</a>.
        </p>
        <p>
          <span class="text-warning">This site is a work in progress.</span>
          Please take everything here with a grain of salt. I'm still filling in
          data. Most data is pre-2022.
        </p>
        <div class="d-grid gap-2 d-md-flex justify-content-md-start">
          <p>
            Please visit
            <router-link :to="{ name: 'nodes' }"> Libraries </router-link> to
            browse.
          </p>

          <!-- <button type="button" class="btn btn-primary btn-lg px-4 me-md-2">
            Primary
          </button>
          <button type="button" class="btn btn-outline-secondary btn-lg px-4">
            Default
          </button> -->
        </div>
      </div>

      <div>
        <h2>Featured Websites</h2>
        <p>Websites selected for various reasons</p>
        <ul>
          <li v-for="url in [].concat(nodes[0].urls[0])" :key="url.url">
            <h5><span class="lead">URL:</span> {{ url.url }}</h5>

            <ChartURL
              v-if="url.visits && url.visits.length"
              :url="url"
              class="mb-4"
            />

            <!-- <ul
              v-if="url.visits"
              class="row visit_list"
              :id="`${node._id}-${slugify(url.url)}-visits`"
            >
              <li
                class="mb-3 col-lg-6 visit_list_item"
                v-for="visit in url.visits"
                :key="visit._id"
              >
                <VisitCard :visit="visit" />
              </li>
            </ul> -->
          </li>
        </ul>
      </div>

      <!-- <div>
        <h2>Featured Categories</h2>
        <p>Libraries selected by a particular keyword</p>
        <ul>
          <li>Ivy League</li>
          <li>Historically Black Colleges and Universities</li>
          <li>UIC Peers</li>
          <li>Institutions using WordPress</li>
        </ul>
      </div> -->

      <!-- <div>
        <h2>Featured Comparisons</h2>
        <p>Selected libraries Compared</p>
        <ul>
          <li>HBCUs : Ivy League</li>
          <li>Ohio State : University of Michigan</li>
          <li>Chicago Public Library</li>
        </ul>
      </div> -->
    </div>
  </section>
</template>

<style lang="scss"></style>
