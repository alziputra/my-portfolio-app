import { useState } from "react";

const PostCreator = () => {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [content, setContent] = useState("");

  const saveDraft = () => {
    localStorage.setItem("draftTitle", title);
    localStorage.setItem("draftContent", content);
    localStorage.setItem("draftTags", tags);
    alert("Draft saved!");
  };

  const publishPost = () => {
    if (!title || !content) {
      alert("Title and content are required!");
      return;
    }
    console.log("Title:", title);
    console.log("Tags:", tags);
    console.log("Content:", content);
    alert("Post published!");
  };

  return (
    <div className="max-w-lg mx-auto p-6 border border-gray-300 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Create Post</h2>

      <input
        type="file"
        accept="image/*"
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 mb-4"
        placeholder="Add a cover image"
      />

      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 mb-4 border border-gray-300 rounded" placeholder="New post title here..." required />

      <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} className="w-full p-2 mb-4 border border-gray-300 rounded" placeholder="Add up to 4 tags..." />

      <div className="flex space-x-2 mb-4">
        <button className="px-2 py-1 text-lg font-bold">B</button>
        <button className="px-2 py-1 text-lg italic">I</button>
        <button className="px-2 py-1">Link</button>
        <button className="px-2 py-1">List</button>
        <button className="px-2 py-1">Quote</button>
        <button className="px-2 py-1">Code</button>
        <button className="px-2 py-1">Image</button>
      </div>

      <textarea value={content} onChange={(e) => setContent(e.target.value)} className="w-full p-2 mb-4 border border-gray-300 rounded" placeholder="Write your post content here..." rows="6" required></textarea>

      <div className="flex justify-between">
        <button onClick={saveDraft} className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400">
          Save Draft
        </button>
        <button onClick={publishPost} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Publish
        </button>
      </div>
    </div>
  );
};

export default PostCreator;
