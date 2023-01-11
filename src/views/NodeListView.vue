<script setup>
// import { ref } from "vue";
import NodeCard from "../components/NodeCard.vue";
import NodeSidebar from "../components/NodeSidebar.vue";
import axios from "axios";
import { useRoute } from "vue-router";
import { useBrachioStore } from "@/stores/brachioStore";

const store = useBrachioStore();
</script>

<template>
  <section class="container">
    <div class="row py-lg-5">
      <div class="col">
        <h1 class="fw-light">Nodes</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut
          ullamcorper dolor.
        </p>
        <!-- <p class="lead text-muted">
          Something short and leading about the collection below—its contents,
          the creator, etc. Make it short and sweet, but not too short so folks
          don’t simply skip over it entirely.
        </p>
        <p>
          <a href="#" class="btn btn-primary my-2">Main call to action</a>
          <a href="#" class="btn btn-secondary my-2">Secondary action</a>
        </p> -->
      </div>
    </div>
  </section>

  <div class="album py-5 bg-light">
    <div class="container">
      <div class="row">
        <div class="col-12 col-md-4 col-lg-3">
          <NodeSidebar />
        </div>

        <div class="col-12 col-md-8 col-lg-9">
          <div class="container">
            <div class="row mb-2">
              <div class="col-6">
                <h4 class="">Results</h4>
                <p>Results N of NNN</p>
              </div>

              <div id="tools" class="col-6 d-flex flex-column align-items-end">
                <h4 class="h5">Tools</h4>
                <div
                  class="btn-group"
                  role="group"
                  aria-label="Button group with nested dropdown"
                >
                  <!-- <button type="button" class="btn btn-outline-dark">1</button>
                  <button type="button" class="btn btn-outline-dark">2</button> -->

                  <div class="btn-group" role="group">
                    <button
                      type="button"
                      class="btn btn-outline-dark dropdown-toggle"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Sort
                    </button>
                    <ul class="dropdown-menu">
                      <li>
                        <a class="dropdown-item" href="#">Name</a>
                      </li>
                      <li>
                        <a class="dropdown-item" href="#">Size</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="row row-cols-1 row-cols-lg-2 g-3">
              <div class="col" v-for="node in store.libraries" :key="node._id">
                <NodeCard :id="node._id" :node="node" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
