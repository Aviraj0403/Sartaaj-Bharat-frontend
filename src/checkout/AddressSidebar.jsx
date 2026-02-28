import React, { useState, useEffect } from "react";
import axios from "../utils/Axios"; // Your Axios instance
import { addAddress, updateAddress } from "../services/userApi";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { toast } from 'react-toastify'; // Assuming you use react-toastify for notifications
import { useAuth } from "../context/AuthContext";

export default function AddressSidebar({ isOpen, onClose, refreshAddresses, userName, email, address: propAddress, embedded = false }) {

  const { user } = useAuth();
  const [address, setAddress] = useState({
    // name: user?.userName || "",  // Prefill with userName from context
    name: "",
    email: user?.email || "",
    phone: "",
    street: "",
    flat: "",
    landmark: "",
    city: "",
    state: "",
    country: "India",
    pincode: "",
    addressType: "Home",
  });

  const [formMode, setFormMode] = useState("add"); // 'add' or 'edit'


  useEffect(() => {
    if (user) {
      setAddress((prev) => ({
        ...prev,
        // name: user.userName || "",
        email: user.email || "",
      }));
    }
  }, [user]);

  // If parent passes an address (for edit), populate form
  useEffect(() => {
    if (propAddress) {
      setFormMode("edit");
      // map incoming address fields to our local state shape
      setAddress((prev) => ({
        ...prev,
        name: propAddress.name || propAddress.fullName || prev.name,
        email: propAddress.email || prev.email,
        phone: propAddress.phone || propAddress.phoneNumber || prev.phone,
        street: propAddress.street || propAddress.flat || prev.street,
        flat: propAddress.flat || "",
        landmark: propAddress.landmark || "",
        city: propAddress.city || prev.city,
        state: propAddress.state || prev.state,
        country: propAddress.country || prev.country || "India",
        pincode: propAddress.pincode || propAddress.postalCode || prev.pincode,
        addressType: propAddress.addressType || propAddress.type || prev.addressType,
      }));
      if (propAddress.location && propAddress.location.coordinates) {
        const [lng, lat] = propAddress.location.coordinates;
        setLocation({ lat, lng });
      }
    } else {
      setFormMode("add");
    }
  }, [propAddress]);

  const [location, setLocation] = useState({ lat: null, lng: null });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

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
              country: components.country || "India",
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
    // Clear error for this field as user types
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Function to save the address
  const saveAddress = async (e) => {
    e.preventDefault();
    // Client-side validation
    const newErrors = {};
    // required fields: phone, pincode, street, city
    if (!address.name) newErrors.name = "Name is required";
    if (!address.name) newErrors.name = "Name is required";

    if (!address.phone) newErrors.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(address.phone)) newErrors.phone = "Enter a valid 10-digit phone number";

    if (!address.pincode) newErrors.pincode = "Pincode is required";
    else if (!/^\d{6}$/.test(address.pincode)) newErrors.pincode = "Enter a valid 6-digit pincode";

    if (!address.street) newErrors.street = "Street address is required";
    if (!address.city) newErrors.city = "Area is required";
    if (!address.state) newErrors.state = "State is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // focus first error field
      const firstField = Object.keys(newErrors)[0];
      const el = document.getElementsByName(firstField)[0];
      if (el) el.focus();
      return;
    }

    setIsLoading(true);

    const addressPayload = {
      ...address,
      location: { type: "Point", coordinates: [location.lng || 0, location.lat || 0] },
    };

    try {
      if (formMode === "edit" && propAddress) {
        const id = propAddress._id || propAddress.id;
        await updateAddress(id, addressPayload);
        toast.success("✅ Address updated!");
      } else {
        await addAddress(addressPayload);
        toast.success("✅ Address saved!");
      }
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
    { label: "Name", field: "name", type: "text" },
    { label: "Email", field: "email", type: "email" },
    { label: "Phone Number *", field: "phone", type: "tel", maxLength: 10, required: true },
    { label: "Area *", field: "city", type: "text", required: true },
    { label: "Address *", field: "street", type: "text", required: true },
    // { label: "Flat / House No.", field: "flat", type: "text" },
    // { label: "Landmark (optional)", field: "landmark", type: "text" },
    { label: "Pincode *", field: "pincode", type: "text", maxLength: 6, required: true },
    // { label: "City *", field: "city", type: "text", required: true },
    { label: "State", field: "state", type: "text" },
    // { label: "Country", field: "country", type: "text" },

  ];

  const panel = (
    <div className="w-full sm:w-[420px] bg-white h-full shadow-2xl p-0 overflow-y-auto relative">
      {/* Header Section */}
      <div className="sticky top-0 z-[10000] bg-white/80 backdrop-blur-md px-8 py-6 flex justify-between items-center border-b border-slate-100 shadow-sm">
        <div>
          <h2 className="text-xl font-black text-slate-900 italic uppercase tracking-tighter">Coordinate Input</h2>
          <p className="text-slate-400 text-[8px] font-black uppercase tracking-[0.4em] mt-1">Satellite Navigation Sync</p>
        </div>
        <button onClick={onClose} className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-slate-900 hover:text-white transition-all transform hover:rotate-90">
          <span className="text-lg font-bold">✕</span>
        </button>
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Leaflet Map or Custom Image */}
        <div className="w-full h-56 rounded-[2rem] overflow-hidden mb-6 border border-slate-100 bg-slate-50 shadow-inner group relative">
          {location.lat ? (
            <MapContainer center={[location.lat, location.lng]} zoom={16} style={{ width: "100%", height: "100%" }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={[location.lat, location.lng]}>
                <Popup>{address.street}</Popup>
              </Marker>
            </MapContainer>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-slate-300 gap-4">
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-sm">
                <span className="text-blue-600 font-black italic">GPS</span>
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest italic">Satellite Offline</p>
            </div>
          )}
        </div>

        {/* Sync Button */}
        <button
          onClick={handleSyncLocation}
          className="w-full bg-slate-950 text-white font-black text-[10px] uppercase tracking-[0.3em] py-4 rounded-2xl mb-8 hover:bg-blue-600 transition-all shadow-xl shadow-blue-500/10 active:scale-95 italic flex items-center justify-center gap-3"
        >
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping"></span>
          Sync Satellite Coordinates
        </button>

        {/* Address Form */}
        <form onSubmit={saveAddress} className="space-y-4">
          {fields.map(({ label, field, type, maxLength }) => (
            <div key={field} className="relative group/field">
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] mb-2 block ml-1">
                {label}
              </label>
              <input
                type={type}
                name={field}
                value={address[field]}
                maxLength={maxLength}
                onChange={handleChange}
                placeholder={label}
                className={`w-full bg-slate-50 border-2 rounded-2xl px-5 py-4 outline-none text-slate-800 font-bold transition-all duration-300 ${errors[field] ? 'border-red-500/30 focus:border-red-500 focus:bg-red-50' : 'border-slate-50 focus:border-blue-600 focus:bg-white focus:shadow-2xl focus:shadow-blue-500/10'}`}
              />
              {errors[field] && (
                <p className="text-red-500 text-[9px] font-black uppercase tracking-widest mt-2 ml-1">{errors[field]}</p>
              )}
            </div>
          ))}

          {/* Address Type */}
          <div className="pt-4">
            <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4 block ml-1">Archive Classification</label>
            <div className="flex gap-4">
              {["Home", "Work", "Other"].map((type) => (
                <label key={type} className={`flex-1 flex items-center justify-center py-4 rounded-2xl border-2 transition-all cursor-pointer font-black text-[10px] uppercase tracking-widest italic ${address.addressType === type ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/20' : 'bg-slate-50 border-slate-50 text-slate-400 hover:border-slate-200'}`}>
                  <input
                    type="radio"
                    name="addressType"
                    className="hidden"
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
            className="w-full bg-blue-600 text-white py-6 rounded-[2rem] font-black text-xs md:text-sm uppercase tracking-[0.4em] hover:bg-slate-950 transition-all shadow-2xl shadow-blue-500/20 active:scale-95 italic mt-8"
            disabled={isLoading}
          >
            {isLoading ? "AUTHORIZING..." : "CONFIRM LOCATION"}
          </button>
        </form>
      </div>
    </div>
  );

  if (embedded) {
    return panel;
  }

  return (
    <div className="fixed inset-0 flex justify-end z-[9999]">
      {panel}
    </div>
  );
}
