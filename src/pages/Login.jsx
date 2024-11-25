import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const auth = getAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/"); // Redirect to homepage
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form className="w-full max-w-md bg-white p-8 shadow-md rounded" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold mb-6">Login</h1>
        {error && <p className="text-red-500">{error}</p>}
        <input type="email" placeholder="Email" className="w-full px-4 py-2 mb-4 border rounded" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" className="w-full px-4 py-2 mb-6 border rounded" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Login</button>
      </form>
    </div>
  );
};

export default Login;
