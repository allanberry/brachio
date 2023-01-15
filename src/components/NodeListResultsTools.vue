<script setup>
const props = defineProps({
  title: String,
  placement: String,
});
</script>

<template>
  <h4>{{ title }}</h4>

  <div class="row" v-if="props.placement === 'precontent'">
    <div class="col">
      <h5>Datafiers</h5>
      <div class="row">
        <div class="col col-8">
          <span>Results N of NNN</span>
        </div>
        <div class="col col-4 d-flex justify-content-end">
          <div class="input-group mb-3">
            <label class="input-group-text" for="inputGroupSelect01"
              >Sort By</label
            >
            <select class="form-select" id="inputGroupSelect01">
              <option value="name" selected>Name</option>
              <option value="size">Size</option>
            </select>
          </div>

          <!-- <div class="mb-3 col">
              <label for="qty_select">Sort By</label>
              <select id="qty_select" class="form-select">
                <option value="name">Name</option>
                <option value="size">Size</option>
              </select>
            </div>

            <div class="mb-3 col">
              <label for="qty_select">Quantity</label>
              <select id="qty_select" class="form-select">
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </div> -->
        </div>
      </div>
    </div>
  </div>

  <div class="row">
    <h5 class="col col-12">Pager</h5>
    <p class="col col-12 form-text mb-3">
      Results are divided into "pages", or sets of results.
    </p>

    <nav class="col col-8 mb-3">
      <label for="pager_select">Select Page</label>
      <p class="form-text">Select which page to view.</p>
      <ul class="pagination" id="pager_select">
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

    <div class="col col-4 mb-3">
      <label for="qty_select">Quantity per Page</label>
      <p class="form-text">Select the quantity of results for each page.</p>

      <select class="form-select" id="qty_select">
        <option value="25" selected>25</option>
        <option value="50">50</option>
        <option value="100">100</option>
        <option value="250">250</option>
        <option value="500">500</option>
      </select>
    </div>
  </div>
</template>
