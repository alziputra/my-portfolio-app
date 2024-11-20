import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { ref, onValue, update, remove, push, set } from "firebase/database";
import { database } from "../config/firebase";
import cloudinaryUpload from "../config/cloudUpload";
import { BlogContext } from "../context/BlogContext";
import { toast } from "react-toastify";

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
        setBlogs(blogArray);
        setLoading(false);
      },
      (firebaseError) => {
        setError(firebaseError.message);
        toast.error("Error fetching blogs: " + firebaseError.message);
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
        imageUrl = await cloudinaryUpload(file);
      }

      const blogRef = ref(database, "blogs");
      const newBlogRef = push(blogRef);
      const blogData = {
        ...newBlog,
        image: imageUrl,
        createdAt: new Date().toISOString(),
      };

      await set(newBlogRef, blogData);
      toast.success("Blog added successfully!");
    } catch (firebaseError) {
      setError(firebaseError.message);
      toast.error("Error adding blog: " + firebaseError.message);
    }
  };

  // Update an existing blog
  const updateBlog = async (id, updatedData, file) => {
    try {
      let imageUrl = updatedData.image || "";

      if (file) {
        imageUrl = await cloudinaryUpload(file);
      }

      const blogRef = ref(database, `blogs/${id}`);
      const blogData = {
        ...updatedData,
        image: imageUrl,
        updatedAt: new Date().toISOString(),
      };

      await update(blogRef, blogData);
      toast.success("Blog updated successfully!");
    } catch (firebaseError) {
      setError(firebaseError.message);
      toast.error("Error updating blog: " + firebaseError.message);
    }
  };

  // Delete a blog
  const deleteBlog = async (id) => {
    try {
      const blogRef = ref(database, `blogs/${id}`);
      await remove(blogRef);
      toast.success("Blog deleted successfully!");
    } catch (firebaseError) {
      setError(firebaseError.message);
      toast.error("Error deleting blog: " + firebaseError.message);
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
