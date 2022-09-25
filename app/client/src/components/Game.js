import * as heroClass from "../utils/hero";
import * as cardClass from "../utils/card";
import * as deckClass from "../utils/deck";
import Collection from "./Collection";
import { useEffect, useState } from "react";
import { ReactSortable } from "react-sortablejs";

function Game() {
	const [gameOver, setGameOver] = useState(true);
	const [playerTurn, setTurn] = useState(false);

	const [playerDeck, setPlayerDeck] = useState([]);
	const [computerDeck, setComputerDeck] = useState([]);

	const [playerHand, setPlayerHand] = useState([]);
	const [computerHand, setComputerHand] = useState([]);

	const [playerDiscard, setPlayerDiscard] = useState([]);
	const [computerDiscard, setComputerDiscard] = useState([]);

	async function newGame() {
		console.log("New game!");
		setGameOver(false);
		let deck = await deckClass.randomDeck();
		deck = await deckClass.shuffleDeck(deck);
		let card = deck.shift();
		setPlayerDeck([...deck]);
		setPlayerHand([card]);
		setPlayerDiscard([]);

		deck = await deckClass.randomDeck();
		deck = await deckClass.shuffleDeck(deck);
		card = deck.shift();
		setComputerDeck([...deck]);
		setComputerHand([card]);
		setComputerDiscard([]);
	}

	useEffect(() => {
		console.log("PLAYER:");
		console.log(playerDeck);
		console.log(playerHand);
		console.log(playerDiscard);
		if (playerHand.length > 7) {
			playerHand.shift();
			setPlayerHand([...playerHand]);
			console.log("popping card!");
		}
	}, [playerDeck, playerHand, playerDiscard]);

	return (
		<div className="App">
			<button onClick={newGame}>Start</button>
			<div className="turn">
				<h1>{playerTurn ? "Your turn!" : "CPU turn!"}</h1>
			</div>
			<div className="container">
				<Collection
					disabled={playerTurn}
					deck={playerHand}
					useDeck={setPlayerHand}
					id={"draggable"}
					className={"playerHand"}
					cardClass={"front"}
					pull={true}
					put={["playerDeck"]}
				/>{" "}
				<Collection
					disabled={playerTurn}
					deck={playerDeck}
					useDeck={setPlayerDeck}
					id={"draggable"}
					className={"playerDeck"}
					cardClass={"back"}
					pull={true}
					put={["none"]}
				/>{" "}
				<Collection
					disabled={playerTurn}
					deck={playerDiscard}
					useDeck={setPlayerDiscard}
					id={"discard"}
					className={"playerDiscard"}
					cardClass={"back"}
					pull={false}
					put={["playerHand"]}
				/>{" "}
				<div className="playerField"></div>
				<div className="cpuField"></div>
				<div className="cpuHand"></div>
				<div className="cpuDeck"></div>
				<div className="cpuDiscard"></div>
			</div>
		</div>
	);
}

export default Game;
