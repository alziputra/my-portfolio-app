//src/pages/Blogs/AddBlogForm.jsx
import { useState } from "react";
import { useBlogContext } from "../../context/BlogContext";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

const AddBlogForm = ({ onClose }) => {
  const { addBlog } = useBlogContext();
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newImage, setNewImage] = useState(null); // Menyimpan file gambar
  const [isUploading, setIsUploading] = useState(false);

  const handleAddBlog = async (e) => {
    e.preventDefault();

    if (!newTitle || !newContent || !newImage) {
      toast.error("Please fill out all fields and upload an image!");
      return;
    }

    try {
      setIsUploading(true);
      await addBlog(
        {
          title: newTitle,
          content: newContent,
        },
        newImage // File gambar
      );

      setNewTitle("");
      setNewContent("");
      setNewImage(null);
      onClose();
      toast.success("Blog added successfully!");
    } catch (error) {
      console.error("Error adding blog:", error);
      toast.error("Failed to add blog. Please try again.");
    } finally {
      setIsUploading(false);
    }
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
        <label className="block text-gray-700 font-medium mb-2">Image</label>
        <input type="file" onChange={(e) => setNewImage(e.target.files[0])} className="w-full p-2 border border-gray-300 rounded-lg" />
      </div>
      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700" disabled={isUploading}>
        {isUploading ? "Uploading..." : "Save Blog"}
      </button>
    </form>
  );
};

AddBlogForm.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default AddBlogForm;
