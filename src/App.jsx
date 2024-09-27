import { useEffect, useState } from "react";
import ResultCard from "./components/ResultCard";
import QuestionCard from "./components/QuestionCard";
import { shuffleArray } from "./lib/utils";
import rawTriviaQuestion from "./lib/data";

const triviaQuestion = rawTriviaQuestion.results[0];
const TRIVIA_API = 'https://opentdb.com/api.php?amount=1&category=9&type=multiple';

function App() {
  const [currentAnswer, setCurrentAnswer] = useState(null);
  const [currentQuestionData, setCurrentQuestionData] = useState(triviaQuestion);

  const handleAnswerSelect = (answer) => {
    setCurrentAnswer(answer);
  };

  let cardDisplay;
  if (currentAnswer) {
    cardDisplay = (
      <ResultCard
        correct={currentAnswer === currentQuestionData.correct_answer}
        answer={currentQuestionData.correct_answer}
      />
    );
  } else {
    let answerOptions = [
      currentQuestionData.correct_answer,
      ...currentQuestionData.incorrect_answers,
    ];
    cardDisplay = (
      <QuestionCard
        question={currentQuestionData.question}
        options={shuffleArray(answerOptions)}
        selectAnswer={handleAnswerSelect}
      />
    );
  }

  const fetchNewTrivia = async () => {
    const triviaFetch = fetch(TRIVIA_API);
    triviaFetch
      .then((response) => response.json())
      .then((data) => {
        setCurrentQuestionData(data.results[0]);
        setCurrentAnswer(null);
        console.log(data.results[0]);
      })
      .catch((error) => console.error('Error:', error));
  };

  return (
    <div className="w-100 my-5 d-flex justify-content-center align-items-center">
      <div style={{ maxWidth: "45%" }}>
        <h1 className="text-center">Trivia App</h1>
        <button className="btn btn-success" onClick={fetchNewTrivia}>Next Question</button>
        {cardDisplay}
      </div>
    </div>
  );
}

export default App;