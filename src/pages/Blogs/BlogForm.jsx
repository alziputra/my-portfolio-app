//src/pages/Blogs/BlogForm.jsx
import { useState, useEffect } from "react";
import { useBlogContext } from "../../context/BlogContext";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

const BlogForm = ({ onClose, mode = "add", initialData = null }) => {
  const { addBlog, updateBlog } = useBlogContext();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null); // File gambar
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setTitle(initialData.title);
      setContent(initialData.content);
      setImage(initialData.image);
    }
  }, [mode, initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content || (!image && mode === "add")) {
      toast.error("Please fill out all fields!");
      return;
    }

    try {
      setIsUploading(true);
      if (mode === "add") {
        await addBlog({ title, content }, image);
        toast.success("Blog added successfully!");
      } else {
        await updateBlog(initialData.id, { title, content, image });
        toast.success("Blog updated successfully!");
      }
      onClose();
    } catch (error) {
      console.error(`Error ${mode === "add" ? "adding" : "updating"} blog:`, error);
      toast.error(`Failed to ${mode === "add" ? "add" : "update"} blog. Please try again.`);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 space-y-4 p-4 border border-gray-300 rounded-lg shadow-md">
      <div>
        <label className="block text-gray-700 font-medium mb-2">Title</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg" placeholder="Enter blog title" />
      </div>
      <div>
        <label className="block text-gray-700 font-medium mb-2">Content</label>
        <textarea value={content} onChange={(e) => setContent(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg" rows="4" placeholder="Enter blog content"></textarea>
      </div>
      <div>
        <label className="block text-gray-700 font-medium mb-2">Image</label>
        <input type="file" onChange={(e) => setImage(e.target.files[0])} className="w-full p-2 border border-gray-300 rounded-lg" />
      </div>
      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700" disabled={isUploading}>
        {isUploading ? "Uploading..." : mode === "add" ? "Add Blog" : "Update Blog"}
      </button>
    </form>
  );
};

BlogForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  mode: PropTypes.oneOf(["add", "edit"]),
  initialData: PropTypes.object,
};

export default BlogForm;
