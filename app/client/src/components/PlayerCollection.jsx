import { useEffect, useState, Fragment } from "react";
// @ts-ignore
import { ReactSortable } from "react-sortablejs";

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
      <Fragment>
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
          animation={150}
          dragoverBubble={true}
          ghostClass={"sortable-ghost"} // Class name for the drop placeholder
          chosenClass={"sortable-chosen"} // Class name for the chosen item
          dragClass={"sortable-drag"} // Class name for the dragging item
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
