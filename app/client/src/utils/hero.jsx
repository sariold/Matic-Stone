/**
 * Abstract Hero class
 * @param name The name of the Hero
 * @param health The health of the Hero
 * @param damage The damange power of the Hero
 * @param mana The current mana amount
 * @param manaPool The total mana for the round
 */
export class Hero {
	name = "";
	// TODO: set up default cards then NFT cards

	health = 20;
	damage = 1;
	mana = 0;
	manaPool = 0;

	constructor(name) {
		this.name = name;
	}

	playCard(card) {} // TODO: implement abstract play card method

	attack() {} // TODO: implement abstract attack method
}

/**
 * Player Hero class
 */
export class Player extends Hero {
	playCard(card) {} // TODO: implement play card method

	attack() {} // TODO: implement attack method
}

/**
 * Computer Hero class
 */
export class Computer extends Hero {
	playCard(card) {} // TODO: implement play card method

	attack() {} // TODO: implement attack method

	chooseCard(hand) {} // TODO: implement choose card method

	calculatePos(hero) {} // TODO: implement calculatePos method
}
