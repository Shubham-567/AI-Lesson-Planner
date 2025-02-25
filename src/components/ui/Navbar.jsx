import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Logo from "@/assets/logo.png";
import moonSvg from "@/assets/moon.svg";
import sunSvg from "@/assets/sun.svg";
import { Button } from "./button";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  // apply theme on component mount
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <header className='absolute top-0 left-0 w-full shadow-sm dark:shadow-muted z-50'>
      <nav className='max-w-screen-xl min-w-[312px] mx-auto p-4'>
        <div className='flex flex-wrap items-center justify-between'>
          {/* Logo */}
          <NavLink to='/' className='flex items-center space-x-3'>
            <img
              src={Logo}
              className='h-8 sm:h-8 md:h-9 lg:h-10 max-w-[180px] dark:invert'
              alt='Logo'
            />
          </NavLink>

          {/* Right-side buttons */}
          <div className='flex md:order-2 space-x-3'>
            <NavLink to='/lesson-planner'>
              <button className='bg-primary text-primary-foreground hover:brightness-90 transition duration-300 shadow-md font-semibold rounded-lg px-3 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 text-sm sm:text-sm hidden min-[355px]:inline-block'>
                Get started
              </button>
            </NavLink>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className='p-2 w-10 h-10 border border-border text-foreground rounded-lg hover:bg-muted'>
              {darkMode ? (
                <img className='w-5 h-5 mx-auto' src={sunSvg} alt='Sun Icon' />
              ) : (
                <img
                  className='w-5 h-5 mx-auto'
                  src={moonSvg}
                  alt='Moon Icon'
                />
              )}
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className='md:hidden p-2 w-10 h-10 text-foreground rounded-lg hover:bg-muted focus:ring-2 focus:ring-ring'>
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
            <ul className='flex flex-col pt-4 md:pt-0 md:flex-row space-y-2 md:space-y-0 md:space-x-6 text-foreground'>
              <li>
                <NavLink
                  to='/'
                  className={({ isActive }) =>
                    isActive
                      ? "text-primary font-semibold"
                      : "hover:text-primary"
                  }>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/lesson-planner'
                  className={({ isActive }) =>
                    isActive
                      ? "text-primary font-semibold"
                      : "hover:text-primary"
                  }>
                  Lesson Planner
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/about'
                  className={({ isActive }) =>
                    isActive
                      ? "text-primary font-semibold"
                      : "hover:text-primary"
                  }>
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/Login'
                  className={({ isActive }) =>
                    isActive
                      ? "text-primary font-semibold"
                      : "hover:text-primary"
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
