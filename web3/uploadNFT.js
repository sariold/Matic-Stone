require("dotenv").config({ path: __dirname + "/../.env" });

const w3S = require("web3.storage");
const fs = require("fs");
const token = process.env.web3;
const images = "../app/client/public/assets/creatures/";
const jsons = "./JSONs/";

/**
 * Upload file directory to Web3.storage IPFS server.
 * Returns CID of uploaded directory.
 */
async function uploader() {
  console.log(token);

  if (!token) {
    return console.error(
      "A token is needed. You can create one on https://web3.storage"
    );
  }

  const storage = new w3S.Web3Storage({ token });
  const files = fs.readdirSync(jsons);

  console.log(`Uploading ${files.length} files`);

  const pathFiles = await w3S.getFilesFromPath(jsons);

  console.log(pathFiles);
  const cid = await storage.put(pathFiles);

  console.log(cid);
}

// Uncomment to upload files to Web3.Storage.
// uploader();

/**
 * Retrieve files corresponding to CID from Web3.Storage IPFS server.
 * @param  {string} cid - CID of uploaded directory
 */
async function retrieveFiles(cid) {
  const client = new w3S.Web3Storage({ token });
  const res = await client.get(cid);
  console.log(`Got a response! [${res.status}] ${res.statusText}`);
  if (!res.ok) {
    throw new Error(`failed to get ${cid} - [${res.status}] ${res.statusText}`);
  }

  const files = await res.files();
  for (const file of files) {
    console.log(`"${file.cid}",`);
  }
}

// Uncomment to retrieve files from Web3.Storage based on CID.
// retrieveFiles("bafybeifmgifgi7d27ts3hrg23bk2n33ttq3ydo5dyeduxl6qadrdijtkgq");
