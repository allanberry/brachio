<script>
import ChartURL from "@/components/ChartURL.vue";
import ChartNode from "@/components/ChartNode.vue";

import { useBrachioStore } from "@/stores/brachioStore";
const store = useBrachioStore();

export default {
  components: {
    ChartURL,
    ChartNode,
  },
  data() {
    return {
      nodes: store.select_nodes(["umich_library", "uic_library"]),
    };
  },
  async mounted() {
    try {
      await store.fetch_snapshots(this.nodes);

      for (const node of this.nodes) {
        for (const url of node.urls) {
          await url.fetchVisits();
          // await url.aggregate();
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
        <h1 class="display-5 fw-light lh-1 mb-3">Welcome!</h1>
        <p class="lead">
          <span class="h3">Brachio</span> is an experimental online research
          catalog of library websites selected from the Internet Archive's
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
          <!-- <li v-for="url_obj in [].concat(nodes[0].urls[0])" :key="url_obj.url">
            <p>{{ url_obj.url }}</p>
            <ChartURL :url_obj="url_obj" class="mb-4" />
          </li> -->

          <li>University of Illinois at Chicago Homepage</li>

          <ChartNode :node="nodes[0]" class="mb-4" />
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
