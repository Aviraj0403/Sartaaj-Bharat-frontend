import React, { useState, useEffect } from "react";
import { FaStar, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useCartActions } from "../../hooks/useCartActions";

export default function ProductCard({ product, onProductClick }) {
  const navigate = useNavigate();
  const { cartItems, addToCart, updateQuantity, removeFromCart } = useCartActions();

  const activeVariant = product?.variants;
  const size = activeVariant?.size;
  const color = activeVariant?.color; // Add color to activeVariant
  // console.log("Active Variant Color:", product);
  const [quantity, setQuantity] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const item = cartItems.find(
      (i) => i.id === product._id && i.size === size && i.color === color // Including color in cart matching
    );
    setQuantity(item?.quantity || 0);
  }, [cartItems, size, color, product._id]);

  // const discount = activeVariant?.realPrice
  //   ? Math.round(
  //       ((activeVariant.realPrice - activeVariant.price) / activeVariant.realPrice) * 100
  //     )
  //   : 0;
  const discount = product?.discount || 0;

  const handleProductClick = () => {
    if (onProductClick) onProductClick(product.slug);
    else navigate(`/product/${product.slug}`);
  };

  const handleAddToCart = async () => {
    const result = await addToCart(product, size, color, 1); // Passing color with addToCart
    if (result.success) {
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 10000);
    }
  };

  const handleBuyNow = async () => {
    const result = await addToCart(product, size, color, 1); // Passing color with addToCart
    if (result.success) {
      navigate("/cart");
    }
  };

  const handleIncrement = async () => {
    const newQty = quantity + 1;
    await updateQuantity(product._id, size, color, newQty); // Passing color in updateQuantity
  };

  const handleDecrement = async () => {
    if (quantity <= 1) {
      await removeFromCart(product._id, size, color); // Passing color in removeFromCart
      return;
    }
    const newQty = quantity - 1;
    await updateQuantity(product._id, size, color, newQty); // Passing color in updateQuantity
  };

  return (
   <div
  className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 relative 
p-5 md:p-4 
flex flex-col justify-between overflow-hidden
min-h-[420px] md:min-h-[auto]"
>


      {/* ❤️ Heart Icon */}
      <div className="absolute top-3 right-3 z-20 text-pink-500 cursor-pointer opacity-80 hover:opacity-100 transition text-lg">
        <FaHeart />
      </div>

      {/* 🔥 Discount Badge */}
      {discount > 0 && (
        <div className="absolute top-3 left-3 z-20 bg-pink-500 text-white text-xs font-semibold px-2 py-1 rounded-md shadow">
          {discount}% OFF
        </div>
      )}

      {/* 🖼 Product Image */}
      <div
       className="w-full h-36 md:h-36 flex justify-center items-center mb-4 cursor-pointer"

        onClick={handleProductClick}
      >
        <img
          src={product.pimage}
          alt={product.name}
          className="h-full object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* 📝 Product Title */}
    <h3 className="text-base md:text-base font-semibold text-gray-800 mb-2">
      <span className="block w-full line-clamp-2" title={product.name}>{product.name}</span>
    </h3>

      {/* 💰 Price + ⭐ Rating */}
      <div className="flex justify-between items-center mb-3 px-1 text-sm">
        <div className="flex items-center gap-1">
          <p className="text-pink-500 font-medium text-sm">
            ₹{activeVariant?.price}
          </p>
          <p className="text-gray-400 line-through text-xs">
            ₹{activeVariant?.realPrice?.toFixed(2)}
          </p>
        </div>
        <div className="flex items-center">
          <FaStar className="text-yellow-400 text-xs" />
          <span className="ml-1 text-gray-600 text-xs">
            {product.rating}
          </span>
        </div>
      </div>

      {/* Popup when added to cart */}
   {showPopup && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
    <div className="bg-white rounded-2xl px-6 py-5 shadow-2xl flex flex-col items-center gap-4 text-center max-w-[90%] md:max-w-md ">
      
      {/* ✅ Success Icon */}
      <div className="bg-green-100 text-green-600 w-14 h-14 rounded-full flex items-center justify-center text-2xl">
        ✓
      </div>

      {/* ✅ Product Image */}
      <img
        src={product.pimage}
        alt={product.name}
        className="w-24 h-24 object-contain rounded-md border border-gray-200"
      />

      {/* ✅ Product Details */}
      <div className="text-left w-full px-4">
        <p className="font-semibold text-gray-800 text-base">
          <span className="block w-full truncate" title={product.name}>{product.name}</span>
        </p>
        {activeVariant?.color && (
          <p className="text-sm text-gray-600">Color: {activeVariant.color}</p>
        )}
        {activeVariant?.size && (
          <p className="text-sm text-gray-600">Size: {activeVariant.size}</p>
        )}
        <p className="text-pink-500 font-medium mt-1 text-sm">
          ₹{activeVariant?.price}
        </p>
      </div>

      {/* ✅ Success Message */}
      <p className="text-green-600 font-medium text-sm">Added to cart successfully!</p>

      {/* ✅ Buttons */}
    {/* ✅ Buttons */}
<div className="flex items-center gap-2 w-full px-4">
  <button
    onClick={() => navigate("/cart")}
    className="flex-1 bg-pink-500 text-white py-1.5 text-sm rounded-md font-medium hover:bg-pink-600 transition"
  >
    Go to Cart
  </button>

  <button
    onClick={() => setShowPopup(false)}
    className="flex-1 border border-gray-300 py-1.5 text-sm rounded-md font-medium text-gray-700 hover:bg-gray-100 transition"
  >
    Continue 
  </button>
</div>

    </div>
  </div>
)}

      {/* 🛒 Buttons */}
      {quantity > 0 ? (
        <div className="flex flex-col md:flex-row gap-2">
          <div className="flex justify-between items-center border border-pink-500 rounded-lg flex-1 overflow-hidden">
            <button
              onClick={handleDecrement}
              className="w-1/3 text-xl font-bold py-2 text-pink-500 hover:bg-pink-100"
            >
              –
            </button>
            <span className="w-1/3 text-center font-medium">{quantity}</span>
            <button
              onClick={handleIncrement}
              className="w-1/3 text-xl font-bold py-2 text-pink-500 hover:bg-pink-100"
            >
              +
            </button>
          </div>

          <button
            onClick={handleBuyNow}
            className="flex-1 border border-pink-500 text-pink-500 font-semibold py-2 rounded-lg hover:bg-pink-50 transition text-sm"
          >
            Buy Now
          </button>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-2">
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-pink-500 text-white font-semibold py-2 rounded-lg hover:bg-pink-600 transition text-sm"
          >
            Add to Cart
          </button>

          <button
            onClick={handleBuyNow}
            className="flex-1 border border-pink-500 text-pink-500 font-semibold py-2 rounded-lg hover:bg-pink-50 transition text-sm"
          >
            Buy Now
          </button>
        </div>
      )}
    </div>
  );
}
