import React, { useState, useEffect } from "react";
import { MapPin, Plus, Edit2, Trash2, CheckCircle } from "lucide-react";
import { toast } from "react-toastify";
import axios from "../utils/Axios"; // Your axios instance

import {
  getAddress,
  addAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
} from "../services/userApi"; // Your API helpers

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
      const { data } = await axios.get("/users/getaddresses", {
        withCredentials: true,
      });
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
    if (!window.confirm("Are you sure you want to delete this address?"))
      return;

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
        <h1 className="text-3xl font-black text-slate-900 mb-6 italic tracking-tighter uppercase">
          My Addresses
        </h1>
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
    <div className="max-w-6xl mx-auto p-4 md:p-8 bg-white min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 px-2">
        <div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-2 italic tracking-tighter uppercase leading-none">
            Secure <span className="text-blue-600">Nodes</span>
          </h1>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.4em] italic leading-relaxed">
            Authorized dispatch and extraction points
          </p>
        </div>
        <button
          onClick={handleAdd}
          className="bg-slate-900 hover:bg-blue-600 text-white px-10 py-5 rounded-[2rem] text-[10px] font-black uppercase tracking-[0.3em] transition-all shadow-2xl hover:shadow-blue-600/20 active:scale-95 italic flex items-center justify-center gap-4 group border border-white/5"
        >
          <Plus
            size={18}
            className="group-hover:rotate-90 transition-transform duration-500"
            strokeWidth={3}
          />
          Establish New Node
        </button>
      </div>

      {/* Addresses Grid */}
      {addresses.length === 0 ? (
        <div className="text-center py-24 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-100">
          <MapPin size={48} className="mx-auto text-slate-200 mb-6" strokeWidth={1} />
          <h3 className="text-xl font-black text-slate-400 uppercase tracking-widest italic mb-2">
            No Active Nodes
          </h3>
          <p className="text-slate-400 text-xs font-medium italic">
            Your dispatch matrix is currently empty.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {addresses.map((addr) => (
            <div
              key={addr._id || addr.id}
              className={`relative p-8 md:p-10 border-2 rounded-[3rem] transition-all duration-700 group hover:shadow-2xl hover:shadow-blue-600/5 ${
                addr.isDefault
                  ? "border-blue-600 bg-white"
                  : "border-slate-50 bg-white hover:border-blue-600/30"
              }`}
            >
              {/* Default Badge */}
              {addr.isDefault && (
                <div className="absolute -top-4 left-10 bg-blue-600 text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 shadow-xl shadow-blue-500/30 italic">
                  <CheckCircle size={14} strokeWidth={3} />
                  Primary Dispatch
                </div>
              )}

              <div className="flex flex-col h-full justify-between">
                <div className="flex gap-6 md:gap-8">
                  <div
                    className={`w-16 h-16 rounded-3xl flex items-center justify-center flex-shrink-0 transition-transform duration-500 group-hover:rotate-6 ${
                      addr.isDefault ? "bg-blue-600 text-white shadow-xl shadow-blue-500/20" : "bg-slate-50 text-slate-400 group-hover:text-blue-600"
                    }`}
                  >
                    <MapPin size={28} strokeWidth={2.5} />
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h2 className="font-black text-xl md:text-2xl text-slate-900 italic tracking-tighter uppercase leading-tight">
                        {addr.addressType || addr.name}
                      </h2>
                      <div className="h-1 w-8 bg-blue-600 mt-1 opacity-50"></div>
                    </div>
                    
                    <p className="text-slate-500 text-sm font-medium italic leading-relaxed">
                      {addr.flat && `${addr.flat}, `}
                      {addr.street || addr.flat},<br />
                      {addr.landmark && `${addr.landmark}, `}
                      <span className="text-slate-900 font-bold">{addr.city}, {addr.state}</span>
                      <br />
                      <span className="text-blue-600 font-black tracking-widest">{addr.pincode || addr.postalCode}</span>
                    </p>

                    {(addr.phone || addr.phoneNumber) && (
                      <div className="flex items-center gap-2 text-slate-400">
                         <div className="w-6 h-6 rounded-lg bg-slate-50 flex items-center justify-center">
                            <Zap size={10} className="text-blue-500" />
                         </div>
                         <span className="text-[10px] font-black uppercase tracking-widest leading-none">
                           {addr.phone || addr.phoneNumber}
                         </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 mt-10 pt-8 border-t border-slate-50">
                  <button
                    onClick={() => handleEdit(addr)}
                    className="flex-1 flex items-center justify-center gap-2 bg-slate-50 hover:bg-blue-600 hover:text-white text-slate-600 py-3 rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all italic border border-slate-100"
                  >
                    <Edit2 size={14} strokeWidth={2.5} />
                    Modify
                  </button>

                  {!addr.isDefault && (
                    <button
                      onClick={() => handleSetDefault(addr._id || addr.id)}
                      className="flex-1 flex items-center justify-center bg-blue-600/5 hover:bg-blue-600 text-blue-600 hover:text-white py-3 rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all italic border border-blue-100"
                    >
                      Establish Primary
                    </button>
                  )}

                  <button
                    onClick={() => handleDelete(addr._id || addr.id)}
                    className="w-12 h-12 flex items-center justify-center text-slate-300 hover:text-white hover:bg-rose-500 rounded-2xl transition-all border border-slate-100 hover:border-rose-600"
                  >
                    <Trash2 size={18} strokeWidth={2.5} />
                  </button>
                </div>
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
