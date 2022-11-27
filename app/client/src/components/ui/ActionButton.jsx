import { useEffect, useState, Fragment } from "react";

const ActionButton = ({ dependentState, gameFunction, text }) => {
  const [showButton, setShowButton] = useState(false);

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
