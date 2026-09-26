export function validateStudyResult(data) {
  if (!data || typeof data !== "object") {
    return false;
  }

  if (
    typeof data.title !== "string" ||
    !data.title.trim()
  ) {
    return false;
  }

  if (!Array.isArray(data.cards) || data.cards.length === 0) {
    return false;
  }

  if (!Array.isArray(data.quiz) || data.quiz.length === 0) {
    return false;
  }

  const validCards = data.cards.every((card) => {
    return (
      typeof card.id === "string" &&
      typeof card.question === "string" &&
      card.question.trim() &&
      typeof card.answer === "string" &&
      card.answer.trim() &&
      ["easy", "medium", "hard"].includes(card.difficulty)
    );
  });

  if (!validCards) {
    return false;
  }

  const validQuiz = data.quiz.every((question) => {
    if (
      typeof question.id !== "string" ||
      typeof question.question !== "string" ||
      !question.question.trim() ||
      !Array.isArray(question.options) ||
      question.options.length < 2 ||
      typeof question.correctAnswer !== "string" ||
      typeof question.explanation !== "string"
    ) {
      return false;
    }

    return question.options.includes(question.correctAnswer);
  });

  return validQuiz;
}