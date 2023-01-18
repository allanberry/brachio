// Declaration
export class Node {
  constructor(id) {
    this.id = id;
    this.type = "org";
    this.connections = [];
    this.categories = [];
    this.tags = [];
    this.locations = [];
    this.urls = [];
    // this.visits = [];
    this.arl = [];
    this.ipeds = [];
  }

  get id() {
    return this.id;
  }

  get type() {
    return this.type;
  }

  get connections() {
    return this.connections;
  }

  // get parents() {
  //   return this.parents;
  // };

  get categories() {
    return this.categories;
  }

  get tags() {
    return this.tags;
  }

  get locations() {
    return this.locations;
  }

  get urls() {
    return this.urls;
  }

  // get wayback_urls() {
  //   return "https://example.com/wayback_url"
  // }

  #fetchVisits() {
    console.log('fetching visits')
  }

  get arl() {
    return this.arl;
  }
  get ipeds() {
    return this.ipeds;
  }
}

