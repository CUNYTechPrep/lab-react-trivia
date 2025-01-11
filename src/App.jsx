import { useState } from "react";
import ResultCard from "./components/ResultCard";
import QuestionCard from "./components/QuestionCard";
import { shuffleArray } from "./lib/utils";
import rawTriviaQuestion from "./lib/data";

const triviaQuestion = rawTriviaQuestion.results[0];

function App() {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [questionData, setQuestionData] = useState(triviaQuestion);

  const selectAnswer = (selection) => {
    setSelectedAnswer(selection);
  };

  const fetchNewQuestion = async () => {
    try {
      const response = await fetch('https://opentdb.com/api.php?amount=1&category=9&type=multiple');
      if (!response.ok) {
        throw new Error(`HTTP error. Status: ${response.status}`);
      }
      const newQuestionData = await response.json();
      if (!newQuestionData.results || newQuestionData.results.length === 0) {
        throw new Error('No questions found in API response.');
      }
      setSelectedAnswer(null);
      setQuestionData(newQuestionData.results[0]);
    } catch (error) {
      console.error('Error fetching new question data: ', error.message);
    }
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
        <button className="btn btn-success" onClick={fetchNewQuestion}>Next Question</button>
        {card}
      </div>
    </div>
  );
}

export default App;
