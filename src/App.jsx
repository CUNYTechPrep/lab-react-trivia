import { useState } from "react";
import ResultCard from "./components/ResultCard";
import QuestionCard from "./components/QuestionCard";
import { shuffleArray } from "./lib/utils";
import rawTriviaQuestion from "./lib/data";

const triviaQuestion = rawTriviaQuestion.results[0];

const URL = "https://opentdb.com/api.php?amount=1&category=9&type=multiple";

function App() {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [questionData, setQuestionData] = useState(triviaQuestion);

  const selectAnswer = (selection) => {
    setSelectedAnswer(selection);
  };

  // It is having that rate limit issue, where if you click next question too fast it wont go to the next question but rather reload this question.

  const fetchQuestion = async () => {
    setQuestionData(null);
    const response = await fetch(URL);
    const data = await response.json();
    setQuestionData(data.results[0]);
  };

  const handleNextQuestion = () => {
    fetchQuestion();
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
    let options = [
      questionData.correct_answer,
      ...questionData.incorrect_answers,
    ];
    card = (
      <QuestionCard
        question={questionData.question}
        options={shuffleArray(options)}
        selectAnswer={selectAnswer}
      />
    );
  }

  return (
    <div className="w-100 my-5 d-flex justify-content-center align-items-center">
      <div style={{ maxWidth: "45%" }}>
        <h1 className="text-center">Trivia App</h1>
        <button className="btn btn-success" onClick={handleNextQuestion}>
          Next Question
        </button>
        {card}
      </div>
    </div>
  );
}

export default App;
