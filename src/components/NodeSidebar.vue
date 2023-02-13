<script>
import { useBrachioStore } from "@/stores/brachioStore";
const store = useBrachioStore();

// import CardsIcon from "@/assets/icons/sidebar/cards.svg?component";
// import CompareIcon from "@/assets/icons/sidebar/compare.svg?component";
// import ListIcon from "@/assets/icons/sidebar/list.svg?component";
// import MapIcon from "@/assets/icons/sidebar/map.svg?component";
// import TimelineIcon from "@/assets/icons/sidebar/timeline.svg?component";

import NodeSidebarDropdown from "./NodeSidebarDropdown.vue";
// import NodeCard from "../components/NodeCard.vue";

export default {
  data() {
    return {};
  },
  computed: {
    store: () => store,
  },
  components: {
    NodeSidebarDropdown,
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

      <div class="mb-4">
        <label for="filter_keyword" class="form-label">Keyword Filter</label>
        <input
          type="text"
          class="form-control"
          id="filter_keyword"
          placeholder="e.g. museum, ivy, hbcu..."
          aria-describedby="filter_keyword_help"
          v-model.lazy="store.filters.keyword"
          @keyup="store.reset_pager()"
        />
      </div>

      <div class="form-check mb-4">
        <input class="form-check-input" type="checkbox" id="sdfg" />
        <label class="form-check-label" for="sdfg">"Pin" only</label>
      </div>


    </div>

    <!-- <div class="form-check">
      <input
        class="form-check-input"
        type="checkbox"
        value=""
        id="flexCheckDefault"
      />
      <label class="form-check-label" for="flexCheckDefault">
        Boolean OR or AND
      </label>
    </div> -->

    <div class="mb-4" id="sidebar_facets">
      <h5>Facets</h5>
      <p class="form-text">Select from predefined categories and tags.</p>

      <!-- <div class="mb-2">
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault1"
            checked
          />
          <label class="form-check-label" for="flexRadioDefault1">
            any of checked ("OR")
          </label>
        </div>
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault2"
          />
          <label class="form-check-label" for="flexRadioDefault2">
            all of checked ("AND")
          </label>
        </div>
      </div> -->

      <ul class="list-unstyled">
        <li
          id="sidebar_facets_category"
          v-if="store.categories && store.categories.length"
        >
          <NodeSidebarDropdown
            label="Categories"
            :expanded="true"
            :items="store.categories"
            filter="categories"
          />
        </li>
        <li id="sidebar_facets_tags" v-if="store.tags && store.tags.length">
          <NodeSidebarDropdown
            label="Tags"
            :expanded="false"
            :items="store.tags"
            filter="tags"
          />
        </li>
        <!-- <li
          id="sidebar_facets_technologies"
          v-if="store.technologies && store.technologies.length"
        >
          <NodeSidebarDropdown
            label="Technologies"
            :expanded="false"
            :items="store.technologies"
            filter="technologies"
          />
        </li> -->
      </ul>
      <button type="button" class="btn btn-outline-secondary">Clear All</button>
    </div>
  </div>
</template>

<style lang="scss">
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

.btn-toggle-nav {
  padding-left: 1.25rem;
  a {
    padding: 0.1875rem 0.5rem;
    margin-top: 0.125rem;
    margin-left: 1.25rem;
  }
  a:hover,
  a:focus {
    /* background-color: silver; */
  }
}

.scrollarea {
  overflow-y: auto;
}
</style>
