import { LuSquareMenu } from "react-icons/lu";
import Logo from "../Images/Logo_Illustration.png";
import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';

const Nav = () => {
  const Blur = {
    background: "rgba(50, 40, 50, 0.2)",
    backdropFilter: "blur(5px)",
  };

  const[activeSection, setActiveSection] = useState(""); //tracking the active section
  const[scrolling, setScrolling] = useState(false);
  const location = useLocation();
  const isActive = (section) => activeSection === section;

  //smooth scrolling onepager
  const handleScroll = () => {
    if (scrolling) return; //skip if scrolling happened via clicking

    const sections = ["home", "about", "projects"]; // defining sections with id's

    let found = false;

    for (let section of sections){
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= 0 && rect.bottom >= 0) {
          setActiveSection(section);
          found = true;
          break;
        }
      }
    }
    if (!found){
      setActiveSection(""); //reset if no section is in view
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return() => {
      window.removeEventListener("scroll", handleScroll);
    }
  }, [scrolling]);

  const handleSectionClick = (id) => {
    setScrolling(true); // disable scroll listener
    setActiveSection(id);
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block:"start"});
      setTimeout(() => {
        setScrolling(false); //activate scroll listener
      }, 1000)
    }
  };

  const [isOpen, setOpen] = useState(false); // State for toggling dropdown

  const toggleNavbar = () => {
    setOpen((prevState) => !prevState); // Toggle state
  };

  return (

    <div
      style={Blur}
      className="fixed top-0 left-0 w-full h-[4rem] bg-[rgba(50,40,50,0.2)] backdrop-blur-sm text-pink z-50"
    >
      {/* Desktop Navbar */}
      <div className="hidden lg:flex items-center w-full h-[4rem] xl:max-w-[1250px] mx-auto px-1">
        {/* Logo */}
        <a href="#" className="flex items-center">
          <img
            src={Logo}
            alt="Logo"
            className="cursor-pointer h-[calc(4rem-1rem)] object-contain hover:scale-110 transition-all bg-dark-grey"
          />
        </a>

        {/* Nav Links */}
        <div className="flex-1 flex items-center justify-end space-x-10">
          <ul className="flex items-center space-x-6">
            <li className={`text-sm cursor-pointer relative group ${isActive('home') ? "text-light-grey" : "hover:text-light-grey"}`}
              onClick={() => handleSectionClick('home')}
              >
              Home
            </li>
            <li className={`text-sm cursor-pointer relative group ${isActive('about') ? "text-light-grey" : "hover:text-light-grey"}`}
              onClick={() => handleSectionClick('about')}
              >
                About
            </li>
            <li className={`text-sm cursor-pointer relative group ${isActive('projects') ? "text-light-grey" : "hover:text-light-grey"}`}
              onClick={() => handleSectionClick('projects')}
              >
                Projects
            </li>
          </ul>

          {/* Search Form */}
          <form className="max-w-lg mx-auto flex relative">
            <button
              id="dropdown-button"
              onClick={toggleNavbar}
              type="button"
              className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:ring-gray-100 dark:bg-gray-700 dark:text-white"
            >
              All categories
              <svg
                className="w-2.5 h-2.5 ml-2.5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>

            {isOpen && (
              <div className="absolute z-30 divide-y divide-gray-100 rounded-lg shadow-lg w-44 mt-[4rem]">
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                  {["Branding", "Web development", "Design", "UI/UX", "Marketing & Strategy", "Project Management"].map(
                    (category) => (
                      <li key={category}>
                        <button
                          type="button"
                          className="inline-flex w-full px-4 py-2 bg-white hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
                        >
                          {category}
                        </button>
                      </li>
                    )
                  )}
                </ul>
              </div>
            )}
            
            <input
              type="search"
              id="search-dropdown"
              className="block p-2.5 w-full text-sm bg-gray-50 rounded-e-lg border-l-gray-50 border border-gray-300 text-dark-grey"
              placeholder="Search..."
              required
            />
            <button
              type="submit"
              className="absolute top-0 right-0 p-2.5 text-sm font-medium text-white  rounded-e-lg"
            >
              <svg
                className="w-4 h-4 text-dark-grey"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span className="sr-only">Search</span>
            </button>
          </form>
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="lg:hidden flex items-center justify-end w-full">
        <LuSquareMenu
          size={64}
          style={{ height: "4rem", width: "4rem" }}
          className="text-[#F4DAE2]"
        />
      </div>
    </div>
  );
}
export default Nav;
