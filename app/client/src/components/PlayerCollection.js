import { useEffect, useState } from "react";
import { ReactSortable } from "react-sortablejs";

function PlayerCollection({
	mana,
	setMana,
	disabled,
	deck,
	useDeck,
	className,
	cardClass,
	pull,
	put,
	setDrawn,
}) {
	const [toPlay, setToPlay] = useState(null);

	// useEffect(() => {
	// 	console.log(toPlay);
	// }, [toPlay]);

	function isAffordable(card) {
		return card.mana <= mana ? "affordableCard" : "handCard";
	}

	function getClass(className, card) {
		if (className !== "playerField") return "backStack";
		return className === "playerField" && card.tapped === true
			? "tapped"
			: "card";
	}

	if (className === "playerHand")
		return (
			<ReactSortable
				sort={false}
				className={"playerHand"}
				disabled={disabled}
				list={deck}
				setList={useDeck}
				group={{
					name: className,
					put: put,
					pull: pull,
				}}
				fallbackOnBody={true}
				invertSwap={true}
				forceFallback={false}
				// draggable={[".affordable", ".card"]}
				// dragoverBubble={true}
				onStart={function (evt) {
					console.log("meow");
					setToPlay(deck[evt.oldIndex]);
				}}
				onMove={function (evt) {
					if (evt.to.className === "playerField") {
						console.log(toPlay);
						if (toPlay.mana <= mana) {
							// setMana(mana - toPlay.mana);
							return true;
						} else return false;
					} else return true;
				}}
				onRemove={function (evt) {
					if (evt.to.className === "playerField") {
						console.log(toPlay);
						if (toPlay.mana <= mana) setMana(mana - toPlay.mana);
					}
				}}
			>
				{deck
					// .filter((card) => card.mana <= mana)
					.map((card) => (
						<div className="playerCard" key={card.id}>
							<div className={isAffordable(card)}>
								<img
									className={cardClass}
									src={card.img}
									alt={cardClass}
									draggable="false"
								/>
								<span className="badge">
									{card.damage} / {card.health}
								</span>
							</div>
						</div>
					))}
			</ReactSortable>
		);
	else
		return (
			<ReactSortable
				sort={pull}
				disabled={disabled}
				className={className}
				list={deck}
				setList={useDeck}
				group={{
					name: className,
					// put: function (evt) {
					// 	if (className === "playerField") console.log(evt);
					// },
					put: function (to) {
						// console.log(to);
						if (className === "playerField") {
							// 	console.log(toPlay);
							if (to.el.children.length < 5) return true;
							else return false;
						} else return put;
					},
					pull: pull,
				}}
				onRemove={function (evt) {
					if (
						evt.from.className === "playerDeck" &&
						(evt.to.className === "playerHand" ||
							evt.to.className === "playerDiscard")
					) {
						setDrawn(true);
					}
				}}
			>
				{deck.map((card) => (
					<div className={getClass(className, card)} key={card.id}>
						<img
							className={cardClass}
							src={cardClass === "front" ? card.img : card.cover}
							alt={cardClass}
							draggable="false"
						/>
						{className === "playerField" ? (
							<span className="badge">
								{card.damage} / {card.health}
							</span>
						) : (
							""
						)}
					</div>
				))}
			</ReactSortable>
		);
}

export default PlayerCollection;
