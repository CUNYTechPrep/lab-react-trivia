import { useState, useEffect } from "react";
import ResultCard from "./components/ResultCard";
import QuestionCard from "./components/QuestionCard";
import { shuffleArray } from "./lib/utils";

const TRIVIA_API_URL =
  "https://opentdb.com/api.php?amount=1&category=9&type=multiple";

function App() {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [questionData, setQuestionData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchNewQuestion = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(TRIVIA_API_URL);
      if (!response.ok) {
        throw new Error("Failed to fetch the question");
      }

      const data = await response.json();
      const newQuestion = data.results[0];
      setQuestionData(newQuestion);
      setSelectedAnswer(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNewQuestion();
  }, []);

  const selectAnswer = (selection) => {
    setSelectedAnswer(selection);
  };

  let card;

  if (loading) {
    card = <p>Loading...</p>;
  } else if (error) {
    card = <p>Error: {error}</p>;
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
        <button
          className="btn btn-success mb-4"
          onClick={fetchNewQuestion}
          disabled={loading}
        >
          Next Question
        </button>
        {card}
      </div>
    </div>
  );
}

export default App;
