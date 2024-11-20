import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { ref, onValue, update, remove, push, set } from "firebase/database";
import { database } from "../config/firebase";
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
        setBlogs(blogArray);
        setLoading(false);
      },
      (firebaseError) => {
        setError(firebaseError.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // Add a new blog
  const addBlog = async (newBlog) => {
    try {
      const blogRef = ref(database, "blogs");
      const newBlogRef = push(blogRef); // Create a new unique ID
      await set(newBlogRef, {
        ...newBlog,
        createdAt: new Date().toISOString(),
      });
    } catch (firebaseError) {
      setError(firebaseError.message);
    }
  };

  // Update an existing blog
  const updateBlog = async (id, updatedData) => {
    try {
      const blogRef = ref(database, `blogs/${id}`);
      await update(blogRef, updatedData);
    } catch (firebaseError) {
      setError(firebaseError.message);
    }
  };

  // Delete a blog
  const deleteBlog = async (id) => {
    try {
      const blogRef = ref(database, `blogs/${id}`);
      await remove(blogRef);
    } catch (firebaseError) {
      setError(firebaseError.message);
    }
  };

  return <BlogContext.Provider value={{ blogs, addBlog, updateBlog, deleteBlog, loading, error }}>{children}</BlogContext.Provider>;
};

BlogProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BlogProvider;
