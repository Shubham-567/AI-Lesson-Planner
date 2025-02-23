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

    const prompt = `
    Generate a lesson plan in **JSON format** with the following structure:
    
    {
      Topic: "${lessonDetails.topic}",
      Summary: "Briefly describe what this lesson will cover.",
      Date: "${new Date()} Just include this: dd-mm-yyyy",
      Subject: "Relevant subject for this lesson.",
      GradeLevel: "${lessonDetails.gradeLevel}",
      MainTopic: "${lessonDetails.mainConcept}",
      Subtopics: ["${lessonDetails.subtopics.split(", ").join('", "')}"],
      MaterialsNeeded: ["List all materials required for conducting this lesson."],
      LearningObjectives: [
        "Objective 1 (Bloom's Taxonomy category).",
        "Objective 2 (Bloom's Taxonomy category).",
        "Objective 3 (Bloom's Taxonomy category)."
      ],
      LessonOutline: [

      // Total Duration: ${lessonDetails.duration}, Default duration is 1 Hour
        {
          "Duration": "xx min",
          "Activity": "Springboard question or activity",
          "Remarks": "Notes or teacher guidance."
        },
        {
          "Duration": "xx min",
          "Activity": "Introduction to the main topic",
          "Remarks": "Explanation, examples, or engaging content."
        },
        {
          "Duration": "xx min",
          "Activity": "Review previous concepts (if needed)",
          "Remarks": "Clarify misconceptions or build on prior knowledge."
        },
        {
          "Duration": "xx min",
          "Activity": "Main Discussion",
          "Remarks": "Detailed content explanation and student interaction."
        },
        {
          "Duration": "xx min",
          "Activity": "Independent or Guided Activities",
          "Remarks": "Hands-on activities or group work."
        },
        {
          "Duration": "xx min",
          "Activity": "Assessment or Evaluation",
          "Remarks": "Quiz, worksheet, or class discussion."
        },
        {
          "Duration": "xx min",
          "Activity": "Conclusion & Wrap-up",
          "Remarks": "Review key concepts and preview next lesson."
        }
      ],
      Notes: "Add any final teacher observations or reminders."
    }

    Activity and Remarks should be concise.

    Ensure the response is **strictly valid JSON** with no extra text, no explanations, and no markdown formatting like \`\`\`json or \`\`\`.
    `;

    // Generate response from Gemini api
    const result = await model.generateContent(prompt);
    let responseText = result.response.text();

    responseText = responseText.replace(/```json|```/g, "").trim();

    try {
      const jsonResponse = JSON.parse(responseText);

      if (!jsonResponse || Object.keys(jsonResponse).length === 0) {
        throw new Error("Empty or invalid response");
      }

      // console.log("valid json response:", jsonResponse);
      return jsonResponse; // generated lesson
    } catch (error) {
      console.error("JSON Parsing Error:", error.message);
      return { error: "Failed to parse JSON. Check API response for format." };
    }
  } catch (error) {
    console.error("Error generating lesson", error.message || error);

    return "Failed to generate lesson. Please try again.";
  }
}
