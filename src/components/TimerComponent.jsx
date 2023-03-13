import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShowResult, setStopQuiz } from "../features/mainSlice";
import "../assets/style.css";

export function TimerComponent() {
  const { maxValue, stopQuiz } = useSelector((state) => state.main);
  const dispatch = useDispatch();
  const [timerStateValue, setTimerStateValue] = useState(0);

  if (stopQuiz === false && timerStateValue === maxValue) {
    dispatch(setStopQuiz(true));
    dispatch(setShowResult(true));
  }

  useEffect(() => {
    if (stopQuiz === false) {
      setTimeout(() => {
        setTimerStateValue(timerStateValue + 1);
      }, 1000);
    }
  }, [timerStateValue]);

  return (
    <div className="timer-style">
      <h2 className="timer">{maxValue - timerStateValue}</h2>
    </div>
  );
}
