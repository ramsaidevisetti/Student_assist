function ErrorState({ message, onRetry }) {
  return (
    <div className="state-card error-state">
      <h3>Couldn't generate study material</h3>

      <p>{message}</p>

      <button onClick={onRetry}>
        Try Again
      </button>
    </div>
  );
}

export default ErrorState;