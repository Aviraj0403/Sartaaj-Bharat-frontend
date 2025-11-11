import React, { useState, useEffect } from "react";

export default function AddressSidebar({ isOpen, onClose }) {
  const [address, setAddress] = useState({
    name: "",
    email: "",
    phone: "",
    street: "",
    flat: "",
    landmark: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    addressType: "Home",
  });

  const [location, setLocation] = useState({ lat: null, lng: null });

  // ✅ Sync Location (Geolocation + Google Maps)
  const handleSyncLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });

          const apiKey = "YOUR_GOOGLE_MAPS_API_KEY"; // 🔑 Replace this
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
          );
          const data = await response.json();

          if (data.results.length > 0) {
            const formattedAddress = data.results[0].formatted_address;
            const components = data.results[0].address_components;
            const getComponent = (type) =>
              components.find((c) => c.types.includes(type))?.long_name || "";

            setAddress((prev) => ({
              ...prev,
              street: formattedAddress,
              city: getComponent("locality"),
              state: getComponent("administrative_area_level_1"),
              country: getComponent("country"),
              pincode: getComponent("postal_code"),
            }));
          }
        },
        (error) => {
          alert("Unable to fetch location. Please enable GPS.");
          console.error(error);
        }
      );
    } else {
      alert("Geolocation not supported by your browser.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* ✅ Sidebar (no black overlay) */}
      <div className="w-full sm:w-[420px] bg-white h-full shadow-2xl p-6 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Add New Address</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-lg font-bold"
          >
            ✕
          </button>
        </div>

        {/* ✅ Google Map Visual */}
        <div className="w-full h-48 rounded-lg overflow-hidden mb-4 border">
          {location.lat ? (
            <iframe
              title="map"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              src={`https://www.google.com/maps/embed/v1/view?key=YOUR_GOOGLE_MAPS_API_KEY&center=${location.lat},${location.lng}&zoom=16`}
            ></iframe>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              Map will appear here after syncing location
            </div>
          )}
        </div>

        {/* ✅ Sync Button */}
        <button
          onClick={handleSyncLocation}
          className="w-full bg-blue-100 text-blue-700 font-medium py-2 rounded-lg mb-5 hover:bg-blue-200 transition"
        >
          📍 Sync My Location
        </button>

        {/* ✅ Address Form */}
        <form className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">User Name</label>
            <input
              type="text"
              value={address.name}
              onChange={(e) => setAddress({ ...address, name: e.target.value })}
              placeholder="Your Name"
              className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              value={address.email}
              onChange={(e) => setAddress({ ...address, email: e.target.value })}
              placeholder="Your Email"
              className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Phone Number *</label>
            <input
              type="tel"
              maxLength="10"
              value={address.phone}
              onChange={(e) => setAddress({ ...address, phone: e.target.value })}
              placeholder="10-digit mobile"
              className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Street Address</label>
            <input
              type="text"
              value={address.street}
              onChange={(e) => setAddress({ ...address, street: e.target.value })}
              placeholder="Street address"
              className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Flat / House No.</label>
            <input
              type="text"
              value={address.flat}
              onChange={(e) => setAddress({ ...address, flat: e.target.value })}
              placeholder="Flat, House Number"
              className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Landmark (optional)
            </label>
            <input
              type="text"
              value={address.landmark}
              onChange={(e) => setAddress({ ...address, landmark: e.target.value })}
              placeholder="Nearby landmark"
              className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">City</label>
              <input
                type="text"
                value={address.city}
                onChange={(e) => setAddress({ ...address, city: e.target.value })}
                placeholder="City"
                className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">State</label>
              <input
                type="text"
                value={address.state}
                onChange={(e) => setAddress({ ...address, state: e.target.value })}
                placeholder="State"
                className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Country</label>
            <input
              type="text"
              value={address.country}
              onChange={(e) => setAddress({ ...address, country: e.target.value })}
              placeholder="Country"
              className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Pincode</label>
            <input
              type="text"
              value={address.pincode}
              maxLength="6"
              onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
              placeholder="6-digit ZIP Code"
              className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          {/* Address Type */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Address Type</label>
            <div className="flex gap-4">
              {["Home", "Work", "Other"].map((type) => (
                <label key={type} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="addressType"
                    checked={address.addressType === type}
                    onChange={() => setAddress({ ...address, addressType: type })}
                  />
                  <span>{type}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-pink-500 text-white py-2 rounded-lg font-medium hover:bg-pink-600 transition mt-2"
          >
            Save Address
          </button>
        </form>
      </div>
    </div>
  );
}
