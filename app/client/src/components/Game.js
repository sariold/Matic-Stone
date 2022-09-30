import * as heroClass from "../utils/hero";
import * as cardClass from "../utils/card";
import * as deckClass from "../utils/deck";
import PlayerCollection from "./PlayerCollection";
import Collection from "./Collection";
import { useEffect, useState } from "react";
import { ReactSortable } from "react-sortablejs";

function Game() {
	const maxMana = 10;

	const [gameOver, setGameOver] = useState(true);
	const [playerTurn, setPlayerTurn] = useState(true);

	const [playerHealth, setPlayerHealth] = useState(15);
	const [cpuHealth, setCpuHealth] = useState(15);

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
		setPlayerMana(1);
		setPlayerManaPool(1);
		setPlayerDeck([...deck]);
		setPlayerAffordableHand([]);
		setPlayerHand([card]);
		setPlayerDiscard([]);
		setPlayerField([]);
		// console.log(deck);

		deck = await deckClass.randomDeck();
		deck = await deckClass.shuffleDeck(deck);
		card = deck.shift();
		// console.log(deck);
		setCpuMana(0);
		setCpuManaPool(0);
		setCpuDeck([...deck]);
		setCpuHand([card]);
		setCpuDiscard([]);
		setCpuField([]);
	}

	// useEffect(() => {
	// 	setPlayerHand([...playerHand, ...playerAffordableHand]);
	// }, [playerAffordableHand]);

	// useEffect(() => {
	// 	console.log("PLAYER:");
	// 	console.log(playerDeck);
	// 	console.log(playerHand);
	// 	console.log(playerAffordableHand);
	// 	// console.log(playerDiscard);
	// }, [playerHand, playerAffordableHand, playerDeck, playerDiscard]);

	useEffect(() => {
		if (cpuHand.length > 7) {
			let card = cpuHand.shift();
			setCpuHand([...cpuHand]);
			setCpuDiscard([...cpuDiscard, card]);
			console.log("CPU popping card!");
		}
	}, [cpuHand, cpuDiscard]);

	useEffect(() => {
		if (playerHand.length + playerAffordableHand.length > 7) {
			let deck = Math.floor(Math.random() * 2);
			if (deck === 0) {
				let card = playerHand.shift();
				setPlayerHand([...playerHand]);
				setPlayerDiscard([...playerDiscard, card]);
			} else {
				let card = playerAffordableHand.shift();
				setPlayerAffordableHand([...playerAffordableHand]);
				setPlayerDiscard([...playerDiscard, card]);
			}
			console.log("Player popping card!");
		}
	}, [playerHand, playerAffordableHand, playerDiscard]);

	useEffect(() => {
		// console.log(cpuField);
		// console.log(cpuHand);
	}, [cpuField, cpuHand]);

	useEffect(() => {
		if (!playerTurn) {
			let card = cpuDeck.shift();
			let deck = [...cpuHand, card];

			// card = deck.splice(Math.floor(Math.random() * deck.length), 1);
			setCpuHand([...deck]);
			// setCpuField([...cpuField, card[0]]);
			let creatures = cpuField;
			creatures.forEach((c) => (c.tapped = false));
			setCpuField(creatures);
			if (cpuMana < maxMana) {
				setCpuManaPool(cpuManaPool + 1);
				setCpuMana(cpuManaPool + 1);
			}
			setTimeout(() => {
				if (playerMana < maxMana) {
					setPlayerManaPool(playerManaPool + 1);
					setPlayerMana(playerManaPool + 1);
				}
				let creatures = playerField;
				creatures.forEach((c) => (c.tapped = false));
				setPlayerField(creatures);

				setPlayerTurn(true);
			}, 1000);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [playerTurn]);

	useEffect(() => {
		let deck = cpuHand;
		let affordableDeck = deck.filter((c) => c.mana <= cpuMana);
		deck = deck.filter((c) => c.mana > cpuMana);
		console.log(affordableDeck);
		if (affordableDeck.length > 0) {
			let card = affordableDeck.splice(
				Math.floor(Math.random() * affordableDeck.length),
				1
			);
			setCpuHand([...deck, ...affordableDeck]);
			setCpuField([...cpuField, card[0]]);
			setCpuMana(cpuMana - card[0].mana);
		}
	}, [cpuMana]);

	useEffect(() => {
		let cards = [...playerHand, ...playerAffordableHand];
		// console.log(cards);
		setPlayerHand(cards.filter((card) => card.mana > playerMana));
		setPlayerAffordableHand(
			cards.filter((card) => card.mana <= playerMana)
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [playerMana]);

	return (
		<div className="App">
			<button className="start" onClick={newGame}>
				New Game
			</button>
			<div className="turn">
				<h1>{playerTurn ? "Your turn!" : "CPU turn!"}</h1>
			</div>
			<div className="Game">
				<h1 className="health">❤ {cpuHealth}</h1>
				<h1 className="mana">
					{cpuMana} / {cpuManaPool}
				</h1>
				<div className="container">
					<PlayerCollection
						mana={playerMana}
						setMana={setPlayerMana}
						disabled={!playerTurn}
						deck={playerHand}
						useDeck={setPlayerHand}
						affordable={playerAffordableHand}
						setAffordable={setPlayerAffordableHand}
						className={"playerHand"}
						cardClass={"front"}
						pull={true}
						put={["playerDeck"]}
						setTurn={setPlayerTurn}
					/>
					<PlayerCollection
						mana={null}
						setMana={null}
						disabled={!playerTurn}
						deck={playerDeck}
						useDeck={setPlayerDeck}
						affordable={null}
						setAffordable={null}
						className={"playerDeck"}
						cardClass={"backStack"}
						pull={true}
						put={["none"]}
						setTurn={setPlayerTurn}
					/>
					<PlayerCollection
						mana={null}
						setMana={null}
						disabled={!playerTurn}
						deck={playerDiscard}
						useDeck={setPlayerDiscard}
						affordable={null}
						setAffordable={null}
						className={"playerDiscard"}
						cardClass={"backStack"}
						pull={false}
						put={["playerHand", "affordable"]}
						setTurn={setPlayerTurn}
					/>
					<PlayerCollection
						mana={null}
						setMana={null}
						disabled={!playerTurn}
						deck={playerField}
						useDeck={setPlayerField}
						affordable={null}
						setAffordable={null}
						className={"playerField"}
						cardClass={"front"}
						pull={false}
						// only allow "affordable" cards to be played
						put={"affordable"}
						setTurn={setPlayerTurn}
					/>
					{/* divider */}
					<Collection
						deck={cpuField}
						className={"cpuField"}
						cardClass={"front"}
					/>
					<Collection
						deck={cpuHand}
						className={"cpuHand"}
						cardClass={"back"}
					/>
					<Collection
						deck={cpuDeck}
						className={"cpuDeck"}
						cardClass={"backStack"}
					/>
					<Collection
						deck={cpuDiscard}
						className={"cpuDiscard"}
						cardClass={"backStack"}
					/>
				</div>
				<h1 className="mana">
					{playerMana} / {playerManaPool}
				</h1>
				<h1 className="health">❤ {playerHealth}</h1>
			</div>
		</div>
	);
}

export default Game;
