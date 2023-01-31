import { defineStore } from "pinia";
import axios from "axios";
import { Connection, Node } from "../model";

// import q_nodes from "./queries/nodes.graphql?raw";
// import q_connections from "./queries/connections.graphql?raw";
// import q_locations from "./queries/locations.graphql?raw";
// import q_urls from "./queries/urls.graphql?raw";
import q_visits_url_complete from "./queries/visits_url_complete.graphql?raw";
import q_visits_url_reduced from "./queries/visits_url_reduced.graphql?raw";

// import arls from "./datafiles/arls.json";
// import connections from "./datafiles/connections.json";
// import ipeds from "./datafiles/ipeds.json";
// import locations from "./datafiles/locations.json";
import nodes from "./datafiles/nodes.json";
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
    // connections: [],
    visits: [],
  }),
  getters: {
    libraries() {
      return this.nodes.filter(
        (node) => node.categories && node.categories[0] === "library"
      );
    },
    getVisitsByUrl: async (state) => {
      // return (userId) => state.users.find((user) => user.id === userId)
      const visits_in_store = (url) =>
        state.visits.filter((visit) => visit.url === url);

      if (visits_in_store) {
        return visits_in_store;
      } else {
        return await atlas(q_visits_url_complete, {
          url: "https://library.uic.edu/",
          limit: 100000,
        });
      }
    },
    getUrlsByNodeId() {},
    getParentsByNodeId() {},
  },
  actions: {
    async initData() {
      try {
        this.$patch({
          nodes: nodes.map((apiNode) => new Node(apiNode)),
          // connections: connections.map(
          //   (apiConnection) => new Connection(apiConnection)
          // ),
        });
      } catch (error) {
        console.error(error);
      }
    },
  },
});

export { atlas };
