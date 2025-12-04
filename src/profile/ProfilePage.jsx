import React, { useState } from "react";
import { useAuth } from "../context/AuthContext"; // Import useAuth hook
import {
  ShoppingBag,
  Smile,
  Star,
  User,
  MapPin,
  Trash2,
  Menu,
  X,
} from "lucide-react";
import Orders from "./Orders";
import Support from "./Support";
import Reviews from "./Reviews";
import BeautyProfile from "./BeautyProfile";
import Addresses from "./Addresses";
import DeleteAccount from "./DeleteAccount";
import SignInPage from "../pages/auth/SignInPage"; // Import SignInPage component

export default function ProfilePage() {
  const { user, logout, loading } = useAuth(); // Get user and logout function from AuthContext
  const [activeKey, setActiveKey] = useState("orders");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const profileOptions = [
    { key: "orders", title: "My Orders", icon: <ShoppingBag size={24} />, component: <Orders /> },
    { key: "support", title: "Customer Support", icon: <Smile size={24} />, component: <Support /> },
    { key: "reviews", title: "My Reviews", icon: <Star size={24} />, component: <Reviews /> },
    { key: "beauty", title: "My Beauty Profile", icon: <User size={24} />, component: <BeautyProfile /> },
    { key: "addresses", title: "My Addresses", icon: <MapPin size={24} />, component: <Addresses /> },
    { key: "delete", title: "Delete Account", icon: <Trash2 size={24} />, component: <DeleteAccount /> },
  ];

  const activeOption = profileOptions.find((opt) => opt.key === activeKey);

  // Loading state or user not logged in
  if (loading) return <div>Loading...</div>;
 if (!user) {
  return <SignInPage />;
}


  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white relative">
      {/* Top Menu Toggle for Mobile */}
      <div className="md:hidden w-full p-4 bg-pink-50 border-b border-pink-100 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-pink-100 p-2">
            <User size={28} className="text-pink-500" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-pink-600">{user.name || user.username}</h2>
            <p className="text-gray-600 text-sm">{user.email}</p>
          </div>
        </div>
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-pink-50 border-r border-pink-100 p-6 space-y-4 z-[120] transform transition-transform duration-300 md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:block overflow-y-auto`}
      >
        {/* Profile Info */}
        <div className="flex flex-col items-center mb-6 md:hidden">
          <div className="rounded-full bg-pink-100 p-4 mb-3">
            <User size={40} className="text-pink-500" />
          </div>
          <h2 className="text-xl font-bold text-pink-600">{user.name || user?.userName}</h2>
          <p className="text-gray-600 text-sm">{ user.email}</p>
        </div>

        {/* Menu Items */}
        <div className="flex flex-col space-y-2">
          {profileOptions.map((option) => (
            <div
              key={option.key}
              onClick={() => {
                setActiveKey(option.key);
                setSidebarOpen(false); // Close sidebar on mobile after selection
              }}
              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                activeKey === option.key ? "bg-pink-200 font-semibold" : "hover:bg-pink-100"
              }`}
            >
              <div className="text-pink-500">{option.icon}</div>
              <h3 className="text-gray-800">{option.title}</h3>
            </div>
          ))}
        </div>

        {/* Logout Button */}
        <div className="mt-auto">
          <button
            onClick={logout} // Logout function from AuthContext
            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 rounded-xl transition-all duration-300"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Overlay for Mobile Sidebar (behind sidebar) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          style={{ backgroundColor: "rgba(0,0,0,0.2)" }} // lighter overlay
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8 mt-0 md:mt-0 z-10 relative">
        {activeOption.component}
      </div>
    </div>
  );
}
