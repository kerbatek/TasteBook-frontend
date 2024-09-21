import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import FormError from "../components/FormError";
import { useNavigate } from "react-router-dom";

const apiUrl = process.env.REACT_APP_API_URL;

const Register = () => {
  const navigate = useNavigate();

  const [formErrors, setFormErrors] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [formData, setFormData] = React.useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const validateForm = () => {
    let errors = [];

    const username = formData.username.trim();
    const email = formData.email.trim();
    const password = formData.password.trim();
    const confirmPassword = formData.confirm_password.trim();

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&#]{8,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (password !== confirmPassword) {
      errors.push("Passwords do not match");
    }

    if (!passwordRegex.test(password)) {
      errors.push(
        "Password must be at least 8 characters long and include at least one letter and one number"
      );
    }

    if (username.length < 3) {
      errors.push("Username must be at least 3 characters long");
    }

    if (!emailRegex.test(email)) {
      errors.push("Please enter a valid email address");
    }

    if (errors.length > 0) {
      setFormErrors(errors);
      return false;
    }

    return true;
  };

  const sendRequestToServer = async () => {
    try {
      setLoading(true); // Set loading to true
      const response = await axios.post(apiUrl + "/register", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
      navigate(`/login/`);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred";
      setFormErrors([errorMessage]);
    } finally {
      setLoading(false); // Set loading to false after request is done
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormErrors(null); // Clear existing errors on submit

    if (!validateForm()) {
      return;
    }

    await sendRequestToServer();
  };

  return (
    <div className="bg-gray-100 font-sans min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        {/* Register Title */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Register
        </h2>

        {/* Form */}
        <form onSubmit={handleFormSubmit}>
          {/* Name Field */}
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 font-medium mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter your username"
              onChange={handleChange}
              name="username"
            />
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter your email"
              onChange={handleChange}
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
              type="password"
              id="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter your password"
              onChange={handleChange}
              name="password"
            />
          </div>

          {/* Confirm Password Field */}
          <div className="mb-4">
            <label
              htmlFor="confirm-password"
              className="block text-gray-700 font-medium mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Confirm your password"
              onChange={handleChange}
              name="confirm_password"
            />
          </div>

          {/* Error Field*/}
          {formErrors && <FormError errors={formErrors} />}

          {/* Register Button */}
          <div className="mb-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-600">
              {loading ? "Registering..." : "Register"}
            </button>
          </div>
        </form>

        {/* Divider */}
        <div className="text-center my-4">
          <span className="text-gray-400">or</span>
        </div>

        {/* Already have an account link */}
        <div className="text-center">
          <Link to="/login" className="text-blue-500 hover:underline">
            Already have an account? Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
