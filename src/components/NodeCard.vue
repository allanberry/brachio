<script>
import { useBrachioStore } from "@/stores/brachioStore";
const store = useBrachioStore();

export default {
  data() {
    return {};
  },
  props: {
    id: String,
    node: Object,
    // snapshot: Object,
  },
  computed: {
    queue_position() {
      return store.libraries.findIndex((lib) => lib._id === this.id) + 1;
    },
    snapshot() {
      if (store.snapshots[this.id]) {
        return store.snapshots[this.id];
      }
      return {
        thumbnail: {
          img: "/src/assets/brachiosaurus-k10.svg",
          alt: "This is a placeholder image, a silhouette of a brachiosaurus.",
        },
      };
    },
  },
};
</script>

<template>
  <div :id="id" class="card shadow-sm h-100">
    <!-- <p v-if="snapshot">{{ snapshot.thumbnail.img }}</p> -->

    <img
      :src="snapshot.thumbnail.img"
      :alt="snapshot.thumbnail.alt"
      class="card-img-top"
    />

    <div class="card-body">
      <p class="lead">{{ queue_position }}</p>

      <!-- <p>{{ { node_id: node._id, this_id: this.id, thumbnail: snapshot.thumbnail.img } }}</p> -->

      <div class="mb-4">
        <h4 class="card-text">
          <router-link type="button" :to="{ name: 'node', params: { id } }">
            {{ this.node.name }}
          </router-link>
        </h4>

        <p v-if="node.parents && node.parents.length">
          {{ node.parents[0].name }}
        </p>
      </div>

      <div v-if="node.categories">
        <span class="fs-6 fw-semibold">Categories</span>
        <ul>
          <li v-for="category in node.categories" :key="category">
            {{ category }}
          </li>
        </ul>
      </div>

      <div v-if="node.tags">
        <span class="fs-6 fw-semibold">Tags</span>
        <ul>
          <li v-for="tag in node.tags" :key="tag">
            {{ tag }}
          </li>
        </ul>
      </div>

      <div class="text-end">
        <div class="btn-group">
          <router-link
            type="button"
            :to="{ name: 'node', params: { id } }"
            class="btn btn-sm btn-outline-secondary"
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
</template>

<style>
.card-img-top {
  height: 500px;
  object-fit: cover;
  object-position: top;
}
</style>
