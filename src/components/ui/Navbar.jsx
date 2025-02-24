import { useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/Logo.png";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className='bg-white border-gray-200 dark:bg-gray-900'>
      <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
        {/* Logo */}
        <NavLink to='/' className='flex items-center space-x-3'>
          <img src={Logo} className='h-10' alt='Logo' />
        </NavLink>

        {/* Right-side buttons */}
        <div className='flex md:order-2 space-x-3'>
          <button
            type='button'
            className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
            Get started
          </button>
          {/* Mobile menu toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className='inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
            aria-controls='navbar-cta'
            aria-expanded={isOpen}>
            <span className='sr-only'>Open main menu</span>
            <svg
              className='w-5 h-5'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 17 14'>
              <path
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
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
          } w-full md:flex md:w-auto md:order-1`}
          id='navbar-cta'>
          <ul className='flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700'>
            <li>
              <NavLink
                to='/'
                className={({ isActive }) =>
                  isActive
                    ? "block py-2 px-3 md:p-0 text-blue-700 font-semibold border-b-2 border-blue-700 md:border-0 dark:text-blue-500"
                    : "block py-2 px-3 md:p-0 text-gray-900 hover:text-blue-700 dark:text-white dark:hover:text-blue-500"
                }>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/lesson-planner'
                className={({ isActive }) =>
                  isActive
                    ? "block py-2 px-3 md:p-0 text-blue-700 font-semibold border-b-2 border-blue-700 md:border-0 dark:text-blue-500"
                    : "block py-2 px-3 md:p-0 text-gray-900 hover:text-blue-700 dark:text-white dark:hover:text-blue-500"
                }>
                Lesson Planner
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/about'
                className={({ isActive }) =>
                  isActive
                    ? "block py-2 px-3 md:p-0 text-blue-700 font-semibold border-b-2 border-blue-700 md:border-0 dark:text-blue-500"
                    : "block py-2 px-3 md:p-0 text-gray-900 hover:text-blue-700 dark:text-white dark:hover:text-blue-500"
                }>
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/contact'
                className={({ isActive }) =>
                  isActive
                    ? "block py-2 px-3 md:p-0 text-blue-700 font-semibold border-b-2 border-blue-700 md:border-0 dark:text-blue-500"
                    : "block py-2 px-3 md:p-0 text-gray-900 hover:text-blue-700 dark:text-white dark:hover:text-blue-500"
                }>
                Contact
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
