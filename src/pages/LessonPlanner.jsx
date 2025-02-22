import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Accordion } from "@/components/ui/accordion";

// response from api
import { generateLessonPlan } from "@/utils/geminiApi";
import { useReactToPrint } from "react-to-print";

function LessonPlanner() {
  // const [lesson, setLesson] = useState({
  //   topic: "",
  //   gradeLevel: "",
  //   mainConcept: "",
  //   subtopics: "",
  //   materials: "",
  //   objectives: "",
  //   outline: "",
  // });

  const [lesson, setLesson] = useState({
    topic: "The Solar System",
    gradeLevel: "6th Grade",
    mainConcept:
      "Understanding the planets, their characteristics, and their movement around the Sun.",
    subtopics: "Planets, Moons, The Sun, Orbits, Gravity, Asteroids, Comets",
    materials:
      "Model of the solar system, Flashcards, Globe, Videos of space, Charts of planets",
    objectives: `1. Identify the planets in the solar system.\n2. Explain the role of gravity in planetary orbits.\n3. Compare the size, distance, and composition of different planets.`,
    outline: `1. Introduction\n   - Ask students: "Can you name all the planets?"\n2. Discussion on Planets & Their Features\n   - Explain terrestrial and gas planets.\n   - Show planet sizes using a model.\n3. Gravity & Orbits\n   - Demonstrate gravity with a simple ball experiment.\n4. Interactive Activity\n   - Students create a mini solar system model.\n5. Assessment\n   - Quiz on planet names, order, and characteristics.`,
  });

  const [generatedLesson, setGeneratedLesson] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setLesson({ ...lesson, [e.target.name]: e.target.value });
  };

  const handleGenerate = async () => {
    setError("");

    if (!lesson.topic || !lesson.gradeLevel) {
      setError("Topic and Grade Level are required!");
      return;
    }

    setLoading(true);

    try {
      const response = await generateLessonPlan(lesson);
      setGeneratedLesson(response);
    } catch (err) {
      setError("Failed to generate lesson plan. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = useReactToPrint({
    content: () => document.getElementById("lesson-content"),
  });

  return (
    <div className='container mx-auto p-6'>
      <Card className='p-6 space-y-4 max-w-lg mx-auto'>
        <h2 className='text-xl font-semibold text-center'>Lesson Planner</h2>

        <Input
          name='topic'
          placeholder='Topic'
          value={lesson.topic}
          onChange={handleChange}
          aria-label='Lesson Topic'
        />
        <Input
          name='gradeLevel'
          placeholder='Grade Level'
          value={lesson.gradeLevel}
          onChange={handleChange}
          aria-label='Grade Level'
        />

        <Textarea
          name='mainConcept'
          placeholder='Main Concept'
          value={lesson.mainConcept}
          onChange={handleChange}
          aria-label='Main Concept'
        />

        <Textarea
          name='subtopics'
          placeholder='Subtopics'
          value={lesson.subtopics}
          onChange={handleChange}
          aria-label='Subtopics'
        />

        <Textarea
          name='materials'
          placeholder='Materials Needed'
          value={lesson.materials}
          onChange={handleChange}
          aria-label='Materials Needed'
        />

        <Textarea
          name='objectives'
          placeholder='Learning Objectives'
          value={lesson.objectives}
          onChange={handleChange}
          aria-label='Learning Objectives'
        />

        <Textarea
          name='outline'
          placeholder='Lesson Outline'
          value={lesson.outline}
          onChange={handleChange}
          aria-label='Lesson Outline'
        />

        <Button onClick={handleGenerate} disabled={loading} className='w-full'>
          {loading ? "Generating..." : "Generate Lesson Plan"}
        </Button>
      </Card>

      {loading && (
        <Card className='p-6 mt-4 max-w-lg mx-auto'>
          <Skeleton className='h-6 mb-2' />
          <Skeleton className='h-4 w-3/4' />
        </Card>
      )}

      {generatedLesson && (
        <Card id='lesson-content' className='p-6 mt-4 max-w-lg mx-auto'>
          <Accordion title='Generated Lesson'>
            <h3 className='text-lg font-semibold mb-2'>Generated Lesson </h3>
            <p className='whitespace-pre-line'>{generatedLesson}</p>
          </Accordion>

          <Button onClick={handlePrint} className='mt-4 w-full'>
            Download as PDF
          </Button>
        </Card>
      )}
    </div>
  );
}

export default LessonPlanner;
