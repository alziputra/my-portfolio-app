//src/components/BlogCard.jsx
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

const BlogCard = ({ id, image, createdAt, title, content, onDelete }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/blogs/${id}`);
  };

  // Fungsi untuk memotong teks content menjadi 100 karakter
  const truncateText = (text, maxLength = 100) => (text.length > maxLength ? `${text.slice(0, maxLength)}...` : text);

  return (
    <div onClick={handleCardClick} className="bg-gray-100 rounded-lg shadow-md p-4 transition-transform transform hover:scale-105 cursor-pointer w-full relative">
      <img src={image} alt={title} className="w-full h-32 object-cover rounded-md mb-2" />
      <p className="text-sm text-gray-500 mb-1">{createdAt}</p>
      <div className="flex justify-between items-center">
        <h3 className="text-md font-semibold text-gray-800 mb-2">{title}</h3>
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent triggering card click when delete is clicked
            onDelete(id); // Trigger the onDelete function with blog ID
          }}
          className="text-red-500 hover:text-red-700"
        >
          <FaTrash size={16} />
        </button>
      </div>
      <p className="text-gray-700 text-sm">{truncateText(content)}</p>
    </div>
  );
};

BlogCard.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default BlogCard;
