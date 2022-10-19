/**
 * Abstract Card class
 * @param name The name of the card
 * @param mana The mana cost of the card
 * @param pos The position of the card on the field
 * @param discarded The card's discard status
 */
export class Card {
	name = "";
	mana = 0;
	pos = 0;
	discarded = false;

	constructor(name, mana) {
		if (this.constructor === Card) {
			throw new Error("Abstract classes cannot be instantiated.");
		}
		this.name = name;
		this.mana = mana;
	}

	play() {} // TODO: implement abstract card play method

	setDiscarded(status) {
		this.discarded = status;
	}
}

/**
 * Creature card class
 * @param health The health of the creature
 * @param damage The damage of the creature
 * @param tapped The creature's hibernation status
 */
export class Creature extends Card {
	health = 0;
	damage = 0;
	tapped = false;

	constructor(name, mana, health, damage) {
		super(name, mana);
		this.health = health;
		this.damage = damage;
	}

	play() {} // TODO: implement card play method for creatures
}

/**
 * Abstract Spell card class
 */
export class Spell extends Card {
	instant = false;
	constructor(name, mana, instant) {
		super(name, mana);
		this.instant = instant;
		if (this.constructor === Spell) {
			throw new Error("Abstract classes cannot be instantiated.");
		}
	}

	play() {} // TODO: implement abstract card play method for spells

	isBattlefieldEmpty() {} // TODO: implement field empty check
}

/**
 * Instant Damage spell card class
 * @param damage The damage of the spell
 */
export class InstantDamage extends Spell {
	damage = 0;

	constructor(name, mana, instant, damage) {
		super(name, mana, instant);
		this.damage = damage;
	}

	play() {} // TODO: implement card play method for spell
}

/**
 * Buff spell card class
 * Can be used to deal damage or deal health
 * @param damage The damage dealt by the spell
 * @param health The health dealt by the spell
 */
export class Buff extends Spell {
	damage = 0;
	health = 0;

	constructor(name, mana, instant, damage, health) {
		super(name, mana, instant);
		this.damage = damage;
		this.health = health;
	}

	play() {} // TODO: implement card play method for spell
}

/**
 * Draw spell card class
 * Can be used to draw cards and mill you or an opponent
 * @param draw The amount of cards to draw
 * @param mill The next location of the drawn cards
 */
export class Draw extends Spell {
	draw = 0;
	mill = false;

	constructor(name, mana, instant, draw, mill) {
		super(name, mana, instant);
		this.draw = draw;
		this.mill = mill;
	}

	play() {} // TODO: implement card play method for spell
}

/**
 * Copy Paste spell card class
 */
export class CopyPaste extends Spell {
	play() {} // TODO: implement card play method for spell
}
