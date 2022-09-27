import * as heroClass from "../utils/hero";
import * as cardClass from "../utils/card";
import * as deckClass from "../utils/deck";
import Collection from "./Collection";
import { useEffect, useState } from "react";
import { ReactSortable } from "react-sortablejs";

function Game() {
	const maxMana = 10;

	const [gameOver, setGameOver] = useState(true);
	const [playerTurn, setPlayerTurn] = useState(true);

	const [playerMana, setPlayerMana] = useState(1);
	const [cpuMana, setCpuMana] = useState(0);
	const [playerManaPool, setPlayerManaPool] = useState(1);
	const [cpuManaPool, setCpuManaPool] = useState(0);

	const [playerDeck, setPlayerDeck] = useState([]);
	const [cpuDeck, setCpuDeck] = useState([]);

	const [playerHand, setPlayerHand] = useState([]);
	const [playerAffordableHand, setPlayerAffordableHand] = useState([]);
	const [cpuHand, setCpuHand] = useState([]);

	const [playerDiscard, setPlayerDiscard] = useState([]);
	const [cpuDiscard, setCpuDiscard] = useState([]);

	const [playerField, setPlayerField] = useState([]);
	const [cpuField, setCpuField] = useState([]);

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
		setCpuDeck([...deck]);
		setCpuHand([card]);
		setCpuDiscard([]);
	}

	useEffect(() => {
		setPlayerAffordableHand(
			playerHand.filter((card) => card.mana <= playerMana)
		);
		// setPlayerHand());
		// if (playerHand.length > 7) {
		// 	let card = playerHand.shift();
		// 	setPlayerHand([...playerHand]);
		// 	setPlayerDiscard([...playerDiscard, card]);
		// 	console.log("popping card!");
		// }
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [playerMana, playerHand]);

	useEffect(() => {
		console.log("PLAYER:");
		console.log(playerDeck);
		console.log(playerHand);
		console.log(playerDiscard);
	}, [playerHand, playerDeck, playerDiscard]);

	useEffect(() => {
		console.log(playerAffordableHand);
	}, [playerAffordableHand]);

	useEffect(() => {
		if (cpuHand.length > 7) {
			let card = cpuHand.shift();
			setCpuHand([...cpuHand]);
			setCpuDiscard([...cpuDiscard, card]);
			console.log("CPU popping card!");
		}
	}, [cpuHand, cpuDiscard]);

	useEffect(() => {
		if (!playerTurn) {
			let card = cpuDeck.shift();
			setCpuHand((c) => [...cpuHand, card]);
			setTimeout(() => {
				setPlayerManaPool(playerManaPool + 1);
				setPlayerMana(playerManaPool + 1);
				setPlayerTurn(true);
			}, 1000);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [playerTurn]);

	return (
		<div className="App">
			<button onClick={newGame}>Start</button>
			<div className="turn">
				<h1>{playerTurn ? "Your turn!" : "CPU turn!"}</h1>
			</div>
			<div className="container">
				<Collection
					mana={playerMana}
					setMana={setPlayerMana}
					disabled={!playerTurn}
					deck={playerHand}
					useDeck={setPlayerHand}
					affordable={playerAffordableHand}
					setAffordable={setPlayerAffordableHand}
					id={"draggable"}
					className={"playerHand"}
					cardClass={"front"}
					pull={true}
					put={["playerDeck"]}
					setTurn={setPlayerTurn}
				/>{" "}
				<Collection
					mana={null}
					setMana={null}
					disabled={!playerTurn}
					deck={playerDeck}
					useDeck={setPlayerDeck}
					affordable={null}
					setAffordable={null}
					id={"draggable"}
					className={"playerDeck"}
					cardClass={"back"}
					pull={true}
					put={["none"]}
					setTurn={setPlayerTurn}
				/>{" "}
				<Collection
					mana={null}
					setMana={null}
					disabled={!playerTurn}
					deck={playerDiscard}
					useDeck={setPlayerDiscard}
					affordable={null}
					setAffordable={null}
					id={"discard"}
					className={"playerDiscard"}
					cardClass={"back"}
					pull={false}
					put={["playerHand", "affordable"]}
					setTurn={setPlayerTurn}
				/>{" "}
				<Collection
					mana={null}
					setMana={null}
					disabled={!playerTurn}
					deck={playerField}
					useDeck={setPlayerField}
					affordable={null}
					setAffordable={null}
					id={"field"}
					className={"playerField"}
					cardClass={"front"}
					pull={false}
					// only allow "affordable" cards to be played
					put={"affordable"}
					setTurn={setPlayerTurn}
				/>{" "}
				{/* divider */}
				{/* <Collection
					mana={null}
					setMana={null}
					disabled={playerTurn}
					deck={cpuField}
					useDeck={setCpuField}
					id={"field"}
					className={"cpuField"}
					cardClass={"front"}
					pull={false}
					put={false}
					setTurn={setPlayerTurn}
				/>{" "}
				<Collection
					mana={null}
					setMana={null}
					disabled={playerTurn}
					deck={cpuHand}
					useDeck={setCpuHand}
					id={""}
					className={"cpuHand"}
					cardClass={"cpuBack"}
					pull={false}
					put={false}
					setTurn={setPlayerTurn}
				/>{" "}
				<Collection
					mana={null}
					setMana={null}
					disabled={!playerTurn}
					deck={cpuDeck}
					useDeck={setCpuDeck}
					id={""}
					className={"cpuDeck"}
					cardClass={"back"}
					pull={false}
					put={false}
					setTurn={setPlayerTurn}
				/>{" "}
				<Collection
					mana={null}
					setMana={null}
					disabled={!playerTurn}
					deck={cpuDiscard}
					useDeck={setCpuDiscard}
					id={"discard"}
					className={"cpuDiscard"}
					cardClass={"back"}
					pull={false}
					put={false}
					setTurn={setPlayerTurn}
				/>{" "} */}
			</div>
			<h1 className="mana">
				{playerMana} / {playerManaPool}
			</h1>
		</div>
	);
}

export default Game;
