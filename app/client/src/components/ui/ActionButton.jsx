import { useEffect, useState } from "react";

const Button = ({ dependentState, gameFunction, text, className }) => {
	const [showButton, setShowButton] = useState(false);


	// REMOVE LATER
	const displayStyle = {
		display: `${showButton ? "inline" : "none"}`,
	};


	const visibleStyle = {
		visibility: `${showButton ? "visible" : "hidden"}`,
	};

	
	// REMOVE LATER
	function determineStyle(text) {
		if (text === "Start Game") return displayStyle;
		else return visibleStyle;
	}

	useEffect(() => {
		setShowButton(dependentState);
	}, [dependentState]);

	return (
		<div style={determineStyle(text)} >
			<button
			className="btn btn-secondary shadow-lg mt-5"
				
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
