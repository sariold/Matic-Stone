import { useEffect, useState } from "react";
import { ReactSortable } from "react-sortablejs";
import * as card from "../utils/card";

function Collection({
	mana,
	setMana,
	disabled,
	deck,
	useDeck,
	affordable,
	setAffordable,
	id,
	className,
	cardClass,
	pull,
	put,
	setTurn,
}) {
	const [toPlay, setToPlay] = useState(null);

	const zoom = (event) => {
		event.target.classList.toggle("zoom");
	};

	if (className === "playerHand")
		return (
			<div className={className}>
				<ReactSortable
					sort={true}
					disabled={disabled}
					id={id}
					className={"leftSortable"}
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
							<div className="card" key={card.id}>
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
							</div>
						))}
					<ReactSortable
						sort={true}
						className={"rightSortable"}
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
							console.log(affordable[evt.oldIndex]);
							// toPlay = affordable[evt.oldIndex];
							setToPlay(affordable[evt.oldIndex]);
						}}
						onRemove={function (evt) {
							// console.log(evt.to);
							// console.log(evt.oldIndex);
							// console.log(deck[evt.oldIndex]);
							// console.log(mana);
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
								</div>
							))}
					</ReactSortable>
				</ReactSortable>
			</div>
		);
	else
		return (
			<ReactSortable
				sort={pull}
				disabled={disabled}
				id={id}
				className={className}
				list={deck}
				setList={useDeck}
				group={{
					name: className,
					put: put,
					pull: pull,
				}}
				onRemove={function (evt) {
					if (
						evt.from.className === "playerDeck" &&
						evt.to.className === "leftSortable"
					) {
						setTurn(false);
					}
				}}
			>
				{deck.map((card) => (
					<div className="card" key={card.id}>
						<img
							className={cardClass}
							src={cardClass === "front" ? card.img : card.cover}
							alt={cardClass}
							onDoubleClick={zoom}
							draggable="false"
						/>
					</div>
				))}
			</ReactSortable>
		);
}

export default Collection;
