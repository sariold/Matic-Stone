import * as deckClass from "../../utils/deck";
import PlayerCollection from "../PlayerCollection";
import Collection from "../Collection";
import ActionButton from "../ui/ActionButton";
import TurnInfo from "../TurnInfo";
import Header from "../ui/Header";

import Mario from "../ui/mario.gif";
import Loader from "../ui/loader.gif";

// @ts-ignore
import MaticStone from "../../utils/MaticStone.json";
// @ts-ignore
import Web3 from "web3";
// @ts-ignore
import axios from "axios";

import { Fragment, useEffect, useState } from "react";
import HealthMana from "../HealthMana";

function Game() {
  const maxMana = 10;

  // const [ingredients, setIngredients] = useState([]);

  const [loading, setLoading] = useState(true);

  const [gameOver, setGameOver] = useState(true);
  const [winState, setWinState] = useState(0);
  const [playerTurn, setPlayerTurn] = useState(false);
  const [turnCounter, setTurnCounter] = useState(0);
  const [viewable, setViewable] = useState(true);

  const [playerDrawn, setPlayerDrawn] = useState(false);

  const [playerHealth, setPlayerHealth] = useState(2);
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

  var homepage = "";

  var ingredients = [];

  const [userAddress, setUserAddress] = useState("");

  const [contract, setContract] = useState();
  // @ts-ignore
  let provider = window.ethereum;

  useEffect(() => {
    if (provider) {
      console.log("MetaMask detected!");
      const web3 = new Web3(provider);
      // const networkId = await web3.eth.net.getId();
      setContract(
        new web3.eth.Contract(
          MaticStone.abi,
          "0x212c2E0A66E3a28D9D37D18a390883bEe2c783E6"
        )
      );

      provider.request({ method: "eth_requestAccounts" }).then((res) => {
        // Return the address of the wallet
        console.log(res);
        setUserAddress(res[0]);
      });
    } else {
      alert("Install metamask extension!");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // console.log(contract);
    if (userAddress !== "" && contract !== undefined) {
      // @ts-ignore
      contract.methods
        .balanceOf(userAddress)
        .call({ from: userAddress })
        .then((res) => console.log(res));
      fetcher().then(() => {
        setLoading(false);
        newGame();
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contract, userAddress]);

  const getBalance = () => {
    // @ts-ignore
    return contract.methods.balanceOf(userAddress).call({ from: userAddress });
  };

  const getTokenID = (index) => {
    // @ts-ignore
    return contract.methods
      .tokenOfOwnerByIndex(userAddress, index)
      .call({ from: userAddress });
  };

  const getTokenURI = (id) => {
    // @ts-ignore
    return contract.methods.tokenURI(id).call({ from: userAddress });
  };

  const getTokens = async () => {
    let arr = [];
    let balance = await getBalance();
    // console.log(balance);

    for (let i = 0; i < balance; i++) {
      // console.log(i);
      let tokenID = await getTokenID(i);
      // console.log(tokenID);
      let tokenURI = await getTokenURI(tokenID);
      // console.log(tokenURI);
      arr.push(tokenURI);
    }
    return arr;
  };

  const retrieveJSON = async (uri) => {
    let res = axios.get(`https://${uri}.ipfs.dweb.link/`).then((resp) => {
      let attributes = resp.data["attributes"];
      let name = attributes[1]["value"];
      let mana = attributes[2]["value"];
      let damage = attributes[3]["value"];
      let health = attributes[4]["value"];
      let c = [name, mana, damage, health];
      return c;
    });
    return res;
  };

  const fetcher = async () => {
    let arr = await getTokens();
    let creatures = [];
    for (let i = 0; i < arr.length; i++) {
      let uri = arr[i];
      let c = await retrieveJSON(uri);
      console.log(c);
      // axios.get(`https://${arr[i]}.ipfs.dweb.link/`).then((resp) => {
      //   let attributes = resp.data["attributes"];
      //   let name = attributes[1]["value"];
      //   let mana = attributes[2]["value"];
      //   let damage = attributes[3]["value"];
      //   let health = attributes[4]["value"];
      //   let c = [name, mana, damage, health];
      creatures.push(c);
    }

    // console.log(creatures);
    ingredients = creatures;
    // setIngredients([...creatures]);
    // window.location.href = "/Game";
  };

  // useEffect(() => {
  //   if (ingredients.length === 30) console.log(ingredients);
  // }, [ingredients]);

  async function newGame() {
    console.log("New game!");
    setGameOver(false);
    setWinState(0);
    setPlayerTurn(false);
    // let deck = await deckClass.randomDeck();
    // console.log(ingredients);
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
    // setPlayerTurn(true);
  }

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

  useEffect(() => {
    if (
      turnCounter > 0 &&
      ((!gameOver && playerDeck.length === 0) ||
        (!gameOver && cpuDeck.length === 0))
    ) {
      setGameOver(true);
      // newGame();
      // window.location.href = "/";
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playerHand, playerDeck, cpuHand, cpuDeck]);

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

      setPlayerHand([...deck]);
      console.log("Player popping card!");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playerHand]);

  useEffect(() => {
    if (!playerTurn && !gameOver && turnCounter > 0) {
      if (!playerDrawn) {
        let card = playerDeck.shift();
        let deck = [...playerHand, card];
        setPlayerHand([...deck]);
      }

      let card = cpuDeck.shift();
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

        setPlayerTurn(true); // TODO: These two lines can use the endTurn(true) function instead
        setTurnCounter(turnCounter + 1);
        setPlayerDrawn(false);
      }, timeDuration * 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playerTurn, gameOver]);

  useEffect(() => {
    setTimeout(() => {
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
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cpuMana]);

  function whoWon(val) {
    let messages = ["", "YOU WON!", "YOU LOSE!"];

    return (
      <div>
        <h1>{messages[val]}</h1>
        <a href="/">
          <img src={Mario} alt="Home Button" />
        </a>
      </div>
    );
  }

  return (
    <Fragment>
      <Header />
      <div className="text-center background">
        {loading ? (
          <img src={Loader} alt="Loading gif" className="center" />
        ) : (
          <div className="row">
            {gameOver && winState !== 0 ? (
              whoWon(winState)
            ) : (
              <div className="game">
                {/* <div className="row">
 
                </div> */}
                <div className="row">
                  <div className="col">
                    <ActionButton
                      dependentState={playerTurn && winState === 0}
                      gameFunction={endTurn}
                      text={"End Turn"}
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
                <div className="row">
                  <HealthMana
                    dependentState={gameOver}
                    health={cpuHealth}
                    mana={cpuMana}
                    manaPool={cpuManaPool}
                  />
                </div>

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

                <div className="row">
                  <Collection
                    deck={cpuField}
                    className={"cpuField"}
                    cardClass={"front"}
                  />
                </div>

                <div className="row">
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
                </div>

                <div className="row">
                  <div className="col">
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
                  </div>
                  <div className="col">
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
                  </div>
                  <div className="col">
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
                  </div>
                </div>

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
