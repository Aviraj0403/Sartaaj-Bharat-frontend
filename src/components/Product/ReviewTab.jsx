import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { toast } from "react-toastify";
import { getProductReviews, createReview } from "../../services/reviewApi"; // Import the API functions

// Review Form Component for submitting a new review
const ReviewForm = ({ productId, setReviews }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleRatingChange = (rating) => {
    setRating(rating);
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
    <div className="mt-6 border-t pt-6">
      <h3 className="text-xl font-semibold mb-4">Write a Review</h3>
      <div className="flex gap-1 mb-4">
        {Array.from({ length: 5 }, (_, i) => (
          <FaStar
            key={i}
            className={`${
              i < rating ? "text-yellow-400" : "text-gray-300"
            } text-2xl cursor-pointer hover:text-yellow-500`}
            onClick={() => handleRatingChange(i + 1)}
          />
        ))}
      </div>
      <textarea
        className="w-full border p-3 rounded-md"
        rows="4"
        placeholder="Write your review here..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <div className="mt-4 flex justify-end">
        <button
          onClick={handleSubmitReview}
          className="bg-pink-500 text-white py-2 px-6 rounded-md"
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
    return <p>No reviews yet. Be the first to review this product!</p>;
  }

  return (
    <div className="space-y-4">
      {safeReviews.map((review, index) => (
        <div key={index} className="border rounded-md p-4 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="flex">
              {Array.from({ length: 5 }, (_, i) => (
                <FaStar
                  key={i}
                  className={`${
                    i < review.rating ? "text-yellow-400" : "text-gray-300"
                  } text-sm`}
                />
              ))}
            </div>
            {/* Accessing the user's userName */}
            <span className="text-gray-600 text-sm">by {review.user.userName}</span>
          </div>
          <p className="mt-2 text-gray-700">{review.comment}</p>
        </div>
      ))}
    </div>
  );
};


const ReviewTab = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch reviews when the component is mounted or productId changes
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const response = await getProductReviews(productId);
        setReviews(response.reviews || []);
      } catch (error) {
        toast.error("An error occurred while fetching reviews.", {
          position: "top-right",
          autoClose: 2000,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [productId]);

  if (loading) {
    return <p>Loading reviews...</p>; // Show loading state
  }

  return (
    <div className="text-gray-600 text-sm">
      <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>

      {/* Review List (Showing all reviews) */}
      <ReviewList reviews={reviews} />

      {/* Review Form (For submitting a new review) */}
      <ReviewForm productId={productId} setReviews={setReviews} />
    </div>
  );
};

export default ReviewTab;
