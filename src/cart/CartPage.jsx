import React, { useState } from "react";
import { Minus, Plus, X } from "lucide-react";
import ApplyCouponPanel from "./ApplyCouponPanel";
import { useNavigate } from "react-router-dom";
import { useCartActions } from "../hooks/useCartActions";
import { useAuth } from "../context/AuthContext"; // Import useAuth for cartSyncing state

export default function CartPage() {
  const [couponOpen, setCouponOpen] = useState(false);
  const navigate = useNavigate();

  const {
    cartItems,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalAmount,
    totalItems,
    loading, // Track loading state
    error,   // Track errors
  } = useCartActions();

  const { cartSyncing } = useAuth(); // Track if cart is syncing from AuthContext

  // Show a loading state while the cart is syncing
  if (cartSyncing) {
    return <div>Loading cart...</div>; // You can replace this with a spinner or loading animation
  }

  // Increment quantity
  const handleIncrement = (id, size) => {
    const item = cartItems.find((i) => i.id === id && i.size === size);
    if (item) updateQuantity(id, size, item.quantity + 1);
  };

  // Decrement quantity (removes item if quantity reaches 0)
  const handleDecrement = (id, size) => {
    const item = cartItems.find((i) => i.id === id && i.size === size);
    if (!item) return;

    if (item.quantity <= 1) {
      removeFromCart(id, size);
    } else {
      updateQuantity(id, size, item.quantity - 1);
    }
  };

  // Handle removing item from the cart
  const handleRemoveItem = (id, size) => {
    removeFromCart(id, size);
  };

  // Handle clearing the cart
  const handleClearCart = () => {
    clearCart();
  };

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
                {/* Mobile Cross */}
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
                      disabled={loading} // Disable buttons while loading
                    >
                      <Minus size={16} />
                    </button>
                    <span className="mx-2 font-medium">{item.quantity}</span>
                    <button
                      className="text-gray-600 hover:text-pink-600"
                      onClick={() => handleIncrement(item.id, item.size)}
                      disabled={loading} // Disable buttons while loading
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
                ₹{totalAmount.toFixed(2)}
              </p>
            </div>

            <button
              className="w-full bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 rounded-lg transition mb-4"
              onClick={() => setCouponOpen(true)}
            >
              Apply Coupon
            </button>

            <div className="space-y-2 text-sm text-gray-700 mb-6">
              <div className="flex justify-between">
                <p>Item Total</p>
                <p>₹{totalAmount.toFixed(2)}</p>
              </div>
              <div className="flex justify-between">
                <p>Delivery Fee</p>
                <p>₹23.00</p>
              </div>
              <div className="flex justify-between">
                <p>GST (5%)</p>
                <p>₹{(totalAmount * 0.05).toFixed(2)}</p>
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
              onClick={handleClearCart} // Trigger clear cart action
              disabled={loading} // Disable while loading
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>

      <ApplyCouponPanel
        isOpen={couponOpen}
        onClose={() => setCouponOpen(false)}
        onApply={(code) => console.log("Coupon applied:", code)}
      />
    </div>
  );
}
