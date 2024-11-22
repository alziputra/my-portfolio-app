import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaEdit } from "react-icons/fa";

const PortfolioCard = ({ id, image, title, createdAt, description, technologies, demoLink, githubLink, onEdit, onDelete }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/portfolios/${id}`);
  };

  // Fungsi untuk memotong teks deskripsi menjadi 100 karakter
  const truncateText = (text, maxLength = 100) => (text.length > maxLength ? `${text.slice(0, maxLength)}...` : text);

  return (
    <div className="bg-gray-100 rounded-lg shadow-md hover:shadow-lg p-4 w-full relative transition-transform transform hover:scale-105">
      <img onClick={handleCardClick} src={image} alt={title} className="w-full h-32 object-cover rounded-md mb-2 cursor-pointer" />
      <p className="text-sm text-gray-500 mb-1">{createdAt}</p>
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-md font-semibold text-gray-800">{title}</h3>
        <div className="flex space-x-2">
          {/* Tombol Edit */}
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent triggering card click when edit is clicked
              onEdit(id); // Trigger the onEdit function with portfolio ID
            }}
            className="text-blue-500 hover:text-blue-700"
          >
            <FaEdit size={16} />
          </button>

          {/* Tombol Delete */}
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent triggering card click when delete is clicked
              onDelete(id); // Trigger the onDelete function with portfolio ID
            }}
            className="text-red-500 hover:text-red-700"
          >
            <FaTrash size={16} />
          </button>
        </div>
      </div>
      <p className="text-gray-700 text-sm mb-4">{truncateText(description)}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {technologies.map((tech, index) => (
          <span key={index} className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
            {tech}
          </span>
        ))}
      </div>
      <div className="flex justify-between items-center mt-4">
        <a
          href={demoLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${title} Demo`}
          className="text-sm bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
          onClick={(e) => e.stopPropagation()} // Prevent card click
        >
          Demo
        </a>
        <a
          href={githubLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${title} GitHub`}
          className="text-sm bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-600 transition-all"
          onClick={(e) => e.stopPropagation()} // Prevent card click
        >
          GitHub
        </a>
      </div>
    </div>
  );
};

PortfolioCard.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  image: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  technologies: PropTypes.arrayOf(PropTypes.string).isRequired,
  demoLink: PropTypes.string.isRequired,
  githubLink: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired, // Fungsi untuk edit
  onDelete: PropTypes.func.isRequired, // Fungsi untuk delete
};

export default PortfolioCard;
