import { useState } from "react";

// shadCN components
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Label } from "@/components/ui/label";

import LessonAccordion from "@/components/ui/LessonAccordion";

// response from api
import { generateLessonPlan } from "@/utils/geminiApi";

function LessonPlanner() {
  const [lesson, setLesson] = useState({
    topic: "The Solar System",
    gradeLevel: "10th",
    duration: "",
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
      // console.log("api response: ", response);
      setGeneratedLesson(response);
    } catch (err) {
      setError("Failed to generate lesson plan. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='container flex flex-row items-start justify-center gap-6 mx-auto p-6'>
      <Card className='p-6 space-y-4 w-full md:w-1/2'>
        <h2 className='text-xl font-semibold text-center'>Lesson Planner</h2>

        <div className='grid w-full items-center gap-1.5'>
          <Label htmlFor='topic'>
            Topic <span className='text-red-500'>*</span>
          </Label>
          <Input
            name='topic'
            id='topic'
            placeholder='The Solar System'
            value={lesson.topic}
            onChange={handleChange}
            aria-label='Lesson Topic'
          />
        </div>

        <div className='grid w-full items-center gap-1.5'>
          <Label htmlFor='grade-level'>
            Grade Level <span className='text-red-500'>*</span>
          </Label>
          <Input
            name='gradeLevel'
            id='grade-level'
            placeholder='High School - 10th Grade  Astronomy'
            value={lesson.gradeLevel}
            onChange={handleChange}
            aria-label='Grade Level'
          />
        </div>

        <div className='grid w-full items-center gap-1.5'>
          <Label htmlFor='lesson-duration'>Lesson Duration</Label>
          <Input
            name='duration'
            id='lesson-duration'
            placeholder='1 Hour'
            value={lesson.duration}
            onChange={handleChange}
            aria-label='Lesson Duration'
          />
        </div>

        <Textarea
          name='mainConcept'
          id='main-concept'
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

        {error.length > 0 && (
          <div
            className='p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400'
            role='alert'>
            <span className='font-bold'>Error:</span> {error}
          </div>
        )}

        <Button onClick={handleGenerate} disabled={loading} className='w-full'>
          {loading ? "Generating..." : "Generate Lesson Plan"}
        </Button>
      </Card>

      {loading ? (
        <Card className='p-6 w-full md:w-1/2'>
          <h2 className='text-xl font-semibold text-center mb-4'>
            <Skeleton className='h-6 w-3/4 mx-auto' />
          </h2>

          <Skeleton className='h-6 mb-2' />
          <Skeleton className='h-4 w-3/4 mb-2' />

          <Skeleton className='h-6 mb-2' />
          <Skeleton className='h-4 w-3/4 mb-2' />

          <Skeleton className='h-6 mb-2' />
          <Skeleton className='h-4 w-3/4 mb-2' />

          <Skeleton className='h-6 mb-2' />
          <Skeleton className='h-4 w-3/4 mb-2' />
          <Skeleton className='h-4 w-1/2 mb-2' />

          <Skeleton className='h-6 mb-2' />
          <Skeleton className='h-4 w-3/4 mb-2' />
          <Skeleton className='h-4 w-1/2 mb-2' />

          <Skeleton className='h-6 mb-2' />
          <Skeleton className='h-4 w-3/4 mb-2' />

          <Skeleton className='h-8 w-full mt-4' />
          <Skeleton className='h-8 w-full mt-4' />
        </Card>
      ) : (
        // generated lesson plan
        generatedLesson && <LessonAccordion lesson={generatedLesson} />
      )}
    </div>
  );
}

export default LessonPlanner;
