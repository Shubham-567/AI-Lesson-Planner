import { useState } from "react";

// shadCN components
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Label } from "@/components/ui/label";

import LessonAccordion from "@/components/ui/LessonAccordion";
import Navbar from "@/components/ui/Navbar";

// response from api
import { generateLessonPlan } from "@/utils/geminiApi";

function LessonPlanner() {
  const [lesson, setLesson] = useState({
    topic: "",
    gradeLevel: "",
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
    <>
      <Navbar />

      <section className='min-h-screen pt-20 px-4 sm:px-6 lg:px-8'>
        <div className='container flex flex-col items-center md:flex-row md:items-start justify-center gap-6 mx-auto px-0 py-2 sm:p-2'>
          {/* Input Form Card */}
          <Card className='p-6 space-y-4 min-w-[250px] max-w-xl w-full md:w-2/3 lg:w-1/2 bg-card text-foreground border border-border'>
            <h2 className='text-xl font-semibold text-center'>
              Lesson Planner
            </h2>

            <div className='grid w-full items-center gap-1.5'>
              <Label htmlFor='topic' className='text-text'>
                Topic <span className='text-destructive'>*</span>
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
              <Label htmlFor='grade-level' className='text-text'>
                Grade Level <span className='text-destructive'>*</span>
              </Label>
              <Input
                name='gradeLevel'
                id='grade-level'
                placeholder='High School - 10th Grade Astronomy'
                value={lesson.gradeLevel}
                onChange={handleChange}
                aria-label='Grade Level'
              />
            </div>

            <div className='grid w-full items-center gap-1.5'>
              <Label htmlFor='lesson-duration' className='text-text'>
                Lesson Duration
              </Label>
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
                className='p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100 dark:bg-gray-800 dark:text-red-400'
                role='alert'>
                <span className='font-bold'>Error:</span> {error}
              </div>
            )}

            <Button
              onClick={handleGenerate}
              disabled={loading}
              className='w-full bg-primary text-primary-foreground hover:bg-primary/90'>
              {loading ? "Generating..." : "Generate Lesson Plan"}
            </Button>
          </Card>

          {/* Loading State */}
          {loading ? (
            <Card className='p-6 w-full min-w-[250px] max-w-xl md:w-2/3 lg:w-1/2 bg-card text-foreground border border-border'>
              <h2 className='text-xl font-semibold text-center mb-4'>
                <Skeleton className='h-6 w-3/4 mx-auto bg-muted' />
              </h2>

              <Skeleton className='h-6 mb-2 bg-muted' />
              <Skeleton className='h-4 w-3/4 mb-2 bg-muted' />

              <Skeleton className='h-6 mb-2 bg-muted' />
              <Skeleton className='h-4 w-3/4 mb-2 bg-muted' />

              <Skeleton className='h-6 mb-2 bg-muted' />
              <Skeleton className='h-4 w-3/4 mb-2 bg-muted' />

              <Skeleton className='h-6 mb-2 bg-muted' />
              <Skeleton className='h-4 w-3/4 mb-2 bg-muted' />
              <Skeleton className='h-4 w-1/2 mb-2 bg-muted' />

              <Skeleton className='h-6 mb-2 bg-muted' />
              <Skeleton className='h-4 w-3/4 mb-2 bg-muted' />
              <Skeleton className='h-4 w-1/2 mb-2 bg-muted' />

              <Skeleton className='h-6 mb-2 bg-muted' />
              <Skeleton className='h-4 w-3/4 mb-2 bg-muted' />
              <Skeleton className='h-4 w-1/2 mb-2 bg-muted' />

              <Skeleton className='h-6 mb-2 bg-muted' />
              <Skeleton className='h-4 w-3/4 mb-2 bg-muted' />

              <Skeleton className='h-8 w-full mt-4 bg-muted' />
              <Skeleton className='h-8 w-full mt-4 bg-muted' />
            </Card>
          ) : (
            // generated lesson plan
            generatedLesson && <LessonAccordion lesson={generatedLesson} />
          )}
        </div>
      </section>
    </>
  );
}

export default LessonPlanner;
