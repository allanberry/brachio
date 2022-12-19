<script>
export default {
  props: {
    id: String,
    name: String
  },
}

</script>

<template>
  <div :id="id" class="card shadow-sm">
    <img src="https://vim9ip3utf.execute-api.us-west-1.amazonaws.com/latest/iiif/2/test%2Fuic.png/full/300,/0/default.png" class="card-img-top" alt="...">


    <div class="card-body">
      <p class="card-text">{{ name }}</p>
      <div class="d-flex justify-content-between align-items-center">
        <div class="btn-group">
        <router-link type="button" :to="{ name: 'library', params: { id }}" class="btn btn-sm btn-outline-secondary">
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
