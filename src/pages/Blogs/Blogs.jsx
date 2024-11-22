// src/pages/Blogs/Blogs.jsx
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

  // State untuk mengelola dropdown aktif pada BlogCard
  const [activeCard, setActiveCard] = useState(null);

  // Fungsi untuk mengedit blog
  const handleEditBlog = (blog) => {
    setEditingBlog(blog);
    setIsAdding(false); // Sembunyikan form Add jika sedang edit
  };

  return (
    <div className="container mx-auto p-8">
      {/* Header */}
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
      {!isAdding && !editingBlog && (
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          onClick={() => setActiveCard(null)} // Menutup dropdown jika area kosong diklik
        >
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
              activeCard={activeCard}
              setActiveCard={setActiveCard}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Blogs;
