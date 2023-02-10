<script>
import { useBrachioStore } from "@/stores/brachioStore";
const store = useBrachioStore();

export default {
  data() {
    return {
      selected: false,
      label: "Sidebar Item"
    };
  },
  props: {},
  computed: {},
};
</script>

<template>
  <div class="sidebar_item">
    <p>Sidebar Item.  Beef!</p>
  </div>
</template>

<style lang="scss">
.sidebar_item {
  border: .25rem solid orange;
}
</style>
