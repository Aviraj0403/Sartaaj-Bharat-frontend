import React, { useState } from "react";

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

  const handleSyncLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });

          const apiKey = "YOUR_GOOGLE_MAPS_API_KEY";
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
    <div className="fixed inset-0 flex justify-end z-[9999]">
      {/* Sidebar */}
      <div className="w-full sm:w-[420px] bg-white h-full shadow-2xl p-0 overflow-y-auto relative">
        {/* ✅ Fixed Header */}
        <div className="sticky top-0 z-[10000] bg-white px-6 py-4 flex justify-between items-center border-b border-gray-200 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800">Add New Address</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-lg font-bold"
          >
            ✕
          </button>
        </div>

        {/* Content Section */}
        <div className="p-6">
          {/* Google Map Visual */}
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

          {/* Sync Button */}
          <button
            onClick={handleSyncLocation}
            className="w-full bg-blue-100 text-blue-700 font-medium py-2 rounded-lg mb-5 hover:bg-blue-200 transition"
          >
            📍 Sync My Location
          </button>

          {/* Address Form */}
          <form className="space-y-4">
            {[
              { label: "User Name", field: "name", type: "text" },
              { label: "Email", field: "email", type: "email" },
              { label: "Phone Number *", field: "phone", type: "tel", maxLength: 10 },
              { label: "Street Address", field: "street", type: "text" },
              { label: "Flat / House No.", field: "flat", type: "text" },
              { label: "Landmark (optional)", field: "landmark", type: "text" },
              { label: "City", field: "city", type: "text" },
              { label: "State", field: "state", type: "text" },
              { label: "Country", field: "country", type: "text" },
              { label: "Pincode", field: "pincode", type: "text", maxLength: 6 },
            ].map(({ label, field, type, maxLength }) => (
              <div key={field}>
                <label className="block text-gray-700 font-medium mb-1">
                  {label}
                </label>
                <input
                  type={type}
                  value={address[field]}
                  maxLength={maxLength}
                  onChange={(e) =>
                    setAddress({ ...address, [field]: e.target.value })
                  }
                  placeholder={label}
                  className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-pink-400"
                />
              </div>
            ))}

            {/* Address Type */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Address Type
              </label>
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
    </div>
  );
}
