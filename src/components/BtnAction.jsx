// src/components/BtnAction.jsx
import PropTypes from "prop-types";
import { FaTrashAlt, FaPaintBrush, FaEllipsisV } from "react-icons/fa";

const BtnAction = ({ id, onEdit, onDelete, activeCard, setActiveCard }) => {
  const toggleDropdown = (e) => {
    e.stopPropagation();
    setActiveCard((prev) => (prev === id ? null : id)); // Toggle dropdown hanya untuk card yang diklik
  };

  const closeDropdown = () => {
    setActiveCard(null); // Menutup dropdown
  };

  return (
    <div className="relative">
      <button onClick={toggleDropdown} className="text-gray-600 hover:text-gray-800">
        <FaEllipsisV size={18} />
      </button>

      {activeCard === id && (
        <div className="absolute top-8 right-0 bg-white shadow-md rounded-md w-32 border border-gray-300" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => {
              onEdit();
              closeDropdown();
            }}
            className="w-full flex items-center px-4 py-2 text-blue-600 hover:bg-gray-100"
          >
            <FaPaintBrush size={16} className="mr-2" />
            <span>Edit</span>
          </button>
          <button
            onClick={() => {
              onDelete();
              closeDropdown();
            }}
            className="w-full flex items-center px-4 py-2 text-red-600 hover:bg-gray-100"
          >
            <FaTrashAlt size={16} className="mr-2" />
            <span>Delete</span>
          </button>
        </div>
      )}
    </div>
  );
};

BtnAction.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // Bisa string atau number
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  activeCard: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  setActiveCard: PropTypes.func.isRequired,
};

export default BtnAction;
