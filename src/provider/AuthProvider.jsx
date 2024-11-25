import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../config/firebase";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Cek status user saat aplikasi pertama kali dimuat
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        localStorage.setItem("userToken", currentUser.accessToken);
      } else {
        setUser(null);
        localStorage.removeItem("userToken");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Login dengan email/password
  const loginWithEmailPassword = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      localStorage.setItem("userToken", userCredential.user.accessToken);
      navigate("/dashboard"); // Ganti dengan halaman tujuan setelah login
    } catch (firebaseError) {
      setError(firebaseError.message);
      toast.error("Login failed: " + firebaseError.message);
    }
  };

  // Registrasi dengan email/password
  const registerWithEmailPassword = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      localStorage.setItem("userToken", userCredential.user.accessToken);
      navigate("/dashboard"); // Ganti dengan halaman tujuan setelah registrasi
    } catch (firebaseError) {
      setError(firebaseError.message);
      toast.error("Registration failed: " + firebaseError.message);
    }
  };

  // Login dengan Google
  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      localStorage.setItem("userToken", result.user.accessToken);
      navigate("/dashboard"); // Ganti dengan halaman tujuan setelah login Google
    } catch (firebaseError) {
      setError(firebaseError.message);
      toast.error("Google login failed: " + firebaseError.message);
    }
  };

  // Logout
  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      localStorage.removeItem("userToken");
      navigate("/login"); // Arahkan ke halaman login setelah logout
    } catch (firebaseError) {
      setError(firebaseError.message);
      toast.error("Logout failed: " + firebaseError.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loginWithEmailPassword,
        registerWithEmailPassword,
        loginWithGoogle,
        logout,
        loading,
        error,
      }}
    >
      {!loading ? children : <div>Loading...</div>}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
