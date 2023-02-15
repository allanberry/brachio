<script>
// import { useRoute } from "vue-router";

import VisitCard from "@/components/VisitCard.vue";
import ChartURL from "@/components/ChartURL.vue";
import { useBrachioStore } from "@/stores/brachioStore";
import slugify from "slugify";
import { currency_formatter, number_formatter } from "@/utils";

const store = useBrachioStore();

export default {
  components: {
    VisitCard,
    ChartURL,
  },
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
    slugify: (str) => slugify(str),
    currency_format: (str) => currency_formatter.format(str),
    number_format: (str) => number_formatter.format(str),
    async fetchVisits() {
      try {
        for (const url of this.node.urls) {
          await url.fetchVisits();
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<template>
  <section class="container">
    <div class="row py-lg-5">
      <div class="col" v-if="node">
        <h1 class="fw-light">{{ node.name }}</h1>
        <!-- <p>_id: {{ node._id }}</p> -->

        <div
          v-if="node.parents && node.parents.length"
          class="node_section"
          :id="`${node._id}-parents`"
        >
          <h4>Parents</h4>
          <p>Parent nodes.</p>
          <ul>
            <li v-for="parent in node.parents" :key="parent.name">
              <RouterLink :to="{ name: 'node', params: { id: parent._id } }">{{
                parent.name
              }}</RouterLink>

              <div v-if="parent.ipeds" :id="`parent-${parent._id}-ipeds`">
                <h5>IPEDS</h5>
                <p>IPEDs stats for the parent node.</p>
                <ul>
                  <li>
                    Core revenues (2018):
                    {{ currency_format(parent.ipeds.core_revenues_DRVF2018) }}
                  </li>
                  <li>
                    Total Expenditures (2018):
                    {{ currency_format(parent.ipeds.LEXPTOT_AL2018) }}
                  </li>
                  <li>
                    Total student enrollment (2017):
                    {{ number_format(parent.ipeds.ENRTOT_DRVEF2017_RV) }}
                  </li>
                  <li>
                    Endowment per student (2018):
                    {{
                      currency_format(parent.ipeds.endowment_assets_DRVF2018)
                    }}
                  </li>
                  <li>
                    Total library circulations (2018):
                    {{ number_format(parent.ipeds.LTCRCLT_AL2018) }}
                  </li>
                </ul>
              </div>
            </li>
          </ul>
          <hr />
        </div>

        <div
          v-if="node.children && node.children.length"
          class="node_section"
          :id="`${node._id}-children`"
        >
          <h4>Children</h4>
          <p>Child nodes.</p>
          <ul>
            <li v-for="c in node.children" :key="c.name">
              <RouterLink :to="{ name: 'node', params: { id: c._id } }">{{
                c.name
              }}</RouterLink>
            </li>
          </ul>
          <hr />
        </div>

        <div
          v-if="node.categories && node.categories.length"
          class="node_section"
          :id="`${node._id}-categories`"
        >
          <h4>Categories</h4>
          <p>Categories for this node.</p>
          <ul>
            <li v-for="cat in node.categories" :key="cat._id">
              {{ cat.label_full }}
              <!-- <ul>
                <li>Academic</li>
              </ul> -->
            </li>
          </ul>
          <hr />
        </div>

        <div
          v-if="node.tags && node.tags.length"
          :id="`${node._id}-tags`"
          class="node_section"
        >
          <h4>Tags</h4>
          <p>Tags for this node.</p>
          <ul class="list-inline">
            <li v-for="tag in node.tags" :key="tag" class="list-inline-item">
              {{ tag.label_short }}
            </li>
          </ul>
          <hr />
        </div>

        <div
          v-if="node.locations && node.locations.length"
          class="node_section"
          :id="`${node._id}-locations`"
        >
          <h4>Locations</h4>
          <p>Locations for this node.</p>
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

        <div v-if="node.ipeds" :id="`${node._id}-ipeds`" class="node_section">
          <h4>IPEDS</h4>
          <p>IPEDs stats for this node.</p>
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

        <div v-if="node.arl" :id="`${node._id}-arl`">
          <h4>ARL stats</h4>
          <p>ARL stats for this node.</p>
          <ul>
            <li v-if="node.arl.vols">Total volumes: {{ number_format(node.arl.vols) }}</li>
            <li v-if="node.arl.gatecount">Gate count: {{ number_format(node.arl.gatecount) }}</li>
          </ul>
          <hr />
        </div>

        <div
          v-if="node.urls && node.urls.length"
          :id="`${node._id}-urls`"
          class="node_section"
        >
          <h4>Pages (URLs)</h4>
          <p>URLs for this node.</p>

          <ul>
            <li v-for="url in urls" :key="url.url">

              <ChartURL :url="url" :data="[99, 71, 78, 25, 36, 80]" />

              <h5><span class="lead">URL:</span> {{ url.url }}</h5>

              <ul
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
              </ul>
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
      </div>
      <p v-else>loading...</p>
    </div>
  </section>
</template>

<style lang="scss">
.node_section {
  ul.visit_list {
    list-style-type: none;
    padding-left: 0;
  }
}
</style>
