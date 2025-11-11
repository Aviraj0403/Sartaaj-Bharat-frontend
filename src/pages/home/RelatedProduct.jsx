import React from "react";
import { FaStar, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const bestsellers = [
  {
    id: 1,
    name: "Glow Radiance Face Cream",
    description: "Brightens and hydrates your skin naturally.",
    price: 799,
    originalPrice: 999,
    image:
      "https://www.gurmeetkaurstore.in/uploads/67814ADS_Pro_sensual_Pro_Skin_Primer.png",
    rating: 4.5,
  },
  {
    id: 2,
    name: "Velvet Matte Lipstick",
    description: "Smooth matte finish with long-lasting color.",
    price: 499,
    originalPrice: 699,
    image:
      "https://www.gurmeetkaurstore.in/uploads/57161Nice_&_Naughty_Bombshell_Lipistick_Mix_Color_D.png",
    rating: 4.7,
  },
  {
    id: 3,
    name: "Hydrating Serum",
    description: "Deeply hydrates and revitalizes your skin.",
    price: 999,
    originalPrice: 1299,
    image:
      "https://www.gurmeetkaurstore.in/uploads/8147932435Untitled_design_(19).png",
    rating: 4.8,
  },
  {
    id: 4,
    name: "Luxury Nail Paint Set",
    description: "Long-lasting vibrant nail colors in one set.",
    price: 699,
    originalPrice: 899,
    image:
      "https://www.gurmeetkaurstore.in/uploads/93366HR_Foundation_Nude_04.jpg",
    rating: 4.6,
  },
  {
    id: 5,
    name: "Luxury Body Lotion",
    description: "Moisturizes and nourishes your skin deeply.",
    price: 850,
    originalPrice: 1099,
    image: "https://www.gurmeetkaurstore.in/uploads/22793Dr_rashel_De-tan.png",
    rating: 4.4,
  },
];

export default function RelatedProduct() {
  const navigate = useNavigate();

  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-pink-500 mb-6 text-center">
          Related Products
        </h2>

        {/* Horizontal Scroll Container */}
        <div className="flex gap-4 overflow-x-auto scrollbar-hide py-2">
          {bestsellers.map((product) => {
            const discount = Math.round(
              ((product.originalPrice - product.price) / product.originalPrice) * 100
            );

            return (
              <div
                key={product.id}
                className="flex-shrink-0 w-1/2 sm:w-1/3 md:w-60 bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 relative group p-3 flex flex-col justify-between"
              >
                {/* Heart Icon */}
                <div className="absolute top-3 right-3 z-20 text-pink-500 cursor-pointer opacity-80 hover:opacity-100 transition text-lg">
                  <FaHeart />
                </div>

                {/* Discount Badge */}
                {discount > 0 && (
                  <div className="absolute top-3 left-3 z-20 bg-pink-500 text-white text-xs font-semibold px-2 py-1 rounded-md shadow">
                    {discount}% OFF
                  </div>
                )}

                {/* Product Image */}
                <div
                  className="w-full h-36 flex justify-center items-center mb-2 cursor-pointer relative z-10"
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full object-contain transition-transform duration-300 group-hover:scale-105 relative z-10"
                  />
                </div>

                {/* Product Info */}
                <h3 className="text-sm md:text-base font-semibold text-gray-800 mb-1">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-xs md:text-sm mb-2">{product.description}</p>

                {/* Price and Rating */}
                <div className="flex justify-between items-center mb-2 px-1 text-sm">
                  <div className="flex items-center gap-1">
                    <p className="text-pink-500 font-medium text-sm">₹{product.price}</p>
                    <p className="text-gray-400 line-through text-xs">
                      ₹{product.originalPrice}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <FaStar className="text-yellow-400 text-xs" />
                    <span className="ml-1 text-gray-600 text-xs">{product.rating}</span>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col md:flex-row gap-2">
                  <button className="flex-1 bg-pink-500 text-white font-semibold py-1 rounded-lg hover:bg-pink-600 transition text-sm">
                    Add to Cart
                  </button>
                  <button
                    onClick={() => navigate(`/product/${product.id}`)}
                    className="flex-1 border border-pink-500 text-pink-500 font-semibold py-1 rounded-lg hover:bg-pink-50 transition text-sm"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
