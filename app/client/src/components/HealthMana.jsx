import { useEffect, useState, Fragment } from "react";

function HealthMana({ dependentState, health, mana, manaPool }) {
  const [showHealthMana, setShowHealthMana] = useState(false);

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
        <p className="health">❤ {health}</p>
        <p className="mana">
          {mana} / {manaPool}
        </p>
      </div>
    </Fragment>
  );
}

export default HealthMana;
