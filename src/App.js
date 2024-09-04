import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';  // Uncomment or create the component
//import RecipeDetail from './pages/RecipeDetail';  // Uncomment or create the component
//import UserProfile from './pages/UserProfile';  // Uncomment or create the component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
