import { useEffect, useState } from "react";

const Button = ({ dependentState, gameFunction, text, className }) => {
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
			<button
				className={className}
				onClick={() => {
					gameFunction();
					// disabled = dependentState;
				}}
			>
				{text}
			</button>
		</div>
	);
};

export default Button;
