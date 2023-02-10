<script>
import { useBrachioStore } from "@/stores/brachioStore";
const store = useBrachioStore();
import slugify from "slugify";

import NodeSidebarDropdownItem from "./NodeSidebarDropdownItem.vue";

export default {
  components: {
    NodeSidebarDropdownItem,
  },
  data() {
    return {
      selected: false,
    };
  },
  props: {
    label: String,
    expanded: Boolean,
    items: Array,
    filter: String,
  },
  computed: {
    store: () => store,
    slug: function () {
      return slugify(this.label);
    },
  },
};
</script>

<template>
  <div class="sidebar_item">
    <button
      class="btn btn-toggle d-inline-flex align-items-center border-0 collapsed"
      data-bs-toggle="collapse"
      :data-bs-target="`#sidebar-dropdown-${slug}`"
      :aria-expanded="expanded"
    >
      {{ label }}
    </button>



    <form
      class="collapse"
      :class="{ show: expanded }"
      :id="`sidebar-dropdown-${slug}`"
    >
      <ul class="btn-toggle-nav list-unstyled pb-1 small">
        <li v-for="item in items" :key="item.id">
          <NodeSidebarDropdownItem :item="item" :filter="filter" />
        </li>
      </ul>
    </form>



  </div>
</template>

<style lang="scss">
.sidebar_item {
  // border: 0.25rem solid orange;
}
</style>
