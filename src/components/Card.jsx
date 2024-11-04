import PropTypes from "prop-types";

const Card = ({ title, children }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">{title}</h2>
      <div className="text-gray-600 leading-relaxed">{children}</div>
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Card;
