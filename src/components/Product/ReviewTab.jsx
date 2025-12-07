import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { toast } from "react-toastify";
import { createReview } from "../../services/reviewApi";
import { useAuth } from "../../context/AuthContext"; // Import useAuth

// Review Form Component for submitting a new review
const ReviewForm = ({ productId, setReviews }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isTouched, setIsTouched] = useState(false);  // To track if the form has been interacted with
  const { user } = useAuth();  // Get user data from auth context

  if (!user) {
    // If user is not logged in, don't display the form
    return (
      <div className="mt-6 text-center text-gray-600">
        <p>You need to be logged in to write a review.</p>
      </div>
    );
  }

  const handleRatingChange = (rating) => {
    setRating(rating);
    setIsTouched(true);
  };

  const handleSubmitReview = async () => {
    if (rating === 0 || !comment) {
      toast.error("Please provide a rating and comment.", {
        position: "top-right",
        autoClose: 2000,
      });
      return;
    }

    try {
      const newReview = await createReview(productId, { rating, comment });
      if (newReview.success) {
        setReviews((prev) => [newReview.review, ...prev]); // Prepend the new review
        setRating(0);
        setComment("");
        setIsTouched(false);
        toast.success("Review submitted successfully", {
          position: "top-right",
          autoClose: 2000,
        });
      } else {
        toast.error("Failed to submit review", {
          position: "top-right",
          autoClose: 2000,
        });
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="mt-6 border-t pt-6 bg-white shadow-lg rounded-lg p-6">
      <h3 className="text-2xl font-semibold mb-4 text-gray-800">Write a Review</h3>
      
      {/* Rating Stars */}
      <div className="flex items-center gap-1 mb-4">
        {Array.from({ length: 5 }, (_, i) => (
          <FaStar
            key={i}
            className={`${
              i < rating ? "text-pink-500" : "text-gray-300"
            } text-3xl cursor-pointer hover:text-pink-600 transition-colors`}
            onClick={() => handleRatingChange(i + 1)}
          />
        ))}
      </div>
      {isTouched && (
        <p className="text-gray-500 mt-2">
          {rating} {rating === 1 ? "Star" : "Stars"} Rated
        </p>
      )}

      {/* Comment Input */}
      <textarea
        className="w-full border p-4 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
        rows="5"
        placeholder="Write your review here..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      {/* Submit Button */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={handleSubmitReview}
          className="bg-pink-500 text-white py-3 px-8 rounded-md hover:bg-pink-600 focus:ring-2 focus:ring-pink-500 transition duration-300"
        >
          Submit Review
        </button>
      </div>
    </div>
  );
};

// Review List Component (Displays all reviews for the product)
const ReviewList = ({ reviews }) => {
  const safeReviews = Array.isArray(reviews) ? reviews : [];

  if (safeReviews.length === 0) {
    return <p className="text-center text-gray-500 mt-4">No reviews yet. Be the first to review this product!</p>;
  }

  return (
    <div className="flex space-x-4 overflow-x-auto py-4">
      {safeReviews.map((review) => (
        <div key={review._id} className="min-w-[250px] max-w-[300px] bg-white shadow-md rounded-lg p-4 flex flex-col space-y-3">
          <div className="flex items-center gap-3">
            <img
              src={review.user.avatar || "/logo-cosmetic2.jpg"} // Fallback avatar
              alt={review.user.userName}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <span className="font-semibold text-gray-800">{review.user.userName}</span>
              <div className="flex text-yellow-400 mt-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <FaStar
                    key={i}
                    className={`${
                      i < review.rating ? "text-pink-500" : "text-gray-300"
                    } text-sm`}
                  />
                ))}
              </div>
            </div>
          </div>
          <p className="mt-2 text-gray-600">{review.comment}</p>
          <span className="text-xs text-gray-400">{new Date(review.createdAt).toLocaleDateString()}</span>
        </div>
      ))}
    </div>
  );
};

const ReviewTab = ({ productId, reviews, setReviews }) => {
  return (
    <div className="text-gray-600 text-sm">
      <h3 className="text-xl font-semibold mb-6">Customer Reviews</h3>

      {/* Review List (Showing all reviews) */}
      <ReviewList reviews={reviews} />

      {/* Review Form (For submitting a new review) */}
      <ReviewForm productId={productId} setReviews={setReviews} />
    </div>
  );
};

export default ReviewTab;
