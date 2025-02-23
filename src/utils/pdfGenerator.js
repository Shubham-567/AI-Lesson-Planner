import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export const generatePDF = (lesson) => {
  if (!lesson) {
    alert("No lesson plan generated yet!");
    return;
  }

  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const marginLeft = 15;
  const contentWidth = pageWidth - 30;
  let y = 15;

  // Main Title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(24);
  doc.text("Lesson Plan", pageWidth / 2, y, { align: "center" });
  y += 12;

  // Topic Section
  doc.setFontSize(18);
  doc.text(`Topic: ${lesson.Topic || "N/A"}`, marginLeft, y);
  y += 6;
  doc.line(marginLeft, y, pageWidth - marginLeft, y);
  y += 12;

  // Styled Section Heading Function
  const addSectionHeading = (title, bgColor) => {
    doc.setFillColor(...bgColor);
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.rect(marginLeft, y, contentWidth, 10, "F");
    doc.text(title, marginLeft + 3, y + 7);
    y += 15;
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "normal");
  };

  // Styled Paragraph Function
  const addParagraph = (text) => {
    doc.setFontSize(12);
    const wrappedText = doc.splitTextToSize(text || "N/A", contentWidth);
    doc.text(wrappedText, marginLeft, y);
    y += wrappedText.length * 6;
  };

  // Summary Section
  addSectionHeading("Summary", [96, 92, 254]);
  addParagraph(lesson.Summary);

  // Lesson Details Table
  autoTable(doc, {
    startY: y,
    head: [["Section", "Details"]],
    body: [
      ["Date", lesson.Date || "N/A"],
      ["Subject", lesson.Subject || "N/A"],
      ["Year Group or Grade Level", lesson.GradeLevel || "N/A"],
      ["Main Topic or Unit", lesson.MainTopic || "N/A"],
      [
        "Subtopics or Key Concepts",
        lesson.Subtopics.toString().replace(/,/g, ", ") || "N/A",
        // adds space after "," like this: ", "
      ],
    ],
    theme: "grid",
    styles: { fontSize: 12, cellPadding: 3 },
    headStyles: { fillColor: [205, 201, 246], textColor: 0 },
    alternateRowStyles: { fillColor: [240, 239, 255] },
    columnStyles: { 0: { fontStyle: "bold" } },
  });

  y = doc.lastAutoTable.finalY + 12;

  // Material Needed
  addSectionHeading("Material Needed", [0, 0, 0]);

  if (lesson.MaterialsNeeded && lesson.MaterialsNeeded.length > 0) {
    const materialText = lesson.MaterialsNeeded.map((item) => `• ${item}`).join(
      "\n"
    );

    addParagraph(materialText);
  } else {
    addParagraph("No materials listed.");
  }

  // Learning Objectives
  addSectionHeading("Learning Objectives", [96, 92, 254]);
  addParagraph(lesson.LearningObjectives);

  // Page 2
  doc.addPage();
  y = 15;

  // Lesson Outline
  addSectionHeading("Lesson Outline", [0, 0, 0]);

  // Lesson Outline Table
  autoTable(doc, {
    startY: y,
    head: [["Duration", "Guide", "Remarks"]],
    body: lesson.LessonOutline
      ? lesson.LessonOutline.map((item) => [
          item.Duration || "N/A",
          item.Activity || "N/A",
          item.Remarks || "N/A",
        ])
      : [["N/A", "N/A", "N/A"]],
    theme: "grid",
    styles: { fontSize: 12, cellPadding: 3 },
    headStyles: { fillColor: [205, 201, 246], textColor: 0 },
    alternateRowStyles: { fillColor: [240, 239, 255] },
  });

  y = doc.lastAutoTable.finalY + 12;

  // Notes Section
  addSectionHeading("Notes", [96, 92, 254]);
  addParagraph(lesson.Notes);

  // Save PDF
  doc.save(`${lesson.Topic}-LessonPlan.pdf`);
  console.log("PDF Downloaded");
};
