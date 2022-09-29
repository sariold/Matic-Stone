import { useEffect, useState } from "react";

function Collection({ deck, className, cardClass }) {
	const [cards, setCards] = useState(deck);

	const zoom = (event) => {
		if (event.target.classList.contains("front"))
			event.target.classList.toggle("zoom");
	};

	useEffect(() => {
		setCards(deck);
	}, [deck]);

	return (
		<div className={className}>
			{cards.map((card) => (
				<div
					className={
						className === "cpuField" && card.tapped
							? "tapped"
							: "card"
					}
					key={card.id}
				>
					<img
						className={cardClass}
						src={cardClass === "front" ? card.img : card.cover}
						alt={cardClass}
						onDoubleClick={zoom}
						draggable="false"
					/>
				</div>
			))}
		</div>
	);
}

export default Collection;
