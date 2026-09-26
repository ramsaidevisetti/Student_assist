function QuizComplete({
  score,
  total,
  wrongQuestions,
  onRetry,
  onRetryWrong
}) {
  const percentage = Math.round(
    (score / total) * 100
  );

  return (
    <div className="completion-card">

      <div className="completion-icon">
        {percentage >= 70 ? "✓" : "↻"}
      </div>

      <p className="eyebrow">
        QUIZ COMPLETE
      </p>

      <h2>
        {percentage >= 70
          ? "Great work!"
          : "Keep practicing!"}
      </h2>

      <div className="quiz-final-score">
        <strong>
          {score} / {total}
        </strong>

        <span>
          {percentage}% correct
        </span>
      </div>

      <div className="completion-actions">

        <button
          className="primary-button"
          onClick={onRetry}
        >
          Retry Quiz
        </button>

        {wrongQuestions.length > 0 && (
          <button
            className="secondary-button"
            onClick={onRetryWrong}
          >
            Retry Wrong Questions
          </button>
        )}

      </div>

    </div>
  );
}

export default QuizComplete;