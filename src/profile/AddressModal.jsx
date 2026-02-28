import React, { useState, useEffect } from "react";
import AddressSidebar from "../checkout/AddressSidebar";

export default function AddressModal({ isOpen, onClose, address, onSuccess }) {
  const [formMode, setFormMode] = useState("add");
  const [currentAddress, setCurrentAddress] = useState(null);

  useEffect(() => {
    if (address) {
      setFormMode("edit");
      setCurrentAddress(address);
    } else {
      setFormMode("add");
      setCurrentAddress(null);
    }
  }, [address]);

  const handleSidebarSuccess = () => {
    onSuccess();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="
      fixed inset-0
      z-[10000]
      flex items-center justify-center
      bg-slate-950/40 backdrop-blur-md
      p-4 sm:p-8
    "
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
        bg-white w-full max-w-3xl
        rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.2)]
        max-h-[90vh]
        flex flex-col
        overflow-hidden
        border border-white/20
      "
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-50 px-10 py-8 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-black text-slate-900 italic uppercase tracking-tighter">
              {formMode === "edit" ? "Coordinate Update" : "Establish New Node"}
            </h2>
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] mt-1">Authorized Location Protocol</p>
          </div>
          <button
            onClick={onClose}
            className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-slate-900 hover:text-white transition-all duration-300 transform hover:rotate-90"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-0">
          <div className="px-10 py-6">
            <AddressSidebar
              isOpen={true}
              onClose={onClose}
              address={currentAddress}
              refreshAddresses={handleSidebarSuccess}
              embedded={true}
            />
          </div>
        </div>
      </div>
    </div>
  );

}
