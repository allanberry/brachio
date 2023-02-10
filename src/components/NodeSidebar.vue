<script>
import { useBrachioStore } from "@/stores/brachioStore";
const store = useBrachioStore();

// import CardsIcon from "@/assets/icons/sidebar/cards.svg?component";
// import CompareIcon from "@/assets/icons/sidebar/compare.svg?component";
// import ListIcon from "@/assets/icons/sidebar/list.svg?component";
// import MapIcon from "@/assets/icons/sidebar/map.svg?component";
// import TimelineIcon from "@/assets/icons/sidebar/timeline.svg?component";

export default {
  data() {
    return {};
  },
  computed: {
    store: () => store,
  },
  components: {
    // CardsIcon,
    // CompareIcon,
    // ListIcon,
    // MapIcon,
    // TimelineIcon,
  },
};
</script>

<template>
  <!-- <div class="sticky-top pt-5"> -->
  <div class="pt-5">
    <!-- <div class="mb-4">
      <h5>Modes</h5>
      <p class="form-text">
        Results can be viewed and explored in different ways.
      </p>
      <ul class="nav nav-pills flex-column mb-auto">
        <li>
          <a href="#" class="nav-link link-dark">
            <ListIcon />

            List
          </a>
        </li>
        <li class="nav-item">
          <a href="#" class="nav-link active" aria-current="page">
            <CardsIcon />
            Cards
          </a>
        </li>
        <li>
          <a href="#" class="nav-link link-dark">
            <MapIcon />
            Map
          </a>
        </li>
        <li>
          <a href="#" class="nav-link link-dark">
            <TimelineIcon />

            Timeline
          </a>
        </li>
        <li>
          <a href="#" class="nav-link link-dark">
            <CompareIcon />
            Compare
          </a>
        </li>
      </ul>
    </div> -->

    <div class="mb-4" id="sidebar_filters">
      <h5>Filters</h5>
      <p class="form-text">Enter keywords to limit choices.</p>
      <div>
        <label for="filter_keyword" class="form-label">Keyword Filter</label>
        <input
          type="text"
          class="form-control"
          id="filter_keyword"
          placeholder="e.g. library, museum, ivy, hbcu..."
          aria-describedby="filter_keyword_help"
          v-model.lazy="store.filters.keyword"
          @keyup="store.reset_pager()"
        />
      </div>
    </div>

    <div class="mb-4" id="sidebar_facets">
      <h5>Facets</h5>
      <p class="form-text">Select predefined categories and tags.</p>
      <ul class="list-unstyled">
        <li
          class="mb-2"
          id="sidebar_facets_category"
          v-if="store.categories && store.categories.length"
        >
          <button
            class="btn btn-toggle d-inline-flex align-items-center border-0 collapsed"
            data-bs-toggle="collapse"
            data-bs-target="#category-collapse"
            aria-expanded="true"
          >
            Category
          </button>

          <div class="collapse show" id="category-collapse">
            <ul class="btn-toggle-nav list-unstyled pb-1 small">
              <li v-for="category in store.categories" :key="category.id">
                <a class="d-inline-flex text-decoration-none">{{
                  category.label_full
                }}</a>
              </li>
            </ul>
          </div>
        </li>

        <li
          class="mb-3"
          id="sidebar_facets_tags"
          v-if="store.tags && store.tags.length"
        >
          <button
            class="btn btn-toggle d-inline-flex align-items-center border-0 collapsed"
            data-bs-toggle="collapse"
            data-bs-target="#tags-collapse"
            aria-expanded="false"
          >
            Tags
          </button>
          <div class="collapse" id="tags-collapse">
            <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              <li v-for="tag in store.tags" :key="tag.id">
                <a class="d-inline-flex text-decoration-none">{{
                  tag.label
                }}</a>
              </li>
            </ul>
          </div>
        </li>

        <li
          class="mb-3"
          id="sidebar_facets_technologies"
          v-if="store.technologies && store.technologies.length"
        >
          <button
            class="btn btn-toggle d-inline-flex align-items-center border-0 collapsed"
            data-bs-toggle="collapse"
            data-bs-target="#technologies-collapse"
            aria-expanded="false"
          >
            Technologies
          </button>
          <div class="collapse" id="technologies-collapse">
            <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              <li v-for="technology in store.technologies" :key="technology.id">
                <a class="d-inline-flex text-decoration-none">{{
                  technology.name
                }}</a>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style>
.dropdown-toggle {
  outline: 0;
}

.btn-toggle {
  padding: 0.25rem 0.5rem;
  font-weight: 600;
}
.btn-toggle:hover,
.btn-toggle:focus {
  /* background-color: silver; */
}

.btn-toggle::before {
  width: 1.25em;
  line-height: 0;
  content: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='rgba%280,0,0,.5%29' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M5 14l6-6-6-6'/%3e%3c/svg%3e");
  transform-origin: 0.5em 50%;
}

.btn-toggle[aria-expanded="true"]::before {
  transform: rotate(90deg);
}

.btn-toggle-nav a {
  padding: 0.1875rem 0.5rem;
  margin-top: 0.125rem;
  margin-left: 1.25rem;
}
.btn-toggle-nav a:hover,
.btn-toggle-nav a:focus {
  /* background-color: silver; */
}

.scrollarea {
  overflow-y: auto;
}
</style>
