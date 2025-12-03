import React, { useState } from "react";
import { Search, X } from "lucide-react"; // Using icons from lucide-react
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMenuCategories, getSearchSuggestions } from "../../services/categoryApi"; // API functions for fetching categories and search suggestions

// MobileSearchPage component with integrated CategorySlider
export default function MobileSearchPage() {
  const [query, setQuery] = useState(""); // Search query state
  const navigate = useNavigate();

  // Fetch categories using React Query
  const { data: menuItems, isLoading: isCategoriesLoading, isError: isCategoriesError } = useQuery({
    queryKey: ["categories"],
    queryFn: getMenuCategories,
    onError: (err) => {
      console.error("Error fetching categories:", err);
    },
  });

  // Fetch search suggestions based on the query using React Query
  const { data: suggestions, isLoading, isError } = useQuery({
    queryKey: ['searchSuggestions', query],
    queryFn: () => getSearchSuggestions(query),
    enabled: query.length > 1, // Only run query if query length > 1
    onError: (err) => {
      console.error("Error fetching search suggestions:", err);
    },
  });

  return (
    <div className="w-full min-h-screen bg-white px-4 pt-4 mt-0">
      {/* 🔝 Top Search Header */}
      <div className="flex gap-3 mb-4">
        <div className="flex-1">
          <div className="flex items-center bg-gray-100 border border-gray-300 rounded-full px-4 py-2">
            <Search size={18} className="text-gray-500" />
            <input
              type="text"
              autoFocus
              placeholder="What are you looking for?"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="bg-transparent ml-2 outline-none text-gray-700 w-full"
            />
            {/* Clear Icon when there's text in the input */}
            {query.length > 0 && (
              <button onClick={() => setQuery("")} className="text-gray-600 text-lg">
                <X size={18} />
              </button>
            )}
          </div>
        </div>

        {/* Cancel Button */}
        {query.length > 0 && (
          <button
            onClick={() => setQuery("")}
            className="text-gray-600 text-lg ml-2"
          >
            Cancel
          </button>
        )}
      </div>

      {/* ⭐ Suggested Keywords */}
      {query.length === 0 && (
        <div className="mt-4">
          <p className="text-gray-700 mb-3">Suggested Keywords:</p>
          {["Shoes Craze Sale", "Perfumes for Women", "Trending Fashion", "New Arrivals", "Hot Deals"].map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-2 py-3 text-gray-800 border-b cursor-pointer hover:bg-gray-100"
              onClick={() => setQuery(item)}
            >
              <Search size={18} className="text-gray-400" />
              {item}
            </div>
          ))}
        </div>
      )}

      {/* 🛒 CategorySlider when search query is empty */}
      {query.length === 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-pink-600">Shop by Categories</h2>
          <div className="mt-4">
            {/* Category Slider */}
            <div className="flex overflow-x-auto space-x-4 scrollbar-hide cursor-grab select-none scroll-smooth">
              {isCategoriesLoading && <p className="w-full text-center text-pink-600">Loading categories...</p>}
              {isCategoriesError && (
                <div className="w-full text-center text-red-600">
                  Error fetching categories. Please try again later.
                </div>
              )}
              {!isCategoriesLoading && !isCategoriesError && menuItems?.map((cat) => (
                <div
                  key={cat._id}
                  onClick={() => navigate(`/${cat.slug}`)}
                  className="flex-shrink-0 w-[48%] sm:w-[200px] cursor-pointer group relative"
                >
                  <div className="rounded-2xl overflow-hidden shadow-md border border-gray-100 transition-all duration-300 hover:shadow-xl hover:scale-105">
                    <img
                      src={cat.image[0]} // Display first image in the array
                      alt={cat.name}
                      className="w-full h-[130px] sm:h-[150px] object-cover"
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
      )}

      {/* 🔎 Search Results */}
      {query.length > 1 && (
        <div className="mt-4">
          {isLoading && <p className="text-gray-600">Loading search results...</p>} {/* Loading state */}
          {isError && <p className="text-center text-red-600">Error fetching search results.</p>} {/* Error state */}

          {!isLoading && !isError && suggestions?.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {suggestions.map((item) => (
                <div
                  key={item._id} // Assuming each item has a unique _id
                  onClick={() => navigate(`/product/${item.slug}`)} // Redirect to product page
                  className="cursor-pointer rounded-lg shadow-lg border border-gray-100 p-4 hover:shadow-xl hover:scale-105"
                >
                  <img
                    src={item.pimages[0]} // Use the first image in the pimages array
                    alt={item.name}
                    className="w-full h-[150px] object-cover rounded-t-lg"
                  />
                  <div className="mt-2">
                    <h3 className="text-gray-800 font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.description}</p>
                    <div className="mt-2">
                      <span className="text-xl font-semibold text-gray-900">₹ {item.price}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!isLoading && !isError && suggestions?.length === 0 && (
            <p className="text-gray-500 px-2">No products found.</p>
          )}
        </div>
      )}
    </div>
  );
}
