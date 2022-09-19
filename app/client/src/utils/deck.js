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
