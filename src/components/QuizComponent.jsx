import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { incQuestCounter, setRightAnswer } from "../features/mainSlice";
import { Input } from "@mui/material";
import "../assets/style.css";

export default function QuizComponent(props) {
  const [number1, setNumber1] = useState();
  const [number2, setNumber2] = useState();

  const [answer, setAnswer] = useState("");
  const dispatch = useDispatch();

  const { operator } = props;

  const { stopQuiz, questionCount } = useSelector((state) => state.main);

  function submit() {
    if (stopQuiz === false) {
      if (
        answer !== null &&
        eval(`${number1}${operator}${number2}`) === Number(answer)
      ) {
        dispatch(setRightAnswer());
      }
      dispatch(incQuestCounter(questionCount + 1));
    } else {
      return 0;
    }
  }

  useEffect(() => {
    if (stopQuiz === false) {
      let number1 = Math.floor(Math.random() * 100);
      let number2 = Math.floor(Math.random() * 100);

      if ((operator === "-" || operator === "/") && number1 < number2) {
        setNumber1(number2);
        setNumber2(number1);
      } else {
        setNumber1(number1);
        setNumber2(number2);
      }
      setAnswer("");
    }
  }, [questionCount]);

  return (
    <>
      <div className="quiz-display">
        <div className="question-display">
          <h2 className="number1">{number1}</h2>
          <b className="operator">{operator}</b>
          <h2 className="number2">{number2}</h2>
          <br></br>
        </div>
        <Input
          className="answer-input"
          onChange={(e) => setAnswer(e.target.value)}
          value={answer}
          type="number"
        ></Input>
        <button className="button-quiz" onClick={submit}>
          Submit
        </button>
      </div>
    </>
  );
}
