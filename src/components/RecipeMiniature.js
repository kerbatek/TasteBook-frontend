import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const apiUrl = process.env.REACT_APP_API_URL;

const RecipeMiniature = ({ id }) => {
  const [recipe, setRecipe] = useState(null);
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target); // Stop observing once visible
          }
        });
      },
      { threshold: 0.1 } // Adjust threshold as needed
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    // Cleanup the observer when the component unmounts
    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  // Trigger API call when the element becomes visible
  useEffect(() => {
    if (isVisible && !recipe) {
      axios
        .get(apiUrl + "/recipes", {
          params: {
            id: id,
          },
        })
        .then((response) => {
          setRecipe(response.data);
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    }
  }, [isVisible, recipe, id]);

  return (
    <div
      ref={elementRef}
      className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
      style={{ minHeight: "200px" }} // Optional: Ensure there's space to trigger the observer
    >
      {!recipe ? (
        <div>Loading recipe...</div>
      ) : (
        <>
          <img
            className="w-full h-48 object-cover"
            src="https://via.placeholder.com/400x300"
            alt="Recipe"
          />
          <div className="p-4 flex-grow">
            <h4 className="text-xl font-semibold text-gray-800">
              {recipe.title}
            </h4>
            <p className="text-gray-600 mt-2">
              {recipe.description.length > 100
                ? recipe.description.slice(0, 100) + "..."
                : recipe.description}
            </p>
          </div>
          <div className="bg-gray-100 p-4 text-right">
            <Link
              to={`/recipe/${recipe._id}`}
              className="text-blue-500 font-semibold">
              View Recipe
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default RecipeMiniature;
