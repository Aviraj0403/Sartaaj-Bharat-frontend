import React from "react";
import {
  FaPalette,       // Makeup
  FaKissWinkHeart, // Lip Care
  FaLeaf,          // Skin Care
  FaCut,           // Hair Care
  FaHandHolding,   // Nail Paint
  FaCloud,         // Fragrance
  FaPumpSoap,      // Body Lotion
  FaGem            // Accessories
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function MobileCategorySection() {
  const navigate = useNavigate();

  const categories = [
    { id: 1, title: "Makeup", icon: <FaPalette size={22} /> },
    { id: 2, title: "Lip Care", icon: <FaKissWinkHeart size={22} /> },
    { id: 3, title: "Skin Care", icon: <FaLeaf size={22} /> },
    { id: 4, title: "Hair Care", icon: <FaCut size={22} /> },
    { id: 5, title: "Nail Paint", icon: <FaHandHolding size={22} /> },
    { id: 6, title: "Fragrance", icon: <FaCloud size={22} /> },
    { id: 7, title: "Body Lotion", icon: <FaPumpSoap size={22} /> },
    { id: 8, title: "Accessories", icon: <FaGem size={22} /> },
  ];

  const handleCategoryClick = (categoryId) => {
    navigate(`/category/${categoryId}`); // ✅ Navigate to dynamic category page
  };

  return (
    <div className="block md:hidden bg-white py-3 border-t border-b border-gray-200">
      <div className="flex items-center justify-start gap-4 overflow-x-auto px-4 scrollbar-hide">
        {categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => handleCategoryClick(cat.id)}
            className="flex flex-col items-center justify-center min-w-[70px] text-center cursor-pointer group active:scale-95 transition-all"
          >
            <div className="text-pink-600 mb-1 group-hover:text-pink-700 transition-colors">
              {cat.icon}
            </div>
            <span className="text-[11px] font-medium text-gray-700 whitespace-nowrap group-hover:text-pink-600">
              {cat.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
