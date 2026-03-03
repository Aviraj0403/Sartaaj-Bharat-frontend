import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { toast } from "react-toastify";
import { createReview } from "../../services/reviewApi";
import { useAuth } from "../../context/AuthContext";
const ReviewList = ({ reviews }) => {
  const safeReviews = Array.isArray(reviews) ? reviews : [];

  if (safeReviews.length === 0) {
    return (
      <div className="text-center py-20 bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200">
        <div className="max-w-md mx-auto px-4">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
            <FaStar className="text-4xl text-slate-300" />
          </div>
          <h3 className="text-lg font-black text-slate-950 uppercase tracking-widest italic mb-2">Null Validation</h3>
          <p className="text-slate-500 font-medium text-sm italic uppercase tracking-wider">BE THE FIRST TO AUTHORIZE A VALIDATION LOG FOR THIS ARTIFACT.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-1.5 h-8 bg-blue-600 rounded-full"></div>
        <h4 className="text-xl font-black text-slate-950 italic uppercase tracking-tighter">
          VALIDATION HISTORY <span className="text-blue-600">({safeReviews.length})</span>
        </h4>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {safeReviews.map((review) => (
          <div
            key={review._id}
            className="bg-white border border-slate-100 rounded-[2rem] p-6 hover:shadow-2xl transition-all duration-500 group relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-blue-600 opacity-0 group-hover:opacity-100 transition-all"></div>
            <div className="flex items-start gap-3 mb-3">
              <img
                src={review.user.avatar || "/logo-cosmetic2.jpg"}
                alt={review.user.userName}
                className="w-14 h-14 rounded-full object-cover border-2 border-slate-100 grayscale group-hover:grayscale-0 transition-all"
              />
              <div className="flex-1 min-w-0">
                <h5 className="font-black text-slate-950 italic uppercase tracking-tighter truncate">
                  {review.user.userName}
                </h5>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex">
                    {Array.from({ length: 5 }, (_, i) => (
                      <FaStar
                        key={i}
                        className={`${i < review.rating ? "text-yellow-400" : "text-gray-300"
                          } text-sm`}
                      />
                    ))}
                  </div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic bg-slate-50 px-3 py-1 rounded-md">
                    {new Date(review.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric"
                    })}
                  </span>
                </div>
              </div>
            </div>
            <p className="text-slate-600 font-medium text-sm leading-relaxed italic">
              "{review.comment}"
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewList;