import React, { useState, useEffect } from "react";
import { Minus, Plus, X } from "lucide-react";
import ApplyCouponPanel from "./ApplyCouponPanel";
import { useNavigate } from "react-router-dom";
import { useCartActions } from "../hooks/useCartActions";
import { useAuth } from "../context/AuthContext";

export default function CartPage() {
  const [couponOpen, setCouponOpen] = useState(false);
  const [coupon, setCoupon] = useState({
    applied: false,
    code: "",
    name: "",
    discountedAmount: null,
    discountPercentage: null,
    maxDiscountAmount: null,
  });
  const navigate = useNavigate();

  const {
    cartItems,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalAmount,
    totalItems,
    loading,
  } = useCartActions();

  const { cartSyncing } = useAuth();

  if (cartSyncing) {
    return <div>Loading cart...</div>;
  }

  const handleIncrement = (id, size) => {
    const item = cartItems.find((i) => i.id === id && i.size === size);
    if (item) updateQuantity(id, size, item.quantity + 1);
  };

  const handleDecrement = (id, size) => {
    const item = cartItems.find((i) => i.id === id && i.size === size);
    if (!item) return;

    if (item.quantity <= 1) {
      removeFromCart(id, size);
    } else {
      updateQuantity(id, size, item.quantity - 1);
    }
  };

  const handleRemoveItem = (id, size) => {
    removeFromCart(id, size);
  };

  const handleClearCart = () => {
    clearCart();
    handleCouponRemove();
  };

  // Handle coupon application
// Handle coupon application
const handleCouponApply = (response, code) => {
  const { discountAmount, finalAmount, offerDetails } = response;

  console.log("Coupon applied:", response); // Debug log
  setCoupon({
    applied: true,
    code,
    name: offerDetails.name, // Offer name
    discountedAmount: finalAmount, // Final amount after discount
    discountPercentage: offerDetails.discountPercentage, // Discount percentage
    maxDiscountAmount: offerDetails.maxDiscountAmount, // Max discount
  });
  setCouponOpen(false); // Close panel after successful application
};


  // Handle removing the applied coupon
  const handleCouponRemove = () => {
    setCoupon({
      applied: false,
      code: "",
      name: "",
      discountedAmount: null,
      discountPercentage: null,
      maxDiscountAmount: null,
    });
  };

  // Calculate the final amount
  const finalAmount = coupon.discountedAmount || totalAmount;

  const calculateGST = (amount) => amount * 0.05;

  // Use effect to ensure re-rendering when coupon is applied or removed
  useEffect(() => {
    console.log("Updated finalAmount:", finalAmount); // Debugging
  }, [coupon, totalAmount]); // Re-run when coupon or totalAmount changes

  return (
    <div className="min-h-screen p-4 sm:p-8 flex justify-center relative bg-pink-50">
      <div className="w-full max-w-6xl flex flex-col md:flex-row gap-6">
        
        {/* Left Section */}
        <div className="flex-1">
          <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800">
            Your Shopping Cart
          </h1>

          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id + item.size}
                className="relative bg-white shadow-md rounded-2xl p-4 mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between"
              >
                <button
                  className="absolute top-2 right-2 md:hidden bg-pink-100 p-2 rounded-full text-pink-600 hover:bg-pink-200"
                  onClick={() => handleRemoveItem(item.id, item.size)}
                >
                  <X size={16} />
                </button>

                <div className="flex items-center gap-4 mb-4 sm:mb-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 rounded-xl object-cover"
                  />
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                      {item.name}
                    </h2>
                    <p className="text-sm text-gray-500">{item.size}</p>
                    <p className="text-pink-600 font-semibold mt-1">
                      ₹{item.price.toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4">
                  <div className="flex items-center bg-gray-100 rounded-full px-3 py-1">
                    <button
                      className="text-gray-600 hover:text-pink-600"
                      onClick={() => handleDecrement(item.id, item.size)}
                      disabled={loading}
                    >
                      <Minus size={16} />
                    </button>
                    <span className="mx-2 font-medium">{item.quantity}</span>
                    <button
                      className="text-gray-600 hover:text-pink-600"
                      onClick={() => handleIncrement(item.id, item.size)}
                      disabled={loading}
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <p className="text-gray-800 font-semibold">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    className="hidden md:block bg-pink-100 p-2 rounded-full text-pink-600 hover:bg-pink-200"
                    onClick={() => handleRemoveItem(item.id, item.size)}
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Right Section */}
        <div className="w-full md:w-80">
          <div className="bg-white shadow-md rounded-2xl p-6 flex flex-col gap-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Order Summary
            </h2>

            <div className="flex justify-between items-center border-b pb-3 mb-3">
              <p className="text-gray-600">Total Items</p>
              <p className="font-medium">{totalItems}</p>
            </div>

            <div className="bg-pink-50 rounded-xl p-4 text-center mb-4">
              <p className="text-gray-600 text-sm">TOTAL AMOUNT</p>
              <p className="text-2xl font-bold text-pink-600 mt-1">
                ₹{finalAmount.toFixed(2)}
              </p>
            </div>

            {/* Applied Coupon Display */}
            {coupon.applied && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Applied Coupon</p>
                    <p className="font-semibold text-green-700 text-lg">{coupon.code}</p>
                    {coupon.name && coupon.name !== coupon.code && (
                      <p className="text-sm text-gray-600 mt-1">{coupon.name}</p>
                    )}
                  </div>
                  <button
                    onClick={handleCouponRemove}
                    className="text-red-500 hover:text-red-700 font-semibold text-sm"
                  >
                    Remove
                  </button>
                </div>
              </div>
            )}

            {/* Apply Coupon Button */}
            {!coupon.applied && (
              <button
                className="w-full bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 rounded-lg transition mb-4"
                onClick={() => setCouponOpen(true)}
              >
                Apply Coupon
              </button>
            )}

            <div className="space-y-2 text-sm text-gray-700 mb-6">
              <div className="flex justify-between">
                <p>Item Total</p>
                <p>₹{totalAmount.toFixed(2)}</p>
              </div>
              {coupon.applied && (
                <div className="flex justify-between text-green-600">
                  <p>Discount</p>
                  <p>-₹{(totalAmount - finalAmount).toFixed(2)}</p>
                </div>
              )}
              <div className="flex justify-between">
                <p>Delivery Fee</p>
                <p>₹23.00</p>
              </div>
              <div className="flex justify-between">
                <p>GST (5%)</p>
                <p>₹{calculateGST(finalAmount).toFixed(2)}</p>
              </div>
            </div>

            <button
              onClick={() => navigate("/checkout")}
              className="w-full bg-pink-100 text-pink-700 font-semibold py-2 rounded-lg mb-3 hover:bg-pink-200 transition"
            >
              PROCEED TO CHECKOUT
            </button>

            <button
              className="w-full border border-pink-300 text-pink-600 font-medium py-2 rounded-lg hover:bg-pink-50 transition"
              onClick={handleClearCart}
              disabled={loading}
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>

      <ApplyCouponPanel
        isOpen={couponOpen}
        onClose={() => setCouponOpen(false)}
        onApply={handleCouponApply}
        appliedCoupon={coupon.applied ? coupon.code : null}
        totalAmount={totalAmount}
      />
    </div>
  );
}
