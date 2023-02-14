<script>
// import { useRoute } from "vue-router";

import VisitCard from "../components/VisitCard.vue";
import { useBrachioStore } from "@/stores/brachioStore";

const store = useBrachioStore();

export default {
  components: {
    VisitCard,
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
        <p>_id: {{ node._id }}</p>

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


        <div>
          <h4>Pages (URLs)</h4>

          <ul v-if="urls">
            <li v-for="url in urls" :key="url.url">
              <h5><span class="lead">URL:</span> {{ url.url }}</h5>
              <ul v-if="url.visits">
                <li class="mb-3" v-for="visit in url.visits" :key="visit._id">
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
