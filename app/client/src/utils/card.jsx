/**
 * Card class with name, image, cover, and mana cost information.
 */
export class Card {
  name = "";
  img = "";
  cover = process.env.REACT_APP_HOMEPAGE + "assets/cover.png";
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
 * Extended card class with health, damage, tapped, and attacking information.
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
 * Extended card class with instant status information.
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
 * Extended spell class with damage information.
 */
export class InstantDamage extends Spell {
  damage = 0;

  constructor(name, img, mana, instant, damage) {
    super(name, img, mana, instant);
    this.damage = damage;
  }
}

/**
 * Extended spell class with damage and health information for a creature.
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
 * Extended spell class for draw and mill information.
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
