// Declaration
class Node {
  constructor(apiNode) {
    this._id = apiNode._id;
    this.name = apiNode.name;
    this.type = apiNode.type;
    this.categories = apiNode.categories;
    this.tags = apiNode.tags;
    this.arl = apiNode.arl;
    this.ipeds = apiNode.ipeds;
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

class Location {
  constructor(apiLocation) {
    this._id = apiLocation._id;
    this.node = apiLocation.node;
    this.address = apiLocation.address;
    this.postal = apiLocation.postal;
    this.city = apiLocation.city;
    this.state = apiLocation.state;
    this.country = apiLocation.country;
    this.latitude = apiLocation.latitude;
    this.longitude = apiLocation.longitude;
  }
}

class URL {
  constructor(apiURL) {
    this._id = apiURL._id;
    this.node = apiURL.node;
    this.rank = apiURL.rank;
    this.label = apiURL.label;
  }
}

class Visit {
  constructor(apiVisit) {
    this._id = apiVisit;
  }
}

export { Node, Connection, Location, URL, Visit };
