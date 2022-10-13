import * as cardClass from "./card";

/**
 * Abstract Deck class
 * @param cards The collection of cards to construct the deck
 */
export class Deck {
	cards = [];

	constructor(cards) {
		if (cards) this.cards = cards;
	}

	drawCard() {
		if (this.cards.length > 0) return this.cards.shift();
	}

	getCount() {
		return this.cards.length;
	}

	removeCard(pos) {
		return this.cards.splice(pos, 1)[0];
	}
}

/**
 * Hand deck class
 */
export class Hand extends Deck {
	viewCards() {
		return this.cards;
	}

	viewCard(pos) {
		return this.cards[pos];
	}

	addCard(card) {
		if (card) {
			if (this.cards.length > 6) {
				alert("You have more than 7 cards so first will be removed!");
				this.removeCard(0);
			}
			this.cards.push(card);
		} else alert("You have no more cards");
	}
}

/**
 * Discarded deck class
 */
export class Discard extends Deck {
	addCard(card) {
		this.setStatus(card);
		this.cards.push(card);
	}

	setStatus(card) {
		card.setDiscarded(true);
	}
}

// var creatures = [
// 	["archer.jpeg", 2, 2, 2],
// 	["battle_orc.jpeg", 2, 1, 2],
// 	["bloodshot.jpeg", 2, 1, 2],
// 	["demogorgon.jpeg", 5, 3, 5],
// 	["ninja_2077.jpeg", 3, 3, 1],
// 	["roborex.jpeg", 5, 5, 3],
// 	["serpentine.jpeg", 2, 3, 1],
// 	["terminator.jpeg", 4, 4, 3],
// 	["undead_army.jpeg", 5, 4, 4],
// ];

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

// var homepage = "https://sariold.github.io/Matic-Stone";
var homepage = "";

export async function randomDeck() {
	let cards = [];
	for (let i = 0; i < 60; i++) {
		let array = creatures[Math.floor(Math.random() * creatures.length)];
		let name = array[0];
		let img = homepage + "/assets/creatures/" + name;
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
