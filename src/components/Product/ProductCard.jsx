// FINAL FIXED ProductCard.jsx
import React, { useState, useEffect } from "react";
import { FaStar, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCartActions } from "../../hooks/useCartActions";

export default function ProductCard({ product, onProductClick }) {
  const navigate = useNavigate();
  const { cartItems, addToCart, updateQuantity, removeFromCart } = useCartActions();

  const activeVariant = product?.variants;
  const size = activeVariant?.size; // <--- Important

  const [quantity, setQuantity] = useState(0);

  // ⭐ FIX: size add in dependency
  useEffect(() => {
    const item = cartItems.find(
      (i) => i.id === product._id && i.size === size
    );
    setQuantity(item?.quantity || 0);
  }, [cartItems, size]); // <--- FIX

  const discount = activeVariant?.realPrice
    ? Math.round(
        ((activeVariant.realPrice - activeVariant.price) /
          activeVariant.realPrice) *
          100
      )
    : 0;

  const handleProductClick = () => {
    if (onProductClick) onProductClick(product.slug);
    else navigate(`/product/${product.slug}`);
  };

  // ⭐ ADD TO CART
  const handleAddToCart = async () => {
    const result = await addToCart(product, size, 1);
    if (result.success) {
      toast.success("Added to cart!");
    } else {
      toast.error("Failed to add to cart");
    }
  };

  const handleIncrement = async () => {
    const newQty = quantity + 1;
    await updateQuantity(product._id, size, newQty);
  };

  const handleDecrement = async () => {
    if (quantity <= 1) {
      await removeFromCart(product._id, size);
      return;
    }
    const newQty = quantity - 1;
    await updateQuantity(product._id, size, newQty);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 relative group p-4 flex flex-col justify-between overflow-hidden">

      <div className="absolute top-3 right-3 z-20 text-pink-500 cursor-pointer opacity-80 hover:opacity-100 transition text-lg">
        <FaHeart />
      </div>

      {discount > 0 && (
        <div className="absolute top-3 left-3 z-20 bg-pink-500 text-white text-xs font-semibold px-2 py-1 rounded-md shadow">
          {discount}% OFF
        </div>
      )}

      <div
        className="w-full h-24 md:h-36 flex justify-center items-center mb-3 cursor-pointer"
        onClick={handleProductClick}
      >
        <img
          src={product.pimage}
          alt={product.name}
          className="h-full object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <h3 className="text-sm md:text-base font-semibold text-gray-800 mb-1">
        {product.name}
      </h3>
      <p className="text-gray-600 text-xs md:text-sm mb-2">{product.description}</p>

      <div className="flex justify-between items-center mb-3 px-1 text-sm">
        <div className="flex items-center gap-1">
          <p className="text-pink-500 font-medium text-sm">₹{activeVariant?.price}</p>
          <p className="text-gray-400 line-through text-xs">
            ₹{activeVariant?.realPrice?.toFixed(2)}
          </p>
        </div>
        <div className="flex items-center">
          <FaStar className="text-yellow-400 text-xs" />
          <span className="ml-1 text-gray-600 text-xs">{product.rating}</span>
        </div>
      </div>

      {quantity > 0 ? (
        <div className="flex justify-between items-center border border-pink-500 rounded">
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
      ) : (
        <button
          onClick={handleAddToCart}
          className="w-full bg-pink-500 text-white font-semibold py-2 rounded-lg hover:bg-ppink-600 transition text-sm"
        >
          Add to Cart
        </button>
      )}

      <button
        onClick={handleProductClick}
        className="w-full border border-pink-500 text-pink-500 font-semibold py-2 rounded-lg hover:bg-pink-50 transition text-sm mt-3"
      >
        Buy Now
      </button>
    </div>
  );
}
