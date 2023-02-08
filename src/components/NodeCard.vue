<script>
import { useBrachioStore } from "@/stores/brachioStore";
const store = useBrachioStore();

export default {
  data() {
    return {};
  },
  props: {
    node: Object,
    snapshot: Object,
  },
  computed: {
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
  <div :id="node._id" class="card shadow-sm h-100">
    <img
      :src="thumbnail.img"
      :alt="thumbnail.alt"
      class="card-img-top border-bottom"
    />

    <div class="card-body bg-light">
      <p class="lead">{{ queue_position }}</p>

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

        <p>Chicago IL, USA</p>
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

      <div
        v-if="
          node.snapshot &&
          node.snapshot.technologies &&
          node.snapshot.technologies.length
        "
      >
        <span class="fs-6 fw-semibold">Technologies</span>
        <ul>
          <li v-for="tech in node.snapshot.technologies" :key="tech.id">
            {{ tech.name }}
          </li>
        </ul>
      </div>

      <div class="text-end">
        <div class="btn-group">
          <router-link
            type="button"
            :to="{ name: 'node', params: { id: node._id } }"
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
  object-fit: cover;
  object-position: top;
}
</style>
