import React, { useState, useEffect } from "react";
import { FaStar, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useCartActions } from "../../hooks/useCartActions";

export default function NewArrivalPC({ product, onProductClick }) {
  const navigate = useNavigate();
  const { cartItems, addToCart, updateQuantity, removeFromCart } = useCartActions();

  // Get the active variant for size and color
  const activeVariant = product?.variants;
  const size = activeVariant?.size;
  // const color = activeVariant?.color;  // Ensure color is extracted from the variant
  const color = Array.isArray(activeVariant?.color)
  ? activeVariant.color[0]
  : activeVariant?.color;
  const price = activeVariant?.price;
const image =
  activeVariant?.images?.[0] ||
  activeVariant?.image ||
  product?.pimage;

  const [quantity, setQuantity] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  // Track quantity in cart
  useEffect(() => {
    const item = cartItems.find(
      (i) => i.id === product._id && i.size === size && i.color === color  // Ensure color is also checked in the cart
    );
    setQuantity(item?.quantity || 0);
  }, [cartItems, size, color, product._id]);

  // const discount = activeVariant?.realPrice
  //   ? Math.round(
  //       ((activeVariant.realPrice - activeVariant.price) / activeVariant.realPrice) * 100
  //     )
  //   : 0;
  const discount = product?.discount || 0;

  // Handle product click
  const handleProductClick = () => {
    if (onProductClick) onProductClick(product.slug);
    else navigate(`/product/${product.slug}`);
  };

  // Popup trigger function
  const triggerPopup = () => {
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 10000);
  };

  // Handle adding product to the cart
  const handleAddToCart = async () => {
    const result = await addToCart(product, size, color, 1);  // Ensure color is passed here
    if (result.success) triggerPopup();
  };

  // Handle 'Buy Now' button click
  const handleBuyNow = async () => {
    const result = await addToCart(product, size, color, 1);  // Ensure color is passed here
    if (result.success) {
      triggerPopup();
      navigate("/cart");
    }
  };

  // Handle increment of quantity
  const handleIncrement = async () => {
    await updateQuantity(product._id, size, color, quantity + 1);  // Ensure color is passed here
  };

  // Handle decrement of quantity
  const handleDecrement = async () => {
    if (quantity <= 1) {
      await removeFromCart(product._id, size, color);  // Ensure color is passed here
      return;
    }
    await updateQuantity(product._id, size, color, quantity - 1);  // Ensure color is passed here
  };

  return (
<div
  className="
    w-full 
    max-w-[240px] sm:max-w-none 
    min-h-[360px] sm:min-h-auto
    mx-auto 
    bg-white 
    border border-gray-200 
    rounded-xl 
    shadow-md hover:shadow-xl 
    transition-shadow duration-300 
    relative group 
    p-4 md:p-4 
    flex flex-col justify-between 
    overflow-visible
  "
>
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

      {/* Static New Arrival Badge */}
      <div className="absolute top-0 right-0 -translate-y-1/2 bg-pink-500 z-20 text-white px-3 py-1 rounded-tl-xl rounded-bl-xl text-xs font-bold">
        New Arrival
      </div>

      {/* 🖼️ Product Image */}
      <div
       className="w-full h-32 md:h-36 flex justify-center items-center mb-4 cursor-pointer"
        onClick={handleProductClick}
      >
        <img
          src={product.pimage}
          alt={product.name}
          className="h-full object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* 📝 Product Info */}
     <h3 className="text-base md:text-base font-semibold text-gray-800 mb-2">
        <span className="block w-full line-clamp-2" title={product.name}>{product.name}</span>
      </h3>

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

      {/* ⭐ SUCCESS POPUP */}
 {showPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
          <div className="bg-white rounded-xl p-5 w-[90%] max-w-sm text-center">

            <div className="w-12 h-12 mx-auto rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xl">
              ✓
            </div>

            <img
              src={image}
              alt={product.name}
              className="w-20 h-20 mx-auto mt-3 object-contain"
            />

            <p className="font-semibold text-sm mt-2">{product.name}</p>
            {color && <p className="text-xs">Color: {color}</p>}
            {size && <p className="text-xs">Size: {size}</p>}
            <p className="text-pink-500 text-sm font-semibold mt-1">
              ₹{price}
            </p>

            <p className="text-green-600 text-sm mt-1">
              Added to cart successfully
            </p>

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => navigate("/cart")}
                className="flex-1 bg-pink-500 text-white text-sm py-1.5 rounded"
              >
                Go to Cart
              </button>
              <button
                onClick={() => setShowPopup(false)}
                className="flex-1 border text-sm py-1.5 rounded"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
      {/* 🛒 Button Area */}
      {quantity > 0 ? (
        <div className="flex flex-col md:flex-row gap-2">
          <div className="flex justify-between items-center border border-pink-500 rounded flex-1">
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
