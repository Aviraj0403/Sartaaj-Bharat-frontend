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
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-pink-600 mb-6 text-center">
          {formMode === "edit" ? "Edit Address" : "Add New Address"}
        </h2>

        {/* Pass the appropriate props to AddressSidebar based on whether it's add or edit */}
        <AddressSidebar
          isOpen={isOpen}
          onClose={onClose}
          address={currentAddress}
          refreshAddresses={handleSidebarSuccess}
          embedded={true}
        />

        {/* Close Button */}
        <div className="mt-4 text-center">
          <button
            onClick={onClose}
            className="bg-gray-200 text-gray-600 py-2 px-4 rounded-lg hover:bg-gray-300 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
