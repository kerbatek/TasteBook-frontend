import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Comments = ({ table_id, comments }) => {
  const apiUrl = process.env.REACT_APP_API_URL;

  const [loading, setLoading] = React.useState(false);
  const [comment, setComment] = React.useState("");
  const [commentList, setCommentList] = React.useState(comments);

  const token = localStorage.getItem("token") ?? null;

  const handleChange = (e) => {
    setComment(e.target.value); // Don't trim here
  };

  const handleSubmit = async () => {
    const trimmedComment = comment.trim();
    if (!trimmedComment) {
      return;
    }
    setLoading(true);
    setComment(trimmedComment);
    if (token) {
      await sendRequestToServer(trimmedComment);
    }
    setLoading(false);
  };

  const sendRequestToServer = async (trimmedComment) => {
    try {
      const response = await axios.post(
        apiUrl + "/comment",
        {
          comment: trimmedComment,
          table_id: table_id, // This is the data being sent in the POST request body
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        }
      );
      setCommentList([...commentList, response.data]); // Append new comment to the list
      setComment("");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred";
      console.error(errorMessage);
    } finally {
      setLoading(false); // Set loading to false after request is done
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-8">
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">Comments</h3>

      {/* Comment Form */}
      {token && (
        <div className="mb-6">
          <textarea
            value={comment}
            onChange={handleChange}
            name="comment"
            className="w-full border border-gray-300 rounded-lg p-4 text-gray-700"
            rows="3"
            placeholder="Add your comment..."></textarea>
          <button
            className="bg-blue-500 text-white px-6 py-2 mt-4 rounded-lg"
            onClick={handleSubmit}
            disabled={loading || !comment}>
            {loading ? "Posting Comment..." : "Post Comment"}
          </button>
        </div>
      )}
      {/* Comment List */}
      <div className="space-y-6">
        {commentList.length > 0 ? (
          // Reverse the comments array to show newest comments first
          commentList
            .slice()
            .sort((a, b) => new Date(b.date_posted) - new Date(a.date_posted))
            .map((comment, index) => {
              return (
                <div className="border-b pb-4" key={index}>
                  <p className="text-gray-800 font-semibold">
                    <Link to={`/user/${comment?.username}`}>
                      {comment?.username}
                    </Link>
                  </p>
                  <p className="text-gray-600 mt-2">{comment?.comment}</p>
                  <p className="text-gray-500 text-sm mt-1">
                    {`Posted on ${new Date(comment?.date_posted).toLocaleString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      }
                    )} at ${new Date(comment?.date_posted).toLocaleString(
                      "en-US",
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                      }
                    )}`}
                  </p>
                </div>
              );
            })
        ) : (
          <div className="text-gray-700">No comments found</div>
        )}
      </div>
    </div>
  );
};

export default Comments;
