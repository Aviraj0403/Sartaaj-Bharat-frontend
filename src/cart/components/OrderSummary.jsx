import React from "react";
import { X, ChevronRight, ArrowRight, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function OrderSummary({
  totalItems,
  totalAmount,
  coupon,
  calculateDiscount,
  shippingCharges,
  finalAmount,
  handleCouponRemove,
  setCouponOpen,
  user,
  navigate,
  cartItems,
}) {
  return (
    <div className="bg-white rounded-[2.5rem] shadow-[0_8px_40px_rgba(0,0,0,0.04)] border border-gray-100 p-6 sm:p-8 sticky top-24 relative overflow-hidden">
      <div className="flex items-center gap-3 mb-8 relative z-10">
        <div className="w-1 h-6 bg-blue-600 rounded-full"></div>
        <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Order Summary</h2>
      </div>

      <div className="space-y-4 mb-8 relative z-10">
        <div className="flex justify-between text-sm font-medium text-slate-500">
          <span>Subtotal</span>
          <span className="text-slate-900 tabular-nums font-bold">
            ₹{totalAmount.toLocaleString()}
          </span>
        </div>
 
        {coupon.applied && (
          <div className="flex justify-between items-center text-xs font-semibold text-green-600 bg-green-50 px-4 py-3 rounded-2xl border border-green-100 transition-all animate-in fade-in slide-in-from-top-2">
            <span>Coupon ({coupon.code})</span>
            <span className="tabular-nums">
              -₹{calculateDiscount().toLocaleString()}
            </span>
          </div>
        )}
 
        <div className="flex justify-between text-sm font-medium text-slate-500 pb-4 border-b border-gray-50">
          <span>Shipping</span>
          {shippingCharges === 0 ? (
            <span className="text-blue-600 font-bold">FREE</span>
          ) : (
            <span className="text-slate-900 tabular-nums font-bold">
              ₹{shippingCharges.toLocaleString()}
            </span>
          )}
        </div>
 
        <div className="flex justify-between items-end pt-2">
          <span className="text-base font-bold text-slate-900">Total</span>
          <div className="text-right">
            <span className="text-3xl font-extrabold text-blue-600 tracking-tight tabular-nums">
              ₹{finalAmount.toLocaleString()}
            </span>
            <span className="block text-[10px] text-slate-400 mt-1 font-medium italic">
              All taxes included
            </span>
          </div>
        </div>
      </div>

      {/* Promo Code Action */}
      <div className="mb-8 relative z-10">
        {!coupon.applied ? (
          <button
            onClick={() => setCouponOpen(true)}
            className="w-full h-14 flex justify-between items-center px-6 bg-gray-50 hover:bg-gray-100 rounded-2xl text-[11px] font-bold uppercase tracking-wider text-slate-600 transition-all duration-300 border border-gray-100 group"
          >
            <span>Have a promo code?</span>
            <ChevronRight size={16} className="text-slate-400 group-hover:translate-x-1 transition-all" />
          </button>
        ) : (
          <div className="flex justify-between items-center h-16 px-6 bg-slate-900 rounded-2xl border border-slate-800 shadow-lg transition-all animate-in zoom-in-95">
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5 block">
                Applied
              </span>
              <div className="font-bold text-white text-sm tracking-wide">{coupon.code}</div>
            </div>
            <button
              onClick={handleCouponRemove}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-all active:scale-90"
            >
              <X size={14} strokeWidth={2.5} />
            </button>
          </div>
        )}
      </div>

      <motion.button
        whileHover={{ scale: 1.01, y: -2 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => {
          if (!user) {
            navigate("/signin", { state: { from: "/cart" } });
          } else {
            navigate("/checkout", {
              state: {
                cartItems,
                totalAmount,
                totalQuantity: totalItems,
                grandTotal: finalAmount.toFixed(2),
                shippingCharges,
                appliedCoupon: coupon.applied ? coupon : null,
                finalAmount: totalAmount - calculateDiscount(),
              },
            });
          }
        }}
        className="w-full bg-blue-600 text-white h-16 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-blue-700 transition-all duration-300 shadow-[0_10px_25px_rgba(37,99,235,0.2)] flex items-center justify-center gap-3 mb-4"
      >
        Checkout Now <ArrowRight size={18} />
      </motion.button>

      <div className="flex items-center justify-center gap-2 opacity-50">
        <ShieldCheck size={14} className="text-slate-400" />
        <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Secure Checkout</span>
      </div>
    </div>
  );
}
