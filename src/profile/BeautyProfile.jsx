import React from "react";
import { User } from "lucide-react";

export default function BeautyProfile() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-pink-600 mb-6">My Beauty Profile</h1>
      <p className="text-gray-700 mb-6">
        Manage your beauty preferences, skin type, and favorite products.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 border border-pink-100 rounded-xl shadow hover:shadow-lg transition duration-300">
          <h2 className="font-semibold text-gray-800">Skin Type</h2>
          <p className="text-gray-500 mt-2">Normal</p>
        </div>
        <div className="p-6 border border-pink-100 rounded-xl shadow hover:shadow-lg transition duration-300">
          <h2 className="font-semibold text-gray-800">Favorite Color</h2>
          <p className="text-gray-500 mt-2">Pink</p>
        </div>
      </div>
    </div>
  );
}
