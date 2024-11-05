import PropTypes from "prop-types";

const Card = ({ title, content }) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      {Array.isArray(content) ? (
        <div className="list-disc list-inside">
          {content.map((item, index) => (
            <p key={index}>{item}</p>
          ))}
        </div>
      ) : (
        <p>{content}</p>
      )}
    </div>
  );
};

// Define PropTypes outside the component function
Card.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]).isRequired,
};

export default Card;
