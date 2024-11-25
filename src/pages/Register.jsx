import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const auth = getAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/login"); // Redirect to login page after successful registration
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form className="w-full max-w-md bg-white p-8 shadow-md rounded" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold mb-6">Register</h1>
        {error && <p className="text-red-500">{error}</p>}
        <input type="email" placeholder="Email" className="w-full px-4 py-2 mb-4 border rounded" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" className="w-full px-4 py-2 mb-6 border rounded" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">Register</button>
      </form>
    </div>
  );
};

export default Register;
