import { useState, useEffect } from "react";
import ResultCard from "./components/ResultCard";
import QuestionCard from "./components/QuestionCard";
import { shuffleArray } from "./lib/utils";

function App() {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [questionData, setQuestionData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to fetch a new trivia question
  const fetchNewQuestion = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://opentdb.com/api.php?amount=1&category=9&type=multiple");
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        setQuestionData(data.results[0]);
      } else {
        console.error("No questions found.");
      }
    } catch (error) {
      console.error("Error fetching question:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNewQuestion(); // Fetch the first question when the component mounts
  }, []);

  const selectAnswer = (selection) => {
    setSelectedAnswer(selection);
  };

  const loadNewQuestion = () => {
    setSelectedAnswer(null); // Reset selected answer
    fetchNewQuestion(); // Fetch a new question
  };

  let card;

  if (selectedAnswer) {
    card = (
      <ResultCard
        correct={selectedAnswer === questionData.correct_answer}
        answer={questionData.correct_answer}
      />
    );
  } else if (loading) {
    card = <p>Loading question...</p>;
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
        <button className="btn btn-success" onClick={loadNewQuestion}>
          Next Question
        </button>
        {card}
      </div>
    </div>
  );
}

export default App;
