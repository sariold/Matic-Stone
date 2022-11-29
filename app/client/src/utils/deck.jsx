import * as cardClass from "./card";

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

export async function buildDeck(ingredients) {
  // console.log(ingredients);
  let cards = [];
  for (let i = 0; i < ingredients.length; i++) {
    // console.log(i);
    let array = ingredients[i];
    let name = array[0];
    let img =
      process.env.REACT_APP_HOMEPAGE + "assets/creatures/" + name + ".png";
    let mana = array[1];
    let damage = array[2];
    let health = array[3];
    let creature = new cardClass.Creature(name, img, mana, damage, health);
    // console.log(creature);
    cards.push(creature);
  }
  return cards;
}

export async function randomDeck() {
  let cards = [];
  for (let i = 0; i < 30; i++) {
    let array = creatures[Math.floor(Math.random() * creatures.length)];
    let name = array[0];
    let img = process.env.REACT_APP_HOMEPAGE + "assets/creatures/" + name;
    let mana = array[1];
    let health = Math.floor(Math.random() * Number(mana)) + 1;
    let damage = Math.floor(Math.random() * Number(mana)) + 1;

    let creature = new cardClass.Creature(name, img, mana, damage, health);
    cards.push(creature);
  }
  return cards;
}

export async function shuffleDeck(cards) {
  return [...cards]
    .sort(() => Math.random() - 0.5)
    .map((card) => ({
      ...card,
      id:
        Date.now().toString(36) +
        Math.floor(
          Math.pow(10, 12) + Math.random() * 9 * Math.pow(10, 12)
        ).toString(36),
    }));
}
