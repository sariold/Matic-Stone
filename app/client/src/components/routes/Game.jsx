import { Fragment, useEffect, useState } from "react";
import * as deckClass from "../../utils/deck";
import { fetcher } from "../../utils/retriever";
import PlayerCollection from "../PlayerCollection";
import Collection from "../Collection";
import ActionButton from "../ui/ActionButton";
import TurnInfo from "../TurnInfo";
import Header from "../ui/Header";
import Mario from "../ui/gifs/mario.gif";
import Loader from "../ui/gifs/loader.gif";
import HealthMana from "../HealthMana";
// @ts-ignore
import MaticStone from "../../utils/data/MaticStone.json";
// @ts-ignore
import Web3 from "web3";

/**
 * Game component to handle game state and display the game.
 * @returns JSX react component element
 */
function Game() {
  const maxMana = 10;

  const [loading, setLoading] = useState(true);

  const [gameOver, setGameOver] = useState(true);
  const [winState, setWinState] = useState(0);
  const [playerTurn, setPlayerTurn] = useState(false);
  const [turnCounter, setTurnCounter] = useState(0);
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

  const [userAddress, setUserAddress] = useState("");
  const [contract, setContract] = useState();

  // @ts-ignore
  let provider = window.ethereum;

  var ingredients = [];

  /**
   * Use effect to check if MetaMask is installed,
   * set user address and contract state.
   */
  useEffect(() => {
    if (provider) {
      console.log("MetaMask detected!");
      const web3 = new Web3(provider);
      provider.on("accountsChanged", () => {
        window.location.reload();
      });
      setContract(
        new web3.eth.Contract(
          MaticStone.abi,
          "0x212c2E0A66E3a28D9D37D18a390883bEe2c783E6"
        )
      );
      provider.request({ method: "eth_requestAccounts" }).then((res) => {
        setUserAddress(res[0]);
      });
    } else {
      alert("Install MetaMask extension!");
      window.location.href = process.env.REACT_APP_HOMEPAGE;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Use effect to see if requirements to play game are met and either
   * start the game or send user back to homepage.
   */
  useEffect(() => {
    if (userAddress !== "" && contract !== undefined) {
      // @ts-ignore
      contract.methods
        .balanceOf(userAddress)
        .call({ from: userAddress })
        .then((res) => {
          if (res < 30) window.location.href = "/";
        });
      fetcher(userAddress, contract).then((res) => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        ingredients = res;
        setLoading(false);
        newGame();
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contract, userAddress]);

  /**
   * Use effect to check if game is over based on player and
   * opponent health in order to set correct game state.
   */
  useEffect(() => {
    console.log(playerHealth, cpuHealth);
    if (!(turnCounter > 0)) return;
    if (playerHealth <= 0 || playerDeck.length === 0) {
      setTimeout(() => {
        setWinState(2);
        setGameOver(true);
      }, 2000);
    } else if (cpuHealth <= 0 || cpuDeck.length === 0) {
      setTimeout(() => {
        setWinState(1);
        setGameOver(true);
      }, 2000);
    }
  }, [playerHealth, cpuHealth, turnCounter, playerDeck, cpuDeck]);

  /**
   * Use effect to check if CPU has too many cards in their hand.
   */
  useEffect(() => {
    if (cpuHand.length > 7) {
      let deck = cpuHand;
      let card = deck.shift();
      setCpuHand([...deck]);
      setCpuDiscard([...cpuDiscard, card]);
      console.log("CPU popping card!");
    }
  }, [cpuHand, cpuDiscard]);

  /**
   * Use effect to check if player has too many cards in their hand.
   */
  useEffect(() => {
    if (playerHand.length > 7) {
      let deck = playerHand;
      let pos = Math.floor(Math.random() * deck.length);
      let card = deck.splice(pos, 1)[0];
      setPlayerDiscard([...playerDiscard, card]);
      setPlayerHand([...deck]);
      console.log("Player popping card!");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playerHand]);

  /**
   * Use effect for handling start and end of each player's turn.
   * This includes increasing mana pool and changing creature's tapped and attack states.
   */
  useEffect(() => {
    if (!playerTurn && !gameOver && turnCounter > 0) {
      if (!playerDrawn) {
        let tempDeck = playerDeck;
        let card = tempDeck.shift();
        setPlayerDeck([...tempDeck]);
        let deck = [...playerHand, card];
        setPlayerHand([...deck]);
      }

      let tempDeck = cpuDeck;
      let card = tempDeck.shift();
      setCpuDeck([...tempDeck]);
      let deck = [...cpuHand, card];
      setCpuHand([...deck]);

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
        setPlayerTurn(true);
        setTurnCounter(turnCounter + 1);
        setPlayerDrawn(false);
      }, timeDuration * 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playerTurn, gameOver]);

  /**
   * Use effect to handle CPU turn for playing cards and attacking.
   */
  useEffect(() => {
    setTimeout(() => {
      let deck = cpuHand;
      let affordableDeck = deck.filter((c) => c.mana <= cpuMana);
      deck = deck.filter((c) => c.mana > cpuMana);
      if (affordableDeck.length > 0 && cpuField.length < 5) {
        let card = affordableDeck.splice(
          Math.floor(Math.random() * affordableDeck.length),
          1
        );
        setCpuHand([...deck, ...affordableDeck]);
        setCpuField([...cpuField, card[0]]);
        setCpuMana(cpuMana - card[0].mana);
      } else attack();
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cpuMana]);

  /**
   * Create a new game instance and initialize all game variables.
   */
  const newGame = async () => {
    console.log("New game!");
    setGameOver(false);
    setWinState(0);
    setPlayerTurn(false);
    let deck = await deckClass.buildDeck(ingredients);
    deck = await deckClass.shuffleDeck(deck);
    let cards = deck.splice(0, 6);
    setPlayerMana(1);
    setPlayerManaPool(1);
    setPlayerDeck([...deck]);
    setPlayerHand(cards);
    setPlayerDiscard([]);
    setPlayerField([]);

    deck = await deckClass.randomDeck();
    deck = await deckClass.shuffleDeck(deck);
    cards = deck.splice(0, 6);
    setCpuMana(0);
    setCpuManaPool(0);
    setCpuDeck([...deck]);
    setCpuHand(cards);
    setCpuDiscard([]);
    setCpuField([]);
  };

  /**
   * Function to end the player's turn.
   */
  const endTurn = async () => {
    setPlayerTurn(false);
    setTurnCounter(turnCounter + 1);
  };

  /**
   * Function to initiate an attack from player to opponent or vice versa.
   * Handles the game state and logic for creatures attacking an opponent's
   * creatures or the opponent directly.
   */
  const attack = async () => {
    let creaturesOne = playerTurn ? playerField : cpuField;
    let creaturesTwo = playerTurn ? cpuField : playerField;

    if (creaturesOne.length === 0) return;
    console.log((playerTurn ? "Player " : "CPU ") + "is now attacking!");

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
        setPlayerField(playerTurn ? [...creaturesOne] : [...creaturesTwo]);
        setCpuHealth(playerTurn ? healthTwo : healthOne);
        setPlayerHealth(playerTurn ? healthOne : healthTwo);

        cOne.health > 0 ? (creaturesOne[i] = cOne) : creaturesOne.splice(i, 1);
        cTwo.health > 0 ? (creaturesTwo[i] = cTwo) : creaturesTwo.splice(i, 1);
      }
      setCpuField(playerTurn ? [...creaturesTwo] : [...creaturesOne]);
      setPlayerField(playerTurn ? [...creaturesOne] : [...creaturesTwo]);
      setCpuHealth(playerTurn ? healthTwo : healthOne);
      setPlayerHealth(playerTurn ? healthOne : healthTwo);
    }
  };

  /**
   * When the game is over, this function will be called.
   * @param {number} val - 0 = default, 1 = player win, 2 = cpu win
   * @returns The win state of the game in text format.
   */
  const whoWon = (val) => {
    let messages = ["", "YOU WON!", "YOU LOSE!"];
    return (
      <div>
        <h1>{messages[val]}</h1>
        <a href="/">
          <img src={Mario} alt="Home Button" />
        </a>
      </div>
    );
  };

  return (
    <Fragment>
      <Header address={userAddress} />
      <div className="text-center background">
        {loading ? (
          <img src={Loader} alt="Loading gif" className="center" />
        ) : (
          <div className="row">
            {gameOver && winState !== 0 ? (
              whoWon(winState)
            ) : (
              <div className="game">
                {/* Game buttons */}
                <div className="row">
                  <div className="col">
                    <ActionButton
                      dependentState={playerTurn && winState === 0}
                      gameFunction={endTurn}
                      text={"Next Turn"}
                    />
                  </div>
                  <div className="col">
                    <TurnInfo
                      dependentState={gameOver}
                      turnState={playerTurn}
                      gameFunction={setPlayerTurn}
                      turnCount={turnCounter}
                      setTurnCounter={setTurnCounter}
                    />
                  </div>
                  <div className="col">
                    <ActionButton
                      dependentState={playerTurn && winState === 0}
                      gameFunction={attack}
                      text={"Attack!"}
                    />
                  </div>
                </div>
                {/* Opponent information */}
                <div className="row">
                  <HealthMana
                    dependentState={gameOver}
                    health={cpuHealth}
                    mana={cpuMana}
                    manaPool={cpuManaPool}
                  />
                </div>
                {/* Opponent deck, hand, and discard collections */}
                <div className="row">
                  <div className="col">
                    <Collection
                      deck={cpuDeck}
                      className={"cpuDeck"}
                      cardClass={"backStack"}
                    />
                  </div>
                  <div className="col">
                    <Collection
                      deck={cpuHand}
                      className={"cpuHand"}
                      cardClass={"back"}
                    />
                  </div>
                  <div className="col">
                    <Collection
                      deck={cpuDiscard}
                      className={"cpuDiscard"}
                      cardClass={"backStack"}
                    />
                  </div>
                </div>
                {/* Opponent field */}
                <div className="row">
                  <Collection
                    deck={cpuField}
                    className={"cpuField"}
                    cardClass={"front"}
                  />
                </div>
                {/* Player field */}
                <div className="row">
                  <PlayerCollection
                    mana={null}
                    setMana={null}
                    disabled={!playerTurn}
                    deck={playerField}
                    useDeck={setPlayerField}
                    className={"playerField"}
                    cardClass={"front"}
                    pull={false}
                    // Only allow "affordable" cards to be played
                    put={["playerHand"]}
                    setDrawn={setPlayerDrawn}
                  />
                </div>
                {/* Player deck, hand, and discard collections */}
                <div className="row">
                  <div className="col">
                    <PlayerCollection
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
                  </div>
                  <div className="col">
                    <PlayerCollection
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
                  </div>
                  <div className="col">
                    <PlayerCollection
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
                  </div>
                </div>
                {/* Player information */}
                <div className="row">
                  <HealthMana
                    dependentState={gameOver}
                    health={playerHealth}
                    mana={playerMana}
                    manaPool={playerManaPool}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </Fragment>
  );
}

export default Game;
