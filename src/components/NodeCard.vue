<script>
import { useBrachioStore } from "@/stores/brachioStore";
const store = useBrachioStore();
// import bootstrap from 'bootstrap'

import brachiosaurus_thumbnail_url from "@/assets/brachiosaurus-thumbnail.svg?url";

// const popoverTriggerList = document.querySelectorAll(
//   '[data-bs-toggle="popover"]'
// );
// const popoverList = [...popoverTriggerList].map(
//   (popoverTriggerEl) => new bootstrap.Popover(popoverTriggerEl)
// );

export default {
  data() {
    return {};
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
};
</script>

<template>
  <div class="card flex-row flex-wrap mb-4 shadow-sm">
    <div class="col card-header" :style="background_image">
      <!-- <img
        class="card-img img-thumbnail"
        :src="thumbnail.img"
        :alt="thumbnail.alt"
      /> -->
    </div>

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

          <button
            type="button"
            class="btn btn-sm btn-outline-primary"
            data-bs-toggle="popover"
            data-bs-title="Popover title"
            data-bs-content="And here's some amazing content. It's very engaging. Right?"
          >
            Click to toggle popover
          </button>
        </div>
      </div>

      <div class="row">
        <div class="col main_col">
          <div v-if="node.categories">
            <h5>Categories</h5>
            <ul>
              <li v-for="category in node.categories" :key="category">
                {{ category.label_full }}
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
                {{ tag.label_short }}
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
            <h5>Technologies</h5>
            <p>May include historical data.</p>
            <ul>
              <li v-for="tech in node.snapshot.technologies" :key="tech.id">
                {{ tech.name }}
              </li>
            </ul>
          </div>

          <div v-if="node.snapshot && node.snapshot.visits">
            <h5>Webpage Visits</h5>

            <div class="url_visits">
              <p>
                {{ node.snapshot.visits.length }} visits to
                {{ node.urls.length }} URLs,
                {{ node.snapshot.visits.slice(-1)[0].date.format("YYYY") }}–{{
                  node.snapshot.visits[0].date.format("YYYY")
                }}
              </p>

              <div>
                <span>Latest visit:</span>
                <ul>
                  <li>
                    <span>Date: </span>
                    <span>{{
                      node.snapshot.visits[0].date.format("YYYY-MM-DD")
                    }}</span>
                  </li>

                  <li v-if="node.snapshot.visits[0].lighthouse_accessibility">
                    <span>Accessibility: </span>
                    <span>{{
                      node.snapshot.visits[0].lighthouse_accessibility
                    }}</span>
                  </li>

                  <li v-if="node.snapshot.visits[0].lighthouse_performance">
                    <span>Performance: </span>
                    <span>{{
                      node.snapshot.visits[0].lighthouse_performance
                    }}</span>
                  </li>

                  <li v-if="node.snapshot.visits[0].lighthouse_best_practices">
                    <span>Best Practices: </span>
                    <span>{{
                      node.snapshot.visits[0].lighthouse_best_practices
                    }}</span>
                  </li>

                  <li v-if="node.snapshot.visits[0].js_maintainability">
                    <span>Maintainability: </span>
                    <span>{{
                      node.snapshot.visits[0].js_maintainability
                        .toFixed(2)
                        .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                    }}</span>
                  </li>
                </ul>
              </div>
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
              <!-- <button type="button" class="btn btn-sm btn-outline-secondary">
            Edit
          </button> -->
            </div>
            <!-- <small class="text-muted">9 mins</small> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

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

    // max-height: 400px;
    width: 100%;

    // height: 100%;
    // .card-img.img-thumbnail {
    //   padding: 0;
    //   border-radius: unset;
    //   // object-fit: cover;
    //   // object-position: left;
    //   margin-bottom: unset;
    //   border: none;

    //   flex: 1;

    //   mask-image: linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 75%, rgba(0,0,0,0) 100%);

    // }
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
