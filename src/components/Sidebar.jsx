import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { FaBars, FaUser, FaFolderOpen, FaBlog, FaEnvelope } from "react-icons/fa";
import Profile from "./Profile";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    { name: "About Me", path: "/aboutme", icon: <FaUser /> },
    { name: "Portfolio", path: "/portfolio", icon: <FaFolderOpen /> },
    { name: "Blogs", path: "/blogs", icon: <FaBlog /> },
    { name: "Contact", path: "/contact", icon: <FaEnvelope /> },
  ];

  return (
    <div className="lg:flex lg:flex-col lg:h-screen p-4 bg-gray-800 text-white w-full lg:w-64">
      {/* Profile Component */}
      <Profile name="Alzi Rahmana Putra" bio="Web Developer Enthusiast | Backend Developer" imageUrl="https://cdn.pixabay.com/photo/2021/09/20/03/24/skeleton-6639547_1280.png" />

      {/* Hamburger Icon for Mobile */}
      <div className="lg:hidden flex justify-between items-center p-4 bg-gray-800">
        <h1 className="text-lg font-bold">My Website</h1>
        <button onClick={toggleMenu} className="text-white focus:outline-none">
          <FaBars size={24} />
        </button>
      </div>

      {/* Sidebar Menu for Large Screen & Collapsible Menu for Small Screen */}
      <nav className={`${isOpen ? "block" : "hidden"} lg:block mt-4 lg:mt-0`}>
        <ul className="space-y-2 text-center">
          {menuItems.map((item) => (
            <li key={item.path}>
              <button
                onClick={() => navigate(item.path)}
                className={`flex items-center w-full space-x-2 rounded-md p-2 transition duration-200 ${location.pathname === item.path ? "bg-red-200 text-gray-800" : "hover:bg-red-200 hover:text-gray-800"}`}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

Sidebar.propTypes = {
  links: PropTypes.arrayOf(PropTypes.string),
};

export default Sidebar;
