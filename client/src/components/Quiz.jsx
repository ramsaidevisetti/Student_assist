import { useState } from "react";

function Quiz({ questions, onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [wrongQuestions, setWrongQuestions] = useState([]);

  const currentQuestion = questions[currentIndex];

  const isLastQuestion =
    currentIndex === questions.length - 1;

 function selectAnswer(option) {
  if (answered) return;

  setSelectedAnswer(option);
  setAnswered(true);

  if (option === currentQuestion.correctAnswer) {
    setScore((previous) => previous + 1);
  } else {
    setWrongQuestions((previous) => [
      ...previous,
      currentQuestion
    ]);
  }
}

  function nextQuestion() {
  if (!answered) return;

  if (isLastQuestion) {
    const finalScore =
      score +
      (selectedAnswer === currentQuestion.correctAnswer
        ? 1
        : 0);

    const finalWrongQuestions =
      selectedAnswer === currentQuestion.correctAnswer
        ? wrongQuestions
        : [...wrongQuestions, currentQuestion];

    onComplete({
      score: finalScore,
      total: questions.length,
      wrongQuestions: finalWrongQuestions
    });

    return;
  }

  setCurrentIndex((previous) => previous + 1);
  setSelectedAnswer(null);
  setAnswered(false);
}

  return (
    <div className="quiz-section">

      <div className="section-header">

        <div>
          <p className="eyebrow">QUIZ</p>

          <h2>Test your knowledge</h2>
        </div>

        <span className="progress">
          {currentIndex + 1} / {questions.length}
        </span>

      </div>

      <div className="quiz-card">

        <h3>
          {currentQuestion.question}
        </h3>

        <div className="quiz-options">

          {currentQuestion.options.map((option) => {

            const isSelected =
              selectedAnswer === option;

            const isCorrect =
              option === currentQuestion.correctAnswer;

            let className = "quiz-option";

            if (answered && isCorrect) {
              className += " correct";
            }

            if (
              answered &&
              isSelected &&
              !isCorrect
            ) {
              className += " incorrect";
            }

            return (
              <button
                key={option}
                className={className}
                onClick={() => selectAnswer(option)}
                disabled={answered}
              >
                <span>{option}</span>

                {answered && isCorrect && (
                  <span>✓</span>
                )}

                {answered &&
                  isSelected &&
                  !isCorrect && (
                    <span>✕</span>
                  )}
              </button>
            );
          })}

        </div>

        {answered && (
          <div className="quiz-explanation">

            <strong>
              {selectedAnswer ===
              currentQuestion.correctAnswer
                ? "Correct!"
                : "Not quite."}
            </strong>

            <p>
              {currentQuestion.explanation}
            </p>

          </div>
        )}

        <button
          className="primary-button quiz-next"
          onClick={nextQuestion}
          disabled={!answered}
        >
          {isLastQuestion
            ? "Finish Quiz"
            : "Next Question →"}
        </button>

      </div>

      <div className="quiz-score">
        Current score: {score} / {currentIndex}
      </div>

    </div>
  );
}

export default Quiz;