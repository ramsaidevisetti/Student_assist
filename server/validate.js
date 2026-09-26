const { z } = require("zod");

const studyResultSchema = z.object({
  title: z.string().min(1),

  cards: z
    .array(
      z.object({
        id: z.string().min(1),
        question: z.string().min(1),
        answer: z.string().min(1),
        difficulty: z.enum(["easy", "medium", "hard"])
      })
    )
    .min(1),

  quiz: z
    .array(
      z.object({
        id: z.string().min(1),
        question: z.string().min(1),
        options: z.array(z.string().min(1)).min(2),
        correctAnswer: z.string().min(1),
        explanation: z.string().min(1)
      })
    )
    .min(1)
});

function validateStudyResult(data) {
  return studyResultSchema.safeParse(data);
}

module.exports = {
  studyResultSchema,
  validateStudyResult
};