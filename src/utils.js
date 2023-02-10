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
  return `https://bcw-images.s3.us-west-1.amazonaws.com/brachio/visits/2000x500/${visit_id}.png`;
}

// common filters for Technologies
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

export { indexify, atlas, iiif_url, thumbnail_url, tech_filter };
