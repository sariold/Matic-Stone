import { useEffect, useState, Fragment } from "react";

const Collection = ({ deck, className, cardClass }) => {
  const [cards, setCards] = useState(deck);

  function getClass(className, card) {
    if (className === "cpuHand") return "cards";
    if (className !== "cpuField") return "backStack";
    if (className === "cpuField") {
      if (card.attacking) return "tapped attackCPU";
      return card.tapped ? "tapped" : "cards";
    }
    return "cards";
  }

  useEffect(() => {
    if (className === "cpuField") {
      console.log("CPU is adding card(s) to their field.");
      console.log(deck);
    }
    setCards([...deck]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deck]);

  return (
    <Fragment>
      <div className={className}>
        {cards.map((card) => (
          <div className={getClass(className, card)} key={card.id}>
            <img
              className={cardClass}
              src={cardClass === "front" ? card.img : card.cover}
              alt={cardClass}
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
    </Fragment>
  );
};

export default Collection;
