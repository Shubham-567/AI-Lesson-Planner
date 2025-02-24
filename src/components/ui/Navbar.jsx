import { useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/Logo.png";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className='absolute top-0 left-0 w-full bg-white shadow-sm z-50'>
      <nav className='max-w-screen-xl min-w-[312px] mx-auto p-4 '>
        <div className='flex flex-wrap items-center justify-between'>
          {/* Logo */}
          <NavLink to='/' className='flex items-center space-x-3'>
            <img
              src={Logo}
              className='h-8 sm:h-8 md:h-9 lg:h-10 max-w-[180px]'
              alt='Logo'
            />
          </NavLink>

          {/* Right-side buttons */}
          <div className='flex md:order-2 space-x-3'>
            <button className='text-white bg-blue-700 hover:bg-blue-800 transition duration-300 shadow-md font-medium rounded-lg px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 text-sm sm:text-md'>
              Get started
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className='md:hidden p-2 w-10 h-10 text-gray-500 rounded-lg hover:bg-gray-100 focus:ring-2 focus:ring-gray-200'>
              <span className='sr-only'>Open main menu</span>
              <svg className='w-5 h-5' fill='none' viewBox='0 0 17 14'>
                <path
                  stroke='currentColor'
                  strokeWidth='2'
                  d='M1 1h15M1 7h15M1 13h15'
                />
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <div
            className={`${
              isOpen ? "block" : "hidden"
            } w-full md:flex md:w-auto md:order-1`}>
            <ul className='flex flex-col pt-4 md:pt-0 md:flex-row space-y-2 md:space-y-0 md:space-x-6 text-gray-900'>
              <li>
                <NavLink
                  to='/'
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-700 font-semibold"
                      : "hover:text-blue-700"
                  }>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/lesson-planner'
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-700 font-semibold"
                      : "hover:text-blue-700"
                  }>
                  Lesson Planner
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/about'
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-700 font-semibold"
                      : "hover:text-blue-700"
                  }>
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/'
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-700 font-semibold"
                      : "hover:text-blue-700"
                  }>
                  Features
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
