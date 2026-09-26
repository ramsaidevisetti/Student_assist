const { GoogleGenAI } = require("@google/genai");
const buildPrompt = require("./prompt");
const { validateStudyResult } = require("./validate");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

async function generateStudyMaterial(input) {
  const prompt = buildPrompt(input);

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json"
    }
  });

  const rawText = response.text;

  if (!rawText || !rawText.trim()) {
    throw new Error("AI returned an empty response.");
  }

  let parsed;

  try {
    parsed = JSON.parse(rawText);
  } catch {
    throw new Error("AI returned malformed JSON.");
  }

  const validation = validateStudyResult(parsed);

  if (!validation.success) {
    throw new Error("AI returned data with an invalid structure.");
  }

  return validation.data;
}

module.exports = generateStudyMaterial;