import { useEffect, useState, Fragment } from "react";

/**
 * HealthMana component to show health and mana of the player.
 * @param {object} props - Game state and player information
 * @returns JSX react component element
 */
function HealthMana({ dependentState, health, mana, manaPool }) {
  const [showHealthMana, setShowHealthMana] = useState(false);

  /**
   * Use effect to determine if the health and mana should be displayed.
   */
  useEffect(() => {
    if (!dependentState) setShowHealthMana(true);
    else if (dependentState) setShowHealthMana(false);
  }, [dependentState]);

  return (
    <Fragment>
      <div
        style={{ visibility: `${showHealthMana ? "visible" : "hidden"}` }}
        className="turnInfo"
      >
        <p className="health">
          <span style={{ color: "red" }}> ❤ {health} </span> | ( {mana} /{" "}
          {manaPool} )
        </p>
      </div>
    </Fragment>
  );
}

export default HealthMana;
