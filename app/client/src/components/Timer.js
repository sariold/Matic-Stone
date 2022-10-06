import React, { useState, useEffect } from "react";

function Timer({ start, setTurn }) {
	const [seconds, setSeconds] = useState(20);
	const [isOn, setOn] = useState(true);

	// toggle();

	useEffect(() => {
		setOn(start);
		// console.log(start);
	}, [start]);

	useEffect(() => {
		let interval = null;
		if (isOn && seconds > 0) {
			interval = setInterval(() => {
				setSeconds((seconds) => seconds - 1);
			}, 1000);
		} else if (!isOn || seconds <= 0) {
			clearInterval(interval);
			setSeconds(20);
			setOn(false);
			setTurn(false);
		}
		return () => clearInterval(interval);
	}, [isOn, seconds]);

	return <div className="time">{seconds}s</div>;
}

export default Timer;
