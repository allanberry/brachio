<script>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import { useBrachioStore } from "@/stores/brachioStore";

const store = useBrachioStore();

export default {
  data() {
    return {
      id: this.$route.params.id,
      node: store.nodes.find((node) => node._id === this.$route.params.id),
      visits: [],
    };
  },
  computed: {
    urls: function () {
      return this.node.urls;
    },
  },
  async mounted() {
    try {
      await this.fetchVisits();
    } catch (error) {
      console.error(error);
    }
  },
  methods: {
    async fetchVisits() {
      try {
        for (const url of this.urls) {
          await url.fetchVisits();
        }
      } catch (error) {
        console.error(error);
      }
    },
    resolve_screenshot(path, size) {
      if (size === "full") {
        return `https://bcw-images.s3.us-west-1.amazonaws.com/brachio/visits/${path}`;
      } else {
        // format: https://vim9ip3utf.execute-api.us-west-1.amazonaws.com/latest/iiif/2/test%2Fuic.png/full/300,/0/default.png
        const path_encoded = encodeURIComponent(`brachio/visits/${path}`);
        return `https://vim9ip3utf.execute-api.us-west-1.amazonaws.com/latest/iiif/2/${path_encoded}/full/300,/0/default.png`;
      }
    },
    visit_data: function (visit) {
      return [
        { label: "title", metric: visit.title },
        { label: "date accessed", metric: visit.date_accessed },
        { label: "date wayback", metric: visit.date_wayback },
        { label: "url wayback", metric: visit.url_wayback },
        { label: "url wayback raw", metric: visit.url_wayback_raw },
        { label: "anchors length", metric: visit.anchors.length },
        { label: "html element qty", metric: visit.raw_element_qty },
        { label: "html length", metric: visit.raw_length },
        { label: "css length", metric: visit.styles_length },
        { label: "js length", metric: visit.scripts_length },
        { label: "html frames", metric: visit.metrics_frames },
        { label: "html documents", metric: visit.metrics_documents },
        { label: "html nodes", metric: visit.metrics_nodes },
        { label: "performance score", metric: visit.metrics_performance },
        { label: "accessibility score", metric: visit.metrics_accessibility },
        { label: "best practices score", metric: visit.metrics_best_practices },
        { label: "css colors", metric: visit.metrics_styles_colors },
        { label: "css comments", metric: visit.metrics_styles_comments },
        {
          label: "css commentsLength",
          metric: visit.metrics_styles_commentsLength,
        },
        { label: "css oldIEFixes", metric: visit.metrics_styles_oldIEFixes },
        { label: "css imports", metric: visit.metrics_styles_imports },
        { label: "css importants", metric: visit.metrics_styles_importants },
        {
          label: "css mediaQueries",
          metric: visit.metrics_styles_mediaQueries,
        },
        {
          label: "css parsingErrors",
          metric: visit.metrics_styles_parsingErrors,
        },
        {
          label: "css qualifiedSelectors",
          metric: visit.metrics_styles_qualifiedSelectors,
        },
        {
          label: "css specificityIdAvg",
          metric: visit.metrics_styles_specificityIdAvg,
        },
        {
          label: "css specificityIspanotal",
          metric: visit.metrics_styles_specificityIspanotal,
        },
        { label: "css selectors", metric: visit.metrics_styles_selectors },
        { label: "css length 2", metric: visit.metrics_styles_length },
        { label: "css rules", metric: visit.metrics_styles_rules },
        {
          label: "css declarations",
          metric: visit.metrics_styles_declarations,
        },
        {
          label: "js maintainability",
          metric: visit.metrics_scripts_maintainability,
        },
        { label: "js lines of code", metric: visit.metrics_scripts_sloc },
        {
          label: "js halstead difficulty",
          metric: visit.metrics_scripts_halstead_difficulty,
        },
        {
          label: "js halstead bugs",
          metric: visit.metrics_scripts_halstead_bugs,
        },
        {
          label: "js halstead effort",
          metric: visit.metrics_scripts_halstead_effort,
        },
        {
          label: "js halstead length",
          metric: visit.metrics_scripts_halstead_length,
        },
        {
          label: "js halstead vocabulary",
          metric: visit.metrics_scripts_halstead_vocabulary,
        },
        {
          label: "js halstead volume",
          metric: visit.metrics_scripts_halstead_volume,
        },
        {
          label: "js halstead time",
          metric: visit.metrics_scripts_halstead_time,
        },
      ];
    },
  },
};
</script>

<template>
  <section class="container">
    <div class="row py-lg-5">
      <div class="col" v-if="node">
        <h1 class="fw-light">{{ node.name }}</h1>

        <div v-if="node.parents && node.parents.length">
          <h4>Parents</h4>
          <ul>
            <li v-for="p in node.parents" :key="p.name">
              <RouterLink :to="{ name: 'node', params: { id: p._id } }">{{
                p.name
              }}</RouterLink>
            </li>
          </ul>
          <hr />
        </div>

        <div v-if="node.children && node.children.length">
          <h4>Children</h4>
          <ul>
            <li v-for="c in node.children" :key="c.name">
              <RouterLink :to="{ name: 'node', params: { id: c._id } }">{{
                c.name
              }}</RouterLink>
            </li>
          </ul>
          <hr />
        </div>

        <div>
          <h4>Pages (URLs)</h4>

          <ul v-if="urls">
            <li v-for="url in urls" :key="url.url">
              <h5><span class="lead">URL:</span> {{ url.url }}</h5>
              <ul v-if="url.visits">
                <li class="mb-3" v-for="visit in url.visits" :key="visit._id">
                  <h6><span class="lead">Visit:</span> {{ visit.id }}</h6>
                  <ul>
                    <li
                      class="row"
                      v-for="item in visit_data(visit)"
                      :key="item._id"
                    >
                      <span class="col-5 col-lg-3" style="font-weight: 700">{{
                        item.label
                      }}</span>
                      <span class="col-7 col-lg-9">
                        {{ item.metric }}
                      </span>
                    </li>

                    <li class="row">
                      <span class="col-5 col-lg-3">screenshots</span>
                      <span class="col-7 col-lg-9">
                        <ul>
                          <li
                            v-for="screenshot in visit.screenshots"
                            :key="screenshot"
                          >
                            {{ resolve_screenshot(screenshot) }}
                          </li>
                        </ul>
                      </span>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
          <hr />
        </div>

        <div v-if="node.categories && node.categories.length">
          <h4>Categories</h4>
          <ul>
            <li v-for="cat in node.categories" :key="cat._id">
              {{ cat }}
              <!-- <ul>
                <li>Academic</li>
              </ul> -->
            </li>
          </ul>
          <hr />
        </div>

        <div v-if="node.tags && node.tags.length">
          <h4>Tags</h4>
          <ul>
            <li v-for="tag in node.tags" :key="tag">
              {{ tag }}
            </li>
          </ul>
          <hr />
        </div>

        <div v-if="node.locations && node.locations.length">
          <h4>Locations</h4>
          <ul>
            <li v-for="loc in node.locations" :key="loc._id">
              <p>
                <span v-if="loc.aspanress">{{ loc.aspanress }}</span>
              </p>
              <p>
                <span v-if="loc.city">{{ loc.city }}, </span>
                <span v-if="loc.state">{{ loc.state }} </span>
                <span v-if="loc.postal">{{ loc.postal }} </span>
                <span v-if="loc.country">{{ loc.country }}</span>
              </p>

              <p v-if="loc.latitude && loc.longitude">
                <span>{{ loc.latitude }}, </span
                ><span>{{ loc.longitude }}</span>
              </p>
            </li>
          </ul>
          <hr />
        </div>

        <!-- <div>
          <h4>Connections</h4>

          <ul v-if="connections">
            <li v-for="connection in connections" :key="connection._id">
              {{ connection.subject._id }} {{ connection.predicate }}
              {{ connection.dobject._id }}
            </li>
          </ul>
          <div v-else>
            <p>No Connections</p>
            <p>Store connections: {{ store.connections }}</p>
          </div>
          <hr />
        </div> -->

        <div v-if="node.ipeds">
          <h4>IPEDS stats</h4>
          <ul>
            <li>
              Core revenues (2018): {{ node.ipeds.core_revenues_DRVF2018 }}
            </li>
            <li>
              Endowment (2018): {{ node.ipeds.endowment_assets_DRVF2018 }}
            </li>
            <li>Total Expenditures (2018): {{ node.ipeds.LEXPTOT_AL2018 }}</li>
            <li>
              Total enrollment (2017): {{ node.ipeds.ENRTOT_DRVEF2017_RV }}
            </li>
            <li>
              Total library circulations (2018): {{ node.ipeds.LTCRCLT_AL2018 }}
            </li>
          </ul>
          <hr />
        </div>

        <div v-if="node.arl">
          <h4>ARL stats</h4>
          <ul>
            <li>Total volumes: {{ node.arl.vols }}</li>
            <li>Gate count: {{ node.arl.gatecount }}</li>
          </ul>
          <hr />
        </div>
      </div>
      <p v-else>loading...</p>
    </div>
  </section>
</template>
