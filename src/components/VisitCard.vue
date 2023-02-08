<script>
import { useBrachioStore } from "@/stores/brachioStore";
const store = useBrachioStore();

export default {
  data() {
    return {};
  },
  props: {
    visit: Object,
  },
  computed: {
    queue_position() {},
    thumbnail() {},
  },
};
</script>

<template>
  <div class="card">
    <div class="row no-gutters">
      <div class="col-auto">
        <img src="//placehold.it/200" class="img-fluid" alt="" />
      </div>
      <div class="col">
        <div class="card-block px-2">
          <h4 class="card-title">Visit</h4>
          <p class="card-text">Description</p>
          <a href="#" class="btn btn-primary">BUTTON</a>
        </div>
      </div>
    </div>
    <div class="card-footer w-100 text-muted">
      Footer stating cats are CUTE little animals
    </div>
  </div>
</template>

<style>
/* .card-img-top {
  object-fit: cover;
  object-position: top;
} */
</style>
