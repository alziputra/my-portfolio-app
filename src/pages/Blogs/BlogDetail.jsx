//src
import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { BlogContext } from "../../context/BlogContext";
import { formatRelativeTime } from "../../utils/formatTime";

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { blogs, updateBlog, loading, error } = useContext(BlogContext);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const blogContent = blogs.find((blog) => blog.id === id) || {};
    setFormData(blogContent);
  }, [blogs, id]);

  if (loading) return <div className="container mx-auto p-8">Loading...</div>;
  if (error) return <div className="container mx-auto p-8">Error: {error}</div>;
  if (!formData) return <div className="container mx-auto p-8">Blog not found.</div>;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    updateBlog(id, formData);
    setIsEditing(false);
  };

  return (
    <div className="container mx-auto p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        {isEditing ? (
          <form onSubmit={handleUpdate}>
            <div className="mb-4">
              <label className="block font-medium mb-2">Title</label>
              <input type="text" name="title" value={formData?.title || ""} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-lg" />
            </div>
            <div className="mb-4">
              <label className="block font-medium mb-2">Content</label>
              <textarea name="content" value={formData?.content || ""} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-lg" rows="6" />
            </div>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Save Changes
            </button>
            <button type="button" onClick={() => setIsEditing(false)} className="ml-4 px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500">
              Cancel
            </button>
          </form>
        ) : (
          <>
            <h1 className="text-3xl font-bold mb-4">{formData?.title}</h1>
            <div className="flex items-center mb-6">
              <img src={formData?.author?.profileImage} alt={formData?.author?.name} className="w-12 h-12 rounded-full mr-4" />
              <div>
                <p className="text-lg font-semibold">{formData?.author?.name}</p>
                <p className="text-gray-600">{formatRelativeTime(formData?.createdAt)}</p>
              </div>
            </div>
            <img src={formData?.image} alt={formData?.title} className="w-full h-64 object-cover rounded-lg mb-6" />
            <div className="text-gray-800 leading-relaxed" dangerouslySetInnerHTML={{ __html: formData?.content }}></div>
            <button onClick={() => setIsEditing(true)} className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">
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
