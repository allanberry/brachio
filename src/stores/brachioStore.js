import { defineStore } from "pinia";
import { ref, computed } from "vue";
import axios from 'axios';


export const useBrachioStore = defineStore('brachioStore', {

  state: () => ({
    nodes: [
      // { _id: "a", name: "A" },
      // { _id: "b", name: "B" },
      // { _id: "c", name: "C" },
    ]
  }),
  getters: {},
  actions: {
    async getNodes() {
      const data = JSON.stringify({
        query: `query nodes {
                  nodes(limit:1000,sortBy:NAME_ASC) {
                      _id
                      name
                  }
              }`
      });

      const config = {
        method: 'post',
        url: '/api',
        headers: {
          'content-type': 'application/json',
          'apiKey': import.meta.env.VITE_APIKEY,
        },
        data
      };

      try {
        const response = await axios(config);
        // this.nodes = response.data.data.nodes;
        this.$patch({nodes: response.data.data.nodes})
        // console.log(this)

      } catch (error) {
        console.error(error);
      }
    }
  },

})
