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
      <div className="absolute top-4 right-4 z-20 text-slate-400 cursor-pointer hover:text-blue-500 transition-all text-lg group-hover:scale-110">
        <FaHeart />
      </div>

      {/* 🏷️ Discount Badge */}
      {discount > 0 && (
        <div className="absolute top-4 left-4 z-20 bg-blue-600 text-white text-[8px] font-black px-3 py-1.5 rounded-lg shadow-2xl uppercase tracking-widest italic">
          -{discount}% YIELD
        </div>
      )}

      {/* Static New Arrival Badge */}
      <div className="absolute top-0 right-0 -translate-y-1/2 bg-slate-950 z-20 text-white px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest italic border border-white/10">
        LATEST ARCHIVE
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
      <h3 className="text-sm md:text-base font-black text-slate-950 mb-3 px-1 italic uppercase tracking-tighter">
        <span className="block w-full line-clamp-2" title={product.name}>{product.name}</span>
      </h3>

      {/* 💰 Price and Rating */}
      <div className="flex justify-between items-center mb-3 px-1 text-sm">
        <div className="flex items-center gap-2">
          <p className="text-blue-600 font-black text-sm italic">₹{activeVariant?.price}</p>
          <p className="text-slate-300 line-through text-[10px] font-bold tracking-widest">
            ₹{activeVariant?.realPrice?.toFixed(2)}
          </p>
        </div>
        <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-full">
          <FaStar className="text-blue-500 text-[10px]" />
          <span className="text-slate-700 text-[10px] font-black italic">{product.rating}</span>
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

            <p className="text-slate-950 font-black text-sm mt-3 uppercase tracking-tighter italic">{product.name}</p>
            {color && <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">AXIS: {color}</p>}
            {size && <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">SCALE: {size}</p>}
            <p className="text-blue-600 text-base font-black mt-2 italic">
              ₹{price}
            </p>

            <p className="text-green-600 text-sm mt-1">
              Added to cart successfully
            </p>

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => navigate("/cart")}
                className="flex-1 bg-blue-600 text-white text-[10px] font-black uppercase tracking-[0.2em] py-3 rounded-xl shadow-2xl italic"
              >
                OPEN LOGISTICS
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
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center border border-slate-950 rounded-2xl flex-1 overflow-hidden">
            <button
              onClick={handleDecrement}
              className="w-1/3 text-xl font-black py-2.5 text-slate-950 hover:bg-slate-50 transition"
            >
              –
            </button>
            <span className="w-1/3 text-center font-black text-sm italic">{quantity}</span>
            <button
              onClick={handleIncrement}
              className="w-1/3 text-xl font-black py-2.5 text-slate-950 hover:bg-slate-50 transition"
            >
              +
            </button>
          </div>

          <button
            onClick={handleBuyNow}
            className="flex-1 bg-slate-950 text-white font-black py-4 rounded-2xl hover:bg-blue-600 transition-all text-[10px] uppercase tracking-[0.3em] italic shadow-2xl"
          >
            AUTHORIZE GAIN
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-blue-600 text-white font-black py-4 rounded-2xl hover:bg-slate-950 transition-all text-[10px] uppercase tracking-[0.3em] italic shadow-2xl"
          >
            ACQUIRE ASSET
          </button>

          <button
            onClick={handleBuyNow}
            className="flex-1 border border-slate-950 text-slate-950 font-black py-4 rounded-2xl hover:bg-slate-50 transition text-[10px] uppercase tracking-[0.3em] italic"
          >
            AUTHORIZE GAIN
          </button>
        </div>
      )}
    </div>
  );
}
