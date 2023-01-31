import locations from "./stores/datafiles/locations.json";
import urls from "./stores/datafiles/urls.json";
import connections from "./stores/datafiles/connections.json";

// Declaration
class Node {
  constructor(apiNode, nodes) {
    this._id = apiNode._id;
    this.nodes = nodes;
    this.name = apiNode.name;
    this.type = apiNode.type;
    this.categories = apiNode.categories;
    this.tags = apiNode.tags;
    this.arl = apiNode.arl;
    this.ipeds = apiNode.ipeds;

    this.connections = connections.filter(
      (conn) => conn.subject === this._id || conn.dobject === this._id
    );
    this.urls = urls.filter((url) => url.node_id === this._id);
    this.locations = locations.filter((loc) => loc.node_id === this._id);
  }

  get parents() {
    const parent_connections = this.connections.filter(
      (conn) => conn.subject === this._id && conn.predicate === "has_parent"
    );

    return this.nodes.filter((store_node) => {
      // console.log({store_node: store_node._id, pc: parent_connections[0].subject});

      return parent_connections.find((conn) => {
        return conn.dobject === store_node._id;
      });
    });
  }

  get location_primary() {
    return {};
  }
  get url_primary() {
    return "";
  }
  get visit_primary() {
    return {};
  }
  get technologies() {
    return [];
  }

  get stats() {
    return {
      // the following perhaps duplicate for mean and latest stats
      site_js_complexity: 123,
      site_js_maintainability: 123,
      site_js_sloc: 123,
      site_css_rule_count: 123,
      site_html_element_count: 123,
      site_accessibility: 123,
      site_best_practices: 123,
      site_performance: 123,

      library_gate_count: 123,
      library_volumes: 123,

      parent_endowment: 123,
      parent_enrollment: 123,
    };
  }

  get statsMean() {
    return {};
  }
}

class Visit {
  constructor(apiVisit) {
    this._id = apiVisit._id;
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

class Connection {
  constructor(apiConnection) {
    this._id = apiConnection._id;
    this.subject = apiConnection.subject;
    this.predicate = apiConnection.predicate;
    this.dobject = apiConnection.dobject;
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

// class URL {
//   constructor(apiURL) {
//     this._id = apiURL._id;
//     this.node = apiURL.node;
//     this.rank = apiURL.rank;
//     this.label = apiURL.label;
//   }
// }

export { Node, Connection, Visit };
