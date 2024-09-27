import { useState, useEffect } from "react";
import ResultCard from "./components/ResultCard";
import QuestionCard from "./components/QuestionCard";
import { shuffleArray } from "./lib/utils";
import rawTriviaQuestion from "./lib/data";
 
// API URL to fetch a new question
const API_URL = "https://opentdb.com/api.php?amount=1&category=9&type=multiple";
 
function App() {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [questionData, setQuestionData] = useState(null);
 
  // Function to fetch a new question from the API
  const fetchNewQuestion =
   async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    setQuestionData(data.results[0]); // ??????? Set the new question data ?????????????????????????
    setSelectedAnswer(null); // Reset selected answer
  };
 
  // Use useEffect to fetch the initial question when the component mounts
  useEffect(() => {
    fetchNewQuestion();
  }, []);
 
  const selectAnswer = (selection) => {
    setSelectedAnswer(selection);
  };
 
  let card;
 
  if (!questionData) {
    // Render loading state if questionData is null
    card = <div>Loading...</div>;
  } else if (selectedAnswer) {
    // Render ResultCard if an answer is selected
    card = (
      <ResultCard
        correct={selectedAnswer === questionData.correct_answer}
        answer={questionData.correct_answer}
      />
    );
  } else {
    // Shuffle options and render QuestionCard if no answer is selected
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
        <button className="btn btn-success" onClick={fetchNewQuestion}>
          Next Question
        </button>
        {card}
      </div>
    </div>
  );
}
export default App;