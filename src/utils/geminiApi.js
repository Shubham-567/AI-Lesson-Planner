import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

export async function generateLessonPlan(lessonDetails) {
  try {
    // console.log(import.meta.env.VITE_GEMINI_API_KEY);
    if (!GEMINI_API_KEY) {
      throw new Error("API key is missing. Check your .env file.");
    }

    const prompt = `Generate a detailed lesson plan with:
            Topic: ${lessonDetails.topic}
            Grade Level: ${lessonDetails.gradeLevel}
            Main Concept: ${lessonDetails.mainConcept}
            Subtopics: ${lessonDetails.subtopics}
            Materials: ${lessonDetails.materials}
            Learning Objectives: ${lessonDetails.objectives}
            Lesson Outline: ${lessonDetails.outline}

            Ensure it's structured clearly with engaging classroom activities.`;

    // Generate response from Gemini api
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    console.log(responseText);
    return responseText; // generated lesson
  } catch (error) {
    console.error("Error generating lesson", error.message || error);

    return "Failed to generate lesson. Please try again.";
  }
}
