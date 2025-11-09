import React from "react";
import { Smile } from "lucide-react";

export default function Support() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-pink-600 mb-6">Customer Support</h1>
      <p className="text-gray-700 mb-6">
        Need help regarding your orders or products? Contact our support team.
      </p>

      <div className="p-6 border border-pink-100 rounded-xl shadow hover:shadow-lg transition duration-300">
        <div className="flex items-center gap-4">
          <Smile className="text-pink-500" size={32} />
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Chat with Support</h2>
            <p className="text-gray-500 text-sm">Our team is ready to assist you 24/7.</p>
            <button className="mt-2 bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg transition">
              Start Chat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
