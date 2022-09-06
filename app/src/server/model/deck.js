import * as cardClass from "./card.js";

/**
 * Abstract Deck class
 * @param cards The collection of cards to construct the deck
 */
export class Deck {
	cards = []; // TODO: change to an array list of cards

	constructor(cards) {
		this.cards = cards;
	}

	shuffle() {} // TODO: create shuffle method

	drawCard() {} // TODO: create draw card and insert method

	getCount() {} // TODO: create method to return number of cards
}

/**
 * Hand deck class
 */
export class Hand extends Deck {
	viewHand() {} // TODO: create view card method

	viewCard() {} // TODO: create view card method

	addCard() {} // TODO: create insert card method

	discardCard() {} // TODO: create discard card method
}

/**
 * Discarded deck class
 */
export class Discarded extends Deck {
	/**
	 * @param {*} card The card to be added to the discard deck
	 */
	addCard(card) {
		this.setStatus(card);
		this.cards.push(card);
	}

	/**
	 * @param {*} card The card to be updated with discarded status
	 */
	setStatus(card) {
		card.setDiscarded(true);
	}
}

let creature = new cardClass.Creature("Dragon", 5, true, 1, 2);
console.log(creature);

let deck = new Deck([creature]);

console.log(deck);

let discard = new Discarded([]);

discard.addCard(creature);

console.log(discard);
