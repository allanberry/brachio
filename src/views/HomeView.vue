<script>
// import { useBrachioStore } from "@/stores/brachioStore";
// const store = useBrachioStore();

import ChartURL from "../components/ChartURL.vue";

export default {
  components: {
    ChartURL,
  },
  data() {
    return {};
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
          Brachio is an online research catalog of library websites from the
          Internet Archive's
          <a href="https://archive.org/web/">Wayback Machine</a>.
        </p>
        <div class="d-grid gap-2 d-md-flex justify-content-md-start">
          <p>Please visit <a href="#">Libraries</a> to browse.</p>
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
          <li>Princeton University Library</li>
          <!-- <li><ChartURL :url="`https://library.uic.edu/`" /></li> -->
          <li>Carnegie Mellon University</li>
          <li>University of Illinois at Chicago</li>
        </ul>
      </div>

      <div>
        <h2>Featured Categories</h2>
        <p>Libraries selected by a particular keyword</p>
        <ul>
          <li>Ivy League</li>
          <li>Historically Black Colleges and Universities</li>
          <li>UIC Peers</li>
          <li>Institutions using WordPress</li>
        </ul>
      </div>

      <div>
        <h2>Featured Comparisons</h2>
        <p>Selected libraries Compared</p>
        <ul>
          <li>HBCUs : Ivy League</li>
          <li>Ohio State : University of Michigan</li>
          <li>Chicago Public Library</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style lang="scss"></style>
