import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Users from "./pages/Users";
import User from "./pages/User";
import Recipes from "./pages/Recipes";
import Recipe from "./pages/Recipe";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Register from "./pages/Register";

// Uncomment or create the component
// Uncomment or create the component
//import RecipeDetail from './pages/RecipeDetail';  // Uncomment or create the component
//import UserProfile from './pages/UserProfile';  // Uncomment or create the component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/users" element={<Users />} />
        <Route path="/user/:username" element={<User />} />

        <Route path="/recipes/" element={<Recipes />} />
        <Route path="/recipe/:id" element={<Recipe />} />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Router>
  );
}

export default App;
