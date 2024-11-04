import { useParams, useNavigate } from "react-router-dom";
import blogItems from "../data/blogItems";

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find the blog post by ID from blogItems array
  const blogContent = blogItems.find((blog) => blog.id === parseInt(id));

  if (!blogContent) {
    return <div className="container mx-auto p-8">Blog not found.</div>;
  }

  return (
    <div className="container mx-auto p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Blog Content */}
      <div className="lg:col-span-2">
        <img src={blogContent.image} alt={blogContent.title} className="w-full h-72 object-cover rounded-md mb-4" />
        <p className="text-sm text-gray-500 mb-2">{blogContent.date}</p>
        <h2 className="text-2xl font-semibold mb-4">{blogContent.title}</h2>
        <p className="text-gray-700">{blogContent.content}</p>
      </div>

      {/* Navigation Section */}
      <div className="lg:col-span-1 bg-gray-100 p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Blog Lainnya</h3>
        <ul className="space-y-2">
          {blogItems.map((blog) => (
            <li key={blog.id} className={`cursor-pointer ${blog.id === parseInt(id) ? "text-blue-500 font-semibold" : "text-gray-700"}`}>
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
