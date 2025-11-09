import React from "react";
import { MapPin } from "lucide-react";

export default function Addresses() {
  const addresses = [
    { id: 1, name: "Home", details: "11021, 5A Block WEA, Karol Bagh, Delhi, 110005" },
    { id: 2, name: "Office", details: "123 MG Road, New Delhi, 110001" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-pink-600 mb-6">My Addresses</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {addresses.map((addr) => (
          <div
            key={addr.id}
            className="flex items-center justify-between p-4 border border-pink-100 rounded-xl shadow hover:shadow-lg transition duration-300"
          >
            <div className="flex items-center gap-3">
              <MapPin className="text-pink-500" size={24} />
              <div>
                <h2 className="font-semibold text-gray-800">{addr.name}</h2>
                <p className="text-gray-500">{addr.details}</p>
              </div>
            </div>
            <button className="bg-pink-500 hover:bg-pink-600 text-white px-3 py-1 rounded-lg transition">
              Edit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
