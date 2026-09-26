require("dotenv").config();

const express = require("express");
const cors = require("cors");

const generateStudyMaterial = require("./generate");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Flam Study Assistant API is running"
  });
});

app.post("/api/generate", async (req, res) => {
  const { input } = req.body;

  if (!input || !input.trim()) {
    return res.status(400).json({
      success: false,
      error: "Study topic is required."
    });
  }

  try {
    const result = await generateStudyMaterial(input);

    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error("Generation error:", error);

    res.status(500).json({
      success: false,
      error: error.message || "Failed to generate study material."
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});