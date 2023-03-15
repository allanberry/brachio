<script>
import { useBrachioStore } from "@/stores/brachioStore";
const store = useBrachioStore();

import ToolTip from "@/components/ToolTip.vue";
import NodeCardStats from "@/components/NodeCardStats.vue";
import { round } from "@/utils.js";

import brachiosaurus_thumbnail_url from "@/assets/brachiosaurus-thumbnail.svg?url";

export default {
  data() {
    return {};
  },
  components: {
    ToolTip,
    NodeCardStats,
  },
  props: {
    node: Object,
  },
  computed: {
    store: () => store,
    brachiosaurus_thumbnail_url() {
      return brachiosaurus_thumbnail_url;
    },
    primary_url() {
      // return this.node.snapshot.primary_url.url;
      if (this.node && this.node.snapshot && this.node.snapshot.primary_url) {
        return this.node.snapshot.primary_url.url;
      }
      return undefined;
    },
    queue_position() {
      return store.libraries.findIndex((lib) => lib._id === this.node._id) + 1;
    },
    thumbnail() {
      if (this.node.snapshot && this.node.snapshot.thumbnail) {
        return this.node.snapshot.thumbnail;
      }

      return {
        placeholder: true,
        img: brachiosaurus_thumbnail_url,
        alt: "This is a placeholder image, a silhouette of a brachiosaurus.",
      };
    },
    background_image() {
      return `background-image: url(${this.thumbnail.img})`;
    },
  },
  methods: {
    round,
  },
};
</script>

<template>
  <div class="card flex-row flex-wrap mb-4 shadow-sm">
    <div class="col card-header" :style="background_image"></div>

    <div class="col card-body">
      <div class="mb-4">
        <h4 class="card-title">
          <router-link
            class="card-link"
            type="button"
            :to="{ name: 'node', params: { id: node._id } }"
          >
            {{ this.node.name }}
          </router-link>
        </h4>

        <p v-if="node.parents && node.parents.length">
          {{ node.parents[0].name }}
        </p>
        <div class="mb-3">
          <h5 class="visually-hidden">Locations</h5>
          <p v-for="loc in node.locations" :key="loc.id">
            {{ loc.city }}, {{ loc.state }}
            {{ loc.country }}
          </p>
        </div>

        <div class="pb-2 primary_url" v-if="primary_url">
          <span>Primary URL:</span><br />
          <span
            ><a class="card-link" :href="primary_url" style="">{{
              primary_url.replace("https://", "").replace("http://", "")
            }}</a></span
          >
        </div>
      </div>

      <div class="row">
        <div class="col main_col">
          <div v-if="node.categories">
            <h5>Categories</h5>
            <ul>
              <li v-for="category in node.categories" :key="category">
                <router-link
                  :to="{ name: 'nodes', query: { category: category.id } }"
                  >{{ category.label_full }}</router-link
                >
              </li>
            </ul>
          </div>

          <div v-if="node.tags && node.tags.length">
            <h5>Tags</h5>
            <ul class="list-inline">
              <li
                v-for="tag in node.tags"
                :key="tag.id"
                class="list-inline-item"
              >
                <router-link :to="{ name: 'nodes', query: { tag: tag.id } }">{{
                  tag.label_short
                }}</router-link>
              </li>
            </ul>
          </div>

          <div
            v-if="
              node.snapshot &&
              node.snapshot.technologies &&
              node.snapshot.technologies.length
            "
          >
            <h5>
              Technologies <ToolTip content="May include historical data." />
            </h5>

            <ul>
              <li v-for="tech in node.snapshot.technologies" :key="tech.id">
                {{ tech.name }}
              </li>
            </ul>
          </div>

          <div v-if="node.arl || node.parent_nodes[0]?.ipeds">
            <h5>
              Library Stats
              <ToolTip
                content="Data from ARL (2018) and IPEDS (2018).  For more info, see 'Docs'."
              />
            </h5>
            <ul>
              <li v-if="node.arl?.gatecount">
                <span>Gate Count: </span
                ><span>{{ round(node.arl.gatecount).toLocaleString() }}</span>
                <ToolTip
                  content="Total library gate count.  Association of Research Libraries data, 2018"
                />
              </li>

              <li v-if="node.arl?.vols">
                <span>Vols: </span
                ><span>{{ round(node.arl?.vols).toLocaleString() }}</span>
                <ToolTip
                  content="Number of volumes in library collections.  Association of Research Libraries data, 2018"
                />
              </li>

              <li v-if="node.parent_nodes[0]?.ipeds?.ENRTOT_DRVEF2017_RV">
                <span>Full-time enrollment 2017: </span
                ><span>{{
                  node.parent_nodes[0].ipeds.ENRTOT_DRVEF2017_RV.toLocaleString()
                }}</span>
                <ToolTip
                  content="Full-time enrollment at parent institution.  IPEDS data, 2017"
                />
              </li>

              <li v-if="node.parent_nodes[0]?.ipeds?.LEXPTOTF_DRVAL2018">
                <span>Library Expenditures (per FTE): </span
                ><span>{{
                  node.parent_nodes[0].ipeds.LEXPTOTF_DRVAL2018.toLocaleString(
                    "en-US",
                    {
                      style: "currency",
                      currency: "USD",
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }
                  )
                }}</span>
                <ToolTip
                  content="Expenditures per full-time enrollment at parent institution.  IPEDS data, 2018"
                />
              </li>

              <li v-if="node.parent_nodes[0]?.ipeds?.endowment_assets_DRVF2018">
                <span>Parent Endowment (per FTE): </span
                ><span>{{
                  round(
                    node.parent_nodes[0]?.ipeds.endowment_assets_DRVF2018
                  ).toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })
                }}</span>
                <ToolTip
                  content="Endowment per full-time enrollment at parent institution.  IPEDS data, 2018"
                />
              </li>

              <li v-if="node.parent_nodes[0]?.ipeds?.core_revenues_DRVF2018">
                <span>Parent Revenues 2018: </span
                ><span>{{
                  round(
                    node.parent_nodes[0].ipeds.core_revenues_DRVF2018
                  ).toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })
                }}</span>
                <ToolTip
                  content="Revenues at parent institution.  IPEDS data, 2018"
                />
              </li>
            </ul>
          </div>

          <div
            v-if="
              node.snapshot &&
              node.snapshot.visits_ok &&
              node.snapshot.visits_ok.length
            "
          >
            <h5>Visit Stats</h5>
            <div class="url_visits">
              <NodeCardStats
                name="Latest Visit"
                :stats="node.snapshot.visits_ok[0]?.stats"
              />

              <NodeCardStats
                name="Visits Aggregate"
                :aggregate="true"
                :stats="node.snapshot.stats_aggregate"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="w-100"></div>
    <div class="card-footer w-100 text-muted">
      <div class="row">
        <div class="col">
          <div class="text-start">
            <p class="h4 text-secondary">{{ queue_position }}</p>
          </div>

          <span class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              :id="`pin-${node._id}`"
              :value="`${node._id}`"
              v-model="store.pins.pinned"
            />
            <label class="form-check-label" :for="`pin-${node._id}`">
              Pin
            </label>
          </span>
        </div>

        <div class="col">
          <div class="text-end">
            <div class="btn-group">
              <router-link
                type="button"
                :to="{ name: 'node', params: { id: node._id } }"
                class="btn btn-outline-primary"
              >
                View
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
:root {
  --popper-theme-background-color: #333333;
  --popper-theme-background-color-hover: #333333;
  --popper-theme-text-color: #ffffff;
  --popper-theme-border-width: 0px;
  --popper-theme-border-style: solid;
  --popper-theme-border-radius: 6px;
  --popper-theme-padding: 32px;
  --popper-theme-box-shadow: 0 6px 30px -6px rgba(0, 0, 0, 0.25);
}
</style>

<style lang="scss">
.card {
  .card-header {
    padding: unset;
    border-bottom: unset;
    background-color: white;

    // background: transparent;

    background-size: 100%;
    background-position: top;
    background-repeat: no-repeat;

    width: 320px;
    min-height: 320px;

    &:first-child {
      border-top-right-radius: unset;
    }
    mask-image: linear-gradient(
      180deg,
      rgba(0, 0, 0, 1) 0%,
      rgba(0, 0, 0, 1) 80%,
      rgba(0, 0, 0, 0) 100%
    );

    width: 100%;
  }

  .card-body {
    flex: 2;
    min-height: 320px;

    .primary_url {
      a {
        display: inline-block;
        // border: 2px solid red;
        max-width: 240px;

        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-all;
      }
    }

    .main_col {
      column-count: 2;
      column-width: 360;
      & > * {
        break-inside: avoid;
      }
    }

    .card-link {
      text-decoration: none;
      &:hover,
      &:active {
        text-decoration: underline;
      }
    }
  }
  .card-footer {
    border-top: none;
    // line-height: 24px
  }
}
</style>
