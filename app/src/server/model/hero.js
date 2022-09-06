import * as deckClass from "./deck.js";

let cards = [];

export class Hero {
	name = "";
	// TODO: set up default cards then NFT cards
	stack = deckClass.Deck(cards);
	hand = deckClass.Hand();
	discard = deckClass.Discarded();

	health = 20;
	damage = 1;
	mana = 0;
	manaPool = 0;
	turn = false;

	constructor(name, stack) {
		this.name = name;
		this.stack = stack;
	}

	getPhase() {} // TODO: implement get phase method

	playCard(card) {} // TODO: implement play card method

	attack() {} // TODO: implement attack method
}

export class Player extends Hero {
	skipPhase() {} // TODO: implement skip phase method
}

export class Computer extends Hero {
	chooseCard(hand) {} // TODO: implement choose card method

	calculatePos(hero) {} // TODO: implement calculatePos method
}
