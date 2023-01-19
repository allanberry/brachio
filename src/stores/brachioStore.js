import { defineStore } from "pinia";
import axios from "axios";
import { Connection, Node } from "../model";
import { allConnections, allNodes, allLocations, allURLs } from "../queries";

async function fetchAThing(query) {
  const data = JSON.stringify({ query });

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

export const useBrachioStore = defineStore("brachioStore", {
  state: () => ({
    nodes: [],
    connections: [],
    locations: [],
    urls: [],
    visits: [],
  }),
  getters: {
    libraries() {
      return this.nodes.filter(
        (node) => node.categories && node.categories[0] === "library"
      );
    },
  },
  actions: {
    async fetchNodes() {
      try {
        const data = await fetchAThing(allNodes);
        
        const nodes = data.nodes.map((apiNode) => new Node(apiNode));
        this.$patch({ nodes });
      } catch (error) {
        console.error(error);
      }
    },

    async fetchConnections() {
      try {
        const data = await fetchAThing(allConnections);
        const connections = data.connections.map(
          (apiConnection) => new Connection(apiConnection)
        );
        this.$patch({ connections });
      } catch (error) {
        console.error(error);
      }
    },

    async fetchLocations() {
      try {
        const data = await fetchAThing(allLocations);

        // const locations = data.locations.map(
        //   (apiLocation) => new Location(apiLocation)
        // );
        
        this.$patch({ locations: data.locations });
      } catch (error) {
        console.error(error);
      }
    },

    async fetchURLs() {
      try {
        const data = await fetchAThing(allURLs);
        // const urls = data.urls.map((apiURL) => new URL(apiURL));

        this.$patch({ urls: data.urls });
      } catch (error) {
        console.error(error);
      }
    },

    async fetchVisits() {},
  },
});
