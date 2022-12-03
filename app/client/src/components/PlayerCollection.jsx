import { useEffect, useState, Fragment } from "react";
// @ts-ignore
import { ReactSortable } from "react-sortablejs";

/**
 * PlayerCollection component to display a deck of cards and allow
 * for interactivity and sorting.
 * @param {object} props - Game state and player deck information
 * @returns JSX react component element
 */
const PlayerCollection = ({
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
  const [viewable, setViewable] = useState(true);

  /**
   * Use effect to set the player deck state.
   */
  useEffect(() => {
    setPlayerDeck([...deck]);
  }, [deck]);

  /**
   * Determines if a card can be played based on its mana cost
   * and sets the appropriate class name for the card.
   * @param {object} card - Card object (creature / spell)
   * @returns Class name for card
   */
  const isAffordable = (card) => {
    return (
      (card.mana <= mana && !disabled ? "affordableCard" : "handCard") +
      (viewable ? " viewable" : "")
    );
  };

  /**
   * Get classname based on a card's location on the board.
   * @param {string} className - Class name for player collection
   * @param {object} card - Card object (creature / spell)
   * @returns Class name for card
   */
  const getClass = (className, card) => {
    if (className !== "playerField") return "backStack";
    if (className === "playerField") {
      if (card.attacking) return "tapped attackPlayer";
      return card.tapped ? "tapped" : "card";
    }
    return "card";
  };

  if (className === "playerHand")
    // Player hand collection.
    return (
      <Fragment>
        <ReactSortable
          sort={true}
          className={"playerHand"}
          disabled={disabled}
          list={playerDeck}
          setList={useDeck}
          group={{
            name: className,
            put: put,
            pull: pull,
          }}
          animation={150}
          dragoverBubble={true}
          onStart={function (evt) {
            setToPlay(playerDeck[evt.oldIndex]);
          }}
          onMove={function (evt) {
            if (evt.to.className === "playerField") {
              if (toPlay.mana <= mana) {
                return true;
              } else return false;
            } else return true;
          }}
          onRemove={function (evt) {
            if (evt.to.className === "playerField") {
              if (toPlay.mana <= mana) setMana(mana - toPlay.mana);
            }
          }}
          onUnchoose={function (evt) {
            setViewable(true);
          }}
          onChoose={function (evt) {
            setViewable(false);
          }}
        >
          {playerDeck.map((card) => (
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
      </Fragment>
    );
  // Player collection that is either: deck, field, or discard.
  else
    return (
      <Fragment>
        <ReactSortable
          sort={false}
          disabled={disabled}
          className={className}
          list={playerDeck}
          setList={useDeck}
          group={{
            name: className,
            put: function (to) {
              if (className === "playerField") {
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
      </Fragment>
    );
};

export default PlayerCollection;
