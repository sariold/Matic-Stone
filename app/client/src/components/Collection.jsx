import { useEffect, useState, Fragment } from "react";

/**
 * Opponent player collection component to display a collection of cards.
 * @param {object} props - Deck information
 * @returns JSX react component element
 */
const Collection = ({ deck, className, cardClass }) => {
  const [cards, setCards] = useState(deck);

  /**
   * Use effect to set the deck state.
   */
  useEffect(() => {
    setCards([...deck]);
  }, [deck]);

  /**
   * Determine the card class based on card location on board.
   * @param {string} className - Outer div component
   * @param {object} card - Card object (creature / spell)
   * @returns Appropriate class name
   */
  const getClass = (className, card) => {
    if (className === "cpuHand") return "cards";
    if (className !== "cpuField") return "backStack";
    if (className === "cpuField") {
      if (card.attacking) return "tapped attackCPU";
      return card.tapped ? "tapped" : "cards";
    }
    return "cards";
  };

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
