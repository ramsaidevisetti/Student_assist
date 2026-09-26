# Flam AI Study Assistant

An AI-powered study assistant built for the Flam Frontend Internship Assignment.

The application takes free-form study notes or a topic and converts them into a structured learning experience with:

* Interactive flashcards
* Multiple-choice quiz questions
* Instant answer feedback
* Quiz scoring
* Retry options
* Retry of incorrect questions
* Loading, empty, and error states

The application does **not** behave like a chatbot. It uses AI to generate structured study material that is rendered through a controlled UI.

## Features

### Study Material Generation

Enter a topic or paste study notes into the text area.

The backend sends the input to Gemini and requests a fixed JSON structure containing:

* Study set title
* Flashcards
* Questions
* Answers
* Difficulty levels
* Quiz questions
* Multiple-choice options
* Correct answers
* Explanations

### Flashcards

Users can:

* View one flashcard at a time
* Click a card to reveal the answer
* Navigate between cards
* Track flashcard progress
* Finish the flashcard session

### Quiz

After completing the flashcards, users can take the quiz.

The quiz provides:

* Multiple-choice questions
* Immediate correct/incorrect feedback
* Explanations
* Score tracking
* Final percentage
* Retry quiz
* Retry only incorrect questions

### Error Handling

The application handles:

* Empty input
* Failed API requests
* Slow generation states
* Aborted/stale requests
* Empty AI responses
* Malformed JSON
* Invalid AI response structures
* Unexpected server responses

AI-generated data is validated before it is rendered.

## Tech Stack

### Frontend

* React
* Vite
* JavaScript
* CSS
* React Hooks

### Backend

* Node.js
* Express.js
* CORS
* dotenv

### AI

* Google Gemini API
* `@google/genai`

### Validation

* Zod

## Project Structure

```text
flam-study-assistant/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── EmptyState.jsx
│   │   │   ├── ErrorState.jsx
│   │   │   ├── FlashcardComplete.jsx
│   │   │   ├── FlashcardDeck.jsx
│   │   │   ├── LoadingState.jsx
│   │   │   ├── Quiz.jsx
│   │   │   └── QuizComplete.jsx
│   │   │
│   │   ├── lib/
│   │   │   ├── api.js
│   │   │   └── validateResult.js
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── package-lock.json
│
├── server/
│   ├── index.js
│   ├── generate.js
│   ├── prompt.js
│   ├── validate.js
│   ├── package.json
│   ├── package-lock.json
│
├── .gitignore
└── README.md
```

`node_modules` folders and the actual `.env` file are intentionally excluded from the repository.

## How It Works

```text
User enters topic / notes
          ↓
       React UI
          ↓
     Express API
          ↓
       Gemini API
          ↓
    Structured JSON
          ↓
      Zod validation
          ↓
   Frontend validation
          ↓
      Study Material
       ↙        ↘
 Flashcards      Quiz
                    ↓
              Quiz Results
```

## Getting Started

### 1. Clone the repository

```bash
git clone <your-github-repository-url>
cd flam-study-assistant
```

### 2. Install frontend dependencies

```bash
cd client
npm install
```

### 3. Install backend dependencies

Open another terminal:

```bash
cd server
npm install
```

### 4. Configure the Gemini API key

Inside the `server` folder, create a `.env` file:

```env
GEMINI_API_KEY=your_gemini_api_key_here
PORT=5000
```

Do not commit the `.env` file.

### 5. Start the backend

From the `server` folder:

```bash
npm run dev
```

The backend runs on:

```text
http://localhost:5000
```

You can check the health endpoint:

```text
http://localhost:5000/api/health
```

### 6. Start the frontend

In another terminal:

```bash
cd client
npm run dev
```

Open the local URL shown by Vite, usually:

```text
http://localhost:5173
```

## Environment Variables

Create `server/.env`:

```env
GEMINI_API_KEY=your_gemini_api_key_here
PORT=5000
```

A safe example file is included as:

```text
server/.env.example
```

Never expose the Gemini API key in frontend code.

## AI Output Format

The backend asks Gemini to return structured JSON in the following format:

```json
{
  "title": "JavaScript Fundamentals",
  "cards": [
    {
      "id": "card-1",
      "question": "What is a closure?",
      "answer": "A function that remembers variables from its outer scope.",
      "difficulty": "easy"
    }
  ],
  "quiz": [
    {
      "id": "quiz-1",
      "question": "Which keyword creates a block-scoped variable?",
      "options": [
        "var",
        "let",
        "global",
        "define"
      ],
      "correctAnswer": "let",
      "explanation": "The let keyword declares a variable with block scope."
    }
  ]
}
```

The response is parsed and validated on the backend before being returned to the frontend.

The frontend performs an additional validation before rendering the generated study material.

## Security

The Gemini API key is kept on the backend and is not exposed to the React application.

The `.env` file is ignored by Git using `.gitignore`.

For production deployment, the API key should be configured using the hosting provider's environment-variable system.

## Responsive Design

The UI is designed to work across:

* Desktop
* Tablet
* Mobile

The layout adapts for smaller screen sizes and keeps the main study interactions usable on mobile devices.

## AI Usage

Gemini is used to generate the structured study content from the user's topic or notes.

The application controls the output format through a structured JSON prompt and validates the returned data before displaying it.

The UI, application flow, validation logic, state management, and interaction design were implemented specifically for this assignment.

## Known Limitations

* The generated study material depends on the quality and relevance of the user's input.
* AI-generated answers may occasionally contain factual inaccuracies.
* The application currently generates a fixed structured study format.
* The Gemini API requires a valid API key and available API quota.
* Local development uses separate frontend and backend servers.
* No persistent database or user accounts are currently implemented.

## Time Spent

Approximately 8 hours were spent on:

* Project setup
* React UI implementation
* Backend API integration
* Gemini integration
* Structured response handling
* Validation
* Flashcard interaction
* Quiz interaction
* Error and loading states
* Responsive styling
* Documentation and testing

## Demo Flow

1. Enter a topic or paste study notes.
2. Click **Generate Study Material**.
3. Review the generated flashcards.
4. Click **Finish Flashcards**.
5. Click **Take Quiz**.
6. Answer the quiz questions.
7. Review the final score.
8. Retry the complete quiz or retry only incorrect questions.

## Future Improvements

Possible future improvements include:

* Persistent study history
* User accounts
* Difficulty selection
* Number of cards/questions selection
* Progress tracking across study sessions
* Deployment with a production backend
* More detailed study analytics

## License

This project was created as part of the Flam Frontend Internship Assignment.
