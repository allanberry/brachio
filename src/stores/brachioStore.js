import { defineStore } from "pinia";
import { Visit, URL, Location, Connection, Node } from "./model";

// import api_arls from "./datafiles/arls.json";
import api_connections from "./datafiles/connections.json";
// import api_ipeds from "./datafiles/ipeds.json";
// import api_locations from "./datafiles/locations.json";
import api_nodes from "./datafiles/nodes.json";
// import api_urls from "./datafiles/urls.json";

export const useBrachioStore = defineStore("brachioStore", {
  state: () => ({
    nodes: [],
    connections: [],

    pager: {
      cursor: 0,
      qty: 25,
      sort: "name",
    },
  }),
  getters: {
    libraries() {
      return this.nodes
        .filter((node) => node.categories && node.categories[0] === "library")
        .sort((a, b) => a[this.pager.sort] > b[this.pager.sort]);
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
  },
});
