<script>
export default {
  props: {
    id: String,
    node: Object,
  },
};
</script>

<template>
  <div :id="id" class="card shadow-sm h-100">
    <!-- <img src="https://vim9ip3utf.execute-api.us-west-1.amazonaws.com/latest/iiif/2/test%2Fuic.png/full/300,/0/default.png" class="card-img-top" alt="..."> -->

    <div class="card-body">
      <div class="mb-4">
        <h4 class="card-text">{{ this.node.name }}</h4>

        <p>Parent Institution</p>
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
