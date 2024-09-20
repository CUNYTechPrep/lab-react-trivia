import { useState } from "react";
import ResultCard from "./components/ResultCard";
import QuestionCard from "./components/QuestionCard";
import { shuffleArray } from "./lib/utils";
import rawTriviaQuestion from "./lib/data";

// const triviaQuestion = rawTriviaQuestion.results[0];

function App() {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  // const [questionData, setQuestionData] = useState(triviaQuestion);
  const [questionIndex, setQuestionIndex] = useState(0);
  const[questionData, setQuestionData] = useState(rawTriviaQuestion.results[0]);

  const selectAnswer = (selection) => {
    setSelectedAnswer(selection);
  };

  const nextQuestion = () =>{
    const nextIndex = questionIndex +1;
    if(nextIndex <rawTriviaQuestion.results.length){
      setQuestionIndex(nextIndex);
      setQuestionData(rawTriviaQuestion.results[nextIndex]);
      setSelectedAnswer(null);
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
        <button onClick={nextQuestion} className="btn btn-success">Next Question</button>
        {card}
      </div>
    </div>
  );
}

export default App;
