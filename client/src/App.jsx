import { useRef, useState } from "react";

import { generateStudyMaterial } from "./lib/api";
import { validateStudyResult } from "./lib/validateResult";

import Quiz from "./components/Quiz";
import QuizComplete from "./components/QuizComplete";
import LoadingState from "./components/LoadingState";
import ErrorState from "./components/ErrorState";
import EmptyState from "./components/EmptyState";
import FlashcardDeck from "./components/FlashcardDeck";
import FlashcardComplete from "./components/FlashcardComplete";

function App() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [studyMode, setStudyMode] = useState("flashcards");

  const [quizResult, setQuizResult] = useState(null);
  const [quizQuestions, setQuizQuestions] = useState([]);

  const requestId = useRef(0);
  const abortController = useRef(null);

  async function generate() {
    if (!input.trim()) {
      setError("Please enter a topic or some study material.");
      return;
    }

    const currentRequestId = ++requestId.current;

    // Cancel previous request if it is still running
    if (abortController.current) {
      abortController.current.abort();
    }

    const controller = new AbortController();
    abortController.current = controller;

    // Reset previous study session
    setLoading(true);
    setError("");
    setResult(null);
    setStudyMode("flashcards");
    setQuizResult(null);
    setQuizQuestions([]);

    try {
      const data = await generateStudyMaterial(
        input,
        controller.signal
      );

      // Ignore stale response
      if (currentRequestId !== requestId.current) {
        return;
      }

      // Validate AI result before rendering
      if (!validateStudyResult(data)) {
        throw new Error(
          "The AI returned data in an unexpected format."
        );
      }

      setResult(data);
    } catch (error) {
      // Ignore intentionally cancelled requests
      if (error.name === "AbortError") {
        return;
      }

      // Ignore stale errors
      if (currentRequestId !== requestId.current) {
        return;
      }

      setError(
        error.message || "Failed to generate study material."
      );
    } finally {
      if (currentRequestId === requestId.current) {
        setLoading(false);
      }
    }
  }

  // -------------------------
  // Flashcard handlers
  // -------------------------

  function handleFlashcardComplete() {
    setStudyMode("complete");
  }

  // -------------------------
  // Quiz handlers
  // -------------------------

  function startQuiz() {
    if (!result?.quiz?.length) {
      return;
    }

    setQuizQuestions(result.quiz);
    setQuizResult(null);
    setStudyMode("quiz");
  }

  function handleQuizComplete(summary) {
    setQuizResult(summary);
    setStudyMode("quiz-complete");
  }

  function retryQuiz() {
    if (!result?.quiz?.length) {
      return;
    }

    setQuizQuestions(result.quiz);
    setQuizResult(null);
    setStudyMode("quiz");
  }

  function retryWrongQuiz() {
    if (!quizResult?.wrongQuestions?.length) {
      return;
    }

    setQuizQuestions(quizResult.wrongQuestions);
    setQuizResult(null);
    setStudyMode("quiz");
  }

  return (
    <main className="app">

      {/* =========================
          HERO / INPUT
      ========================== */}

      <section className="hero">

        <p className="eyebrow">
          FLAM AI ASSIGNMENT
        </p>

        <h1>
          Study smarter with AI.
        </h1>

        <p className="subtitle">
          Turn your notes or any topic into interactive
          flashcards and quizzes.
        </p>

        <textarea
          value={input}
          onChange={(event) =>
            setInput(event.target.value)
          }
          placeholder="Paste your notes or describe what you want to study..."
          rows={7}
          disabled={loading}
        />

        <button
          className="generate-button"
          onClick={generate}
          disabled={loading}
        >
          {loading
            ? "Generating..."
            : "Generate Study Material"}
        </button>

      </section>

      {/* =========================
          RESULTS
      ========================== */}

      <section className="results">

        {/* Loading */}

        {loading && <LoadingState />}

        {/* Error */}

        {!loading && error && (
          <ErrorState
            message={error}
            onRetry={generate}
          />
        )}

        {/* Empty */}

        {!loading && !error && !result && (
          <EmptyState />
        )}

        {/* Generated Result */}

        {!loading && !error && result && (

          <div className="study-content">

            {/* Study Header */}

            <div className="study-header">

              <p className="eyebrow">
                YOUR STUDY SET
              </p>

              <h2>
                {result.title}
              </h2>

              <p>
                {result.cards.length} flashcards ·{" "}
                {result.quiz.length} quiz questions
              </p>

            </div>

            {/* =========================
                FLASHCARDS
            ========================== */}

            {studyMode === "flashcards" && (
              <FlashcardDeck
                cards={result.cards}
                onComplete={handleFlashcardComplete}
              />
            )}

            {/* =========================
                FLASHCARD COMPLETE
            ========================== */}

            {studyMode === "complete" && (
              <FlashcardComplete
                onTakeQuiz={startQuiz}
              />
            )}

            {/* =========================
                QUIZ
            ========================== */}

            {studyMode === "quiz" && (
              <Quiz
                questions={quizQuestions}
                onComplete={handleQuizComplete}
              />
            )}

            {/* =========================
                QUIZ COMPLETE
            ========================== */}

            {studyMode === "quiz-complete" &&
              quizResult && (
                <QuizComplete
                  score={quizResult.score}
                  total={quizResult.total}
                  wrongQuestions={
                    quizResult.wrongQuestions
                  }
                  onRetry={retryQuiz}
                  onRetryWrong={retryWrongQuiz}
                />
              )}

          </div>
        )}

      </section>

    </main>
  );
}

export default App;