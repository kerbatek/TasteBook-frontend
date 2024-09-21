// src/pages/Recipe.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footbar from "../components/Footbar";
import Comments from "../components/Comments";

const apiUrl = process.env.REACT_APP_API_URL;
function Recipe() {
  const [data, setData] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(apiUrl + "/recipes", {
        params: {
          id: id,
        },
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, [id]);

  return !data ? (
    ""
  ) : (
    <div className="bg-gray-100 font-sans">
      {/* Navbar */}
      <Navbar />
      {/* Recipe Section */}
      <div className="container mx-auto mt-8">
        {/* Recipe Header */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="w-full">
              <h2 className="text-3xl font-bold text-gray-800">
                {data?.title}
              </h2>
              <p className="text-gray-600 mt-2">{data?.description}</p>
            </div>
            <div className="ml-auto bg-gray-50 p-6 rounded-lg shadow-md w-64">
              {" "}
              {/* Adjust the width here */}
              <div className="text-gray-700 flex gap-x-2">
                <p className="font-semibold text-gray-800">Servings:</p>
                <p className="text-lg font-bold text-gray-900">
                  {data?.servings}
                </p>
              </div>
              <div className="text-gray-700 flex gap-x-2 mt-2">
                <p className="font-semibold text-gray-800">Prep Time:</p>
                <p className="text-lg font-bold text-gray-900">
                  {data?.prep_time} mins
                </p>
              </div>
              <div className="text-gray-700 flex gap-x-2 mt-2">
                <p className="font-semibold text-gray-800">Cook Time:</p>
                <p className="text-lg font-bold text-gray-900">
                  {data?.cook_time} mins
                </p>
              </div>
              <div className="text-gray-700 flex gap-x-2 mt-2">
                <p className="font-semibold text-gray-800">Total Time:</p>
                <p className="text-lg font-bold text-gray-900">
                  {data?.total_time} mins
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <img
              className="w-full h-64 object-cover rounded-lg"
              src="https://via.placeholder.com/800x400"
              alt="Recipe"
            />
          </div>
        </div>

        {/* Ingredients and Instructions */}
        <div className="flex flex-col lg:flex-row gap-8 mt-8">
          {/* Ingredients Section */}
          <div className="bg-white rounded-lg shadow-md p-6 lg:w-1/3">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Ingredients
            </h3>
            <ul className="list-disc pl-5 space-y-2">
              {data?.ingredients.length > 0 ? (
                data?.ingredients.map((set, index) => {
                  return (
                    <li className="text-gray-700" key={index}>
                      {set?.quantity} {set?.unit} {set?.name}
                    </li>
                  );
                })
              ) : (
                <li className="text-gray-700">No ingredients found</li>
              )}
            </ul>
          </div>

          {/* Instructions Section */}
          <div className="bg-white rounded-lg shadow-md p-6 lg:w-2/3">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Instructions
            </h3>
            <ol className="list-decimal pl-5 space-y-4">
              {data?.instructions.length > 0 ? (
                data?.instructions.map((line, index) => {
                  return (
                    <li key={index} className="text-gray-700">
                      {line}
                    </li>
                  );
                })
              ) : (
                <li className="text-gray-700">No instructions found</li>
              )}
            </ol>
          </div>
        </div>
      </div>
      {/* Comments */}
      <Comments comments={data?.comments} table_id={id} />

      {/* Footer */}
      <Footbar />
    </div>
  );
}

export default Recipe;
