import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logoImage from '../assets/mithabteyLogo.png';
import OAuth from "../components/OAuth";

export default function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showFormMessage, setShowFormMessage] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
    setShowFormMessage(false); 
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid()) {
      setShowFormMessage(true);
      return;
    }
    try {
      setLoading(true);
      const res = await fetch("/server/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/signin");
    } catch (error: any) {
      setLoading(false);
      setError(error.message);
    }
  };

  const isFormValid = () => {
    return (
      formData.username.trim() !== "" &&
      formData.email.trim() !== "" &&
      formData.password.trim() !== ""
    );
  };

  useEffect(() => {
    setError(null);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center p-3">
      <div className="bg-white p-10 rounded-xl shadow-lg max-w-md w-full">
        <div className="flex justify-center mb-6">
          <img src={logoImage} alt="Company Logo" className="h-16 w-16" />
        </div>
        <h1 className="text-4xl text-center font-bold mb-8 text-gray-800">Sign Up</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Username"
              className="w-full px-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              id="username"
              value={formData.username}
              onChange={handleChange}
            />
            <svg className="w-6 h-6 absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11V7a4 4 0 10-8 0v4M8 11v6a4 4 0 108 0v-6m0 0h6a2 2 0 002-2V9a2 2 0 00-2-2h-6a2 2 0 00-2 2v2m0 0h-2"></path></svg>
          </div>
          <div className="relative">
            <input
              type="email"
              placeholder="Email"
              className="w-full px-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              id="email"
              value={formData.email}
              onChange={handleChange}
            />
            <svg className="w-6 h-6 absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12H8m0 0H6a2 2 0 00-2 2v2a2 2 0 002 2h8a2 2 0 002-2v-2a2 2 0 00-2-2H8zm0 0V6a2 2 0 012-2h4a2 2 0 012 2v6m0 0h4m-6 4v2m0-6v6m0-6v6"></path></svg>
          </div>
          <div className="relative">
            <input
              type="password"
              placeholder="Password"
              className="w-full px-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              id="password"
              value={formData.password}
              onChange={handleChange}
            />
            <svg className="w-6 h-6 absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11V7a4 4 0 10-8 0v4M8 11v6a4 4 0 108 0v-6m0 0h6a2 2 0 002-2V9a2 2 0 00-2-2h-6a2 2 0 00-2 2v2m0 0h-2"></path></svg>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg uppercase font-semibold hover:bg-indigo-500 transition duration-300"
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>
          <OAuth />
        </form>
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        {showFormMessage && !isFormValid() && (
          <p className="text-red-500 text-center mt-4">Please fill in all fields</p>
        )}
        <p className="text-center mt-6">
          Already have an account?{" "}
          <a href="/signin" className="text-indigo-600 hover:underline">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
}
