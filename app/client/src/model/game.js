import * as heroClass from "./hero.js";
import * as battlefieldClass from "./battlefield.js";
import * as cardClass from "./card.js";

var playerTurn = false;
var turnPhase = 0; // four phases (draw, play, attack, play)
var turnNum = 0;
var gameOver = false;

var player = new heroClass.Player("Diego", randomDeck());
var computer = new heroClass.Computer("Computer", []);
var battlefield = new battlefieldClass.Battlefield(player, computer);

console.log(player);
console.log(computer);

/**
 * Simple click based turn handler logic for testing purposes
 */
document.addEventListener("click", () => {
	if (!playerTurn) {
		console.log("COMPUTER");
		playerTurn = true;
	} else {
		console.log("PLAYER");
		playerTurn = false;
	}
	turnNum++;
});

function randomDeck() {
	let cards = [];
	let creatures = ["Elf", "Dragon", "Wizard", "Demogorgon"];
	for (let i = 0; i < 10; i++) {
		let name = creatures[Math.floor(Math.random() * creatures.length)];
		let mana = Math.floor(Math.random() * 8);
		let health = Math.floor(Math.random() * 8);
		let damage = Math.floor(Math.random() * 8);

		let creature = new cardClass.Creature(name, mana, health, damage);
		cards.push(creature);
	}
	return cards;
}
