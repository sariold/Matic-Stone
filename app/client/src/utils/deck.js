import * as cardClass from "../utils/card";

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

var creatures = [
	["archer.jpeg", 2, 2, 2],
	["battle_orc.jpeg", 2, 1, 2],
	["bloodshot.jpeg", 2, 1, 2],
	["demogorgon.jpeg", 5, 3, 5],
	["ninja_2077.jpeg", 3, 3, 1],
	["roborex.jpeg", 5, 5, 3],
	["serpentine.jpeg", 2, 3, 1],
	["terminator.jpeg", 4, 4, 3],
	["undead_army.jpeg", 5, 4, 4],
];

export async function randomDeck() {
	let cards = [];
	for (let i = 0; i < 20; i++) {
		let array = creatures[Math.floor(Math.random() * creatures.length)];
		let name = array[0];
		let img = "/assets/creatures/" + name;
		let mana = array[1];
		let health = array[2];
		let damage = array[3];

		let creature = new cardClass.Creature(name, img, mana, health, damage);
		cards.push(creature);
	}
	return cards;
}

export async function shuffleDeck(cards) {
	return [...cards]
		.sort(() => Math.random() - 0.5)
		.map((card) => ({ ...card, id: Math.random() * Math.random() }));
}
