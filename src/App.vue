<template>
  <SiteHeader />
  <SiteMain />
  <SiteFooter />
</template>

<style lang="scss">
@import "~/bootstrap/scss/bootstrap";
</style>

<script setup>
import SiteHeader from "./components/SiteHeader.vue";
import SiteMain from "./components/SiteMain.vue";
import SiteFooter from "./components/SiteFooter.vue";

import { useBrachioStore } from "@/stores/brachioStore";

const store = useBrachioStore();
store.init();
</script>
