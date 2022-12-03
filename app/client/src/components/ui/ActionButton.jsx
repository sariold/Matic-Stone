import { useEffect, useState, Fragment } from "react";

/**
 * ActionButton component for buttons which trigger game actions.
 * @param {object} props - Game state information
 * @returns JSX react component element
 */
const ActionButton = ({ dependentState, gameFunction, text }) => {
  const [showButton, setShowButton] = useState(false);

  /**
   * Use effect to determine display state of button.
   */
  useEffect(() => {
    setShowButton(dependentState);
  }, [dependentState]);

  return (
    <Fragment>
      <div
        className="actionButton"
        style={{ visibility: `${showButton ? "visible" : "hidden"}` }}
      >
        <button
          className="btn btn-success"
          onClick={() => {
            gameFunction();
          }}
        >
          {text}
        </button>
      </div>
    </Fragment>
  );
};

export default ActionButton;
