import { useState } from "react";
import { usePortfolioContext } from "../../context/PortfolioContext";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

const AddPortfolioForm = ({ onClose }) => {
  const { addPortfolio } = usePortfolioContext();
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newImage, setNewImage] = useState(null); // Menyimpan file gambar
  const [isUploading, setIsUploading] = useState(false);

  const handleAddPortfolio = async (e) => {
    e.preventDefault();

    if (!newTitle || !newDescription || !newImage) {
      toast.error("Please fill out all fields and upload an image!");
      return;
    }

    try {
      setIsUploading(true);
      await addPortfolio(
        {
          title: newTitle,
          description: newDescription,
        },
        newImage // File gambar
      );

      setNewTitle("");
      setNewDescription("");
      setNewImage(null);
      onClose();
      toast.success("Portfolio added successfully!");
    } catch (error) {
      console.error("Error adding portfolio:", error);
      toast.error("Failed to add portfolio. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form onSubmit={handleAddPortfolio} className="mb-8 space-y-4 p-4 border border-gray-300 rounded-lg shadow-md">
      <div>
        <label className="block text-gray-700 font-medium mb-2">Title</label>
        <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg" placeholder="Enter portfolio title" />
      </div>
      <div>
        <label className="block text-gray-700 font-medium mb-2">Description</label>
        <textarea value={newDescription} onChange={(e) => setNewDescription(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg" rows="4" placeholder="Enter portfolio description"></textarea>
      </div>
      <div>
        <label className="block text-gray-700 font-medium mb-2">Image</label>
        <input type="file" onChange={(e) => setNewImage(e.target.files[0])} className="w-full p-2 border border-gray-300 rounded-lg" />
      </div>
      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700" disabled={isUploading}>
        {isUploading ? "Uploading..." : "Save Portfolio"}
      </button>
    </form>
  );
};

AddPortfolioForm.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default AddPortfolioForm;
