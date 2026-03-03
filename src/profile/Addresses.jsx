import React, { useState, useEffect } from "react";
import { MapPin, Plus, Edit2, Trash2, CheckCircle } from "lucide-react";
import { toast } from "react-toastify";
import axios from "../utils/Axios"; // Your axios instance

import { getAddress, addAddress, updateAddress, deleteAddress, setDefaultAddress } from "../services/userApi"; // Your API helpers

import AddressModal from "./AddressModal"; // We'll create this next

export default function Addresses() {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  // Fetch addresses on mount
  const fetchAddresses = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/users/getaddresses", { withCredentials: true });
      setAddresses(data.data || []); // Ensure correct response structure
    } catch (err) {
      toast.error("Failed to load addresses");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleAdd = () => {
    setEditingAddress(null); // Reset the editing address for adding a new one
    setIsModalOpen(true); // Open modal for adding a new address
  };

  const handleEdit = (addr) => {
    setEditingAddress(addr); // Set the address to be edited
    setIsModalOpen(true); // Open modal for editing the address
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this address?")) return;

    try {
      await deleteAddress(id);
      toast.success("Address deleted");
      fetchAddresses(); // Re-fetch the addresses after deletion
    } catch (err) {
      toast.error("Failed to delete address");
    }
  };

  const handleSetDefault = async (id) => {
    try {
      await setDefaultAddress(id);
      toast.success("Default address updated!");
      fetchAddresses(); // Re-fetch the addresses after setting a new default
    } catch (err) {
      toast.error("Failed to set default address");
    }
  };

  const handleSaveSuccess = () => {
    setIsModalOpen(false); // Close modal on successful save
    fetchAddresses(); // Re-fetch the addresses to reflect changes
  };

  // Loading skeleton
  if (loading) {
    return (
      <div className="animate-pulse">
        <h1 className="text-3xl font-black text-slate-900 mb-6 italic tracking-tighter uppercase">My Addresses</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2].map((i) => (
            <div key={i} className="p-6 border rounded-xl bg-gray-50">
              <div className="h-6 bg-gray-200 rounded w-24 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 bg-slate-50/30 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-6">
        <div>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 italic tracking-tighter uppercase">Vault Addresses</h1>
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] mt-2">Manage your secure dispatch locations</p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-3 bg-blue-600 hover:bg-black text-white px-8 py-4 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] transition-all shadow-xl shadow-blue-500/20 group active:scale-95 italic text-center w-full sm:w-auto justify-center"
        >
          <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
          Establish New Node
        </button>
      </div>

      {/* Addresses Grid */}
      {addresses.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-xl">
          <MapPin size={64} className="mx-auto text-gray-300 mb-4" />
          <p className="text-slate-400 font-bold italic">No secure address nodes established in current branch.</p>
          <button
            onClick={handleAdd}
            className="mt-6 text-blue-600 font-black text-xs uppercase tracking-[0.2em] hover:text-black transition-colors"
          >
            + Initialize First Node
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {addresses.map((addr) => (
            <div
              key={addr._id || addr.id}
              className={`relative p-8 border-2 rounded-[2rem] shadow-sm hover:shadow-2xl transition-all duration-500 group ${addr.isDefault
                  ? "border-blue-600 bg-white"
                  : "border-slate-100 bg-white"
                }`}
            >
              {/* Default Badge */}
              {addr.isDefault && (
                <div className="absolute -top-4 left-8 bg-blue-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 shadow-xl shadow-blue-500/30 italic">
                  <CheckCircle size={14} strokeWidth={3} />
                  Primary Node
                </div>
              )}

              <div className="flex items-start justify-between">
                <div className="flex items-start gap-6">
                  <div className={`p-4 rounded-2xl ${addr.isDefault ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'bg-slate-50 text-blue-600'}`}>
                    <MapPin size={28} strokeWidth={2.5} />
                  </div>
                  <div>
                    <h2 className="font-black text-xl text-slate-900 italic tracking-tighter uppercase flex items-center gap-3">
                      {addr.addressType || addr.name}
                    </h2>
                    <p className="text-gray-600 mt-1 leading-relaxed">
                      {addr.flat && `${addr.flat}, `}
                      {addr.street || addr.flat},<br />
                      {addr.landmark && `${addr.landmark}, `}
                      {addr.city}, {addr.state} - {addr.pincode || addr.postalCode}
                      <br />
                      {addr.country}
                    </p>
                    {(addr.phone || addr.phoneNumber) && (
                      <p className="text-gray-500 text-sm mt-2">📞 {addr.phone || addr.phoneNumber}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-5">
                <button
                  onClick={() => handleEdit(addr)}
                  className="flex items-center gap-1 text-pink-600 hover:bg-pink-50 px-4 py-2 rounded-lg border border-pink-200 transition"
                >
                  <Edit2 size={16} />
                  Edit
                </button>

                {!addr.isDefault && (
                  <button
                    onClick={() => handleSetDefault(addr._id || addr.id)}
                    className="text-green-600 hover:bg-green-50 px-4 py-2 rounded-lg border border-green-200 transition text-sm"
                  >
                    Set Default
                  </button>
                )}

                <button
                  onClick={() => handleDelete(addr._id || addr.id)}
                  className="flex items-center gap-1 text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg border border-red-200 transition"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal for Add/Edit */}
      <AddressModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        address={editingAddress}
        onSuccess={handleSaveSuccess}
      />
    </div>
  );
}
