import { useEffect, useState } from "react";

function HealthMana({ dependentState, health, mana, manaPool }) {
	const [showHealthMana, setShowHealthMana] = useState(false);

	useEffect(() => {
		if (!dependentState) setShowHealthMana(true);
	}, [dependentState]);

	return (
		<div
			style={{ visibility: `${showHealthMana ? "visible" : "hidden"}` }}
			className="turnInfo"
		>
			<p className="health">❤ {health}</p>
			<p className="mana">
				{mana} / {manaPool}
			</p>
		</div>
	);
}

export default HealthMana;
