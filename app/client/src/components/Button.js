import { useEffect, useState } from "react";

function Button({ dependentState, gameFunction, text }) {
	const [showButton, setShowButton] = useState(false);

	const displayStyle = {
		display: `${showButton ? "inline" : "none"}`,
	};

	const visibleStyle = {
		visibility: `${showButton ? "visible" : "hidden"}`,
	};

	function determineStyle(text) {
		if (text === "Start Game") return displayStyle;
		else return visibleStyle;
	}

	useEffect(() => {
		setShowButton(dependentState);
	}, [dependentState]);

	return (
		<div style={determineStyle(text)}>
			<button className="button" onClick={() => gameFunction()}>
				{text}
			</button>
		</div>
	);
}

export default Button;
