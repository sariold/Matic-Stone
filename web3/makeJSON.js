const fs = require("fs");
const ipfsCreatures = require("./ipfsCreatures");

const template = fs.readFileSync("template.json");

let creatures = ipfsCreatures["creatures"];

creatures.forEach((c) => {
  let name = c[0].slice(0, -4);
  let mana = c[1];
  let image = c[2];

  console.log(name, mana, image);

  for (let i = 0; i <= mana; i++) {
    for (let j = 1; j <= mana; j++) {
      let cardJSON = JSON.parse(template);
      cardJSON["image"] = "ipfs://" + c[2];
      cardJSON["name"] = name;
      let attributes = [
        {
          trait_type: "Type",
          value: "Creature",
        },
        {
          trait_type: "Card",
          value: `${name}`,
        },
        {
          trait_type: "Mana",
          value: `${mana}`,
        },
        {
          trait_type: "Damage",
          value: `${i}`,
        },
        {
          trait_type: "Health",
          value: `${j}`,
        },
      ];
      cardJSON["attributes"] = attributes;
      console.log(cardJSON);
      let data = JSON.stringify(cardJSON);
      fs.writeFileSync(
        "JSONs/" + name + "-" + i.toString() + "-" + j.toString() + ".json",
        data
      );
    }
  }
});
