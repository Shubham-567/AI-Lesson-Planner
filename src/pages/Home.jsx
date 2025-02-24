import { Link } from "react-router-dom";
import Navbar from "@/components/ui/Navbar";

function Home() {
  return (
    <>
      <Navbar />

      <section className='bg-gradient min-h-screen flex flex-col items-center justify-center px-6 pt-24 text-center'>
        <div className='max-w-4xl w-full'>
          <h1 className='text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight'>
            AI-Powered Lesson Planner
          </h1>
          <p className='text-lg sm:text-xl md:text-2xl text-blue-600 font-semibold mt-3'>
            Plan Smarter, Teach Better.
          </p>

          <p className='mt-5 text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed'>
            Say goodbye to long lesson planning! Generate, customize, and
            download AI-powered lesson plans in minutes—so you can focus on what
            truly matters: teaching.
          </p>

          <div className='mt-8'>
            <Link to='/lesson-planner'>
              <button className='px-6 sm:px-8 py-3 bg-blue-600 text-white text-base sm:text-lg font-semibold rounded-lg shadow-lg hover:bg-blue-700 hover:-translate-y-1 transform transition duration-300'>
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
