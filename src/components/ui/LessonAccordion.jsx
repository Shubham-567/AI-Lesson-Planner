import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { generatePDF } from "@/utils/pdfGenerator";

const LessonAccordion = ({ lesson }) => {
  if (!lesson) return null;

  return (
    <Card id='lesson-content' className='p-6 mt-4 max-w-lg mx-auto'>
      <Accordion type='single' collapsible>
        <AccordionItem value='topic'>
          <AccordionTrigger>Topic</AccordionTrigger>
          <AccordionContent>
            <p className='text-lg font-semibold'>{lesson.Topic}</p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value='summary'>
          <AccordionTrigger>Summary</AccordionTrigger>
          <AccordionContent>
            <p>{lesson.Summary}</p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value='details'>
          <AccordionTrigger>Lesson Details</AccordionTrigger>
          <AccordionContent>
            <p>
              <strong>Date:</strong> {lesson.Date}
            </p>
            <p>
              <strong>Subject:</strong> {lesson.Subject}
            </p>
            <p>
              <strong>Grade Level:</strong> {lesson.GradeLevel}
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value='subtopics'>
          <AccordionTrigger>Subtopics</AccordionTrigger>
          <AccordionContent>
            <ul className='list-disc ml-4'>
              {lesson.Subtopics.map((subtopic, index) => (
                <li key={index}>{subtopic}</li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value='materials'>
          <AccordionTrigger>Materials Needed</AccordionTrigger>
          <AccordionContent>
            <ul className='list-disc ml-4'>
              {lesson.MaterialsNeeded.map((material, index) => (
                <li key={index}>{material}</li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value='objectives'>
          <AccordionTrigger>Learning objectives</AccordionTrigger>
          <AccordionContent>
            <ul className='list-disc ml-4'>
              {lesson.MaterialsNeeded.map((objective, index) => (
                <li key={index}>{objective}</li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value='outline'>
          <AccordionTrigger>Lesson Outlines</AccordionTrigger>
          <AccordionContent>
            {lesson.LessonOutline.map((lesson, index) => (
              <div key={index} className='mb-2'>
                <p>
                  <strong>{lesson.Duration}</strong>
                </p>
                <p>{lesson.Activity}</p>
                <p className='text-grey-600'>{lesson.Remarks}</p>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value='Notes'>
          <AccordionTrigger>Notes</AccordionTrigger>
          <AccordionContent>
            <p>{lesson.Notes}</p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Pdf download button */}
      <Button onClick={() => generatePDF(lesson)} className='mt-4 w-full'>
        Download as PDF
      </Button>
    </Card>
  );
};

export default LessonAccordion;
