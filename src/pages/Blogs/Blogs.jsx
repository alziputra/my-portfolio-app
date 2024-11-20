import { useState } from "react";
import { useBlogContext } from "../../context/BlogContext";
import { AiOutlinePlus } from "react-icons/ai";
import BlogCard from "../../components/BlogCard";
import AddBlogForm from "./AddBlogForm";
import EditBlogForm from "./EditBlogForm";

const Blogs = () => {
  const { blogs } = useBlogContext();

  // State untuk mengontrol form Add/Edit
  const [isAdding, setIsAdding] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);

  // Fungsi untuk mengedit blog
  const handleEditBlog = (blog) => {
    setEditingBlog(blog);
  };

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">All Blogs</h1>
        <button
          className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          onClick={() => {
            setIsAdding((prev) => !prev);
            setEditingBlog(null); // Reset editing state jika sedang menambah
          }}
        >
          <AiOutlinePlus size={20} />
          <span>{isAdding ? "Close Form" : "Add Blog"}</span>
        </button>
      </div>

      {/* Form Add Blog */}
      {isAdding && <AddBlogForm onClose={() => setIsAdding(false)} />}

      {/* Form Edit Blog */}
      {editingBlog && <EditBlogForm blog={editingBlog} onClose={() => setEditingBlog(null)} />}

      {/* Daftar Blog */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <BlogCard
            key={blog.id}
            id={blog.id}
            image={blog.image}
            title={blog.title}
            content={blog.content}
            createdAt={new Date(blog.createdAt).toLocaleDateString()}
            onEdit={() => handleEditBlog(blog)} // Tambahkan tombol Edit
          />
        ))}
      </div>
    </div>
  );
};

export default Blogs;
