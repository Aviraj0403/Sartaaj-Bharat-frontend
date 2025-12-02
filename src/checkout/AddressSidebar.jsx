import React, { useState, useEffect } from "react";
import axios from "../utils/Axios"; // Your Axios instance
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { toast } from 'react-toastify'; // Assuming you use react-toastify for notifications
import { useAuth } from "../context/AuthContext";

export default function AddressSidebar({ isOpen, onClose, refreshAddresses, userName, email }) {

  const { user } = useAuth();
  const [address, setAddress] = useState({
    name: user?.userName || "",  // Prefill with userName from context
    email: user?.email || "",
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


  useEffect(() => {
    if (user) {
      setAddress((prev) => ({
        ...prev,
        name: user.userName || "",
        email: user.email || "",
      }));
    }
  }, [user]);

  const [location, setLocation] = useState({ lat: null, lng: null });
  const [isLoading, setIsLoading] = useState(false);

  // Function to sync location
  const handleSyncLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });

          try {
            const res = await axios.get(`/map?lat=${latitude}&lon=${longitude}`);
            const data = res.data;
            const components = data.address;
            setAddress((prev) => ({
              ...prev,
              street: data.display_name,
              city: components.city || components.town,
              state: components.state || "",
              country: components.country || "",
              pincode: components.postcode || "",
            }));
          } catch (err) {
            console.error(err);
            alert("Failed to fetch address from location.");
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

  // Function to handle form data change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  // Function to save the address
  const saveAddress = async (e) => {
    e.preventDefault();
    if (!address.phone || !/^\d{10}$/.test(address.phone)) {
      alert("⚠️ Enter a valid 10-digit phone number.");
      return;
    }

    if (!address.pincode || !/^\d{6}$/.test(address.pincode)) {
      alert("⚠️ Enter a valid 6-digit pincode.");
      return;
    }

    setIsLoading(true);

    const addressPayload = {
      ...address,
      location: { type: "Point", coordinates: [location.lng || 0, location.lat || 0] },
    };

    try {
      await axios.post("/users/address", addressPayload, { withCredentials: true });
      toast.success("✅ Address saved!");
      setIsLoading(false);
      onClose(); // Automatically close the sidebar after successful save
      if (refreshAddresses) refreshAddresses();
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to save address.");
      setIsLoading(false);
    }
  };

  // Return if sidebar is closed
  if (!isOpen) return null;

  const fields = [
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
  ];

  return (
    <div className="fixed inset-0 flex justify-end z-[9999]">
      <div className="w-full sm:w-[420px] bg-white h-full shadow-2xl p-0 overflow-y-auto relative">
        {/* Header Section */}
        <div className="sticky top-0 z-[10000] bg-white px-6 py-4 flex justify-between items-center border-b border-gray-200 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800">Add New Address</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-lg font-bold">
            ✕
          </button>
        </div>

        {/* Content Section */}
        <div className="p-6">
          {/* Leaflet Map or Custom Image */}
          <div className="w-full h-48 rounded-lg overflow-hidden mb-4 border">
            {location.lat ? (
              <MapContainer center={[location.lat, location.lng]} zoom={16} style={{ width: "100%", height: "100%" }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={[location.lat, location.lng]}>
                  <Popup>{address.street}</Popup>
                </Marker>
              </MapContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                <img src="/logo-cosmetic2.jpg" alt="Custom Image" className="w-full h-full object-cover" />
                <p>Map will appear here after syncing location</p>
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
          <form onSubmit={saveAddress} className="space-y-4">
            {fields.map(({ label, field, type, maxLength }) => (
              <div key={field}>
                <label className="block text-gray-700 font-medium mb-1">{label}</label>
                <input
                  type={type}
                  name={field}
                  value={address[field]}
                  maxLength={maxLength}
                  onChange={handleChange}
                  placeholder={label}
                  className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-pink-400"
                />
              </div>
            ))}

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
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save Address"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
