import React, { useState } from "react";
import AddressSidebar from "./AddressSidebar"; // 👈 import sidebar component

export default function CheckoutPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-pink-50 flex justify-center items-start p-4 sm:p-8 relative overflow-hidden">
      {/* Sidebar */}
      <AddressSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main checkout layout */}
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-6 transition-all">
        {/* Shipping Section */}
        <div className="bg-white shadow-md rounded-2xl p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
            Shipping Information
          </h2>

          {/* Example Saved Addresses */}
          <div className="space-y-4 mb-6">
            <label className="block border-2 border-pink-300 rounded-xl p-4 cursor-pointer hover:bg-pink-50">
              <div className="flex items-start gap-2">
                <input type="radio" name="address" defaultChecked className="mt-1 text-pink-500" />
                <div>
                  <p className="font-semibold text-gray-800">
                    Home (9876543210)
                    <span className="italic text-gray-500 text-sm ml-2">(Default)</span>
                  </p>
                  <p className="text-gray-600 text-sm">
                    Sector 51, Noida City Centre, Noida, Gautam Buddha Nagar, UP, 201307
                  </p>
                </div>
              </div>
            </label>

            <label className="block border rounded-xl p-4 cursor-pointer hover:bg-pink-50">
              <div className="flex items-start gap-2">
                <input type="radio" name="address" className="mt-1 text-pink-500" />
                <div>
                  <p className="font-semibold text-gray-800">Office (8789202772)</p>
                  <p className="text-gray-600 text-sm">
                    Sector 62, Noida, Gautam Buddha Nagar, UP, 201309
                  </p>
                </div>
              </div>
            </label>
          </div>

          <div className="text-center mb-6">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="text-pink-600 font-medium hover:text-pink-700"
            >
              + Add New Address
            </button>
          </div>

          {/* Payment Methods */}
          <h3 className="text-gray-700 font-semibold text-center mb-4">Payment Method</h3>
          <div className="flex justify-center gap-4">
            <button className="bg-pink-100 text-pink-700 font-semibold px-6 py-2 rounded-lg hover:bg-pink-200 transition">
              Pay Cash
            </button>
            <button className="bg-pink-500 text-white font-semibold px-6 py-2 rounded-lg hover:bg-pink-600 transition">
              Pay Online
            </button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white shadow-md rounded-2xl p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">Order Summary</h2>
          <div className="border-t border-gray-200 pt-2">
            <div className="flex justify-between border-b py-3">
              <p className="text-gray-700">Paneer Burger (Small) × 1</p>
              <p className="text-gray-800 font-medium">₹47.53</p>
            </div>
            <div className="flex justify-between border-b py-3">
              <p className="text-gray-700">Paneer Burger (Large) × 1</p>
              <p className="text-gray-800 font-medium">₹99.00</p>
            </div>
            <div className="flex justify-between py-3">
              <p className="text-gray-700">Total Items:</p>
              <p className="text-gray-800 font-semibold">2</p>
            </div>
            <div className="flex justify-between py-3 border-t border-gray-200">
              <p className="text-gray-800 font-bold">Final Amount:</p>
              <p className="text-pink-600 font-bold text-lg">₹178.01</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
