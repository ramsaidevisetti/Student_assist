function buildPrompt(input) {
  return `
You are a study-material generator.

The user provided the following study material:

"""
${input}
"""

Generate useful study material from the user's input.

Return ONLY valid JSON.
Do not use markdown.
Do not use code fences.
Do not include explanations outside the JSON.

The JSON MUST follow exactly this structure:

{
  "title": "string",
  "cards": [
    {
      "id": "string",
      "question": "string",
      "answer": "string",
      "difficulty": "easy | medium | hard"
    }
  ],
  "quiz": [
    {
      "id": "string",
      "question": "string",
      "options": ["string", "string", "string", "string"],
      "correctAnswer": "string",
      "explanation": "string"
    }
  ]
}

Requirements:
- Generate 5 flashcards.
- Generate 5 quiz questions.
- Every card must have a unique id.
- Every quiz question must have a unique id.
- Each quiz question must have exactly 4 options.
- correctAnswer must exactly match one of the options.
- Questions and answers must be based on the user's input.
- Do not invent unrelated topics.
`;
}

module.exports = buildPrompt;