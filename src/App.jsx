import { useState } from "react";
import "./App.css";
import { Input } from "@mui/material";
import { TimerComponent } from "./components/TimerComponent";
import { useDispatch, useSelector } from "react-redux";
import {
  incQuestCounter,
  reset,
  setMaxValue,
  setShowResult,
  setStopQuiz,
  resetRightAnswer,
} from "./features/mainSlice";
import "./assets/style.css";
import QuizComponent from "./components/QuizComponent";

function App() {
  const dispatch = useDispatch();
  const { stopQuiz, maxValue, rightAnswer, questionCount, showResult } =
    useSelector((state) => state.main);

  const operatorDictionary = {
    "*": "Multiplication",
    "/": "Division",
    "+": "Addition",
    "-": "Subtraction",
  };

  const [maxValueInput, setMaxValueInput] = useState(null);
  const [error, setError] = useState(null);
  const [operator, setOperator] = useState("*");

  return (
    <>
      <div className="display">
        {showResult === true ? (
          <button
            onClick={() => {
              dispatch(reset());
              dispatch(setMaxValue(0));
              dispatch(incQuestCounter(0));
              dispatch(setShowResult(false));
              dispatch(resetRightAnswer());
            }}
            className="button button-start"
          >
            Reset
          </button>
        ) : null}
        {showResult === false ? (
          <h1>Try your {operatorDictionary[operator]} Speed and Accuracy: </h1>
        ) : (
          <h1>Here is your result</h1>
        )}

        {showResult === false ? (
          <select
            value={operator}
            onChange={(e) => setOperator(e.target.value)}
            className="select"
          >
            <option value="*">Multiplication</option>
            <option value="/">Division</option>
            <option value="+">Addition</option>
            <option value="-">Subtraction</option>
          </select>
        ) : null}

        <b>{error}</b>
        {stopQuiz === null && showResult === false ? (
          <Input
            className="input"
            onChange={(e) => setMaxValueInput(e.target.value)}
            placeholder="Enter time limit in seconds"
          ></Input>
        ) : null}
        {stopQuiz === null || stopQuiz !== false ? (
          showResult === false ? (
            <button
              onClick={() => {
                if (maxValueInput !== null) {
                  let input = Number(maxValueInput);
                  dispatch(setMaxValue(input));
                  dispatch(setStopQuiz(false));
                  setMaxValueInput(null);
                  setError(null);
                } else {
                  setError("You didn't enter the maximum time limit");
                }
              }}
              className="button button-start"
            >
              StartQuiz
            </button>
          ) : null
        ) : (
          <button
            onClick={() => {
              dispatch(reset());
              dispatch(setShowResult(true));
            }}
            className="button button-stop"
          >
            StopQuiz
          </button>
        )}
        {stopQuiz === false && stopQuiz !== null ? (
          <>
            <TimerComponent />

            {/* <ContainerComponent /> */}
            <QuizComponent operator={operator} />
          </>
        ) : null}

        {showResult === true ? (
          <>
            <div className="result">
              <br></br>
              <br></br>
              <h4>
                {questionCount !== 0 ? (
                  <>
                    Your Score <h2>{questionCount}</h2>
                  </>
                ) : null}
              </h4>
              <h4>
                {questionCount !== 0 ? (
                  <>
                    Your right answers were{" "}
                    {(rightAnswer / questionCount) * 100}% of the attended
                    answers
                  </>
                ) : (
                  <>You didn't answer any question</>
                )}
              </h4>
              <h4>
                {questionCount !== 0 ? (
                  <>You attended {questionCount} of answers</>
                ) : null}
              </h4>
              <h4>
                {questionCount !== 0 ? (
                  <>
                    Your speed is {(questionCount / maxValue).toFixed(2)} questions / second
                  </>
                ) : null}
              </h4>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
}

export default App;
