import {
  atlas,
  // thumbnail_url,
  // iiif_url,
  tech_filter,
} from "@/utils";
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

const defaults = {
  pins: {
    active: false,
    pinned: [],
  },

  pager: {
    cursor: 0,
    qty: 10,
    sort: "random",
  },

  filters: {
    keyword: "",
    categories: [],
    tags: [],
    technologies: [],
  },
};

function deepclone(object) {
  return JSON.parse(JSON.stringify(object));
}

export const useBrachioStore = defineStore("brachioStore", {
  state: () => ({
    nodes: [],
    connections: [],

    technologies: tech_filter(
      api_technologies.filter((tech) => tech.rank && tech.rank.length)
    ),
    tags: api_tags,
    categories: api_categories.filter(
      (cat) => cat.parent && cat.parent === "library"
    ),
    pins: deepclone(defaults.pins),
    pager: deepclone(defaults.pager),
    filters: deepclone(defaults.filters),
  }),
  getters: {
    // node_current() {
    //   return this.nodes.find((node) => node.current === true)
    // }

    // get all Libraries in the system
    libraries() {
      return (
        this.nodes
          // filter out non-libraries, e.g. university nodes
          .filter((node) => {
            const arr1 = [
              "library_academic",
              "library_public",
              "library_independent",
              "library_museum",
              "library_state",
            ];
            const arr2 = node.categories.map((cat) => cat.id);
            return arr1.some((r) => arr2.includes(r));
          })

          // keyword filter
          .filter((node) => {
            return node.search_target.includes(indexify(this.filters.keyword));
          })

          // category filter
          .filter((node) => {
            // return node.categories
            //   .map((category) => category.id)
            //   .includes("library_public");

            if (this.filters.categories && this.filters.categories.length) {
              const arr1 = this.filters.categories;
              const arr2 = node.categories.map((cat) => cat.id);
              return arr1.some((r) => arr2.includes(r));
            }
            return true;
          })

          // tag filter
          .filter((node) => {
            if (this.filters.tags && this.filters.tags.length) {
              const arr1 = this.filters.tags;
              const arr2 = node.tags.map((cat) => cat.id);
              return arr1.some((r) => arr2.includes(r));
            }
            return true;
          })

          // pins filter
          .filter((node) => {
            if (this.pins.active) {
              if (this.pins.pinned.includes(node._id)) {
                return true;
              }
              return false;
            }
            return true;
          })

          // technology filter
          .filter((node) => {
            // not yet implemented.
            // need to establish client-side relationship?  no data

            // if (this.filters.technologies && node.technologies) {
            //   const arr1 = this.filters.technologies;
            //   const arr2 = node.technologies.map((cat) => cat.id);
            //   return arr1.some((r) => arr2.includes(r));
            // }

            // if (
            //   this.filters.technologies &&
            //   this.filters.technologies.length &&
            //   node.snapshot &&
            //   node.snapshot.technologies &&
            //   node.snapshot.technologies.length
            // ) {
            //   console.log({
            //     filters: this.filters.technologies,
            //     node_snapshot: node.snapshot.technologies,
            //   });
            // }
            return true;
          })

          // sort records
          .sort((node_a, node_b) => {
            // if (this.pager.sort === "xxx") {
            //   return node_a.xxx < node_b.xxx;
            // }

            // default
            return node_a.name < node_b.name;
          })

          // randomize records?
          .sort(() => {
            if (this.pager.sort === "random") {
              return 0.5 - Math.random();
            }
            return true;
          })
      );
    },
    // subset of the above, relevant to those currently on the page
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
          // filters: {
          //   keyword: "chicago",
          // },
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

        // console.log(urls);

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
      this.$patch({
        pager: { cursor: 0 },
      });
    },
    clear_filters() {
      this.$patch({
        pins: deepclone(defaults.pins),
        pager: deepclone(defaults.pager),
        filters: deepclone(defaults.filters),
      });
    },
    select_nodes(id_arr) {
      return this.nodes.filter((node) => {
        if (id_arr.includes(node._id)) {
          return true;
        }
        return false;
      });
    },
  },
});
