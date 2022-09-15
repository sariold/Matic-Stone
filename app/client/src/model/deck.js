/**
 * Abstract Deck class
 * @param cards The collection of cards to construct the deck
 */
export class Deck {
	cards = [];

	constructor(cards) {
		this.cards = cards;
		this.shuffle();
	}

	shuffle() {
		for (let i = this.cards.length - 1; i > 0; i--) {
			const index = Math.floor(Math.random() * (i + 1));
			const temp = this.cards[index];
			this.cards[index] = this.cards[i];
			this.cards[i] = temp;
		}
	} // TODO: debate shuffle method for another random shuffler

	drawCard() {
		return this.cards.shift();
	}

	getCount() {
		return this.cards.length;
	}

	discardCard(pos) {
		return this.cards.splice(pos, 1)[0];
	}
}

/**
 * Hand deck class
 */
export class Hand extends Deck {
	play() {} // TODO: implement play card method to battlefield

	viewCards() {
		return this.cards;
	}

	viewCard(pos) {
		return this.cards[pos];
	}

	addCard(card) {
		if (this.cards.length > 7) this.discardCard(0);
		else this.cards.push(card);
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
