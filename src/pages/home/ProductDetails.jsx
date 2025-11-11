import React, { useState } from "react";
import { FaStar, FaHeart } from "react-icons/fa";
import RelatedProduct from "../home/RelatedProduct"; // adjust path if needed


export default function ProductDetails() {
  const [mainImage, setMainImage] = useState(
    "https://www.gurmeetkaurstore.in/uploads/8147932435Untitled_design_(19).png"
  );
  const [activeTab, setActiveTab] = useState("description");

  const images = [
    "https://www.gurmeetkaurstore.in/uploads/8147932435Untitled_design_(19).png",
    "https://www.gurmeetkaurstore.in/uploads/67814ADS_Pro_sensual_Pro_Skin_Primer.png",
    "https://www.gurmeetkaurstore.in/uploads/22793Dr_rashel_De-tan.png",
    "https://www.gurmeetkaurstore.in/uploads/93366HR_Foundation_Nude_04.jpg",
  ];

  return (
    <div className="bg-white min-h-screen py-5 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* LEFT — IMAGE GALLERY */}
          <div className="flex-1 flex flex-col lg:flex-row items-center lg:items-start">
            {/* Thumbnails (VERTICAL on desktop, horizontal on mobile) */}
            <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible scrollbar-hide py-2 w-full lg:w-auto lg:mr-4 order-2 lg:order-1">
              {images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`thumb-${i}`}
                  onClick={() => setMainImage(img)}
                  className={`w-16 h-16 sm:w-20 sm:h-20 object-contain border-2 rounded-md cursor-pointer transition-transform duration-200 hover:scale-105 ${
                    mainImage === img ? "border-pink-500" : "border-gray-200"
                  }`}
                />
              ))}
            </div>

            {/* Main Image */}
            <div className="relative w-full lg:w-[80%] flex justify-center mb-4 lg:mb-0 order-1 lg:order-2">
              <div className="w-full h-72 sm:h-80 lg:h-[22rem] flex justify-center items-center bg-gray-50 rounded-xl border border-gray-200 relative">
                <FaHeart className="absolute top-4 right-4 text-pink-500 cursor-pointer text-xl" />
                <img
                  src={mainImage}
                  alt="Product"
                  className="h-full object-contain transition-transform duration-300 hover:scale-105"
                />
              </div>
            </div>
          </div>

          {/* RIGHT — PRODUCT INFO */}
          <div className="flex-1">
            <p className="text-sm text-gray-500 mb-1">Skin Care</p>
            <h1 className="text-2xl font-semibold text-gray-800 mb-2">
              Hydrating Serum
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex">
                {Array.from({ length: 5 }, (_, i) => (
                  <FaStar
                    key={i}
                    className={`${
                      i < 4 ? "text-yellow-400" : "text-gray-300"
                    } text-sm`}
                  />
                ))}
              </div>
              <span className="text-gray-600 text-sm">(245 Reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mb-4">
              <p className="text-2xl font-bold text-pink-500">₹999</p>
              <p className="text-gray-400 line-through">₹1,299</p>
              <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-md">
                In Stock
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-sm mb-4 leading-relaxed">
              Deeply hydrates and revitalizes your skin. Perfect for normal,
              dry, and sensitive skin types. Infused with Vitamin C for a
              natural glow.
            </p>

            {/* Size / Volume */}
            <div className="mb-5">
              <p className="text-gray-700 font-medium mb-2">Variants</p>
              <div className="flex gap-2">
                {["30ml", "60ml", "100ml"].map((size, i) => (
                  <button
                    key={i}
                    className="border border-gray-300 rounded-md px-3 py-1 text-sm hover:border-pink-500 hover:text-pink-500 transition"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity + Buttons */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
              <div className="flex items-center border border-gray-300 rounded-md w-fit">
                <button className="px-3 py-1 text-gray-600">-</button>
                <span className="px-3 py-1">1</span>
                <button className="px-3 py-1 text-gray-600">+</button>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full">
                <button className="flex-1 bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 rounded-lg transition">
                  Add to Cart
                </button>
                <button className="flex-1 border border-pink-500 text-pink-500 font-semibold py-2 rounded-lg hover:bg-pink-50 transition">
                  Buy Now
                </button>
              </div>
            </div>

            {/* SKU + Tags */}
            <div className="text-sm text-gray-500 space-y-1">
              <p>
                <span className="font-medium text-gray-700">SKU:</span>{" "}
                GRFR85648HGJ
              </p>
              <p>
                <span className="font-medium text-gray-700">Tags:</span> Skincare,
                Serums, Vitamin C
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-10 border-t border-gray-200 pt-6">
          <div className="flex gap-8 border-b border-gray-200 pb-2 mb-6 overflow-x-auto">
            {["description", "additional", "review"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-2 font-medium capitalize ${
                  activeTab === tab
                    ? "text-pink-500 border-b-2 border-pink-500"
                    : "text-gray-500 hover:text-pink-500"
                }`}
              >
                {tab === "additional" ? "Additional Information" : tab}
              </button>
            ))}
          </div>

          {activeTab === "description" && (
            <div className="text-gray-600 text-sm leading-relaxed">
              This Hydrating Serum helps to boost skin hydration levels,
              restoring a fresh and dewy appearance. Ideal for both morning and
              evening routines.
            </div>
          )}
          {activeTab === "additional" && (
            <table className="w-full text-sm text-gray-700 border">
              <tbody>
                <tr className="border-b">
                  <td className="p-3 font-medium w-1/3">Skin Type</td>
                  <td className="p-3">
                    Normal, Oily, Dry, Combination, Sensitive skin
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-3 font-medium">Shelf Life</td>
                  <td className="p-3">24 months</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3 font-medium">Application Time</td>
                  <td className="p-3">Morning and Evening</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Packaging</td>
                  <td className="p-3">Recyclable Glass Bottle</td>
                </tr>
              </tbody>
            </table>
          )}
          {activeTab === "review" && (
            <div className="text-gray-600 text-sm">
              <p>No reviews yet. Be the first to share your experience!</p>
            </div>
          )}
        </div>
        
      </div>
    <RelatedProduct />

    </div>
    
  );
}
