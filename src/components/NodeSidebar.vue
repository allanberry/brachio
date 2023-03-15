<script>
import { useBrachioStore } from "@/stores/brachioStore";
const store = useBrachioStore();
import ToolTip from "@/components/ToolTip.vue";
import NodeSidebarDropdown from "./NodeSidebarDropdown.vue";

export default {
  data() {
    return {};
  },
  computed: {
    store: () => store,
  },

  components: {
    NodeSidebarDropdown,
    ToolTip,
  },
};
</script>

<template>
  <div>
    <div class="mb-4" id="sidebar_filters">
      <h5>Filters</h5>
      <div class="form-check mb-4">
        <input
          class="form-check-input"
          type="checkbox"
          id="pins-activate"
          v-model="store.pins.active"
        />
        <label class="form-check-label" for="#pins-activate">"Pin" only</label>
      </div>

      <div class="mb-4">
        <label for="filter_keyword" class="form-label"
          >Keyword Filter <ToolTip content="Enter Keywords to limit choices."
        /></label>
        <input
          type="text"
          class="form-control"
          id="filter_keyword"
          placeholder="e.g. a library name"
          aria-describedby="filter_keyword_help"
          v-model.lazy="store.filters.keyword"
          @keyup="store.reset_pager()"
        />
      </div>
    </div>

    <div class="mb-4" id="sidebar_facets">
      <h5>
        Facets
        <ToolTip
          content=" Select from predefined categories and tags. Facets are boolean `OR`."
        />
      </h5>

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
            :expanded="true"
            :items="store.tags"
            filter="tags"
          />
        </li>
      </ul>
      <button
        type="button"
        class="btn btn-outline-secondary"
        @click="store.clear_filters()"
      >
        Clear All
      </button>
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
}

.scrollarea {
  overflow-y: auto;
}
</style>
