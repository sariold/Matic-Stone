import { useEffect, useState } from "react";
import { ReactSortable } from "react-sortablejs";
import * as card from "../utils/card";

function PlayerCollection({
	mana,
	setMana,
	disabled,
	deck,
	useDeck,
	affordable,
	setAffordable,
	className,
	cardClass,
	pull,
	put,
	setTurn,
}) {
	const [toPlay, setToPlay] = useState(null);

	const zoom = (event) => {
		if (event.target.classList.contains("front"))
			event.target.classList.toggle("zoom");
	};

	if (className === "playerHand")
		return (
			<div className={className}>
				<ReactSortable
					sort={true}
					className={"leftSortable"}
					disabled={disabled}
					list={affordable}
					setList={setAffordable}
					group={{
						name: "affordable",
						put: "affordable",
						pull: pull,
					}}
					// onMove={function (evt) {
					// 	console.log(deck[evt.oldIndex]);
					// }}
					onChoose={function (evt) {
						// console.log(evt.oldIndex);
						// console.log(affordable[evt.oldIndex]);
						// toPlay = affordable[evt.oldIndex];
						setToPlay(affordable[evt.oldIndex]);
					}}
					onRemove={function (evt) {
						// console.log(evt.to);
						// console.log(evt.oldIndex);
						// console.log(deck[evt.oldIndex]);
						// console.log(mana);
						if (evt.to.className === "playerField")
							setMana(mana - toPlay.mana);
					}}
				>
					{affordable
						// .filter((card) => card.mana <= mana)
						.map((card) => (
							<div className="card affordable" key={card.id}>
								<img
									className={cardClass}
									src={
										cardClass === "front"
											? card.img
											: card.cover
									}
									alt={cardClass}
									onDoubleClick={zoom}
									draggable="false"
								/>
								{className === "playerHand" ? (
									<span className="badge">
										{card.damage} / {card.health}
									</span>
								) : (
									""
								)}
							</div>
						))}
				</ReactSortable>
				<ReactSortable
					sort={true}
					disabled={disabled}
					className={"rightSortable"}
					list={deck}
					setList={useDeck}
					group={{
						name: className,
						put: put,
						pull: pull,
					}}
					draggable={".card"}
				>
					{deck
						.filter((card) => card.mana > mana)
						.map((card) => (
							<div className={"card"} key={card.id}>
								<img
									className={cardClass}
									src={
										cardClass === "front"
											? card.img
											: card.cover
									}
									alt={cardClass}
									onDoubleClick={zoom}
									draggable="false"
								/>
								{className === "playerHand" ? (
									<span className="badge">
										{card.damage} / {card.health}
									</span>
								) : (
									""
								)}
							</div>
						))}
				</ReactSortable>
			</div>
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
					put: function (to) {
						// console.log(to);
						if (className === "playerField")
							if (to.el.children.length < 3) return "affordable";
							else return false;
						else return put;
					},
					pull: pull,
				}}
				onRemove={function (evt) {
					if (
						evt.from.className === "playerDeck" &&
						evt.to.className === "rightSortable"
					) {
						setTurn(false);
					}
				}}
			>
				{deck.map((card) => (
					<div
						className={
							className === "playerField" && card.tapped
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
