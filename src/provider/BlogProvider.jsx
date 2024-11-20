import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { ref, onValue, update, remove, push, set } from "firebase/database";
import { database } from "../config/firebase";
import cloudinaryUpload from "../config/cloudUpload";
import { BlogContext } from "../context/BlogContext";

const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch blogs from Firebase
  useEffect(() => {
    const blogRef = ref(database, "blogs");

    const unsubscribe = onValue(
      blogRef,
      (snapshot) => {
        const data = snapshot.val();
        const blogArray = data ? Object.keys(data).map((key) => ({ id: key, ...data[key] })) : [];
        console.log("Fetched blogs:", blogArray); // Debugging
        setBlogs(blogArray);
        setLoading(false);
      },
      (firebaseError) => {
        console.error("Error fetching blogs:", firebaseError.message);
        setError(firebaseError.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // Add a new blog
  const addBlog = async (newBlog, file) => {
    try {
      let imageUrl = "";

      if (file) {
        imageUrl = await cloudinaryUpload(file); // Upload gambar ke Cloudinary
      }

      const blogRef = ref(database, "blogs");
      const newBlogRef = push(blogRef); // Create a new unique ID
      const blogData = {
        ...newBlog,
        image: imageUrl, // Tambahkan URL gambar
        createdAt: new Date().toISOString(),
      };
      console.log("Saving blog to Firebase:", blogData); // Debugging
      await set(newBlogRef, blogData);
    } catch (firebaseError) {
      setError(firebaseError.message);
      console.error("Error adding blog:", firebaseError.message);
    }
  };

  // Update an existing blog
  const updateBlog = async (id, updatedData, file) => {
    try {
      let imageUrl = updatedData.image || ""; // Gunakan URL lama jika tidak ada gambar baru

      if (file) {
        imageUrl = await cloudinaryUpload(file); // Upload gambar baru ke Cloudinary
      }

      const blogRef = ref(database, `blogs/${id}`);
      const blogData = {
        ...updatedData,
        image: imageUrl, // Update dengan URL gambar baru
        updatedAt: new Date().toISOString(),
      };
      console.log("Updating blog in Firebase:", blogData); // Debugging
      await update(blogRef, blogData);
    } catch (firebaseError) {
      setError(firebaseError.message);
      console.error("Error updating blog:", firebaseError.message);
    }
  };

  // Delete a blog
  const deleteBlog = async (id) => {
    try {
      const blogRef = ref(database, `blogs/${id}`);
      await remove(blogRef);
    } catch (firebaseError) {
      setError(firebaseError.message);
      console.error("Error deleting blog:", firebaseError.message);
    }
  };

  return (
    <BlogContext.Provider
      value={{
        blogs,
        addBlog,
        updateBlog,
        deleteBlog,
        loading,
        error,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

BlogProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BlogProvider;
