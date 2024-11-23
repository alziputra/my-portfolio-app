//src/pages/Blogs/BlogDetail.jsx
// src/pages/Blogs/BlogDetail.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { BlogContext } from "../../context/BlogContext";
import { formatRelativeTime } from "../../utils/formatTime";
import BlogForm from "./BlogForm";

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { blogs, loading, error } = useContext(BlogContext);

  const [isEditing, setIsEditing] = useState(false);
  const [blogData, setBlogData] = useState(null);

  useEffect(() => {
    const blogContent = blogs.find((blog) => blog.id === id) || null;
    setBlogData(blogContent);
  }, [blogs, id]);

  if (loading) return <div className="container mx-auto p-8">Loading...</div>;
  if (error) return <div className="container mx-auto p-8">Error: {error}</div>;
  if (!blogData) return <div className="container mx-auto p-8">Blog not found.</div>;

  const handleEditToggle = () => setIsEditing((prev) => !prev);

  return (
    <div className="container mx-auto p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        {isEditing ? (
          <BlogForm mode="edit" initialData={blogData} onClose={handleEditToggle} />
        ) : (
          <>
            <h1 className="text-3xl font-bold mb-4">{blogData?.title}</h1>
            <div className="flex items-center mb-6">
              <img src={blogData?.author?.profileImage} alt={blogData?.author?.name} className="w-12 h-12 rounded-full mr-4" />
              <div>
                <p className="text-lg font-semibold">{blogData?.author?.name}</p>
                <p className="text-gray-600">{formatRelativeTime(blogData?.createdAt)}</p>
              </div>
            </div>
            {blogData?.image && <img src={blogData?.image} alt={blogData?.title} className="w-full h-64 object-cover rounded-lg mb-6" />}
            <div className="text-gray-800 leading-relaxed" dangerouslySetInnerHTML={{ __html: blogData?.content }}></div>
            <button onClick={handleEditToggle} className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">
              Edit Blog
            </button>
          </>
        )}
      </div>
      <div className="bg-gray-100 p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Other Blog Posts</h3>
        <ul className="space-y-2">
          {blogs.map((blog) => (
            <li key={blog.id} className={`cursor-pointer ${blog.id === id ? "text-blue-500 font-semibold" : "text-gray-700"}`}>
              <button onClick={() => navigate(`/blogs/${blog.id}`)} className="w-full text-left hover:text-blue-600">
                {blog.title}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BlogDetail;
