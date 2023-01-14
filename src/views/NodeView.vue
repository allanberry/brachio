<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useBrachioStore } from "@/stores/brachioStore";

const store = useBrachioStore();
const id = useRoute().params.id;

const node = computed(() => store.nodes.find((node) => node._id === id));

const connections = computed(
  () => console.log(store.connections)

  // store.connections.find(
  //   (connection) =>
  //     (connection.subject && connection.subject._id === id) ||
  //     (connection.subject && connection.dobject._id === id)
  // )
);
</script>

<template>
  <section class="container">
    <div class="row py-lg-5">
      <div class="col">
        <!-- <h1 class="fw-light">{{ node().name }}</h1> -->
        <h1 class="fw-light">Node</h1>
        <div v-if="node">
          <p>{{ node.name }}</p>
          <ul v-if="connections">
            <li v-for="connection in connections" :key="connection._id">
              {{ connection.subject._id }} {{ connection.predicate }}
              {{ connection.dobject._id }}
            </li>
          </ul>
          <!-- <p v-else>{{ store.connections }}</p> -->
        </div>
        <p v-else>loading...</p>
      </div>
    </div>
  </section>
</template>
