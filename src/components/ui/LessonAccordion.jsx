import React, { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { generatePDF } from "@/utils/pdfGenerator";

const LessonAccordion = ({ lesson }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedLesson, setEditedLesson] = useState({ ...lesson });

  const handleChange = (e, field) => {
    setEditedLesson({ ...editedLesson, [field]: e.target.value });
  };

  const handleListChange = (e, field) => {
    setEditedLesson({ ...editedLesson, [field]: e.target.value.split("\n") });
  };

  const handleLessonOutlineChange = (e, index, key) => {
    const updatedOutline = [...editedLesson.LessonOutline];
    updatedOutline[index][key] = e.target.value;
    setEditedLesson({ ...editedLesson, LessonOutline: updatedOutline });
  };

  return (
    <Card id='lesson-content' className='p-6 w-full md:w-3/4 lg:w-1/2 mx-auto'>
      <h2 className='text-xl font-semibold text-center'>
        {isEditing ? "Edit Lesson Plan" : "Generated Lesson Plan"}
      </h2>

      <Accordion type='single' collapsible>
        <AccordionItem value='topic'>
          <AccordionTrigger>Topic</AccordionTrigger>
          <AccordionContent>
            {isEditing ? (
              <Input
                value={editedLesson.Topic}
                onChange={(e) => handleChange(e, "Topic")}
              />
            ) : (
              <p className='text-lg font-semibold'>{lesson.Topic}</p>
            )}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value='summary'>
          <AccordionTrigger>Summary</AccordionTrigger>
          <AccordionContent>
            {isEditing ? (
              <Textarea
                value={editedLesson.Summary}
                onChange={(e) => handleChange(e, "Summary")}
                rows={3}
              />
            ) : (
              <p>{lesson.Summary}</p>
            )}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value='details'>
          <AccordionTrigger>Lesson Details</AccordionTrigger>
          <AccordionContent>
            {isEditing ? (
              <>
                <Label>Date</Label>
                <Input
                  value={editedLesson.Date}
                  onChange={(e) => handleChange(e, "Date")}
                />
                <Label>Subject</Label>
                <Input
                  value={editedLesson.Subject}
                  onChange={(e) => handleChange(e, "Subject")}
                />
                <Label>Year Group or Grade Level</Label>
                <Input
                  value={editedLesson.GradeLevel}
                  onChange={(e) => handleChange(e, "GradeLevel")}
                />
              </>
            ) : (
              <>
                <p>
                  <strong>Date:</strong> {lesson.Date}
                </p>
                <p>
                  <strong>Subject:</strong> {lesson.Subject}
                </p>
                <p>
                  <strong>Year Group or Grade Level:</strong>{" "}
                  {lesson.GradeLevel}
                </p>
              </>
            )}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value='subtopics'>
          <AccordionTrigger>Subtopics or Key Concepts</AccordionTrigger>
          <AccordionContent>
            {isEditing ? (
              <Textarea
                value={editedLesson.Subtopics.join("\n")}
                onChange={(e) => handleListChange(e, "Subtopics")}
                rows={3}
              />
            ) : (
              <ul className='list-disc ml-4'>
                {lesson.Subtopics.map((subtopic, index) => (
                  <li key={index}>{subtopic}</li>
                ))}
              </ul>
            )}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value='materials'>
          <AccordionTrigger>Materials Needed</AccordionTrigger>
          <AccordionContent>
            {isEditing ? (
              <Textarea
                value={editedLesson.MaterialsNeeded.join("\n")}
                onChange={(e) => handleListChange(e, "MaterialsNeeded")}
                rows={3}
              />
            ) : (
              <ul className='list-disc ml-4'>
                {lesson.MaterialsNeeded.map((material, index) => (
                  <li key={index}>{material}</li>
                ))}
              </ul>
            )}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value='objectives'>
          <AccordionTrigger>Learning Objectives</AccordionTrigger>
          <AccordionContent>
            {isEditing ? (
              <Textarea
                value={editedLesson.LearningObjectives.join("\n")}
                onChange={(e) => handleListChange(e, "LearningObjectives")}
                rows={3}
              />
            ) : (
              <ul className='list-disc ml-4'>
                {lesson.LearningObjectives.map((objective, index) => (
                  <li key={index}>{objective}</li>
                ))}
              </ul>
            )}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value='outline'>
          <AccordionTrigger>Lesson Outlines</AccordionTrigger>
          <AccordionContent>
            {editedLesson.LessonOutline.map((step, index) => (
              <div
                key={index}
                className='border rounded-lg p-4 mb-4 space-y-2 bg-gray-100 '>
                {isEditing ? (
                  <>
                    <Label>Duration</Label>
                    <Input
                      value={step.Duration}
                      onChange={(e) =>
                        handleLessonOutlineChange(e, index, "Duration")
                      }
                    />
                    <Label className='mt-4 block'>Activity</Label>
                    <Textarea
                      value={step.Activity}
                      onChange={(e) =>
                        handleLessonOutlineChange(e, index, "Activity")
                      }
                      rows={2}
                    />
                    <Label className='mt-4 block'>Remarks</Label>
                    <Textarea
                      value={step.Remarks}
                      onChange={(e) =>
                        handleLessonOutlineChange(e, index, "Remarks")
                      }
                      rows={2}
                    />
                  </>
                ) : (
                  <>
                    <p>
                      <strong>{step.Duration}</strong>
                    </p>
                    <p>{step.Activity}</p>
                    <p className='text-gray-600'>{step.Remarks}</p>
                  </>
                )}
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value='notes'>
          <AccordionTrigger>Notes</AccordionTrigger>
          <AccordionContent>
            {isEditing ? (
              <Textarea
                value={editedLesson.Notes}
                onChange={(e) => handleChange(e, "Notes")}
                rows={3}
              />
            ) : (
              <p>{lesson.Notes}</p>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Action Buttons */}
      <div className='flex justify-between mt-4'>
        {isEditing ? (
          <>
            <Button variant='outline' onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsEditing(false)}>Save Changes</Button>
          </>
        ) : (
          <Button className='mt-4 w-full' onClick={() => setIsEditing(true)}>
            Edit Lesson
          </Button>
        )}
      </div>

      {/* PDF Download Button */}
      {!isEditing && (
        <Button onClick={() => generatePDF(lesson)} className='mt-4 w-full'>
          Download as PDF
        </Button>
      )}
    </Card>
  );
};

export default LessonAccordion;
