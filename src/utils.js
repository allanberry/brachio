import axios from "axios";
import slugify from "slugify";

import api_technologies from "./stores/datafiles/technologies.json";

// fetch from graphql api
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

// smoosher of strings
function indexify(str) {
  return slugify(str, {
    replacement: "",
    lower: true,
  });
}

// build iiif url
function iiif_url(path, width = 500, height) {
  const path_encoded = encodeURIComponent(`brachio/visits/${path}`);
  return `https://vim9ip3utf.execute-api.us-west-1.amazonaws.com/latest/iiif/2/${path_encoded}/full/${width},${
    height ? height : ""
  }/0/default.png`;
}

// build thumbnail url
function thumbnail_url(visit_id) {
  return `https://bcw-images.s3.us-west-1.amazonaws.com/brachio/visits/1800x360/${visit_id}.png`;
}

// common filters for Technologies
// used both by model of incoming Visit data, but also searching systems in the NodeListView sidebar
function tech_filter(technologies) {
  // const technologies = api_technologies
  //

  const aliases = [];
  return [
    ...new Set(
      technologies
        .filter((tech) => tech.rank)
        .filter((technology) => {
          if (technology.alias) {
            aliases.push(
              api_technologies.find((tech) => {
                return tech.id === technology.alias;
              })
            );
            return false;
          }
          return true;
        })
        .sort((a, b) => a > b)
    ),
  ];
}

// hat tip https://stackoverflow.com/a/16233919/652626
const currency_formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",

  // These options are needed to round to whole numbers if that's what you want.
  minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

export {
  indexify,
  atlas,
  iiif_url,
  thumbnail_url,
  tech_filter,
  currency_formatter,
};
