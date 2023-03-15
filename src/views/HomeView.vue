<script>
import ChartNode from "@/components/ChartNode.vue";

export default {
  components: {
    ChartNode,
  },
};

//
</script>

<template>
  <section class="container col-xxl-8 px-4 py-5">
    <div class="row flex-lg-row-reverse align-items-center g-5 py-5">
      <div class="col-12">
        <h1 class="display-5 fw-light lh-1 mb-3">Welcome!</h1>
        <p class="lead">
          <span class="h3">Brachio</span> is an experimental online research
          catalog of library websites selected from the Internet Archive's
          <a href="https://archive.org/web/">Wayback Machine</a>. It provides
          longitudinal, visual access to historical versions of Library websites.
        </p>
        <p>
          <span class="warning">This site is a work in progress.</span>
          Please take everything here with a grain of salt. I'm still filling in
          data. Most data is pre-2022.
        </p>
        <div class="d-grid gap-2 d-md-flex justify-content-md-start">
          <p class="lead">
            <strong>
              Please visit
              <router-link :to="{ name: 'nodes' }"> Libraries </router-link> to
              browse.</strong
            >
          </p>
        </div>
      </div>

      <div>
        <h2>Featured Websites</h2>

        <h4>
          <router-link :to="{ name: 'node', params: { id: 'uic_library' } }"
            >University of Illinois at Chicago</router-link
          >
        </h4>
        <p>I work at the UIC Library, maintaining this website.</p>
        <p>
          Please note, that due to a lack of data post-2021, the current UIC
          Library website is not represented. The most recent one here is old,
          somewhat broken, and gave my web scraper fits.
        </p>
        <ChartNode node_name="uic_library" class="mb-4" />

        <h4>
          <router-link :to="{ name: 'node', params: { id: 'umich_library' } }"
            >University of Michigan Library</router-link
          >
        </h4>

        <p>
          The University of Michigan is my alma mater, so I feel I can pick on
          them a little.
        </p>
        <ChartNode node_name="umich_library" class="mb-4" />

        <h4>
          <router-link
            :to="{ name: 'node', params: { id: 'princeton_library' } }"
            >Princeton University Library</router-link
          >
        </h4>
        <p>The Code4Lib conference this year is in Princeton, NJ.</p>
        <ChartNode node_name="princeton_library" class="mb-4" />
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.warning {
  color: orange;
  font-weight: 700;
}
</style>
