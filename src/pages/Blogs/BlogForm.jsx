import { useState, useEffect } from "react";
import { useBlogContext } from "../../context/BlogContext";
import PropTypes from "prop-types";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const BlogForm = ({ onClose, mode = "add", initialData = null }) => {
  const { addBlog, updateBlog } = useBlogContext();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState(""); // Content akan menyimpan HTML
  const [image, setImage] = useState(null); // File gambar
  const [isUploading, setIsUploading] = useState(false);
  const [errors, setErrors] = useState({}); // Untuk menyimpan pesan error

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setTitle(initialData.title);
      setContent(initialData.content);
      setImage(initialData.image);
    }
  }, [mode, initialData]);

  const validateForm = () => {
    const newErrors = {};
    if (!title) newErrors.title = "Title is required.";
    if (!content) newErrors.content = "Content is required.";
    if (mode === "add" && !image) newErrors.image = "Image is required for new blogs.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Form valid jika tidak ada error
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
      <div>
        <label className="block text-gray-700 font-medium mb-2">Content</label>
        <CKEditor
          editor={ClassicEditor}
          data={content}
          onChange={(event, editor) => setContent(editor.getData())}
          config={{
            placeholder: "Enter blog content",
          }}
        />
        {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content}</p>}
      </div>
      <div>
        <label className="block text-gray-700 font-medium mb-2">Image</label>
        <input type="file" onChange={(e) => setImage(e.target.files[0])} className={`w-full p-2 border ${errors.image ? "border-red-500" : "border-gray-300"} rounded-lg`} />
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
