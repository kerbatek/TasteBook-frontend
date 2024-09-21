import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import FormError from "../components/FormError";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const apiUrl = process.env.REACT_APP_API_URL;

const Login = () => {
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token")
      ? jwtDecode(localStorage.getItem("token"))
      : null;

    if (token) {
      navigate(`/user/${token.username}`);
    }
  }, [navigate]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const sendRequestToServer = async () => {
    try {
      setLoading(true); // Set loading to true
      const response = await axios.post(apiUrl + "/login", {
        email: formData.email,
        password: formData.password,
      });

      localStorage.setItem("token", response.data.access_token);
      const decodedToken = jwtDecode(response.data.access_token);

      navigate(`/user/${decodedToken.username}`);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred";
      setFormErrors([errorMessage]);
    } finally {
      setLoading(false); // Set loading to false after request is done
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors(null);
    sendRequestToServer();
  };
  return (
    <div className="bg-gray-100 font-sans">
      {/* Main Login Container */}
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          {/* Login Title */}
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Login
          </h2>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-2">
                Email
              </label>
              <input
                onChange={handleChange}
                type="email"
                id="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Enter your email"
                name="email"
              />
            </div>

            {/* Password Field */}
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 font-medium mb-2">
                Password
              </label>
              <input
                onChange={handleChange}
                type="password"
                id="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Enter your password"
                name="password"
              />
            </div>
            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between mb-4">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-blue-600"
                />
                <span className="ml-2 text-gray-700">Remember me</span>
              </label>
              <a href="#" className="text-blue-500 hover:underline">
                Forgot password?
              </a>
            </div>
            {/* Error Messages */}
            {formErrors && <FormError errors={formErrors} />}

            {/* Login Button */}
            <div className="mb-4">
              <button
                type="submit"
                className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-600"
                disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>
          </form>

          {/* Divider */}
          <div className="text-center my-4">
            <span className="text-gray-400">or</span>
          </div>

          {/* Sign Up Link */}
          <div className="text-center">
            <Link to="/register" className="text-blue-500 hover:underline">
              Don't have an account? Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
