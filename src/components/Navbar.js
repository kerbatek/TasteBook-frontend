import React from "react";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Navbar = () => {
  const token = localStorage.getItem("token")
    ? jwtDecode(localStorage.getItem("token"))
    : null;
  return (
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">RecipeBook</h1>
        <div>
          <Link
            to="/user/veganqueen"
            className="text-gray-600 hover:text-gray-800 px-4">
            Home
          </Link>

          <Link
            to="/recipes"
            className="text-gray-600 hover:text-gray-800 px-4">
            Recipes
          </Link>
          <Link
            to={token ? "/user/" + token.username : "/login"}
            className="text-gray-600 hover:text-gray-800 px-4">
            Profile
          </Link>
          {token && (
            <Link
              to="/logout"
              className="text-gray-600 hover:text-gray-800 px-4">
              Logout
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
