import { useState } from "react";
import { useBlogContext } from "../context/BlogContext";

const PostCreator = () => {
  const { addBlog } = useBlogContext();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title.trim() === "" || content.trim() === "") {
      alert("Title and content are required!");
      return;
    }

    // Tambahkan blog baru
    await addBlog({
      title,
      content,
      author: {
        name: "Admin", // Anda bisa mengganti dengan nama pengguna yang sebenarnya
      },
    });

    // Reset form
    setTitle("");
    setContent("");
    alert("Blog added successfully!");
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Create New Blog</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-2">Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg" placeholder="Enter blog title" />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">Content</label>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg" rows="6" placeholder="Enter blog content"></textarea>
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Add Blog
        </button>
      </form>
    </div>
  );
};

export default PostCreator;
