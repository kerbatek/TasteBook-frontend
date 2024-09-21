// src/pages/Recipes.js
import React, { useState, useEffect, Suspense } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footbar from "../components/Footbar";
import RecipeMiniature from "../components/RecipeMiniature";
const apiUrl = process.env.REACT_APP_API_URL;

function Recipes() {
  const [data, setData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(apiUrl + "/recipes", {})
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);

  return (
    <div>
      <Navbar />
      {data && data.map((row) => <RecipeMiniature id={row._id} />)}
      <Footbar />
    </div>
  );
}

export default Recipes;
