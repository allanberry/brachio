<template>
  <Header />

  <Main />

  <Footer />
</template>

<style lang="scss">
@import "~/bootstrap/scss/bootstrap";
</style>

<script setup>
import Header from "./components/Header.vue";
import Main from "./components/Main.vue";
import Footer from "./components/Footer.vue";

import { useBrachioStore } from "@/stores/brachioStore";

const store = useBrachioStore();
store.init();
</script>
