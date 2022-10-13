import { useEffect, useState } from "react";
import { ReactSortable } from "react-sortablejs";
import Button from "./ui/ActionButton";

const PlayerCollection = ({
	viewValue,
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
}) => {
	const [toPlay, setToPlay] = useState(null);

	const [playerDeck, setPlayerDeck] = useState(deck);

	const [viewable, setViewable] = useState(false);

	useEffect(() => {
		// if (className === "playerField") {
		// 	console.log("CHANGES");
		// 	console.log(deck);
		// }
		setPlayerDeck([...deck]);
	}, [deck]);

	// useEffect(() => {
	// 	console.log(toPlay);
	// }, [toPlay]);

	useEffect(() => {
		setViewable(viewValue);
	}, [viewValue]);

	function isAffordable(card) {
		return (
			(card.mana <= mana ? "affordableCard" : "handCard") +
			(viewable ? " viewable" : "")
		);
	}

	function getClass(className, card) {
		if (className !== "playerField") return "backStack";
		if (className === "playerField") {
			if (card.attacking) return "tapped attackPlayer";
			return card.tapped ? "tapped" : "card";
		}
		return "card";
	}

	if (className === "playerHand")
		return (
			<ReactSortable
				sort={true}
				className={"playerHand"}
				disabled={disabled || viewable}
				list={playerDeck}
				setList={useDeck}
				group={{
					name: className,
					put: put,
					pull: pull,
				}}
				// fallbackOnBody={true}
				// invertSwap={true}
				// forceFallback={false}
				// draggable={[".affordable", ".card"]}
				animation={150}
				dragoverBubble={true}
				ghostClass={"sortable-ghost"} // Class name for the drop placeholder
				chosenClass={"sortable-chosen"} // Class name for the chosen item
				dragClass={"sortable-drag"} // Class name for the dragging item
				// swapThreshold={1} // Threshold of the swap zone
				// invertSwap={false} // Will always use inverted swap zone if set to true
				// invertedSwapThreshold={1} // Threshold of the inverted swap zone (will be set to swapThreshold value by default)
				// direction={"horizontal"} // Direction of Sortable (will be detected automatically if not given)
				// forceFallback={false} // ignore the HTML5 DnD behaviour and force the fallback to kick in
				// fallbackClass={"sortable-fallback"} // Class name for the cloned DOM Element when using forceFallback
				// fallbackOnBody={false} // Appends the cloned DOM Element into the Document's Body
				// fallbackTolerance={0} // Specify in pixels how far the mouse should move before it's considered as a drag.
				// dragoverBubble={false}
				// removeCloneOnHide={true} // Remove the clone element when it is not showing, rather than just hiding it
				// emptyInsertThreshold={5} // px, distance mouse must be from empty sortable to insert drag element into it
				onStart={function (evt) {
					// console.log("meow");
					setToPlay(playerDeck[evt.oldIndex]);
				}}
				onMove={function (evt) {
					if (evt.to.className === "playerField") {
						// console.log(toPlay);
						if (toPlay.mana <= mana) {
							// setMana(mana - toPlay.mana);
							return true;
						} else return false;
					} else return true;
				}}
				onRemove={function (evt) {
					if (evt.to.className === "playerField") {
						// console.log(toPlay);
						if (toPlay.mana <= mana) setMana(mana - toPlay.mana);
					}
				}}
			>
				{playerDeck
					// .filter((card) => card.mana <= mana)
					.map((card) => (
						<div className="playerCard" key={card.id}>
							<div className={isAffordable(card)}>
								<img
									className={cardClass}
									src={card.img}
									alt={cardClass}
									draggable="true"
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
				sort={false}
				disabled={disabled}
				className={className}
				list={playerDeck}
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
				{playerDeck.map((card) => (
					<div className={getClass(className, card)} key={card.id}>
						<img
							className={cardClass}
							src={cardClass === "front" ? card.img : card.cover}
							alt={cardClass}
							draggable="true"
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
};

export default PlayerCollection;
