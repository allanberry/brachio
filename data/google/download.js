// Downloads stuff from Google for ingest.  Someday I should really automate this and clean up this monster.
// Cheers, -AB:
// 2023-02-07

require("dotenv").config({path: '../.env'});

const auth = require("./google/auth");
const { google } = require("googleapis");
const fs = require("fs");
const csv = require("csv");

const raw_dir = "./from_google";

(async () => {
  try {
    const projectId = "brachio-377202";
    const spreadsheetId = "1OdZDH3dv0p4joNfzL2__MuZTys4wZUtm_weE8aRMFZM"; // Google Sheet "Apato"
    const tabs = ["nodes", "connections", "locations", "urls", "ipeds", "arl"]; // Tabs to download
    // const logger = setup_logger("data"); // log file
    const credentials = `${__dirname}/google/credentials.json`;

  } catch (err) {
    console.error(err);
  }
})();
