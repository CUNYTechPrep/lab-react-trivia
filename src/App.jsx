import { useState, useEffect } from "react";
import ResultCard from "./components/ResultCard";
import QuestionCard from "./components/QuestionCard";
import { shuffleArray } from "./lib/utils";

function App() {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [questionData, setQuestionData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNewQuestion();
  }, []);

  const fetchNewQuestion = () => {
    setLoading(true);
    setSelectedAnswer(null);
    fetch('https://opentdb.com/api.php?amount=1&category=9&type=multiple')
      .then(response => response.json())
      .then(data => {
        setQuestionData(data.results[0]);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching question:", error);
        setLoading(false);
      });
  };

  const selectAnswer = (selection) => {
    setSelectedAnswer(selection);
  };

  let card;

  if (loading) {
    card = <p>Loading...</p>;
  } else if (selectedAnswer) {
    card = (
      <ResultCard
        correct={selectedAnswer === questionData.correct_answer}
        answer={questionData.correct_answer}
      />
    );
  } else if (questionData) {
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
        <button className="btn btn-success mb-3" onClick={fetchNewQuestion}>Next Question</button>
        {card}
      </div>
    </div>
  );
}

export default App;