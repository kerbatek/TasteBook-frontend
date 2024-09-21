import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footbar from "../components/Footbar";
import RecipeMiniature from "../components/RecipeMiniature";
import { data } from "autoprefixer";

const apiUrl = process.env.REACT_APP_API_URL;

function User() {
  const [userData, setUserData] = useState(null);
  const { username } = useParams();

  useEffect(() => {
    axios
      .get(apiUrl + "/users", {
        params: {
          user: username,
        },
      })
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, [username]);

  // Function to format the date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return !userData ? (
    ""
  ) : (
    <div className="bg-gray-100 font-sans">
      {/* Navbar */}
      <Navbar />

      {/* Profile Header */}
      <div className="container mx-auto mt-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <img
              className="w-24 h-24 rounded-full border-2 border-gray-200"
              src={`${apiUrl}${userData?.profile_picture_url}`}
              alt="Profile"
            />
            <div className="ml-6">
              <h2 className="text-3xl font-bold text-gray-800">
                {userData?.display_name}
              </h2>
              <p className="text-gray-600">@{userData?.username}</p>
              <p className="text-gray-700 mt-2">{userData?.bio}</p>
              {/* Date Joined Section */}
              <p className="text-gray-500 mt-2">
                Joined on {formatDate(userData?.date_joined)}
              </p>
            </div>
            <div className="ml-auto">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                Follow
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto mt-6">
        <div className="bg-white rounded-lg shadow-md p-6 flex justify-around">
          <div className="text-center">
            <p className="text-gray-800 text-2xl font-semibold">
              {userData?.followers.length}
            </p>
            <p className="text-gray-600">Followers</p>
          </div>
          <div className="text-center">
            <p className="text-gray-800 text-2xl font-semibold">
              {userData?.following.length}
            </p>
            <p className="text-gray-600">Following</p>
          </div>
          <div className="text-center">
            <p className="text-gray-800 text-2xl font-semibold">
              {userData?.recipes_uploaded.length}
            </p>
            <p className="text-gray-600">Recipes</p>
          </div>
        </div>
      </div>

      {/* Recipes Section */}
      <div className="container mx-auto mt-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          Uploaded Recipes
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Recipe Card */}
          {userData?.recipes_uploaded.length > 0 ? (
            userData.recipes_uploaded.map((recipe_id) => {
              return <RecipeMiniature id={recipe_id} />;
            })
          ) : (
            <p className="text-gray-600">No recipes available.</p>
          )}
          {/* Repeat recipe cards as needed */}
        </div>
      </div>

      {/* Footer */}
      <Footbar />
    </div>
  );
}

export default User;
