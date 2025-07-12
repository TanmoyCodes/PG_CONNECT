import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const LoginPage = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      setLoading(true);
      const res = await axios.post(`${apiUrl}/api/login`, { email, password },{withCredentials: true,});

      if (res.status !== 200) {
        alert("Login failed. Please try again.");
        throw new Error("Login failed");
      }

      alert("Login successful!");
      e.target.reset();
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 animate-fade-in">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md transform transition-all duration-500 hover:scale-[1.02]"
      >
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
          Login
        </h1>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all duration-300"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      <div className="mt-4 text-center">
        <p className="text-gray-600">
          Don't have an account?{" "}
          <Link to={'/'} className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
