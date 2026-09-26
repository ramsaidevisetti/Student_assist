function FlashcardComplete({ onTakeQuiz }) {
  return (
    <div className="completion-card">

      <div className="completion-icon">
        ✓
      </div>

      <p className="eyebrow">
        FLASHCARDS COMPLETE
      </p>

      <h2>
        Nice work!
      </h2>

      <p className="completion-message">
        You've finished reviewing this study set.
      </p>

      <div className="completion-actions">
        <button
          className="primary-button"
          onClick={onTakeQuiz}
        >
          Take Quiz →
        </button>
      </div>

    </div>
  );
}

export default FlashcardComplete;