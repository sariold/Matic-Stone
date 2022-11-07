require("dotenv").config();

const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");

var Bottleneck = require("bottleneck/es5");

var creatures = [
  ["ALIENS.png", 3],
  ["ARCHERESS.png", 2],
  ["ASIMO.png", 2],
  ["ATHENA.png", 4],
  ["BATTLE ORC (1).png", 3],
  ["BATTLE ORC (2).png", 3],
  ["BATTLE ORC.png", 3],
  ["CERBERUS (1).png", 2],
  ["CERBERUS.png", 2],
  ["COVEN.png", 3],
  ["DEMOGORGON.png", 5],
  ["DOC CROC.png", 2],
  ["DRAGON.png", 5],
  ["DROIDS.png", 2],
  ["ELVES.png", 2],
  ["HEIMDALL.png", 3],
  ["HELLFIRE.png", 2],
  ["ICARUS.png", 2],
  ["iROBOT.png", 1],
  ["KNIGHTED HORSE.png", 4],
  ["NINJA 2077.png", 1],
  ["ODYSSEY.png", 3],
  ["PHANTOMS.png", 3],
  ["ROBOREX (1).png", 4],
  ["ROBOREX.png", 4],
  ["SERPENTINE (1).png", 3],
  ["SERPENTINE.png", 3],
  ["SPACE OCTOPUS.png", 3],
  ["STUART BIG.png", 2],
  ["TERMINATOR.png", 3],
  ["UNDEAD ARMY.png", 4],
  ["UNDERWORLD.png", 2],
  ["VECNA (1).png", 4],
  ["VECNA.png", 4],
  ["WITCH.png", 2],
];

const limiter = new Bottleneck({
  minTime: 333,
});

const pinFileToIPFS = async (fileName) => {
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
  let data = new FormData();
  data.append(
    "file",
    fs.createReadStream("../app/client/public/assets/creatures/" + fileName)
  );
  const res = await axios.post(url, data, {
    maxContentLength: "Infinity",
    headers: {
      "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
      pinata_api_key: process.env.pinataApiKey,
      pinata_secret_api_key: process.env.pinataSecretApiKey,
    },
  });
  console.log(res.data["IpfsHash"]);
  return res.data["IpfsHash"];
};

creatures.forEach(async (creature) => {
  console.log(creature[0]);
  const res = await limiter.schedule(() => pinFileToIPFS(creature[0]));
  creature.push(res);
});

console.log(creatures);
