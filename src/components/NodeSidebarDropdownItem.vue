<script>
import { useBrachioStore } from "@/stores/brachioStore";
const store = useBrachioStore();
// import slugify from "slugify";

export default {
  data() {
    return {
      selected: false,
    };
  },
  props: {
    item: Object,
    filter: String,
  },
  computed: {
    label: function () {
      return (
        this.item.label || this.item.label_full || this.item.name || "Untitled"
      );
    },
    store: () => store,
    

//     store.$patch((state) => {
//   state.items.push({ name: 'shoes', quantity: 1 })
//   state.hasChanged = true
// })

  },
};
</script>

<template>
  <span class="sidebar_item">
    <div class="form-check">
      <input
        class="form-check-input"
        type="checkbox"
        :name="`${filter}-${item.id}`"
        :value="`${item.id}`"
        v-model.lazy="store.filters[filter]"
        :id="`checkbox-${filter}-${item.id}`"
        @keyup="store.reset_pager()"
      />
      <label class="form-check-label" :for="`checkbox-${filter}-${item.id}`">{{
        label
      }}</label>
    </div>
  </span>
</template>

<style lang="scss">
.sidebar_item {
  // border: 0.25rem solid orange;
}
</style>
