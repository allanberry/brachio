<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useBrachioStore } from "@/stores/brachioStore";

const store = useBrachioStore();
const id = useRoute().params.id;

const node = computed(() => store.nodes.find((node) => node._id === id));

const connections = computed(() =>
  store.connections.filter(
    (conn) => conn.subject._id === id || conn.dobject._id === id
  )
);

const parents = store.nodes.filter((node) => {
  return ["asu", "uic", "illinois"].includes(node._id);
});
</script>

<template>
  <section class="container">
    <div class="row py-lg-5">
      <div class="col" v-if="node">
        <!-- <h1 class="fw-light">{{ node().name }}</h1> -->
        <h1 class="fw-light">{{ node.name }}</h1>

        <div>
          <h4>Categories</h4>
          <p>coming soon</p>
          <ul>
            <li>Library</li>
            <li>Academic</li>
          </ul>
          <hr />
        </div>

        <div>
          <h4>Tags</h4>
          <p>coming soon</p>
          <ul>
            <li>CARLI</li>
          </ul>
          <hr />
        </div>

        <div>
          <h4>URLs</h4>
          <p>coming soon</p>
          <ul>
            <li>https://library.uic.edu</li>
          </ul>
          <hr />
        </div>

        <div>
          <h4>Locations</h4>
          <p>coming soon</p>
          <ul>
                <li>
                  <p>801 S. Morgan, Chicago IL 60607, United States</p>
                  <p>Latitude: '33.75883, Longitude: '-84.388719</p>
                </li>
          </ul>
          <hr />
        </div>

        <div>
          <h4>Connections</h4>

          <ul v-if="connections">
            <li v-for="connection in connections" :key="connection._id">
              {{ connection.subject._id }} {{ connection.predicate }}
              {{ connection.dobject._id }}
            </li>
          </ul>
          <div v-else>
            <p>No Connections</p>
            <p>Store connections: {{ store.connections }}</p>
          </div>
          <hr />
        </div>

        <div>
          <h4>Parents</h4>
          <p>Should be</p>
          <ul>
            <li class="mb-3">University of Illinois, Chicago</li>
            <p>Parents</p>
            <ul>
              <li>University of Illinois</li>
            </ul>
          </ul>
          <p>Current</p>
          <ul v-if="parents">
            <li v-for="parent in parents" :key="parent._id">
              {{ parent.name }}
            </li>
          </ul>
          <div v-else>
            <p>No Connections</p>
            <p>{{ store.connections }}</p>
          </div>
          <hr />
        </div>

        <div>
          <h4>Visits</h4>
          <p>coming soon</p>
          <hr />
        </div>

        <div>
          <h4>IPEDS</h4>
          <p>coming soon</p>
          <hr />
        </div>

        <div>
          <h4>ARLs</h4>
          <p>coming soon</p>
          <hr />
        </div>

        <div>
          <h4>Stats</h4>
          <p>coming soon</p>
          <hr />
        </div>
      </div>
      <p v-else>loading...</p>
    </div>
  </section>
</template>
