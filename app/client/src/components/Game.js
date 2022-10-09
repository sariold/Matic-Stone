import * as deckClass from "../utils/deck";
import PlayerCollection from "./PlayerCollection";
import Collection from "./Collection";
import Button from "./Button";
import TurnInfo from "./TurnInfo";

import { useEffect, useState } from "react";
import HealthMana from "./HealthMana";

function Game() {
	const maxMana = 10;

	const [gameOver, setGameOver] = useState(true);
	const [winState, setWinState] = useState(0);
	const [playerTurn, setPlayerTurn] = useState(false);
	const [turnCounter, setTurnCounter] = useState(0);
	const [viewable, setViewable] = useState(false);
	const [viewText, setViewText] = useState("OFF");

	const [playerDrawn, setPlayerDrawn] = useState(false);

	const [playerHealth, setPlayerHealth] = useState(15);
	const [cpuHealth, setCpuHealth] = useState(15);

	const [playerMana, setPlayerMana] = useState(0);
	const [cpuMana, setCpuMana] = useState(0);
	const [playerManaPool, setPlayerManaPool] = useState(0);
	const [cpuManaPool, setCpuManaPool] = useState(0);

	const [playerDeck, setPlayerDeck] = useState([]);
	const [cpuDeck, setCpuDeck] = useState([]);

	const [playerHand, setPlayerHand] = useState([]);
	const [cpuHand, setCpuHand] = useState([]);

	const [playerDiscard, setPlayerDiscard] = useState([]);
	const [cpuDiscard, setCpuDiscard] = useState([]);

	const [playerField, setPlayerField] = useState([]);
	const [cpuField, setCpuField] = useState([]);

	async function newGame() {
		console.log("New game!");
		setGameOver(false);
		setWinState(0);
		setPlayerTurn(false);
		let deck = await deckClass.randomDeck();
		deck = await deckClass.shuffleDeck(deck);
		let cards = deck.splice(0, 6);
		setPlayerMana(1);
		setPlayerManaPool(1);
		setPlayerDeck([...deck]);
		setPlayerHand(cards);
		setPlayerDiscard([]);
		setPlayerField([]);
		// console.log(deck);

		deck = await deckClass.randomDeck();
		deck = await deckClass.shuffleDeck(deck);
		cards = deck.splice(0, 6);
		// console.log(deck);
		setCpuMana(0);
		setCpuManaPool(0);
		setCpuDeck([...deck]);
		setCpuHand(cards);
		setCpuDiscard([]);
		setCpuField([]);
		setPlayerTurn(true);
	}

	function toggleViewable() {
		setViewable(!viewable);
	}

	useEffect(() => {
		viewable ? setViewText("ON") : setViewText("OFF");
	}, [viewable]);

	async function endTurn() {
		setPlayerTurn(false);
		setTurnCounter(turnCounter + 1);
	}

	async function attack() {
		let creaturesOne = playerTurn ? playerField : cpuField;

		if (creaturesOne.length === 0) return;
		console.log((playerTurn ? "Player " : "CPU ") + "is now attacking!");

		let creaturesTwo = playerTurn ? cpuField : playerField;

		let healthOne = playerTurn ? playerHealth : cpuHealth;
		let healthTwo = playerTurn ? cpuHealth : playerHealth;

		for (let i = 0; i < creaturesOne.length; i++) {
			let cOne = creaturesOne[i];
			if (cOne.tapped) continue;
			let cTwo = creaturesTwo[i];

			if (typeof cTwo === "undefined") {
				cOne.attacking = true;
				healthTwo -= cOne.damage;
				cOne.tapped = true;
			} else if (typeof cTwo !== "undefined") {
				cOne.attacking = true;
				if (cTwo.tapped) {
					healthTwo -= cOne.damage;
				} else {
					cOne.health -= cTwo.damage;
					cTwo.health -= cOne.damage;
					cTwo.tapped = true;
				}
				cOne.tapped = true;

				setCpuField(playerTurn ? [...creaturesTwo] : [...creaturesOne]);
				setPlayerField(
					playerTurn ? [...creaturesOne] : [...creaturesTwo]
				);

				setCpuHealth(playerTurn ? healthTwo : healthOne);
				setPlayerHealth(playerTurn ? healthOne : healthTwo);

				cOne.health > 0
					? (creaturesOne[i] = cOne)
					: creaturesOne.splice(i, 1);
				cTwo.health > 0
					? (creaturesTwo[i] = cTwo)
					: creaturesTwo.splice(i, 1);
			}
			setCpuField(playerTurn ? [...creaturesTwo] : [...creaturesOne]);
			setPlayerField(playerTurn ? [...creaturesOne] : [...creaturesTwo]);

			setCpuHealth(playerTurn ? healthTwo : healthOne);
			setPlayerHealth(playerTurn ? healthOne : healthTwo);
		}
	}

	useEffect(() => {
		console.log(playerHealth, cpuHealth);
		if (playerHealth <= 0) {
			setTimeout(() => {
				setWinState(2);
				setGameOver(true);
			}, 2000);
		} else if (cpuHealth <= 0) {
			setTimeout(() => {
				setWinState(1);
				setGameOver(true);
			}, 2000);
		}
	}, [playerHealth, cpuHealth]);

	// useEffect(() => {
	// 	console.log(turnCounter);
	// }, [turnCounter]);

	useEffect(() => {
		if (
			turnCounter > 0 &&
			((!gameOver && playerDeck.length === 0) ||
				(!gameOver && cpuDeck.length === 0))
		) {
			setGameOver(true);
			newGame();
		}
	}, [playerHand, playerDeck, cpuHand, cpuDeck]);

	// useEffect(
	// 	(evt) => {
	// 		console.log(evt);
	// 		console.log("PLAYER:");
	// 		console.log(playerDeck);
	// 		console.log(playerHand);
	// 		console.log();
	// 		console.log(playerDiscard);
	// 	},
	// 	[playerHand, playerDeck, playerDiscard]
	// );

	useEffect(() => {
		if (cpuHand.length > 7) {
			let card = cpuHand.shift();
			setCpuHand([...cpuHand]);
			setCpuDiscard([...cpuDiscard, card]);
			console.log("CPU popping card!");
		}
	}, [cpuHand, cpuDiscard]);

	useEffect(() => {
		if (playerHand.length > 7) {
			let hand = playerHand;
			let deck = [...hand];
			let pos = Math.floor(Math.random() * deck.length);
			let card = deck.splice(pos, 1)[0];
			setPlayerDiscard([...playerDiscard, card]);

			// setPlayerHand(deck.filter((card) => card.mana > playerMana));
			// setPlayerAffordableHand(
			// 	deck.filter((card) => card.mana <= playerMana)
			// );

			setPlayerHand([...deck]);
			console.log("Player popping card!");
		}
	}, [playerHand]);

	useEffect(() => {
		// console.log(cpuField);
		// console.log(cpuHand);
	}, [cpuField, cpuHand]);

	useEffect(() => {
		if (!playerTurn && !gameOver && turnCounter > 0) {
			if (!playerDrawn) {
				let card = playerDeck.shift();
				let deck = [...playerHand, card];
				setPlayerHand([...deck]);
			}

			let card = cpuDeck.shift();
			let deck = [...cpuHand, card];

			// card = deck.splice(Math.floor(Math.random() * deck.length), 1);
			setCpuHand([...deck]);
			// setCpuField([...cpuField, card[0]]);
			let creatures = cpuField;
			creatures.forEach((c) => {
				c.tapped = false;
				c.attacking = false;
			});
			setCpuField(creatures);
			if (cpuMana < maxMana) {
				setCpuManaPool(cpuManaPool + 1);
				setCpuMana(cpuManaPool + 1);
			}
			let timeDuration = Math.floor(Math.random() * 5) + 5;
			console.log(`Computer will take a ${timeDuration - 1}s long turn`);
			setTimeout(() => {
				if (playerMana < maxMana) {
					setPlayerManaPool(playerManaPool + 1);
					setPlayerMana(playerManaPool + 1);
				}
				let creatures = playerField;
				creatures.forEach((c) => {
					c.tapped = false;
					c.attacking = false;
				});
				setPlayerField(creatures);

				setPlayerTurn(true); // TODO: These two lines can use the endTurn(true) function instead
				setTurnCounter(turnCounter + 1);
				setPlayerDrawn(false);
			}, timeDuration * 1000);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [playerTurn, gameOver]);

	useEffect(() => {
		let deck = cpuHand;
		let affordableDeck = deck.filter((c) => c.mana <= cpuMana);
		deck = deck.filter((c) => c.mana > cpuMana);
		// console.log(affordableDeck);
		if (affordableDeck.length > 0 && cpuField.length < 5) {
			let card = affordableDeck.splice(
				Math.floor(Math.random() * affordableDeck.length),
				1
			);
			setCpuHand([...deck, ...affordableDeck]);
			setCpuField([...cpuField, card[0]]);
			setCpuMana(cpuMana - card[0].mana);
		} else attack();
	}, [cpuMana]);

	// useEffect(() => {
	// 	let cards = [...playerHand, ...playerAffordableHand];
	// 	setPlayerHand(cards.filter((card) => card.mana > playerMana));
	// 	setPlayerAffordableHand(
	// 		cards.filter((card) => card.mana <= playerMana)
	// 	);
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [playerMana]);

	function whoWon(val) {
		let messages = ["", "YOU WON!", "YOU LOSE!"];

		return <h1>{messages[val]}</h1>;
	}

	return (
		<div className="App">
			<div className="info">
				<Button
					dependentState={gameOver && winState === 0}
					gameFunction={newGame}
					text={"Start Game"}
					className={"button"}
				/>
				{gameOver && winState !== 0 ? whoWon(winState) : ""}
				<Button
					dependentState={playerTurn && winState === 0}
					gameFunction={endTurn}
					text={"End Turn"}
					className={"button"}
				/>
				<TurnInfo
					dependentState={gameOver}
					turnState={playerTurn}
					gameFunction={setPlayerTurn}
					turnCount={turnCounter}
					setTurnCounter={setTurnCounter}
				/>
			</div>
			<div
				style={{
					visibility: `${!gameOver ? "visible" : "hidden"}`,
				}}
				className="Game"
			>
				<HealthMana
					dependentState={gameOver}
					health={cpuHealth}
					mana={cpuMana}
					manaPool={cpuManaPool}
				/>
				<div className="container">
					<PlayerCollection
						viewValue={viewable}
						mana={playerMana}
						setMana={setPlayerMana}
						disabled={!playerTurn}
						deck={playerHand}
						useDeck={setPlayerHand}
						className={"playerHand"}
						cardClass={"front"}
						pull={true}
						put={["playerDeck"]}
						setDrawn={setPlayerDrawn}
					/>
					<PlayerCollection
						viewValue={viewable}
						mana={null}
						setMana={null}
						disabled={playerDrawn}
						deck={playerDeck}
						useDeck={setPlayerDeck}
						className={"playerDeck"}
						cardClass={"backStack"}
						pull={true}
						put={["none"]}
						setDrawn={setPlayerDrawn}
					/>
					<PlayerCollection
						viewValue={viewable}
						mana={null}
						setMana={null}
						disabled={!playerTurn}
						deck={playerDiscard}
						useDeck={setPlayerDiscard}
						className={"playerDiscard"}
						cardClass={"backStack"}
						pull={false}
						put={["playerHand", "playerDeck"]}
						setDrawn={setPlayerDrawn}
					/>
					<PlayerCollection
						viewValue={viewable}
						mana={null}
						setMana={null}
						disabled={!playerTurn}
						deck={playerField}
						useDeck={setPlayerField}
						className={"playerField"}
						cardClass={"front"}
						pull={false}
						// only allow "affordable" cards to be played
						put={["playerHand"]}
						setDrawn={setPlayerDrawn}
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
				<HealthMana
					dependentState={gameOver}
					health={playerHealth}
					mana={playerMana}
					manaPool={playerManaPool}
				/>
				<Button
					dependentState={playerTurn && winState === 0}
					gameFunction={attack}
					text={"Attack!"}
					className={"button"}
				/>
				<br />
				<Button
					dependentState={!gameOver}
					gameFunction={toggleViewable}
					text={"Zoom " + viewText}
					className={viewText}
				/>
			</div>
		</div>
	);
}

export default Game;
