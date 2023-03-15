<script>
import { useBrachioStore } from "@/stores/brachioStore";
const store = useBrachioStore();

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
