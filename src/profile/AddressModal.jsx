import React, { useState, useEffect } from "react";
import AddressSidebar from "../checkout/AddressSidebar"; // Import AddressSidebar
import { toast } from "react-toastify";

export default function AddressModal({ isOpen, onClose, address, onSuccess }) {
  const [formMode, setFormMode] = useState("add"); // 'add' or 'edit'
  const [currentAddress, setCurrentAddress] = useState(null);

  useEffect(() => {
    if (address) {
      // If we have an address, set the mode to 'edit' and use that address
      setFormMode("edit");
      setCurrentAddress(address);
    } else {
      // Otherwise, we are in add mode
      setFormMode("add");
      setCurrentAddress(null);
    }
  }, [address]);

  const handleSidebarSuccess = () => {
    onSuccess(); // Callback to refresh addresses after adding/updating
    onClose(); // Close the modal after success
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-lg shadow-md w-full max-w-2xl overflow-hidden mx-4"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between px-5 py-3 border-b bg-white">
          <h2 className="text-lg font-semibold text-gray-800">
            {formMode === "edit" ? "Edit Address" : "Add New Address"}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close address modal"
            className="text-gray-500 hover:text-gray-700 px-2 py-1"
          >
            ✕
          </button>
        </div>

        <div className="p-0">
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
  );
}
