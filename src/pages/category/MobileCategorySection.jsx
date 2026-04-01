// import React from "react";
// import {
//   FaPalette,       // Makeup
//   FaKissWinkHeart, // Lip Care
//   FaLeaf,          // Skin Care
//   FaCut,           // Hair Care
//   FaHandHolding,   // Nail Paint
//   FaCloud,         // Fragrance
//   FaPumpSoap,      // Body Lotion
//   FaGem            // Accessories
// } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

// export default function MobileCategorySection() {
//   const navigate = useNavigate();

//   const categories = [
//     { id: 1, title: "Makeup", icon: <FaPalette size={22} /> },
//     { id: 2, title: "Lip Care", icon: <FaKissWinkHeart size={22} /> },
//     { id: 3, title: "Skin Care", icon: <FaLeaf size={22} /> },
//     { id: 4, title: "Hair Care", icon: <FaCut size={22} /> },
//     { id: 5, title: "Nail Paint", icon: <FaHandHolding size={22} /> },
//     { id: 6, title: "Fragrance", icon: <FaCloud size={22} /> },
//     { id: 7, title: "Body Lotion", icon: <FaPumpSoap size={22} /> },
//     { id: 8, title: "Accessories", icon: <FaGem size={22} /> },
//   ];

//   const handleCategoryClick = (categoryId) => {
//     navigate(`/category/${categoryId}`); // ✅ Navigate to dynamic category page
//   };

//   return (
//     <div className="block md:hidden bg-white py-3 border-t border-b border-gray-200">
//       <div className="flex items-center justify-start gap-4 overflow-x-auto px-4 scrollbar-hide">
//         {categories.map((cat) => (
//           <div
//             key={cat.id}
//             onClick={() => handleCategoryClick(cat.id)}
//             className="flex flex-col items-center justify-center min-w-[70px] text-center cursor-pointer group active:scale-95 transition-all"
//           >
//             <div className="text-pink-600 mb-1 group-hover:text-pink-700 transition-colors">
//               {cat.icon}
//             </div>
//             <span className="text-[11px] font-medium text-gray-700 whitespace-nowrap group-hover:text-pink-600">
//               {cat.title}
//             </span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// _________________DYNAMIC CATEGORY SECTION USING API FETCH_________________
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCategories } from "../../hooks";

export default function MobileCategorySection() {
  const navigate = useNavigate();

  const {
    data: menuItems = [],
    isLoading,
    isError,
  } = useCategories();
  const handleCategoryClick = (slug) => {
    navigate(`/${slug}`); // Navigate to dynamic category page using slug
  };

  return (
    <div className="block md:hidden bg-white py-4 border-t border-b border-slate-100 shadow-sm">
      <div className="flex items-center justify-start gap-4 overflow-x-auto px-4 scrollbar-hide">
        {/* Loading State */}
        {isLoading && (
          <div className="w-full text-center text-blue-600 font-black text-[10px] uppercase tracking-[0.3em] italic animate-pulse">
            Syncing...
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="w-full text-center text-red-600">
            Error fetching categories. Please try again later.
          </div>
        )}

        {/* Display Categories */}
        {!isLoading &&
          !isError &&
          menuItems?.map((cat) => (
            <div
              key={cat._id}
              onClick={() => handleCategoryClick(cat.slug)} // Handle category click
              className="flex flex-col items-center justify-center min-w-[70px] text-center cursor-pointer group active:scale-95 transition-all"
            >
              {/* Category Image */}
              <div className="relative mb-2 group-hover:scale-105 transition-transform">
                <div className="absolute inset-0 rounded-2xl bg-blue-600/10 group-hover:bg-blue-600/0 transition-colors"></div>
                <img
                  src={(Array.isArray(cat.image) ? cat.image[0] : cat.image) || "https://via.placeholder.com/200?text=Category"}
                  alt={cat.name}
                  className="w-20 h-24 object-cover rounded-2xl grayscale group-hover:grayscale-0 transition-all duration-500 shadow-sm"
                  onError={(e) => {
                    const fallback = "https://via.placeholder.com/200?text=Category";
                    if (e.target.src !== fallback) {
                      e.target.src = fallback;
                    }
                  }}
                />
              </div>

              {/* Category Title */}
              <span className="text-[10px] font-black text-slate-500 whitespace-nowrap group-hover:text-blue-600 uppercase tracking-widest italic transition-colors">
                {cat.name}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
}
