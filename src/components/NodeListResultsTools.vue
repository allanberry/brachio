<script setup>
const props = defineProps({
  title: String,
  placement: String,
});
</script>

<template>
  <h5>{{ title }}</h5>

  <div class="row" v-if="props.placement === 'precontent'">
    <div class="col">
      <h6>Datafiers</h6>
      <span>Results N of NNN</span>

      <div class="mb-3">
        <label for="qty_select">Sort By</label>
        <select id="qty_select" class="form-select">
          <option selected>Sort</option>
          <option value="name">Name</option>
          <option value="size">Size</option>
        </select>
      </div>

      <div class="mb-3">
        <label for="qty_select">Choose a Quantity</label>
        <select id="qty_select" class="form-select">
          <option selected>Qty</option>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>
    </div>
  </div>

  <div class="row">
    <h6>Pager</h6>

    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item disabled">
          <a class="page-link" href="#" tabindex="-1" aria-disabled="true"
            >Previous</a
          >
        </li>
        <li class="page-item">
          <a class="page-link" href="#">1</a>
        </li>
        <li class="page-item">
          <span class="page-link" disabled>...</span>
        </li>

        <li class="page-item"><span class="page-link">3</span></li>
        <li class="page-item active">
          <span class="page-link">4</span>
        </li>
        <li class="page-item"><span class="page-link">5</span></li>

        <li class="page-item">
          <span class="page-link disabled">...</span>
        </li>

        <li class="page-item">
          <a class="page-link" href="#">12</a>
        </li>
        <li class="page-item">
          <a class="page-link" href="#">Next</a>
        </li>
      </ul>
    </nav>
  </div>
</template>
