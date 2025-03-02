import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Navbar from "@/components/ui/Navbar";

function FAQs() {
  const faqs = [
    {
      question: "What is PlanEase?",
      answer:
        "PlanEase is an AI-powered lesson planning tool that helps educators create structured, engaging lesson plans in minutes, saving time and boosting productivity.",
    },
    {
      question: "How does PlanEase work?",
      answer:
        "Simply enter your lesson topic, grade level, and key objectives. Our AI will generate a detailed lesson plan, which you can customize and download as a PDF.",
    },
    {
      question: "Is PlanEase free to use?",
      answer:
        "Yes! PlanEase is completely free to use, with no hidden charges or subscriptions.",
    },
    {
      question: "Can I customize AI-generated lesson plans?",
      answer:
        "Yes! You can edit and personalize lesson plans to fit your teaching style before downloading or sharing them.",
    },
    {
      question: "What subjects does PlanEase support?",
      answer:
        "PlanEase supports a wide range of subjects, including Math, Science, English, History, and more. You can tailor lesson plans to any curriculum.",
    },
    {
      question: "Do I need any technical skills to use PlanEase?",
      answer:
        "Not at all! PlanEase has an intuitive, user-friendly interface that makes lesson planning easy for everyone.",
    },
    {
      question: "Can I share my lesson plans with colleagues?",
      answer:
        "Yes, you can download your lesson plans as PDFs and share them with other teachers or students.",
    },
    {
      question: "How do I get started?",
      answer:
        "Click 'Get Started,' sign up, and start creating your first lesson plan in minutes!",
    },
  ];

  return (
    <>
      <Navbar />

      <section className='min-h-screen flex items-center justify-center px-6 py-12 pt-24'>
        <div className='max-w-2xl w-full bg-card shadow-lg rounded-lg p-10'>
          <h1 className='text-xl sm:text-3xl text-center font-extrabold text-foreground leading-tight mb-4'>
            Frequently Asked Questions
          </h1>
          <Accordion type='single' collapsible>
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}?</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </>
  );
}

export default FAQs;
