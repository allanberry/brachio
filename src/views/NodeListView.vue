<script>
import { atlas, thumbnail_url, iiif_url } from "@/utils";
import q_snapshots from "@/stores/queries/snapshots.graphql?raw";

import NodeCard from "../components/NodeCard.vue";
import NodeSidebar from "../components/NodeSidebar.vue";
import NodeListResultsTools from "../components/NodeListResultsTools.vue";

// import { Snapshot } from "@/stores/model.js";

import { useBrachioStore } from "@/stores/brachioStore";
const store = useBrachioStore();

export default {
  components: {
    NodeCard,
    NodeSidebar,
    NodeListResultsTools,
  },
  data() {
    return {};
  },
  computed: {
    paged_libraries() {
      return store.libraries.slice(
        store.pager.cursor,
        store.pager.cursor + store.pager.qty
      );
    },
  },
  methods: {
    async fetch_snapshots() {
      try {
        // get all urls from paged libraries.  Some are for the same node.
        const urls = this.paged_libraries
          .reduce((acc, lib) => acc.concat(lib.urls), [])
          .map((url) => url.url);

        // console.log({ urls });

        // get brief visits from api
        const response = await atlas(q_snapshots, {
          urls,
        });

        // console.log({ response })

        // get unique nodes for these urls
        const nodes = [
          ...new Set(
            urls.map((url) =>
              store.nodes.find((node) =>
                node.urls.map((url) => url.url).includes(url)
              )
            )
          ),
        ];

        // get all visits to each url
        const url_visit_sets = urls
          .map((url) => response.visits.filter((visit) => visit.url === url))
          // remove empty sets
          .filter((url_visit_set) => url_visit_set.length)
          // sort within by date (embedded in id)
          .map((url_visit_set) => url_visit_set.sort((a, b) => a.id < b.id));

        nodes.forEach((node) => {
          if (!store.snapshots[node.id]) {
            // get first url by rank; otherwise, pick shortest url
            const url = node.urls.sort((a, b) => {
              if (a.rank && b.rank) {
                return a.rank > b.rank;
              } else {
                return a.url.length > b.url.length;
              }
            })[0];

            // console.log(url);

            // find a matching set of urls, i.e. sharing a url
            const visit_set = url_visit_sets.find((row) =>
              row.find((col) => col.url === url.url)
            );

            // not all nodes have visits
            if (visit_set) {
              // console.log({
              //   screenshot: iiif_url(visit_set[0].rendered.screenshots[1], 500),
              //   node,
              // });

              const snapshot = {
                thumbnail: {
                  placeholder: false,
                  img: thumbnail_url(visit_set[0].id),
                  alt: "This is a screenshot thumbnail of a webpage visit.",
                },
              };

              // console.log('yep')

              store.snapshots[node._id] = snapshot;
            }
          }
        });

        // select first visit_set, convert into snapshot, save to node

        // in node.url.urls
        // visit_set.url

        // const url = url_visit_sets

        // node.has_snapshot = {
        //   thumbnail: {
        //     img: "/src/assets/brachiosaurus-thumbnail.svg",
        //     alt: "This is a placeholder image, a silhouette of a brachiosaurus.",
        //   },
        // };

        // console.log({ nodes, url_visit_sets });

        // nodes.forEach((node) => {});

        // console.log(asdf);
        // if (node && visit) {

        // }

        // console.log({urls, response})

        // return response;
      } catch (error) {
        console.error(error);
      }
    },
  },
  async mounted() {
    await this.fetch_snapshots();
  },
  async updated() {
    await this.fetch_snapshots();
  },
};
</script>

<template>
  <section class="container">
    <div class="row py-lg-5">
      <div class="col">
        <h1 class="fw-light">Libraries</h1>
        <p>Here are a bunch of Libraries.</p>
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

  <div class="album pb-5 bg-light">
    <div class="container">
      <div class="row">
        <div class="col-12 col-md-4 col-lg-3">
          <NodeSidebar />
        </div>

        <div class="col-12 col-md-8 col-lg-9">
          <h3 class="pt-5">Results</h3>

          <div v-if="paged_libraries && paged_libraries.length > 0">
            <NodeListResultsTools
              placement="precontent"
              title="Results Tools, pre-content"
            />

            <div id="content" class="row row-cols-1 row-cols-lg-2 g-4 mb-4">
              <div
                class="col"
                v-for="library in paged_libraries"
                :key="library._id"
              >
                <NodeCard :node="library" />
              </div>
            </div>

            <NodeListResultsTools
              placement="postcontent"
              title="Results Tools, post-content"
            />
          </div>
          <p v-else>loading...</p>
        </div>
      </div>
    </div>
  </div>
</template>
