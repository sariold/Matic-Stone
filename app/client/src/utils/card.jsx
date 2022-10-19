// var homepage = "https://sariold.github.io/Matic-Stone";
var homepage = "";

/**
 * Abstract Card class
 * @param name The name of the card
 * @param mana The mana cost of the card
 * @param pos The position of the card on the field
 */
export class Card {
  name = "";
  img = "";
  cover = homepage + "/assets/cover.png";
  mana = 0;

  constructor(name, img, mana) {
    if (this.constructor === Card) {
      throw new Error("Abstract classes cannot be instantiated.");
    }
    this.name = name;
    this.img = img;
    this.mana = mana;
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
  tapped = true;
  attacking = false;

  constructor(name, img, mana, damage, health) {
    super(name, img, mana);
    this.damage = damage;
    this.health = health;
  }
}

/**
 * Abstract Spell card class
 */
export class Spell extends Card {
  instant = false;
  constructor(name, img, mana, instant) {
    super(name, img, mana);
    this.instant = instant;
    if (this.constructor === Spell) {
      throw new Error("Abstract classes cannot be instantiated.");
    }
  }
}

/**
 * Instant Damage spell card class
 * @param damage The damage of the spell
 */
export class InstantDamage extends Spell {
  damage = 0;

  constructor(name, img, mana, instant, damage) {
    super(name, img, mana, instant);
    this.damage = damage;
  }
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

  constructor(name, img, mana, instant, damage, health) {
    super(name, img, mana, instant);
    this.damage = damage;
    this.health = health;
  }
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

  constructor(name, img, mana, instant, draw, mill) {
    super(name, img, mana, instant);
    this.draw = draw;
    this.mill = mill;
  }
}
