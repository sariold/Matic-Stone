require("dotenv").config();

const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");

var Bottleneck = require("bottleneck/es5");

const limiter = new Bottleneck({
  minTime: 333,
});

var files = fs.readdirSync("JSONs/");

const pinFileToIPFS = async (fileName) => {
//   const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
//   let data = new FormData();
//   data.append("file", fs.createReadStream("JSONs/" + fileName));
//   const res = await axios.post(url, data, {
//     maxContentLength: "Infinity",
//     headers: {
//       "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
//       pinata_api_key: process.env.pinataApiKey,
//       pinata_secret_api_key: process.env.pinataSecretApiKey,
//     },
//   });
//   console.log(res.data["IpfsHash"]);
//   return res.data["IpfsHash"];
// };

files.forEach(async (f) => {
  // const res = await limiter.schedule(() => pinFileToIPFS(f));
});
