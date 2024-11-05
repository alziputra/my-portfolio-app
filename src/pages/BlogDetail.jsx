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
      {/* Main Blog Content */}
      <div className="lg:col-span-2">
        <h1 className="text-3xl font-bold mb-4">{blogContent.title}</h1>
        <div className="flex items-center mb-6">
          <img src={blogContent.author.profileImage} alt={blogContent.author.name} className="w-12 h-12 rounded-full mr-4" />
          <div>
            <p className="text-lg font-semibold">{blogContent.author.name}</p>
            <p className="text-gray-500 text-sm">
              Created: {blogContent.createdAt} | Updated: {blogContent.updatedAt}
            </p>
          </div>
        </div>
        <img src={blogContent.image} alt={blogContent.title} className="w-full h-64 object-cover rounded-lg mb-6" />
        <div className="text-gray-800 leading-relaxed" dangerouslySetInnerHTML={{ __html: blogContent.content }}></div>
        
      </div>

      {/* Navigation Section */}
      <div className="bg-gray-100 p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Other Blog Posts</h3>
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
