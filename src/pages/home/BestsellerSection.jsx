import React from "react";
import { FaStar, FaHeart } from "react-icons/fa";

const bestsellers = [
  {
    id: 1,
    name: "Glow Radiance Face Cream",
    description: "Brightens and hydrates your skin naturally.",
    price: 799,
    image:
      "https://www.gurmeetkaurstore.in/uploads/67814ADS_Pro_sensual_Pro_Skin_Primer.png",
    rating: 4.5,
  },
  {
    id: 2,
    name: "Velvet Matte Lipstick",
    description: "Smooth matte finish with long-lasting color.",
    price: 499,
    image:
      "https://www.gurmeetkaurstore.in/uploads/57161Nice_&_Naughty_Bombshell_Lipistick_Mix_Color_D.png",
    rating: 4.7,
  },
  {
    id: 3,
    name: "Hydrating Serum",
    description: "Deeply hydrates and revitalizes your skin.",
    price: 999,
    image:
      "https://www.gurmeetkaurstore.in/uploads/8147932435Untitled_design_(19).png",
    rating: 4.8,
  },
  {
    id: 4,
    name: "Luxury Nail Paint Set",
    description: "Long-lasting vibrant nail colors in one set.",
    price: 699,
    image:
      "https://www.gurmeetkaurstore.in/uploads/93366HR_Foundation_Nude_04.jpg",
    rating: 4.6,
  },
  {
    id: 5,
    name: "Luxury Body Lotion",
    description: "Moisturizes and nourishes your skin deeply.",
    price: 850,
    image:
      "https://www.gurmeetkaurstore.in/uploads/22793Dr_rashel_De-tan.png",
    rating: 4.4,
  },
];

export default function BestsellerSection() {
  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-pink-500 mb-8 text-center">
          Bestseller Products
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {bestsellers.map((product) => (
            <div
              key={product.id}
              className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 relative group p-3 flex flex-col justify-between
              md:p-3 md:flex-col"
            >
              {/* Heart Icon */}
              <div className="absolute top-3 right-3 text-pink-500 cursor-pointer opacity-80 hover:opacity-100 transition text-lg">
                <FaHeart />
              </div>

              {/* Product Image */}
              <div className="w-full h-24 md:h-36 flex justify-center items-center mb-2">
                {/* Mobile height smaller (h-24), desktop h-36 */}
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Product Name */}
              <h3 className="text-sm md:text-base font-semibold text-gray-800 mb-1 text-center">
                {product.name}
              </h3>

              {/* Product Description */}
              <p className="text-gray-600 text-xs md:text-sm mb-2 text-center">
                {product.description}
              </p>

              {/* Price and Rating */}
              <div className="flex justify-between items-center mb-2 px-1 text-sm">
                <p className="text-pink-500 font-medium text-sm">₹{product.price}</p>

                {/* Rating */}
                <div className="flex items-center">
                  {/* Desktop: full stars */}
                  <div className="hidden md:flex">
                    {Array.from({ length: 5 }, (_, index) => (
                      <FaStar
                        key={index}
                        className={`${
                          index < Math.floor(product.rating)
                            ? "text-yellow-400"
                            : "text-gray-300"
                        } text-xs md:text-sm`}
                      />
                    ))}
                  </div>

                  {/* Mobile: only 1 star */}
                  <div className="flex md:hidden items-center">
                    <FaStar className="text-yellow-400 text-xs" />
                  </div>

                  <span className="ml-1 text-gray-600 text-xs">{product.rating}</span>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col md:flex-row gap-2">
                <button className="flex-1 bg-pink-500 text-white font-semibold py-1 rounded-lg hover:bg-pink-600 transition text-sm">
                  Add to Cart
                </button>
                <button className="flex-1 border border-pink-500 text-pink-500 font-semibold py-1 rounded-lg hover:bg-pink-50 transition text-sm">
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
