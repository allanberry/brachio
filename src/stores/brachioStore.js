import { defineStore } from "pinia";
import axios from "axios";
// import { Connection, Node, Visit } from "../model";

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
import api_locations from "./datafiles/locations.json";
import api_nodes from "./datafiles/nodes.json";
import api_urls from "./datafiles/urls.json";

class URL {
  constructor(apiUrl) {
    this.url = apiUrl.url;
    this.node = apiUrl.node;
    this.rank = apiUrl.rank;
    this.label = apiUrl.label;

    this.test = "flark";
    this.visits = [];
  }

  // set visits(arr) {
  //   this.visits = arr;
  // }

  // get visits() {
  // return this.getVisitsByUrl(this.url);
  // }

  async fetchVisits() {
    const response = await atlas(q_visits_url_complete, {
      url: this.url,
      limit: 100000,
    });
    this.visits = await response.visits.map(
      (api_visit) => new Visit(api_visit)
    );
  }
}

// class Location {
//   constructor(apiLocation) {
//     this._id = apiLocation._id;
//     this.node = apiLocation.node;
//     this.address = apiLocation.address;
//     this.postal = apiLocation.postal;
//     this.city = apiLocation.city;
//     this.state = apiLocation.state;
//     this.country = apiLocation.country;
//     this.latitude = apiLocation.latitude;
//     this.longitude = apiLocation.longitude;
//   }
// }

class Connection {
  constructor(apiConnection) {
    this._id = apiConnection._id;
    this.subject = apiConnection.subject;
    this.predicate = apiConnection.predicate;
    this.dobject = apiConnection.dobject;
  }
}

class Node {
  constructor(apiNode) {
    this._id = apiNode._id;
    this.name = apiNode.name;
    this.type = apiNode.type;
    this.categories = apiNode.categories;
    this.tags = apiNode.tags;
    this.arl = apiNode.arl;
    this.ipeds = apiNode.ipeds;

    this.connections = api_connections.filter(
      (conn) => conn.subject === this._id || conn.dobject === this._id
    );
    this.urls = api_urls
      .filter((url) => url.node_id === this._id)
      .map((api_url) => new URL(api_url));

    this.locations = api_locations.filter((loc) => loc.node_id === this._id);

    this.parent_nodes = [];
    this.child_nodes = [];
  }

  set parents(arr) {
    this.parent_nodes = arr;
  }

  get parents() {
    return this.parent_nodes;
  }

  set has_parent(node) {
    this.parent_nodes.push(node);
  }

  set children(arr) {
    this.child_nodes = arr;
  }

  get children() {
    return this.child_nodes;
  }

  set has_child(node) {
    this.child_nodes.push(node);
  }
}

class Visit {
  constructor(apiVisit) {
    this._id = apiVisit._id;
    this.id = apiVisit.id;
    this.url = apiVisit.url;
  }

  get images() {
    return {
      mobile: "",
      "1280x1040": "",
      desktop: "",
    };
  }

  get wayback_url() {
    return "";
  }

  get technologies() {
    return [];
  }
}

export { Node, Connection, Visit };

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
