function ResultCard({ correct, answer }) {
  return (
    <>
      <h2>You answer is {correct ? `correct ✅` : `wrong ❌`}</h2>
      {!correct && <p>The correct answer was {answer}</p>}
    </>
  );
}

export default ResultCard;
