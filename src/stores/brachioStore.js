import { defineStore } from "pinia";
import axios from "axios";
import { Connection, Node, Visit } from "../model";

// import q_nodes from "./queries/nodes.graphql?raw";
import q_connections from "./queries/connections.graphql?raw";
// import q_locations from "./queries/locations.graphql?raw";
// import q_urls from "./queries/urls.graphql?raw";
import q_visits_url_complete from "./queries/visits_url_complete.graphql?raw";
import q_visits_url_reduced from "./queries/visits_url_reduced.graphql?raw";
import q_visits_all_basic from "./queries/visits_all_basic.graphql?raw";

// import arls from "./datafiles/arls.json";
import api_connections from "./datafiles/connections.json";
// import ipeds from "./datafiles/ipeds.json";
// import locations from "./datafiles/locations.json";
import api_nodes from "./datafiles/nodes.json";
// import urls from "./datafiles/urls.json";

async function atlas(query, variables) {
  const data = JSON.stringify({ query, variables });

  const config = {
    method: "post",
    url: "/api",
    headers: {
      "content-type": "application/json",
      apiKey: import.meta.env.VITE_ATLAS_APIKEY,
    },
    data,
  };

  try {
    const response = await axios(config);

    return response.data.data;
  } catch (error) {
    console.error(error);
  }
}

async function local(query, variables) {
  return [];
}

export const useBrachioStore = defineStore("brachioStore", {
  state: () => ({
    nodes: [],
    connections: [],
    // visits: [],
  }),
  getters: {
    libraries() {
      return this.nodes.filter(
        (node) => node.categories && node.categories[0] === "library"
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

export { atlas };
