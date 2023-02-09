<script>
import { useBrachioStore } from "@/stores/brachioStore";
const store = useBrachioStore();

export default {
  data() {
    return {};
  },
  props: {
    node: Object,
  },
  computed: {
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
        img: "/src/assets/brachiosaurus-thumbnail.svg",
        alt: "This is a placeholder image, a silhouette of a brachiosaurus.",
      };
    },
  },
};
</script>

<template>
  <div class="card flex-row flex-wrap mb-4 bg-light shadow-sm">
    <div class="col card-header">
      <img
        class="card-img img-thumbnail border"
        :src="thumbnail.img"
        :alt="thumbnail.alt"
      />
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
      </div>

      <div class="row">
        <div class="col">
          <div>
            <h5>Location</h5>
            <p>Chicago IL, USA</p>
          </div>
          <div v-if="node.categories">
            <h5>Categories</h5>
            <ul>
              <li v-for="category in node.categories" :key="category">
                {{ category }}
              </li>
            </ul>
          </div>

          <div v-if="node.tags">
            <h5>Tags</h5>
            <ul>
              <li v-for="tag in node.tags" :key="tag">
                {{ tag }}
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
        </div>

        <div class="col">
          <div>
            <h5>Webpage Visits</h5>
            <p>14 visits to 3 webpages, 1998–2021</p>
            <div class="url_visits">
              <div class="pb-2" v-if="primary_url">
                <span>Primary URL:</span><br />
                <span
                  ><a :href="primary_url">{{ primary_url }}</a></span
                >
              </div>

              <div>
                <span>Latest visit:</span>
                <ul>
                  <li><span>Date:</span> <span>2021-01-01</span></li>
                  <li><span>Complexity:</span> <span>98/100</span></li>
                  <li><span>Accessibility:</span> <span>98/100</span></li>
                  <li><span>Usability:</span> <span>98/100</span></li>
                  <li><span>Best Practices:</span> <span>98/100</span></li>
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
            <p class="lead">{{ queue_position }}</p>
          </div>
        </div>

        <div class="col">
          <div class="text-end">
            <div class="btn-group">
              <router-link
                type="button"
                :to="{ name: 'node', params: { id: node._id } }"
                class="btn btn-sm btn-primary"
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
.card-header {
  padding: unset;
  border-bottom: unset;
  border-radius: unset;
  // height: 100%;
  .card-img.img-thumbnail {
    padding: 0;
  border-radius: unset;
    // object-fit: cover;
    // object-position: left;
    margin-bottom: unset;

    flex: 1;
  }
}

.card-body {
  flex: 2;
}
</style>
