const axios = require("axios");
const ipfs = require("./src/utils/ipfs");

const pool = ipfs.pool.sort(() => Math.random() - 0.5);

for (let i = 0; i < 30; i++) {
  axios.get(`https://${pool[i]}.ipfs.dweb.link/`).then((resp) => {
    console.log(resp.data["attributes"]);
  });
}
