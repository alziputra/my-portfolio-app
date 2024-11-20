import { useState } from "react";
import { useBlogContext } from "../../context/BlogContext";
import PropTypes from "prop-types";

const EditBlogForm = ({ blog, onClose }) => {
  const { updateBlog } = useBlogContext();
  const [updatedTitle, setUpdatedTitle] = useState(blog.title);
  const [updatedContent, setUpdatedContent] = useState(blog.content);
  const [updatedImage, setUpdatedImage] = useState(blog.image);

  const handleUpdateBlog = async (e) => {
    e.preventDefault();
    if (!updatedTitle || !updatedContent || !updatedImage) {
      alert("Please fill out all fields!");
      return;
    }

    await updateBlog(blog.id, {
      title: updatedTitle,
      content: updatedContent,
      image: updatedImage,
      updatedAt: new Date().toISOString(),
    });

    onClose();
    alert("Blog updated successfully!");
  };

  return (
    <form onSubmit={handleUpdateBlog} className="mb-8 space-y-4 p-4 border border-gray-300 rounded-lg shadow-md">
      <div>
        <label className="block text-gray-700 font-medium mb-2">Title</label>
        <input type="text" value={updatedTitle} onChange={(e) => setUpdatedTitle(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg" placeholder="Enter blog title" />
      </div>
      <div>
        <label className="block text-gray-700 font-medium mb-2">Content</label>
        <textarea value={updatedContent} onChange={(e) => setUpdatedContent(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg" rows="4" placeholder="Enter blog content"></textarea>
      </div>
      <div>
        <label className="block text-gray-700 font-medium mb-2">Image URL</label>
        <input type="text" value={updatedImage} onChange={(e) => setUpdatedImage(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg" placeholder="Enter image URL" />
      </div>
      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
        Update Blog
      </button>
    </form>
  );
};

EditBlogForm.propTypes = {
  blog: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default EditBlogForm;
