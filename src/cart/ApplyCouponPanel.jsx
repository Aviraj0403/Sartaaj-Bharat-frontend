import React, { useState, useEffect } from "react";
import { X, Check, AlertCircle } from "lucide-react";
import { getActiveOffers, applyDiscount } from "../services/offerApi";

export default function ApplyCouponPanel({ isOpen, onClose, onApply, appliedCoupon, totalAmount }) {
  const [coupon, setCoupon] = useState(""); // Coupon code input
  const [error, setError] = useState(null); // Error handling
  const [offers, setOffers] = useState([]); // List of active offers
  const [loading, setLoading] = useState(true); // Loading state for fetching offers

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const activeOffers = await getActiveOffers(); // Fetch active offers
        setOffers(activeOffers);
      } catch (error) {
        console.error("Failed to fetch offers", error);
        setError("Failed to load offers.");
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchOffers();
      setError(null); // Clear any previous errors when panel opens
    }
  }, [isOpen]);

  const handleApply = async (code, offerName = "") => {
    if (code.trim() !== "") {
      setLoading(true);  // Show loading state

      try {
        const discountResult = await applyDiscount(totalAmount, code);
        // console.log("Discount Result:", discountResult); // Debugging the result
        if (discountResult) {
          onApply(discountResult, code, offerName || code);
        } else {
          setError("Invalid coupon code or error applying discount.");
        }
      } catch (error) {
        console.error("Error applying discount:", error);
        setError("An error occurred while applying the coupon.");
      } finally {
        setLoading(false);  // Hide loading state after the request
      }
    } else {
      setError("Please enter a coupon code.");
    }
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-xl z-[200] transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"
        }`}
    >
      {/* Header */}
      <div className="flex justify-between items-center p-8 border-b border-slate-50 bg-white/80 backdrop-blur-md sticky top-0 z-10">
        <div>
          <h2 className="text-2xl font-black text-slate-900 italic uppercase tracking-tighter">Protocol Activation</h2>
          <p className="text-slate-400 text-[8px] font-black uppercase tracking-[0.4em] mt-1">Discount Authorization Required</p>
        </div>
        <button
          onClick={onClose}
          className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-slate-950 hover:text-white transition-all transform hover:rotate-90"
        >
          <X size={20} strokeWidth={3} />
        </button>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col gap-4">
        {appliedCoupon ? (
          <div className="flex flex-col items-center gap-6 p-8 bg-blue-50/50 rounded-[3rem] border border-blue-500/20 border-dashed">
            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center shadow-xl shadow-blue-500/20">
              <Check className="text-white" size={32} strokeWidth={4} />
            </div>
            <div className="text-center">
              <p className="text-slate-900 font-black italic uppercase tracking-tighter text-lg leading-none">
                Protocol <span className="text-blue-600">"{appliedCoupon}"</span>
              </p>
              <p className="text-slate-400 font-bold text-[9px] uppercase tracking-[0.3em] mt-2">Active Authorization Granted</p>
            </div>
            <button
              onClick={onClose}
              className="w-full py-5 bg-slate-950 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.4em] italic hover:bg-blue-600 transition-all active:scale-95"
            >
              Back to Checkout
            </button>
          </div>
        ) : (
          <>
            {error && (
              <div className="flex items-center gap-2 text-red-600 bg-red-100 p-4 rounded-lg">
                <AlertCircle size={20} />
                <span>{error}</span>
              </div>
            )}

            <p className="text-slate-400 font-bold text-[9px] uppercase tracking-[0.2em] italic mb-6 leading-relaxed">
              INPUT AUTHORIZED OVERRIDE CODE OR SELECT FROM ACTIVE ENTERPRISE NODES:
            </p>

            {/* Custom Coupon Input */}
            <div className="flex gap-3">
              <input
                type="text"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                placeholder="ENTER OVERRIDE CODE"
                className="flex-1 bg-slate-50 border-2 border-slate-50 rounded-[1.5rem] p-5 outline-none text-slate-800 font-black text-[11px] uppercase tracking-[0.2em] italic focus:border-blue-600 focus:bg-white transition-all shadow-inner focus:shadow-2xl focus:shadow-blue-500/10"
              />
              <button
                onClick={() => handleApply(coupon)}
                className="bg-blue-600 hover:bg-slate-950 text-white font-black text-[10px] px-8 rounded-[1.5rem] transition-all italic tracking-[0.2em] shadow-xl shadow-blue-500/20 active:scale-90"
              >
                DEPLOY
              </button>
            </div>

            {/* Loading State */}
            {loading && <p className="text-gray-500 mt-4">Loading offers...</p>}

            {/* Active Offers Section */}
            <div className="mt-4 flex flex-col gap-3">
              {!loading && offers.length === 0 ? (
                <p className="text-slate-400 font-bold text-[9px] uppercase tracking-widest text-center py-10">No active neural nodes available.</p>
              ) : (
                offers.map((offer) => (
                  <div
                    key={offer._id}
                    className="relative bg-slate-50 border border-slate-100 rounded-[2rem] p-8 flex justify-between items-center group cursor-pointer hover:bg-white hover:border-blue-600 hover:shadow-2xl transition-all duration-500"
                    onClick={() => handleApply(offer.code, offer.name)}
                  >
                    <div className="flex flex-col">
                      <span className="font-black text-blue-600 italic text-lg tracking-tighter uppercase leading-none">
                        {offer.code}
                      </span>
                      <span className="text-slate-400 font-bold text-[8px] uppercase tracking-[0.3em] mt-3">
                        {offer.name} // {offer.discountPercentage}% YIELD
                      </span>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-500">
                      <Check size={18} strokeWidth={3} />
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
