import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";  // Import React Query hook
import { getMenuCategories } from "../../services/categoryApi";  // API function for fetching categories

export default function CategorySlider() {
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  let isDown = false;
  let startX;
  let scrollLeft;

  // Fetch categories using React Query -- new tech mutation 
  const { data: menuItems, isLoading, isError, error } = useQuery({
    queryKey: ["categories"],  // Query key
    queryFn: getMenuCategories,  // Fetch function
    onError: (err) => {
      console.error("Error fetching categories:", err);
    },
  });
  console.log(menuItems);  // Ensure the categories data is correct

  // Handle category click (navigate to category page)
  const handleCategoryClick = (slug) => {
    navigate(`/${slug}`); // Navigate to dynamic category page using slug
  };

  // Scroll function
  const scroll = (direction) => {
    const { current } = scrollRef;
    if (direction === "left") current.scrollBy({ left: -250, behavior: "smooth" });
    else current.scrollBy({ left: 250, behavior: "smooth" });
  };

  // Mouse drag scroll
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
    const walk = (x - startX) * 1.2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
   <div className="w-full py-10 bg-white relative px-3 sm:px-4">
  {/* Header with arrows */}
  <div className="flex justify-between items-center mb-7 ml-5">
    <h2 className="text-2xl font-semibold text-pink-600">
      Shop by Categories
    </h2>
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

  {/* Category List */}
  <div className="px-2 sm:px-4">
    <div
      ref={scrollRef}
      className="flex overflow-x-auto scrollbar-hide cursor-grab select-none scroll-smooth space-x-4 px-2"
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      {!isLoading && !isError && menuItems?.map((cat) => (
        <div
          key={cat._id}
          onClick={() => handleCategoryClick(cat.slug)}
          className="flex-shrink-0 w-[48%] sm:w-[200px] cursor-pointer group relative"
        >
          <div className="rounded-2xl overflow-hidden shadow-md border border-gray-100 transition-all duration-300 hover:shadow-xl hover:scale-105">
            <img
              src={cat.image[0]}
              alt={cat.name}
              className="w-full h-[130px] sm:h-[150px] object-contain"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-all"></div>
          </div>
          <h3 className="text-center mt-3 font-semibold text-gray-700 group-hover:text-pink-600 text-sm sm:text-base">
            {cat.name}
          </h3>
        </div>
      ))}
    </div>
  </div>
</div>

  );
}
