import { useState } from "react";
import { useReactToPrint } from "react-to-print";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

// shadcn components
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import LessonAccordion from "@/components/ui/LessonAccordion";

// response from api
import { generateLessonPlan } from "@/utils/geminiApi";
import { generatePDF } from "@/utils/pdfGenerator";

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
      setError("Failed to generate lesson plan. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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

      {generatedLesson && <LessonAccordion lesson={generatedLesson} />}
    </div>
  );
}

export default LessonPlanner;
