/**
 * Battlefield class
 * @param player The Player Hero
 * @param computer The computer Hero
 * @param playerField The battlefield of the player
 * @param computerField The battlefield of the computer
 */
export class Battlefield {
	// player = new heroClass.Player();
	// computer = new heroClass.Computer();

	player = null;
	computer = null;

	playerField = [0, 0, 0, 0, 0];
	computerField = [0, 0, 0, 0, 0];

	constructor(player, computer) {
		this.player = player;
		this.computer = computer;
	}

	playCard(isPlayer, card, pos) {
		if (isPlayer) this.playerField[pos] = card;
		else this.computerField[pos] = card;
	}

	removeCard(isPlayer, pos) {
		if (isPlayer) this.playerField[pos] = 0;
		else this.computerField[pos] = 0;
	}
}
