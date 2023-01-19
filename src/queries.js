const allNodes = `query nodes {
  nodes(limit: 1000000, sortBy: NAME_ASC) {
    _id
    name
    type
    categories
    tags
    ipeds {
      _id
      core_revenues_DRVF2018
      LTCLLCT_AL2018
      LSALWAGP_DRVAL2018
      LEXPTOT_AL2018
      LSALWAG_AL2018
      LTCRCLT_AL2018
      ADDR_HD2017
      CITY_HD2017
      STABBR_HD2017
      ZIP_HD2017
      LONGITUD_HD2017
      LATITUDE_HD2017
      INSTCAT_HD2017
      INSTSIZE_HD2017
      LOCALE_HD2017
      ENRTOT_DRVEF2017_RV
      SFTELCA_DRVHR2017_RV
    }
    arl {
      _id
      type
      region
      title
      vols
      ebooks
      totexp
      totsal
      totstfx
      totstf
      reftrans
      regsearches
      gatecount
      totstu
    }
  }
}`;

const allConnections = `query connections {
  connections(limit: 1000000) {
    _id
    subject {
      _id
    }
    predicate
    dobject {
      _id
    }
  }
}`;

const allLocations = `query locations {
  locations(limit: 1000000) {
    _id
    node {
      _id
    }
    address
    postal
    city
    state
    country
    latitude
    longitude
  }
}`;

const allURLs = `query urls {
  urls(limit: 1000000) {
    _id
    node { 
      _id
    }   
    rank
    label
  }
}`;

// const oneVisitByID;

// const allVisitsByURL;


export { allConnections, allNodes, allLocations, allURLs };
