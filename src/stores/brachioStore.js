import { atlas, thumbnail_url, iiif_url } from "@/utils";
import q_snapshots from "@/stores/queries/snapshots.graphql?raw";

import { indexify } from "@/utils";

import { defineStore } from "pinia";
import { Connection, Node, Snapshot } from "./model";

import api_nodes from "./datafiles/nodes.json";
import api_connections from "./datafiles/connections.json";
// import api_arls from "./datafiles/arls.json";
// import api_ipeds from "./datafiles/ipeds.json";
// import api_locations from "./datafiles/locations.json";
// import api_urls from "./datafiles/urls.json";
import api_technologies from "./datafiles/technologies.json";
import api_tags from "./datafiles/tags.json";
import api_categories from "./datafiles/categories.json";

export const useBrachioStore = defineStore("brachioStore", {
  state: () => ({
    nodes: [],
    connections: [],

    technologies: api_technologies.filter(
      (tech) => tech.rank && tech.rank.length
    ),
    tags: api_tags,
    categories: api_categories.filter(
      (cat) => cat.parent && cat.parent === "library"
    ),

    pager: {
      cursor: 0,
      qty: 10,
      sort: "name",
    },

    filters: {
      keyword: "",
      // categories: ["library", "academic"],
      // tags: ["arl", "carli", "gwla"],
    },
  }),
  getters: {
    libraries() {
      // console.log(this.nodes.forEach((node) => console.log(node)));

      return (
        this.nodes
          // filter out non-libraries, e.g. university nodes
          .filter(
            (node) => {
              // console.log(node.categories.map((cat) => cat.id).includes('library_academic'))

              const arr1 = [
                "library_academic",
                "library_public",
                "library_museum",
                "library_state",
              ];

              const arr2 = node.categories.map((cat) => cat.id);

              return arr1.some((r) => arr2.includes(r));
            }
            // &&
            // node.categories.includes((category) => {
            //   console.log(category)
            // })
          )

          // keyword filter
          .filter((node) => {
            return node.search_target.includes(indexify(this.filters.keyword));
          })

          // sort results
          .sort((a, b) => a[this.pager.sort] > b[this.pager.sort])
      );
    },
    paged_libraries() {
      return this.libraries.slice(
        this.pager.cursor,
        this.pager.cursor + this.pager.qty
      );
    },
  },
  actions: {
    async init() {
      try {
        // initial node parse
        this.$patch({
          nodes: api_nodes.map((api_node) => {
            const node = new Node(api_node);
            return node;
          }),
          connections: api_connections.map(
            (api_connection) => new Connection(api_connection)
          ),
          filters: {
            keyword: "chicago",
          },
        });

        // store parents and children in nodes
        for (const connection of this.connections) {
          if (connection.predicate === "has_parent") {
            const subject_node = this.nodes.find(
              (node) => node._id === connection.subject
            );

            const dobject_node = this.nodes.find(
              (node) => node._id === connection.dobject
            );

            subject_node.has_parent = dobject_node;
            dobject_node.has_child = subject_node;
          }
        }
      } catch (error) {
        console.error(error);
      }
    },
    async fetch_snapshots(nodes) {
      try {
        // identify a set of urls from a set of nodes, e.g. paged libraries.
        const urls = nodes
          .reduce((acc, lib) => acc.concat(lib.urls), [])
          .map((url) => url.url);

        // fetch brief visits to these urls, in aggregate from Atlas api
        const brief_visits = (
          await atlas(q_snapshots, {
            urls,
          })
        ).visits;

        // associate each visit_set with a node
        nodes.forEach((node) => {
          // collectinto a snapshot for each node
          // first check if a snapshot already exists; abort if so.
          if (!node.snapshot) {
            const visits = brief_visits.filter((visit) =>
              node.urls.map((url) => url.url).includes(visit.url)
            );

            node.snapshot = new Snapshot(node, visits);
          }
        });
      } catch (error) {
        console.error(error);
      }
    },
    reset_pager() {
      this.$patch({ pager: { cursor: 0 } });
    },
  },
});
