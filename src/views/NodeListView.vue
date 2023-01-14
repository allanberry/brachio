<script setup>
// import { ref } from "vue";
import NodeCard from "../components/NodeCard.vue";
import NodeSidebar from "../components/NodeSidebar.vue";
import NodeListPagination from "../components/NodeListPagination.vue";
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
          <h4 class="">Results</h4>

          <div v-if="store.nodes && store.nodes.length > 0">

            <form id="tools_pre_content" class="row mb-3">
              <div class="col">
                <h5 class="visually-hidden">Results Tools, pre-content</h5>

                <span>Results N of NNN</span>

                

                <div class="mb-3">
                  <label for="qty_select">Sort By</label>
                  <select id="qty_select" class="form-select">
                    <option selected>Sort</option>
                    <option value="name">Name</option>
                    <option value="size">Size</option>
                  </select>
                </div>

                <div class="mb-3">
                  <label for="qty_select">Choose a Quantity</label>
                  <select id="qty_select" class="form-select">
                    <option selected>Qty</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                  </select>
                </div>

                <NodeListPagination />

              </div>
            </form>

            <div id="content" class="row row-cols-1 row-cols-lg-2 g-3">
              <div class="col" v-for="node in store.nodes" :key="node._id">
                <NodeCard :id="node._id" :node="node" />
              </div>
            </div>

            <form id="tools_post_content" class="row mb-3 mt-3">
              <div class="col">
                <h5 class="visually-hidden">Results Tools, post-content</h5>
                <NodeListPagination />
              </div>
            </form>

          </div>
          <p v-else>loading...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
select.form-select {
  // width: unset;
}
</style>
