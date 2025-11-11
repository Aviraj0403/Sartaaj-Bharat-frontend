import React, { useState } from "react";
import { X, Check } from "lucide-react";

export default function ApplyCouponPanel({ isOpen, onClose, onApply }) {
  const [coupon, setCoupon] = useState("");
  const [applied, setApplied] = useState(false);

  const sampleCoupons = [
    { code: "WELCOME10", description: "Get 10% off on your first order!" },
    { code: "FREESHIP", description: "Free shipping for orders above ₹500!" },
  ];

  const handleApply = (code) => {
    if (code.trim() !== "") {
      setCoupon(code);
      setApplied(true);
      onApply(code);
    }
  };

  return (
   <div
  className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-xl z-[200] transform transition-transform duration-300 ${
    isOpen ? "translate-x-0" : "translate-x-full"
  }`}
>

      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">Apply Coupon</h2>
        <button
          onClick={onClose}
          className="text-gray-600 hover:text-pink-600 transition"
        >
          <X size={20} />
        </button>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col gap-4">
        {applied ? (
          <div className="flex flex-col items-center gap-2">
            <Check className="text-green-500" size={32} />
            <p className="text-green-600 font-semibold text-center">
              Coupon "{coupon}" Applied Successfully!
            </p>
            <button
              onClick={() => {
                setApplied(false);
                setCoupon("");
              }}
              className="mt-2 px-4 py-2 bg-pink-100 text-pink-600 rounded-lg hover:bg-pink-200 transition"
            >
              Remove
            </button>
          </div>
        ) : (
          <>
            <p className="text-gray-600 mb-2">
              Enter your coupon code or choose one of our amazing offers:
            </p>

            {/* Custom Coupon Input */}
            <div className="flex gap-2">
              <input
                type="text"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                placeholder="Enter coupon code"
                className="flex-1 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
              />
              <button
                onClick={() => handleApply(coupon)}
                className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-4 rounded-lg transition"
              >
                Apply
              </button>
            </div>

            {/* Sample Coupons Section */}
            <div className="mt-4 flex flex-col gap-3">
              {sampleCoupons.map((c) => (
                <div
                  key={c.code}
                  className="relative bg-gradient-to-r from-pink-50 via-pink-100 to-pink-50 border-l-4 border-pink-500 rounded-xl p-4 flex justify-between items-center shadow-md hover:shadow-lg transition cursor-pointer"
                  onClick={() => handleApply(c.code)}
                >
                  <div className="flex flex-col">
                    <span className="font-semibold text-pink-600 text-sm sm:text-base">
                      {c.code}
                    </span>
                    <span className="text-gray-600 text-xs sm:text-sm">
                      {c.description}
                    </span>
                  </div>
                  <button className="bg-pink-500 text-white px-3 py-1 rounded-lg text-xs sm:text-sm hover:bg-pink-600 transition">
                    Apply
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
