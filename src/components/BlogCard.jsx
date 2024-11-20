import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import BtnAction from "./BtnAction";
const BlogCard = ({ id, image, createdAt, title, content, onEdit, onDelete }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/blogs/${id}`);
  };

  // Batasi teks content menjadi 100 karakter
  const sliceContent = content.length > 100 ? content.slice(0, 100) + "..." : content;

  return (
    <div onClick={handleCardClick} className="bg-white rounded-lg shadow-md p-4 transition-transform transform hover:scale-105 cursor-pointer w-full">
      <img src={image} alt={title} className="w-full h-32 object-cover rounded-md mb-2" />
      <p className="text-sm text-gray-500 mb-1">{createdAt}</p>
      <div className="flex justify-between">
        <h3 className="text-md font-semibold text-gray-800 mb-2">{title}</h3>
        {/* BtnAction */}
        <BtnAction onEdit={() => onEdit(id)} onDelete={() => onDelete(id)} />
      </div>
      <p className="text-gray-700 text-sm">{sliceContent}</p>
    </div>
  );
};

BlogCard.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default BlogCard;
