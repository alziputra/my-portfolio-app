import { useState } from "react";
import { useBlogContext } from "../../context/BlogContext";
import PropTypes from "prop-types";

const AddBlogForm = ({ onClose }) => {
  const { addBlog } = useBlogContext();
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newImage, setNewImage] = useState("");

  const handleAddBlog = async (e) => {
    e.preventDefault();
    if (!newTitle || !newContent || !newImage) {
      alert("Please fill out all fields!");
      return;
    }

    await addBlog({
      title: newTitle,
      content: newContent,
      image: newImage,
      createdAt: new Date().toISOString(),
    });

    // Reset form dan tutup form
    setNewTitle("");
    setNewContent("");
    setNewImage("");
    onClose();
    alert("Blog added successfully!");
  };

  return (
    <form onSubmit={handleAddBlog} className="mb-8 space-y-4 p-4 border border-gray-300 rounded-lg shadow-md">
      <div>
        <label className="block text-gray-700 font-medium mb-2">Title</label>
        <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg" placeholder="Enter blog title" />
      </div>
      <div>
        <label className="block text-gray-700 font-medium mb-2">Content</label>
        <textarea value={newContent} onChange={(e) => setNewContent(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg" rows="4" placeholder="Enter blog content"></textarea>
      </div>
      <div>
        <label className="block text-gray-700 font-medium mb-2">Image URL</label>
        <input type="text" value={newImage} onChange={(e) => setNewImage(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg" placeholder="Enter image URL" />
      </div>
      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
        Save Blog
      </button>
    </form>
  );
};

AddBlogForm.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default AddBlogForm;
