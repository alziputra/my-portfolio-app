import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const PortfolioCard = ({ id, image, date, title, description, technologies, demoLink, githubLink }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/portfolio/${id}`);
  };

  return (
    <div onClick={handleCardClick} className="bg-white rounded-lg shadow-md p-6 transition-transform transform hover:scale-105 cursor-pointer">
      <img src={image} alt={title} className="w-full h-48 object-cover rounded-md mb-4" />
      <p className="text-sm text-gray-500 mb-2">{date}</p>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-700 mb-4">{description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {technologies.map((tech, index) => (
          <span key={index} className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
            {tech}
          </span>
        ))}
      </div>
      <div className="flex justify-between">
        <a href={demoLink} target="_blank" rel="noopener noreferrer" className="text-sm bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
          Demo
        </a>
        <a href={githubLink} target="_blank" rel="noopener noreferrer" className="text-sm bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-900">
          GitHub
        </a>
      </div>
    </div>
  );
};

PortfolioCard.propTypes = {
  id: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  technologies: PropTypes.arrayOf(PropTypes.string).isRequired,
  demoLink: PropTypes.string.isRequired,
  githubLink: PropTypes.string.isRequired,
};

export default PortfolioCard;
