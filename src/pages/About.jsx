import { Link } from "react-router-dom";
import Navbar from "@/components/ui/Navbar";
import aboutImg from "@/assets/about-image.jpg";

function About() {
  return (
    <>
      <Navbar />

      <section className='min-h-screen flex items-center justify-center px-6 py-12 pt-24'>
        <div className='max-w-5xl w-full bg-card shadow-lg rounded-lg p-10 md:p-16 flex flex-col md:flex-row items-center gap-10'>
          {/* Left section Text Content */}
          <div className='flex-1 text-center md:text-left'>
            <h1 className='text-4xl font-extrabold text-foreground md:text-5xl leading-tight'>
              About <span className='text-primary'>PlanEase</span>
            </h1>
            <div className='w-32 h-1 bg-primary my-4 mx-auto md:mx-0'></div>

            <p className='text-lg text-muted-foreground md:text-xl mt-4 leading-relaxed'>
              PlanEase simplifies lesson planning with AI, helping teachers
              create structured, engaging lessons in minutes.
            </p>

            <p className='text-muted-foreground text-lg mt-4'>
              With an intuitive interface and easy PDF downloads, planning is
              fast, effortless, and stress-free.
            </p>

            <div className='mt-6'>
              <Link to='/lesson-planner'>
                <button className='px-6 py-3 bg-primary text-primary-foreground font-medium text-lg rounded-lg shadow-md hover:bg-primary/80 hover:-translate-y-1 transform transition duration-300'>
                  Get Started
                </button>
              </Link>
            </div>
          </div>

          {/* Right Section Image */}
          <div className='flex-1 flex flex-col justify-center items-center'>
            <img
              src={aboutImg}
              alt='Teaching with AI'
              className='rounded-lg shadow-md w-full max-w-lg '
            />

            <p className='mt-4 text-text text-center text-lg font-medium'>
              Designed & developed by
              <span className='text-primary font-semibold'> Yash</span>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default About;
