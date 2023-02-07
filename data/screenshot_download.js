// Downloads a series of image files from S3, based on data pulled from GraphQL api.
// just kind of a one-off, but maybe useful in the future.
// Cheers, -AB:
// 2023-02-06

// import Downloader from "nodejs-file-downloader";
const Downloader = require("nodejs-file-downloader");
const visit_data = require("./from_atlas/visits_screenshots.json");

(async () => {
  for (const visit of visit_data.data.visits.reverse()) {
    for (const size of ["w640", "w1280", "w320"]) {
      // works: 'https://bcw-images.s3.us-west-1.amazonaws.com/brachio/visits/v1_0/org_vahistorical_1921436596_20150104084203/w1280.png'

      const visit_id = visit.id;
      // const visit_id = 'org_vahistorical_1921436596_20150104084203'

      const url = `https://bcw-images.s3.us-west-1.amazonaws.com/brachio/visits/v1_0/${visit_id}/${size}.png`;

      const downloader = new Downloader({
        // url: `https://bcw-images.s3.us-west-1.amazonaws.com/brachio/visits/v1_0/${visit.id}/w1280.png`, //If the file name already exists, a new file with the name 200MB1.zip is created.
        url, //If the file name already exists, a new file with the name 200MB1.zip is created.

        directory: "./screenshot_downloads", //This folder will be created, if it doesn't exist.
        cloneFiles: false,
        skipExistingFileName: true,
        fileName: `${visit_id}-${size}.png`,
      });

      try {
        const { filePath, downloadStatus } = await downloader.download();
        console.log({ id: visit.id, url });
        // console.log("All done");
      } catch (error) {
        console.error("Download failed", { id: visit.id, error });
      }
    }
  }
})();

// visit_id e.g. : "edu_uic_library_3755366938_20210308185854"
function s3_visit(visit_id) {
  const visit = {
    id: visit_id,
    visit_data: {
      url: `https://bcw-images.s3.us-west-1.amazonaws.com/brachio/visits/v1_0/${visit_id}/visit.json`,
      s3_path: "v1_0/edu_uic_library_3755366938_20210308185854/visit.json",
      s3_url: `s3://bcw-images/brachio/visits/v1_0/${visit_id}/visit.json`,
    },
    screenshots: {
      w640: this.screenshot_url("w640"),
      w1280: this.screenshot_url("w1280"),
      w320: this.screenshot_url("w320"),
    },
    screenshot_url: (dimensions) =>
      `https://bcw-images.s3.us-west-1.amazonaws.com/brachio/visits/v1_0/${visit_id}/${dimensions}.png`,
  };
}

//  destination-prefix/source-bucket/config-ID/YYYY-MM-DDTHH-MMZ/manifest.json
//  destination-prefix/source-bucket/config-ID/YYYY-MM-DDTHH-MMZ/manifest.checksum
//  destination-prefix/source-bucket/config-ID/hive/dt=YYYY-MM-DD-HH-MM/symlink.txt

// destination-prefix/source-bucket/config-ID/data/example-file-name.csv.gz

// v1_0/org_vahistorical_1921436596_20150104084203/w640.png
// https://bcw-images.s3.us-west-1.amazonaws.com/brachio/visits/v1_0/org_vahistorical_1921436596_20150104084203/w640.png
