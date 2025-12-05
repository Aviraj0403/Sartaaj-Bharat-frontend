import React from "react";
import { FaStar, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useCartActions } from "../hooks/useCartActions"; // adjust path

export default function BestSellPC({ product, onProductClick }) {
  const navigate = useNavigate();
  const { addToCart } = useCartActions();

  const handleProductClick = () => {
    if (onProductClick) {
      onProductClick(product.slug);
    } else {
      navigate(`/product/${product.slug}`);
    }
  };

  const handleAddToCart = async () => {
    const variant = product?.variants;

    if (!variant) return;

    await addToCart(product, variant.size || "default", variant.price, 1);
  };

  const handleBuyNow = async () => {
    const variant = product?.variants;

    if (!variant) return;

    const result = await addToCart(product, variant.size || "default", variant.price, 1);
    if (result.success) {
      navigate("/cart"); // Navigate to the cart page after adding the product
    } else {
      // Handle error if the add to cart fails
    }
  };

  const discount = product?.variants?.realPrice
    ? Math.round(
        ((product?.variants?.realPrice - product?.variants?.price) / 
        product?.variants?.realPrice) * 100
      )
    : 0;

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 relative group p-3 flex flex-col justify-between overflow-hidden">
      {/* ❤️ Heart Icon */}
      <div className="absolute top-3 right-3 z-20 text-pink-500 cursor-pointer opacity-80 hover:opacity-100 transition text-lg">
        <FaHeart />
      </div>

      {/* 🏷️ Discount Badge */}
      {discount > 0 && (
        <div className="absolute top-3 left-3 z-20 bg-pink-500 text-white text-xs font-semibold px-2 py-1 rounded-md shadow">
          {discount}% OFF
        </div>
      )}

      {/* ⭐ Bestseller Badge */}
      {product.isBestSeller && (
        <div className="absolute top-3 right-3 bg-pink-500 z-20 text-white px-3 py-1 rounded-tl-xl rounded-bl-xl text-xs font-bold">
          Bestseller
        </div>
      )}

      {/* 🖼️ Product Image */}
      <div
        className="w-full h-24 md:h-36 flex justify-center items-center mb-2 cursor-pointer relative z-10"
        onClick={handleProductClick}
      >
        <img
          src={product.pimage}
          alt={product.name}
          className="h-full object-contain transition-transform duration-300 group-hover:scale-105 relative z-10"
        />
      </div>

      {/* 🏷️ Product Info */}
      <h3 className="text-sm md:text-base font-semibold text-gray-800 mb-1 text-left">
        {product.name}
      </h3>
   {/* <p className="text-gray-600 text-xs md:text-sm mb-2">
  {product.description.length > 30
    ? product.description.substring(0, 30).split(" ").slice(0, -1).join(" ") + "..."
    : product.description}
</p> */}

      {/* 💰 Price and Rating */}
      <div className="flex justify-between items-center mb-2 px-1 text-sm">
        <div className="flex items-center gap-1">
          <p className="text-pink-500 font-medium text-sm">
            ₹{product?.variants?.price}
          </p>
          <p className="text-gray-400 line-through text-xs">
            ₹{product?.variants?.realPrice?.toFixed(2)}
          </p>
        </div>
        <div className="flex items-center">
          <FaStar className="text-yellow-400 text-xs" />
          <span className="ml-1 text-gray-600 text-xs">{product.rating}</span>
        </div>
      </div>

      {/* 🛒 Action Buttons */}
      <div className="flex gap-2">
        {/* Add to Cart */}
        <button
          onClick={handleAddToCart}
          className="flex-1 bg-pink-500 text-white font-semibold py-2 rounded-lg hover:bg-pink-600 transition text-sm"
        >
          Add to Cart
        </button>

        {/* Buy Now */}
        <button
          onClick={handleBuyNow}
          className="flex-1 border border-pink-500 text-pink-500 font-semibold py-2 rounded-lg hover:bg-pink-50 transition text-sm"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}
