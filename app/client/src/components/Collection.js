import { useEffect, useState } from "react";
import { ReactSortable } from "react-sortablejs";

function Collection({
	disabled,
	deck,
	useDeck,
	id,
	className,
	cardClass,
	pull,
	put,
}) {
	const zoom = (event) => {
		event.target.classList.toggle("zoom");
	};

	return (
		// <div id={id} className={className}>
		<ReactSortable
			disabled={!disabled}
			id={id}
			className={className}
			list={deck}
			setList={useDeck}
			group={{
				name: className,
				put: put,
				pull: pull,
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
		// </div>
	);
}

export default Collection;
