//src/pages/Blogs/BlogForm.jsx
import { useState, useEffect } from "react";
import { useBlogContext } from "../../context/BlogContext";
import PropTypes from "prop-types";
import Editor from "../../components/Editor";

const BlogForm = ({ onClose, mode = "add", initialData = null }) => {
  const { addBlog, updateBlog } = useBlogContext();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState(""); // Content akan menyimpan HTML
  const [image, setImage] = useState(null); // File gambar
  const [isUploading, setIsUploading] = useState(false);
  const [errors, setErrors] = useState({}); // Untuk menyimpan pesan error

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setTitle(initialData.title || "");
      setContent(initialData.content || "");
      setImage(initialData.image || null);
    }
  }, [mode, initialData]);

  const validateForm = () => {
    const newErrors = {};
    if (!title) newErrors.title = "Title is required.";
    if (!content) newErrors.content = "Content is required.";
    if (mode === "add" && (!image || typeof image !== "object")) {
      newErrors.image = "Image file is required for new blogs.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const newBlog = {
      title,
      content, // Content dalam format HTML
    };

    try {
      setIsUploading(true);

      if (mode === "add") {
        await addBlog(newBlog, image);
      } else {
        await updateBlog(initialData.id, newBlog, image);
      }

      onClose(); // Tutup form setelah berhasil
    } catch (error) {
      console.error("An error occurred while saving the blog.", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 space-y-4 p-4 border border-gray-300 rounded-lg shadow-md">
      <div>
        <label className="block text-gray-700 font-medium mb-2">Title</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className={`w-full p-2 border ${errors.title ? "border-red-500" : "border-gray-300"} rounded-lg`} placeholder="Enter blog title" />
        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
      </div>

      {/* ckeditor untuk menulis konten blog */}
      <div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">Content</label>
          <Editor content={content} setContent={setContent} placeholder="Enter blog content" />
          {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content}</p>}
        </div>
      </div>
      <div>
        <label className="block text-gray-700 font-medium mb-2">Image</label>
        <input
          type="file"
          onChange={(e) => {
            const file = e.target.files[0];
            setImage(file ? file : null); // Pastikan `null` jika tidak ada file
          }}
          className={`w-full p-2 border ${errors.image ? "border-red-500" : "border-gray-300"} rounded-lg`}
        />
        {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
        {image && typeof image === "string" && (
          <div className="mt-2">
            <img src={image} alt="Current project" className="w-full h-32 object-cover rounded-lg" />
          </div>
        )}
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
