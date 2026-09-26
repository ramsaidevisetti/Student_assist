import { useState } from "react";

function FlashcardDeck({ cards, onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const currentCard = cards[currentIndex];
  const isLastCard = currentIndex === cards.length - 1;

  function handleNext() {
    if (isLastCard) {
      onComplete({
        knownCards: cards.map((card) => card.id),
        wrongCards: []
      });
      return;
    }

    setCurrentIndex((previous) => previous + 1);
    setFlipped(false);
  }

  function handlePrevious() {
    if (currentIndex === 0) return;

    setCurrentIndex((previous) => previous - 1);
    setFlipped(false);
  }

  return (
    <div className="flashcard-section">

      <div className="section-header">
        <div>
          <p className="eyebrow">FLASHCARDS</p>
          <h2>Review your material</h2>
        </div>

        <span className="progress">
          {currentIndex + 1} / {cards.length}
        </span>
      </div>

      <div
        className={`flashcard ${flipped ? "flipped" : ""}`}
        onClick={() => setFlipped((previous) => !previous)}
      >
        <div className="card-content">

          {!flipped ? (
            <>
              <span className="card-label">
                QUESTION
              </span>

              <h3>{currentCard.question}</h3>

              <p className="flip-hint">
                Click to reveal answer
              </p>
            </>
          ) : (
            <>
              <span className="card-label">
                ANSWER
              </span>

              <p className="answer">
                {currentCard.answer}
              </p>

              <span
                className={`difficulty ${currentCard.difficulty}`}
              >
                {currentCard.difficulty}
              </span>
            </>
          )}

        </div>
      </div>

      <div className="card-navigation">

        <button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
        >
          ← Previous
        </button>

        <button
          className="primary-button"
          onClick={handleNext}
        >
          {isLastCard ? "Finish Flashcards" : "Next →"}
        </button>

      </div>

    </div>
  );
}

export default FlashcardDeck;