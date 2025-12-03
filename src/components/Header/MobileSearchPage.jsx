import React, { useState } from "react";
import { Search, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
// import { searchProducts } from "../../services/searchApi"; // API FUNCTION

export default function MobileSearchPage() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const { data: results = [], isLoading } = useQuery({
    queryKey: ["search", query],
    queryFn: () => searchProducts(query),
    enabled: query.length > 1,
  });

  return (
  <div className="w-full min-h-screen bg-white px-4 pt-0 mt-0">




      {/* 🔝 Top Search Header */}
     <div className="flex items-center gap-3 mb-0 mt-0">


        <div className="flex items-center bg-pink-50 border border-pink-200 rounded-full px-4 py-2 flex-grow">
          <Search size={18} className="text-pink-300" />
          <input
            type="text"
            autoFocus
            placeholder="What are you looking for?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="bg-transparent ml-2 outline-none text-gray-700 w-full"
          />
        </div>

        <button
          onClick={() => navigate(-1)}
          className="text-gray-600 text-lg"
        >
          Cancel
        </button>
      </div>

      {/* ⭐ Suggested Keywords — Screenshot जैसा */}
      {query.length === 0 && (
        <div className="mt-4">
          {[
            "landing page",
            "logo design",
            "web design",
            "mobile app",
            "branding",
            "illustration",
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-2 py-3 text-gray-800 border-b"
            >
              <Search size={18} />
              {item}
            </div>
          ))}
        </div>
      )}

      {/* 🔎 Search Results */}
      {query.length > 1 && (
        <div className="mt-4">
          {isLoading && <p className="text-gray-500 px-2">Searching...</p>}

          {results.length === 0 && !isLoading && (
            <p className="text-gray-400 px-2">No results found</p>
          )}

          {results.map((item) => (
            <div
              key={item._id}
              onClick={() => navigate(`/product/${item.slug}`)}
              className="flex items-center gap-3 px-2 py-3 border-b cursor-pointer hover:bg-pink-50"
            >
              <Search size={18} className="text-pink-400" />
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
