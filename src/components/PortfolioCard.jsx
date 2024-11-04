import PropTypes from "prop-types";

const PortfolioCard = ({ image, title, date, description, technologies, demoLink, githubLink }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 transition-all transform hover:scale-105 hover:shadow-2xl cursor-pointer max-w-md">
      <img src={image} alt={title} className="w-full h-56 object-cover rounded-t-md mb-4" />
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        <span className="text-sm text-gray-500">{date}</span>
      </div>
      <p className="text-gray-700 mb-4 leading-relaxed">{description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {technologies.map((tech, index) => (
          <span key={index} className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
            {tech}
          </span>
        ))}
      </div>
      <div className="flex justify-between mt-4">
        <a
          href={demoLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${title} Demo`}
          className="text-sm bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
        >
          Demo
        </a>
        <a
          href={githubLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${title} GitHub`}
          className="text-sm bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-600 transition-all"
        >
          GitHub
        </a>
      </div>
    </div>
  );
};

PortfolioCard.propTypes = {
  image: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  technologies: PropTypes.arrayOf(PropTypes.string).isRequired,
  demoLink: PropTypes.string.isRequired,
  githubLink: PropTypes.string.isRequired,
};

export default PortfolioCard;
