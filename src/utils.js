import axios from "axios";
import slugify from 'slugify';

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

export { indexify, atlas};