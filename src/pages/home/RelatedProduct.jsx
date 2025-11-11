import React, { useRef } from "react";
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
  const scrollRef = useRef(null);

  const handleMouseDown = (e) => {
    const slider = scrollRef.current;
    slider.isDown = true;
    slider.startX = e.pageX - slider.offsetLeft;
    slider.scrollLeftStart = slider.scrollLeft;
  };

  const handleMouseLeave = () => {
    scrollRef.current.isDown = false;
  };

  const handleMouseUp = () => {
    scrollRef.current.isDown = false;
  };

  const handleMouseMove = (e) => {
    const slider = scrollRef.current;
    if (!slider.isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - slider.startX) * 1.5;
    slider.scrollLeft = slider.scrollLeftStart - walk;
  };

  return (
    <section className="py-10 bg-white w-full overflow-hidden">
      <div className="w-full max-w-[100vw]">
        <h2 className="text-2xl md:text-3xl font-bold text-pink-500 mb-6 text-center">
          Related Products
        </h2>

        <div
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth cursor-grab active:cursor-grabbing select-none snap-x snap-mandatory pb-4"
        >
          {bestsellers.map((product, index) => {
            const discount = Math.round(
              ((product.originalPrice - product.price) / product.originalPrice) * 100
            );

            return (
              <div
                key={index}
                className="snap-start flex-shrink-0 bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 relative group p-4 flex flex-col justify-between
                           w-[47.5%] md:w-[18%]" // Mobile: 48%, Desktop: 18%
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
                  className="w-full h-40 flex justify-center items-center mb-3 cursor-pointer"
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Product Info */}
                <h3 className="text-sm md:text-base font-semibold text-gray-800 mb-1">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-xs md:text-sm mb-2">{product.description}</p>

                {/* Price & Rating */}
                <div className="flex justify-between items-center mb-2 px-1 text-sm">
                  <div className="flex items-center gap-1">
                    <p className="text-pink-500 font-medium text-sm">₹{product.price}</p>
                    <p className="text-gray-400 line-through text-xs">{product.originalPrice}</p>
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

      <style>{`
        /* Hide scrollbar */
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .scroll-smooth {
          scroll-behavior: smooth;
        }
      `}</style>
    </section>
  );
}
