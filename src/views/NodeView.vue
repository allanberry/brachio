<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useBrachioStore } from '@/stores/brachioStore'

const store = useBrachioStore();
const id = useRoute().params.id

const node = computed(() => store.nodes.find((node) => node._id === id));


</script>

<template>
  <section class="container">
    <div class="row py-lg-5">
      <div class="col">
        <!-- <h1 class="fw-light">{{ node().name }}</h1> -->
        <h1 class="fw-light">Node</h1>
        <p v-if="node">{{ node.name }}</p>
        <p v-else>loading...</p>
      </div>
    </div>
  </section>
</template>
