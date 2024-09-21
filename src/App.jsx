import { useState} from "react";
import ResultCard from "./components/ResultCard";
import QuestionCard from "./components/QuestionCard";
import { shuffleArray } from "./lib/utils";
import rawTriviaQuestion from "./lib/data";


// Since react rerenders on state change, I might not need to use useEffect and useState to wrap the card conditional block in a function.

const triviaQuestion = rawTriviaQuestion.results[0];

function App() {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [questionData, setQuestionData] = useState(triviaQuestion);

  const selectAnswer = (selection) => {
    setSelectedAnswer(selection);
  };

  let card;


    if (selectedAnswer) {
      card = (
        <ResultCard
          correct={selectedAnswer === questionData.correct_answer}
          answer={questionData.correct_answer}
        />
      );
    } else {
      let tempArr = [...questionData.incorrect_answers];
      console.log("Temp Arr", tempArr);
      console.log(tempArr[0]);
      let options = [questionData.correct_answer, ...tempArr];
      card = (
        <QuestionCard
          question={questionData.question}
          options={shuffleArray(options)}
          selectAnswer={selectAnswer}
        />
      );
    }
  function getNextQuestion() {
    fetch("https://opentdb.com/api.php?amount=1&category=9&type=multiple")
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          console.log(response.status);
        }
      })
      .then((data) => {
        setQuestionData(data.results[0]);
        console.log("data", questionData);
        setSelectedAnswer(false);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }

  return (
    <div className="w-100 my-5 d-flex justify-content-center align-items-center">
      <div style={{ maxWidth: "45%" }}>
        <h1 className="text-center">Trivia App</h1>
        <button className="btn btn-success" onClick={() => getNextQuestion()}>
          Next Question
        </button>
        {card}
      </div>
    </div>
  );
}

export default App;