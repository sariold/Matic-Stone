import { useEffect, useState } from "react";

const [gameOver, setGameOver] = useState(true);
const [playerTurn, setPlayerTurn] = useState(true);

const [playerMana, setPlayerMana] = useState(1);
const [cpuMana, setCpuMana] = useState(0);
const [playerManaPool, setPlayerManaPool] = useState(1);
const [cpuManaPool, setCpuManaPool] = useState(0);

const [playerDeck, setPlayerDeck] = useState([]);
const [cpuDeck, setCpuDeck] = useState([]);

const [playerHand, setPlayerHand] = useState([]);
const [cpuHand, setCpuHand] = useState([]);

const [playerDiscard, setPlayerDiscard] = useState([]);
const [cpuDiscard, setCpuDiscard] = useState([]);

const [playerField, setPlayerField] = useState([]);
const [cpuField, setCpuField] = useState([]);
