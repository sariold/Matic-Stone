require("dotenv").config({ path: __dirname + "/../.env" });

const w3S = require("web3.storage");
const fs = require("fs");
const token = process.env.web3;

console.log(token);

const images = "../app/client/public/assets/creatures/";
const jsons = "./JSONs/";

async function main() {
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

// Uncomment to upload files to web3.Storage
// main();

async function retrieveFiles(cid) {
  const client = new w3S.Web3Storage({ token });
  const res = await client.get(cid);
  console.log(`Got a response! [${res.status}] ${res.statusText}`);
  if (!res.ok) {
    throw new Error(`failed to get ${cid} - [${res.status}] ${res.statusText}`);
  }

  // console.log(res);
  const files = await res.files();
  // console.log(files);
  for (const file of files) {
    console.log(`"${file.cid}",`);
  }
}

// Uncomment to retrieve files from web3.Storage based on CID
retrieveFiles("bafybeifmgifgi7d27ts3hrg23bk2n33ttq3ydo5dyeduxl6qadrdijtkgq");
