/**
 * Abstract Card class
 * @param name The name of the card
 * @param atomicID The atomicID of the card
 * @param cardType The type of the card
 * @param mana The mana cost of the card
 * @param position The position of the card on the field
 * @param instant The card's ability to be instantly played
 * @param discarded The card's discard status
 */
export class Card {
	name = "";
	atomicID = 0;
	cardType = "";
	mana = 0;
	position = 0;
	instant = false;
	discarded = false;

	constructor(name, mana, instant) {
		if (this.constructor === Card) {
			throw new Error("Abstract classes cannot be instantiated.");
		}
		this.name = name;
		this.mana = mana;
		this.instant = instant;
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

	constructor(name, mana, instant, health, damage) {
		super(name, mana, instant);
		this.health = health;
		this.damage = damage;
	}

	play() {} // TODO: implement card play method for creatures

	attack() {} // TODO: implement card attack method
}

/**
 * Abstract Spell card class
 */
export class Spell extends Card {
	constructor(name, mana, instant) {
		super(name, mana, instant);
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
 * @param targetPos The field position of the target
 */
export class InstantDamage extends Spell {
	damage = 0;
	targetPos = 0;

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
 * @param targetPos The field position of the target
 */
export class Buff extends Spell {
	damage = 0;
	health = 0;
	targetPos = 0;

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
 * @param target The target hero of the spell
 */
export class Draw extends Spell {
	draw = 0;
	mill = false;
	target = 0; // TODO: change to hero class instance

	constructor(name, mana, instant, draw, mill, target) {
		super(name, mana, instant);
		this.draw = draw;
		this.mill = mill;
		this.target = target;
	}

	play() {} // TODO: implement card play method for spell
}

/**
 * Copy Paste spell card class
 * @param copy The field position of the creature to copy
 */
export class CopyPaste extends Spell {
	copy = 0;

	constructor(name, mana, instant, copy) {
		super(name, mana, instant);
		this.copy = copy;
	}

	play() {} // TODO: implement card play method for spell
}
