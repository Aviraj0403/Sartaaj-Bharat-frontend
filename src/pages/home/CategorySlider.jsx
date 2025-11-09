import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import makeupCat from "../../image/9.png";
import lipcareCat from "../../image/8 (1).png";
import skincareCat from "../../image/9 (1).png";
import haircareCat from "../../image/7.png";           
import nailpaintCat from "../../image/9.png";
import fragranceCat from "../../image/10.png";
import bodylotionCat from "../../image/11.png";
import accessoriesCat from "../../image/12.png";

const categories = [
  { title: "Makeup", image: makeupCat },
  { title: "Lip Care", image: lipcareCat },
  { title: "Skin Care", image: skincareCat },
  { title: "Hair Care", image: haircareCat },
  { title: "Nail Paint", image: nailpaintCat },
  { title: "Fragrance", image: fragranceCat },
  { title: "Body Lotion", image: bodylotionCat },
  { title: "Accessories", image: accessoriesCat },
];


export default function CategorySlider() {
  const scrollRef = useRef(null);
  let isDown = false;
  let startX;
  let scrollLeft;

  // ✅ Click Scroll Function
  const scroll = (direction) => {
    const { current } = scrollRef;
    if (direction === "left") {
      current.scrollBy({ left: -300, behavior: "smooth" });
    } else {
      current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  // ✅ Mouse Drag Scroll
  const handleMouseDown = (e) => {
    isDown = true;
    scrollRef.current.classList.add("cursor-grabbing");
    startX = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft = scrollRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDown = false;
    scrollRef.current.classList.remove("cursor-grabbing");
  };

  const handleMouseUp = () => {
    isDown = false;
    scrollRef.current.classList.remove("cursor-grabbing");
  };

  const handleMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.2; // Scroll speed
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="w-full py-10 px-4 bg-white">
      {/* Header with arrows */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-pink-600">
          Shop by Categories
        </h2>

        {/* Stylish Arrow Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => scroll("left")}
            className="p-2 bg-pink-100 text-pink-600 rounded-full shadow hover:bg-pink-500 hover:text-white transition-all duration-300"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="p-2 bg-pink-100 text-pink-600 rounded-full shadow hover:bg-pink-500 hover:text-white transition-all duration-300"
          >
            <ChevronRight size={22} />
          </button>
        </div>
      </div>

      {/* Scrollable Categories */}
      <div
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className="flex overflow-x-auto space-x-4 scrollbar-hide cursor-grab select-none scroll-smooth"
      >
        {categories.map((cat, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-[200px] cursor-pointer group relative"
          >
            <div className="rounded-2xl overflow-hidden shadow-md border border-gray-100 transition-all duration-300 hover:shadow-xl hover:scale-105">
              <img
                src={cat.image}
                alt={cat.title}
                className="w-full h-[150px] object-cover"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-all"></div>
            </div>
            <h3 className="text-center mt-3 font-semibold text-gray-700 group-hover:text-pink-600">
              {cat.title}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}
