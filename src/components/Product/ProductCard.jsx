import React, { useState, useEffect } from "react";
import { FaStar, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Import toast for notifications
import { useCartActions } from "../../hooks/useCartActions"; // Hook for adding/removing items in the cart

export default function ProductCard({ product, onProductClick }) {
  const navigate = useNavigate();
  const { addToCart, removeFromCart } = useCartActions();

  const [quantity, setQuantity] = useState(0); // Track quantity of this product in the cart
  const [addedToCart, setAddedToCart] = useState(false); // Track if product is added to cart

  const activeVariant = product?.variants;

  // Calculate the discount percentage if realPrice exists
  const discount = activeVariant?.realPrice
    ? Math.round(
        ((activeVariant?.realPrice - activeVariant?.price) / activeVariant?.realPrice) * 100
      )
    : 0;

  // Get the current quantity of this product in the cart
  const getCartQuantity = () => {
    const cartItem = product.cartItems?.find((item) => item.variant === activeVariant?.size);
    return cartItem?.quantity || 0;
  };

  useEffect(() => {
    setQuantity(getCartQuantity()); // Set the initial quantity
  }, [product]);

  // Handle product card click (either custom or default navigation)
  const handleProductClick = () => {
    if (onProductClick) {
      onProductClick(product.slug); // Custom callback for click event
    } else {
      navigate(`/product/${product.slug}`); // Default navigation
    }
  };

  // Add product to cart
  const handleAddToCart = async () => {
    const result = await addToCart(product._id, activeVariant?.size, activeVariant?.price);
    if (result.success) {
      setAddedToCart(true); // Set the product as added to cart
      setQuantity(1); // Start quantity from 1 when added to cart
      toast.success("Added to Cart!");
    } else {
      toast.error(result.error || "Failed to add item to cart");
    }
  };

  // Increment quantity in the cart
  const handleIncrement = async () => {
    const newQuantity = quantity + 1;
    await addToCart(product._id, activeVariant?.size, activeVariant?.price, newQuantity);
    setQuantity(newQuantity);
  };

  // Decrement quantity in the cart
  const handleDecrement = async () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      await addToCart(product._id, activeVariant?.size, activeVariant?.price, newQuantity);
      setQuantity(newQuantity);
    } else {
      // If quantity is 1, remove the item from cart and reset quantity
      await removeFromCart(product._id, activeVariant?.size);
      setQuantity(0);
      setAddedToCart(false); // Reset the "Add to Cart" state
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 relative group p-4 flex flex-col justify-between overflow-hidden">
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

      {/* 🖼️ Product Image */}
      <div
        className="w-full h-24 md:h-36 flex justify-center items-center mb-3 cursor-pointer relative z-10"
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
      <p className="text-gray-600 text-xs md:text-sm mb-2 text-left">
        {product.description}
      </p>

      {/* 💰 Price and Rating */}
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

      {/* Quantity Controls */}
      {addedToCart ? (
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
          className="w-full bg-pink-500 text-white font-semibold py-2 rounded-lg hover:bg-pink-600 transition text-sm"
        >
          Add to Cart
        </button>
      )}

      {/* 🛒 Buy Now Button */}
      <button
        onClick={handleProductClick}
        className="w-full border border-pink-500 text-pink-500 font-semibold py-2 rounded-lg hover:bg-pink-50 transition text-sm mt-3"
      >
        Buy Now
      </button>
    </div>
  );
}
