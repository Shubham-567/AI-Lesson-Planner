import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Accordion } from "@/components/ui/accordion";

import { generateLessonPlan } from "@/utils/geminiApi";
import { useReactToPrint } from "react-to-print";

function LessonPlanner() {
  const [lesson, setLesson] = useState({
    topic: "",
    gradeLevel: "",
    mainConcept: "",
    subtopics: "",
    materials: "",
    objectives: "",
    outline: "",
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
      setError("Faild to generate lesson plan. Please try again.");
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
            <p>{generatedLesson}</p>
          </Accordion>
          s
          <Button onClick={handlePrint} className='mt-4 w-full'>
            Download as PDF
          </Button>
        </Card>
      )}
    </div>
  );
}

export default LessonPlanner;
