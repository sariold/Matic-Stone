import { useEffect, useState } from "react";

function TurnInfo({
	dependentState,
	turnState,
	gameFunction,
	turnCount,
	setTurnCounter,
}) {
	const turnTime = 20;
	const [showTurnInfo, setShowTurnInfo] = useState(false);
	const [currentTurn, setCurrentTurn] = useState(turnState);

	const [count, setCount] = useState(turnCount);
	const [seconds, setSeconds] = useState(turnTime);
	const [isOn, setOn] = useState(false);

	useEffect(() => {
		setCount(turnCount);
	}, [turnCount]);

	useEffect(() => {
		setShowTurnInfo(dependentState);
		if (!dependentState) setOn(true);
		else if (dependentState) setOn(false);
		// console.log(dependentState); // TODO: why does this event fire off twice for newGame function?
	}, [dependentState]);

	useEffect(() => {
		setCurrentTurn(turnState);
		const changeTurn = () => {
			return setSeconds(turnTime);
		};
		changeTurn();
	}, [turnState]);

	useEffect(() => {
		let interval = null;
		if (isOn && !dependentState && seconds > 0) {
			interval = setInterval(() => {
				setSeconds((seconds) => seconds - 1);
			}, 1000);
		} else if ((!isOn && !dependentState) || seconds <= 0) {
			clearInterval(interval);
			setSeconds(turnTime);
			setTurnCounter(count + 1);
			gameFunction(!turnState);
			// if (restartState && isOn) setTurn(false);
			// else if (isOn) setTurn(true);
		}
		return () => clearInterval(interval);
	}, [isOn, seconds]);

	return (
		<div
			style={{ visibility: `${!showTurnInfo ? "visible" : "hidden"}` }}
			className="turnInfo"
		>
			<p className="currentTurn">
				{currentTurn ? "Your turn!" : "CPU turn!"}
			</p>
			<p className="time">{seconds}s</p>
		</div>
	);
}

export default TurnInfo;
