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

	viewDeck() {
		console.log(this.cards);
	}

	shuffle() {} // TODO: create shuffle method

	drawCard() {
		return this.cards.shift();
	} // TODO: create draw card and insert method

	getCount() {} // TODO: create method to return number of cards
}

/**
 * Hand deck class
 */
export class Hand extends Deck {
	viewCard() {} // TODO: create view card method

	addCard(card) {
		this.cards.push(card);
	} // TODO: create insert card method

	discardCard(pos) {
		return this.cards.splice(pos, 1);
	} // TODO: create discard card method
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
		console.log(card);
		console.log(card.name);
	}
}

let dragon = new cardClass.Creature("Dragon", 5, true, 1, 2);
let elf = new cardClass.Creature("Elf", 2, false, 4, 1);
let deck = new Deck([dragon, elf]);
deck.viewDeck();

let hand = new Hand([]);
hand.addCard(deck.drawCard());
hand.viewDeck();

let discard = new Discarded([]);
discard.viewDeck();
console.log(hand.discardCard(0));
// discard.addCard(dragon);
// discard.viewDeck();
