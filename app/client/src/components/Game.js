import * as heroClass from "../utils/hero";
import * as cardClass from "../utils/card";
import * as deckClass from "../utils/deck";
import { useEffect, useState } from "react";
import cover from "../assets/cover.png";

function Game() {
	var creatures = [
		"archer.jpeg",
		"battle_orc.jpeg",
		"bloodshot.jpeg",
		"demogorgon.jpeg",
		"ninja_2077.jpeg",
		"roborex.jpeg",
		"serpentine.jpeg",
		"terminator.jpeg",
		"undead_army.jpeg",
	];
	// var playerTurn = false;
	// var turnPhase = 0; // four phases (draw, play, attack, play)
	// var turnNum = 0;

	// var player = new heroClass.Player("Diego");
	// var computer = new heroClass.Computer("Computer");
	// console.log(player);
	// console.log(computer);
	const [gameOver, setGameOver] = useState(true);
	const [playerDeck, setPlayerDeck] = useState([]);
	// const [computerDeck, setComputerDeck] = useState([]);

	const [playerHand, setPlayerHand] = useState([]);
	// const [computerHand, setComputerHand] = useState([]);

	function randomDeck() {
		let cards = [];
		for (let i = 0; i < 10; i++) {
			let name = creatures[Math.floor(Math.random() * creatures.length)];
			let img = "../assets/creatures/" + name;
			let mana = Math.floor(Math.random() * 8);
			let health = Math.floor(Math.random() * 8);
			let damage = Math.floor(Math.random() * 8);

			let creature = new cardClass.Creature(
				name,
				img,
				mana,
				health,
				damage
			);
			cards.push(creature);
		}
		return cards;
	}

	function shuffleDeck(cards) {
		return [...cards]
			.sort(() => Math.random() - 0.5)
			.map((card) => ({ ...card, id: Math.random() }));
	}

	function newGame() {
		console.log("New game!");
		setGameOver(false);
		setPlayerDeck(shuffleDeck(randomDeck()));
		setPlayerHand([]);
		// setComputerDeck(shuffleDeck(randomDeck()));
	}

	function drawCard() {
		if (playerHand.length > 7) {
			playerHand.pop();
			setPlayerHand([...playerHand]);
		}
		let card = playerDeck.shift();
		if (card && playerHand.length < 7) setPlayerHand([...playerHand, card]);
		console.log(playerHand);
		console.log(playerDeck);
	}

	useEffect(() => {
		// console.log("DECKS:");
		// console.log(playerDeck);
		// console.log(playerHand);
		// console.log(computerDeck);
	}, [playerHand]);

	return (
		<div className="App">
			{/* <h1>Hello</h1> */}
			<button onClick={newGame}>New Game</button>
			<button onClick={drawCard}>Draw Card</button>
			<div className="player-hand">
				{playerHand.map((card) => (
					<div className="card" key={card.id}>
						<img className="front" src={cover} alt="cover" />
					</div>
				))}
			</div>
		</div>
	);
}

export default Game;
