import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { ref, onValue, update, remove, push, set } from "firebase/database";
import { database } from "../config/firebase";
import cloudinaryUpload from "../config/cloudUpload";
import { PortfolioContext } from "../context/PortfolioContext";
import { toast } from "react-toastify";

const PortfolioProvider = ({ children }) => {
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch portfolios from Firebase
  useEffect(() => {
    const portfolioRef = ref(database, "portfolios");

    const unsubscribe = onValue(
      portfolioRef,
      (snapshot) => {
        const data = snapshot.val();
        const portfolioArray = data ? Object.keys(data).map((key) => ({ id: key, ...data[key] })) : [];
        setPortfolios(portfolioArray);
        setLoading(false);
      },
      (firebaseError) => {
        setError(firebaseError.message);
        toast.error("Error fetching portfolios: " + firebaseError.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // Add a new portfolio
  const addPortfolio = async (newPortfolio, file) => {
    try {
      let imageUrl = "";

      if (file) {
        imageUrl = await cloudinaryUpload(file);
      }

      const portfolioRef = ref(database, "portfolios");
      const newPortfolioRef = push(portfolioRef);
      const portfolioData = {
        ...newPortfolio,
        image: imageUrl,
        createdAt: new Date().toISOString(),
      };

      await set(newPortfolioRef, portfolioData);
      toast.success("Portfolio added successfully!");
    } catch (firebaseError) {
      setError(firebaseError.message);
      toast.error("Error adding portfolio: " + firebaseError.message);
    }
  };

  // Update an existing portfolio
  const updatePortfolio = async (id, updatedData, file) => {
    try {
      let imageUrl = updatedData.image || "";

      if (file) {
        imageUrl = await cloudinaryUpload(file);
      }

      const portfolioRef = ref(database, `portfolios/${id}`);
      const portfolioData = {
        ...updatedData,
        image: imageUrl,
        updatedAt: new Date().toISOString(),
      };

      await update(portfolioRef, portfolioData);
      toast.success("Portfolio updated successfully!");
    } catch (firebaseError) {
      setError(firebaseError.message);
      toast.error("Error updating portfolio: " + firebaseError.message);
    }
  };

  // Delete a portfolio
  const deletePortfolio = async (id) => {
    try {
      const portfolioRef = ref(database, `portfolios/${id}`);
      await remove(portfolioRef);
      toast.success("Portfolio deleted successfully!");
    } catch (firebaseError) {
      setError(firebaseError.message);
      toast.error("Error deleting portfolio: " + firebaseError.message);
    }
  };

  return (
    <PortfolioContext.Provider
      value={{
        portfolios,
        addPortfolio,
        updatePortfolio,
        deletePortfolio,
        loading,
        error,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

PortfolioProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PortfolioProvider;
