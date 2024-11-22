// src/pages/Blogs/Bloglist.jsx
import { useState } from "react";
import { useBlogContext } from "../../context/BlogContext";
import { AiOutlinePlus } from "react-icons/ai";
import BlogCard from "../../components/BlogCard";
import BlogForm from "./BlogForm";

const BlogsList = () => {
  const { blogs } = useBlogContext();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState("add"); // "add" or "edit"
  const [editingBlog, setEditingBlog] = useState(null);

  const handleAddBlog = () => {
    setFormMode("add");
    setEditingBlog(null);
    setIsFormOpen(true);
  };

  const handleEditBlog = (blog) => {
    setFormMode("edit");
    setEditingBlog(blog);
    setIsFormOpen(true);
  };

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">All Blogs</h1>
        <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700" onClick={handleAddBlog}>
          <AiOutlinePlus size={20} />
          <span>Add Blog</span>
        </button>
      </div>

      {isFormOpen && <BlogForm onClose={() => setIsFormOpen(false)} mode={formMode} initialData={editingBlog} />}

      {!isFormOpen && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <BlogCard
              key={blog.id}
              id={blog.id}
              image={blog.image}
              title={blog.title}
              content={blog.content}
              createdAt={new Date(blog.createdAt).toLocaleDateString()}
              onEdit={() => handleEditBlog(blog)}
              onDelete={(id) => console.log(`Blog with ID ${id} deleted`)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogsList;
