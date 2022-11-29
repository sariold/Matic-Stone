import { useEffect, useState, Fragment } from "react";

function TurnInfo({
  dependentState,
  turnState,
  gameFunction,
  turnCount,
  setTurnCounter,
}) {
  const turnTime = 20;
  const [showTurnInfo, setShowTurnInfo] = useState(false);
  const [currentTurn, setCurrentTurn] = useState(turnState);

  const [count, setCount] = useState(turnCount);
  const [seconds, setSeconds] = useState(turnTime);
  const [isOn, setOn] = useState(false);

  useEffect(() => {
    setCount(turnCount);
  }, [turnCount]);

  useEffect(() => {
    setShowTurnInfo(dependentState);
    if (!dependentState) setOn(true);
    else if (dependentState) setOn(false);
  }, [dependentState]);

  useEffect(() => {
    setCurrentTurn(turnState);
    const changeTurn = () => {
      return setSeconds(turnTime);
    };
    changeTurn();
  }, [turnState]);

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
