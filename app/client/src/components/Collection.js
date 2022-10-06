import { useEffect, useState } from "react";

function Collection({ deck, className, cardClass }) {
	const [cards, setCards] = useState(deck);

	const zoom = (event) => {
		if (event.target.classList.contains("front"))
			event.target.classList.toggle("zoom");
	};

	function getClass(className, card) {
		if (className === "cpuHand") return "card";
		if (className !== "cpuField") return "backStack";
		return className === "cpuField" && card.tapped === true
			? "tapped"
			: "card";
	}

	useEffect(() => {
		setCards(deck);
	}, [deck]);

	return (
		<div className={className}>
			{cards.map((card) => (
				<div className={getClass(className, card)} key={card.id}>
					<img
						className={cardClass}
						src={cardClass === "front" ? card.img : card.cover}
						alt={cardClass}
						onDoubleClick={zoom}
						draggable="false"
					/>
					{className === "cpuField" ? (
						<span className="badge">
							{card.damage} / {card.health}
						</span>
					) : (
						""
					)}
				</div>
			))}
		</div>
	);
}

export default Collection;
