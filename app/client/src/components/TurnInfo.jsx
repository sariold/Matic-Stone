import { useEffect, useState, Fragment } from "react";

/**
 * TurnInfo component to display the current turn information and time.
 * @param {object} props - Game state information to adjust turn information
 * @returns JSX react component element
 */
function TurnInfo({
  dependentState,
  turnState,
  gameFunction,
  turnCount,
  setTurnCounter,
}) {
  const turnTime = 15;

  const [showTurnInfo, setShowTurnInfo] = useState(false);
  const [currentTurn, setCurrentTurn] = useState(turnState);

  const [count, setCount] = useState(turnCount);
  const [seconds, setSeconds] = useState(turnTime);
  const [isOn, setOn] = useState(false);

  /**
   * Use effect to update the turn counter.
   */
  useEffect(() => {
    setCount(turnCount);
  }, [turnCount]);

  /**
   * Use effect to determine if the turn info should be displayed.
   */
  useEffect(() => {
    setShowTurnInfo(dependentState);
    if (!dependentState) setOn(true);
    else if (dependentState) setOn(false);
  }, [dependentState]);

  /**
   * Use effect to change turn and reset timer.
   */
  useEffect(() => {
    setCurrentTurn(turnState);
    const changeTurn = () => {
      return setSeconds(turnTime);
    };
    changeTurn();
  }, [turnState]);

  /**
   * Use effect to manage game timer countdown and reset.
   */
  useEffect(() => {
    let interval = null;
    if (isOn && !dependentState && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
      }, 1000);
    } else if ((!isOn && !dependentState) || seconds <= 0) {
      clearInterval(interval);
      setSeconds(turnTime);
      setTurnCounter(count + 1);
      gameFunction(!turnState);
    }
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOn, seconds]);

  return (
    <Fragment>
      <div
        style={{ visibility: `${!showTurnInfo ? "visible" : "hidden"}` }}
        className="turnInfo"
      >
        <p className="currentTurn">
          {currentTurn ? "Your turn!" : "CPU turn!"}
        </p>
        <p className="time">{seconds}s</p>
      </div>
    </Fragment>
  );
}

export default TurnInfo;
