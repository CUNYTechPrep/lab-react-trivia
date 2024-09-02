import AnswerButton from "./AnswerButton";

function QuestionCard({ question, options, selectAnswer }) {
  return (
    <>
      <h2>{question}</h2>
      {options.map((option) => (
        <AnswerButton
          key={option}
          value={option}
          handleClick={() => selectAnswer(option)}
        />
      ))}
    </>
  );
}

export default QuestionCard;
