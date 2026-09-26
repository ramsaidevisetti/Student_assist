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
