import { Link } from "react-router-dom";
import Navbar from "@/components/ui/Navbar";

function Home() {
  return (
    <>
      <Navbar />

      <section className='bg-gradient min-h-screen flex items-center justify-center'>
        <div className='max-w-3xl text-center p-6'>
          <h1 className='text-4xl font-extrabold text-gray-900 md:text-5xl'>
            AI-Powered Lesson Planner
          </h1>
          <p className='mt-4 text-lg text-gray-700 md:text-xl'>
            Plan Smarter, Teach Better.
          </p>
          <p className='mt-2 text-gray-600 md:text-lg'>
            Say goodbye to long lesson planning! Generate, customize, and
            download AI-powered lesson plans in minutes.
          </p>
          <Link to='/lesson-planner'>
            <button className='mt-6 px-6 py-3 bg-blue-600 text-white font-medium text-lg rounded-lg shadow-md hover:bg-blue-700 transition duration-300'>
              Get Started
            </button>
          </Link>
        </div>
      </section>
    </>
  );
}

export default Home;
