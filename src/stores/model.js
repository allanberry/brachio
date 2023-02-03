import axios from "axios";
import { indexify } from "@/utils";
// import { Connection, Node, Visit } from "../model";

// import q_nodes from "./queries/nodes.graphql?raw";
// import q_connections from "./queries/connections.graphql?raw";
// import q_locations from "./queries/locations.graphql?raw";
// import q_urls from "./queries/urls.graphql?raw";
import q_visits_url_complete from "./queries/visits_url_complete.graphql?raw";
// import q_visits_url_reduced from "./queries/visits_url_reduced.graphql?raw";
// import q_visits_all_basic from "./queries/visits_all_basic.graphql?raw";

import api_arls from "./datafiles/arls.json";
import api_connections from "./datafiles/connections.json";
import api_ipeds from "./datafiles/ipeds.json";
import api_locations from "./datafiles/locations.json";
// import api_nodes from "./datafiles/nodes.json";
import api_urls from "./datafiles/urls.json";

async function atlas(query, variables) {
  try {
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

    const response = await axios(config);

    return response.data.data;
  } catch (error) {
    console.error(error);
  }
}

class Visit {
  constructor(apiVisit) {
    // this._id = apiVisit._id;
    this.id = apiVisit.id;
    this.url = apiVisit.url;

    this.date_accessed = apiVisit.date_accessed;

    this.date_wayback = apiVisit.wayback
      ? apiVisit.wayback.date_available
      : undefined;
    this.url_wayback = apiVisit.wayback
      ? apiVisit.wayback.url_rendered
      : undefined;
    this.url_wayback_raw = apiVisit.wayback
      ? apiVisit.wayback.url_raw
      : undefined;

    this.title = apiVisit.raw ? apiVisit.raw.title : undefined;
    // this.date_last_modified = apiVisit.raw
    //   ? apiVisit.raw["x-archive-orig-last-modified"]
    //   : undefined;
    this.raw_element_qty =
      apiVisit.raw && apiVisit.raw.structure && apiVisit.raw.structure.aggregate
        ? apiVisit.raw.structure.aggregate.elementQty
        : undefined;
    this.raw_length =
      apiVisit.raw && apiVisit.raw.structure && apiVisit.raw.structure.aggregate
        ? apiVisit.raw.structure.aggregate.length
        : undefined;

    this.screenshots = apiVisit.rendered
      ? apiVisit.rendered.screenshots
      : undefined;
    this.styles_length =
      apiVisit.rendered &&
      apiVisit.rendered.styles &&
      apiVisit.rendered.styles.aggregate
        ? apiVisit.rendered.styles.aggregate.length
        : undefined;
    this.scripts_length =
      apiVisit.rendered &&
      apiVisit.rendered.scripts &&
      apiVisit.rendered.scripts.aggregate
        ? apiVisit.rendered.scripts.aggregate.length
        : undefined;
    this.anchors =
      apiVisit.rendered &&
      apiVisit.rendered.anchors &&
      apiVisit.rendered.anchors
        ? apiVisit.rendered.anchors.list
        : undefined;

    this.metrics_frames =
      apiVisit.rendered &&
      apiVisit.rendered.metrics &&
      apiVisit.rendered.metrics.puppeteer
        ? apiVisit.rendered.metrics.puppeteer.Frames
        : undefined;
    this.metrics_documents =
      apiVisit.rendered &&
      apiVisit.rendered.metrics &&
      apiVisit.rendered.metrics.puppeteer
        ? apiVisit.rendered.metrics.puppeteer.Documents
        : undefined;
    this.metrics_nodes =
      apiVisit.rendered &&
      apiVisit.rendered.metrics &&
      apiVisit.rendered.metrics.puppeteer
        ? apiVisit.rendered.metrics.puppeteer.Nodes
        : undefined;

    this.metrics_performance =
      apiVisit.analysis &&
      apiVisit.analysis.lighthouse &&
      apiVisit.analysis.lighthouse.data.categories.performance
        ? apiVisit.analysis.lighthouse.data.categories.performance.score
        : undefined;
    this.metrics_accessibility =
      apiVisit.analysis &&
      apiVisit.analysis.lighthouse &&
      apiVisit.analysis.lighthouse.data.categories.accessibility
        ? apiVisit.analysis.lighthouse.data.categories.accessibility.score
        : undefined;
    this.metrics_best_practices =
      apiVisit.analysis &&
      apiVisit.analysis.lighthouse &&
      apiVisit.analysis.lighthouse.data.categories.bestPractices
        ? apiVisit.analysis.lighthouse.data.categories.bestPractices.score
        : undefined;

    this.technologies.wappalyzer;
    this.technologies.builtwith;

    this.metrics_styles_colors =
      apiVisit.analysis &&
      apiVisit.analysis.analyzecss &&
      apiVisit.analysis.analyzecss.data
        ? apiVisit.analysis.analyzecss.data.colors
        : undefined;
    this.metrics_styles_comments =
      apiVisit.analysis &&
      apiVisit.analysis.analyzecss &&
      apiVisit.analysis.analyzecss.data
        ? apiVisit.analysis.analyzecss.data.comments
        : undefined;
    this.metrics_styles_commentsLength =
      apiVisit.analysis &&
      apiVisit.analysis.analyzecss &&
      apiVisit.analysis.analyzecss.data
        ? apiVisit.analysis.analyzecss.data.commentsLength
        : undefined;
    this.metrics_styles_oldIEFixes =
      apiVisit.analysis &&
      apiVisit.analysis.analyzecss &&
      apiVisit.analysis.analyzecss.data
        ? apiVisit.analysis.analyzecss.data.oldIEFixes
        : undefined;
    this.metrics_styles_imports =
      apiVisit.analysis &&
      apiVisit.analysis.analyzecss &&
      apiVisit.analysis.analyzecss.data
        ? apiVisit.analysis.analyzecss.data.imports
        : undefined;
    this.metrics_styles_importants =
      apiVisit.analysis &&
      apiVisit.analysis.analyzecss &&
      apiVisit.analysis.analyzecss.data
        ? apiVisit.analysis.analyzecss.data.importants
        : undefined;
    this.metrics_styles_mediaQueries =
      apiVisit.analysis &&
      apiVisit.analysis.analyzecss &&
      apiVisit.analysis.analyzecss.data
        ? apiVisit.analysis.analyzecss.data.mediaQueries
        : undefined;
    this.metrics_styles_parsingErrors =
      apiVisit.analysis &&
      apiVisit.analysis.analyzecss &&
      apiVisit.analysis.analyzecss.data
        ? apiVisit.analysis.analyzecss.data.parsingErrors
        : undefined;
    this.metrics_styles_qualifiedSelectors =
      apiVisit.analysis &&
      apiVisit.analysis.analyzecss &&
      apiVisit.analysis.analyzecss.data
        ? apiVisit.analysis.analyzecss.data.qualifiedSelectors
        : undefined;
    this.metrics_styles_selectors =
      apiVisit.analysis &&
      apiVisit.analysis.analyzecss &&
      apiVisit.analysis.analyzecss.data
        ? apiVisit.analysis.analyzecss.data.selectors
        : undefined;
    this.metrics_styles_length =
      apiVisit.analysis &&
      apiVisit.analysis.analyzecss &&
      apiVisit.analysis.analyzecss.data
        ? apiVisit.analysis.analyzecss.data.length
        : undefined;
    this.metrics_styles_rules =
      apiVisit.analysis &&
      apiVisit.analysis.analyzecss &&
      apiVisit.analysis.analyzecss.data
        ? apiVisit.analysis.analyzecss.data.rules
        : undefined;
    this.metrics_styles_declarations =
      apiVisit.analysis &&
      apiVisit.analysis.analyzecss &&
      apiVisit.analysis.analyzecss.data
        ? apiVisit.analysis.analyzecss.data.declarations
        : undefined;
    this.metrics_scripts_maintainability =
      apiVisit.analysis &&
      apiVisit.analysis.escomplex &&
      apiVisit.analysis.escomplex.data
        ? apiVisit.analysis.escomplex.data.maintainability
        : undefined;
    this.metrics_scripts_sloc =
      apiVisit.analysis &&
      apiVisit.analysis.escomplex &&
      apiVisit.analysis.escomplex.data &&
      apiVisit.analysis.escomplex.data.sloc
        ? apiVisit.analysis.escomplex.data.sloc.logical
        : undefined;
    this.metrics_scripts_halstead_difficulty =
      apiVisit.analysis &&
      apiVisit.analysis.escomplex &&
      apiVisit.analysis.escomplex.data &&
      apiVisit.analysis.escomplex.data.halstead
        ? apiVisit.analysis.escomplex.data.halstead.difficulty
        : undefined;
    this.metrics_scripts_halstead_bugs =
      apiVisit.analysis &&
      apiVisit.analysis.escomplex &&
      apiVisit.analysis.escomplex.data &&
      apiVisit.analysis.escomplex.data.halstead
        ? apiVisit.analysis.escomplex.data.halstead.bugs
        : undefined;
    this.metrics_scripts_halstead_effort =
      apiVisit.analysis &&
      apiVisit.analysis.escomplex &&
      apiVisit.analysis.escomplex.data &&
      apiVisit.analysis.escomplex.data.halstead
        ? apiVisit.analysis.escomplex.data.halstead.effort
        : undefined;
    this.metrics_scripts_halstead_length =
      apiVisit.analysis &&
      apiVisit.analysis.escomplex &&
      apiVisit.analysis.escomplex.data &&
      apiVisit.analysis.escomplex.data.halstead
        ? apiVisit.analysis.escomplex.data.halstead.length
        : undefined;
    this.metrics_scripts_halstead_vocabulary =
      apiVisit.analysis &&
      apiVisit.analysis.escomplex &&
      apiVisit.analysis.escomplex.data &&
      apiVisit.analysis.escomplex.data.halstead
        ? apiVisit.analysis.escomplex.data.halstead.vocabulary
        : undefined;
    this.metrics_scripts_halstead_volume =
      apiVisit.analysis &&
      apiVisit.analysis.escomplex &&
      apiVisit.analysis.escomplex.data &&
      apiVisit.analysis.escomplex.data.halstead
        ? apiVisit.analysis.escomplex.data.halstead.volume
        : undefined;
    this.metrics_scripts_halstead_time =
      apiVisit.analysis &&
      apiVisit.analysis.escomplex &&
      apiVisit.analysis.escomplex.data &&
      apiVisit.analysis.escomplex.data.halstead
        ? apiVisit.analysis.escomplex.data.halstead.time
        : undefined;
  }

  // get screenshots() {
  //   if (this.screenshots) {
  //     return this.screenshots.map(
  //       (path) =>
  //         `https://bcw-images.s3.us-west-1.amazonaws.com/brachio/visits/${path}`
  //     );
  //   }
  //   return [];
  // }

  pics(width = 500, height) {
    function url(path) {
      const path_encoded = encodeURIComponent(`brachio/visits/${path}`);
      return `https://vim9ip3utf.execute-api.us-west-1.amazonaws.com/latest/iiif/2/${path_encoded}/full/${width},${
        height ? height : ""
      }/0/default.png`;
    }

    if (this.screenshots) {
      return {
        mobile: url(this.screenshots.find((pic) => pic.match("w320.png"))),
        tablet: url(this.screenshots.find((pic) => pic.match("w640.png"))),
        desktop: url(this.screenshots.find((pic) => pic.match("w1280.png"))),
      };
    }
    return {};
  }

  // get screenshots_iiif() {
  //   if (this.screenshots) {
  //     return this.screenshots.map((path) => {
  //       // format: https://vim9ip3utf.execute-api.us-west-1.amazonaws.com/latest/iiif/2/test%2Fuic.png/full/300,/0/default.png
  //       const path_encoded = encodeURIComponent(`brachio/visits/${path}`);
  //       return `https://vim9ip3utf.execute-api.us-west-1.amazonaws.com/latest/iiif/2/${path_encoded}/full/300,/0/default.png`;
  //     });
  //   }
  //   return [];
  // }

  get wayback_url() {
    return "";
  }

  get technologies() {
    return [];
  }
}

class URL {
  constructor(apiUrl) {
    this.url = apiUrl.url;
    this.node = apiUrl.node;
    this.rank = apiUrl.rank;
    this.label = apiUrl.label;

    this.visits = [];
  }

  async fetchVisits() {
    try {
      const response = await atlas(q_visits_url_complete, {
        url: this.url,
        limit: 100000,
      });
      this.visits = await response.visits.map(
        (api_visit) => new Visit(api_visit)
      );
    } catch (error) {
      console.error(error);
    }
  }
}

class Location {
  constructor(apiLocation) {
    this._id = apiLocation.node_id;
    this.node = apiLocation.node_id;
    this.address = apiLocation.address;
    this.postal = apiLocation.postal;
    this.city = apiLocation.city;
    this.state = apiLocation.state;
    this.country = apiLocation.country;
    this.latitude = apiLocation.latitude;
    this.longitude = apiLocation.longitude;
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

class Node {
  constructor(apiNode) {
    this._id = apiNode._id;
    this.name = apiNode.name;
    this.type = apiNode.type;
    this.categories = apiNode.categories;
    this.tags = apiNode.tags;

    this.arl = api_arls.find((arl) => arl._id === apiNode.arl_id);
    this.ipeds = api_ipeds.find((ipeds) => ipeds._id === apiNode.iped_id);

    this.connections = api_connections.filter(
      (conn) => conn.subject === this._id || conn.dobject === this._id
    );
    this.urls = api_urls
      .filter((url) => url.node_id === this._id)
      .map((api_url) => new URL(api_url));

    this.locations = api_locations
      .filter((loc) => loc.node_id === this._id)
      .map((api_loc) => new Location(api_loc));

    this.parent_nodes = [];
    this.child_nodes = [];

    this.search_target = indexify(this.name.concat(this._id, this.type), {
      replacement: "",
      lower: true,
    });
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

export { Visit, URL, Location, Connection, Node };
