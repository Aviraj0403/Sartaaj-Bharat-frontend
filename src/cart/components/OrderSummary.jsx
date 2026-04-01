import React from "react";
import { X, ChevronRight, ArrowRight } from "lucide-react";
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
    <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/40 border border-slate-100 p-8 sm:p-10 sticky top-24">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-1.5 h-6 bg-blue-600 rounded-full"></div>
        <h2 className="text-2xl font-black text-slate-900 tracking-tighter">SUMMARY</h2>
      </div>

      <div className="space-y-5 text-[11px] font-black uppercase tracking-widest mb-10">
        <div className="flex justify-between text-slate-400">
          <span>Subtotal</span>
          <span className="text-slate-900">
            ₹{totalAmount.toLocaleString()}
          </span>
        </div>
 
        {coupon.applied && (
          <div className="flex justify-between text-green-600 bg-green-50/50 px-3 py-2 rounded-xl border border-green-100">
            <span>Discount ({coupon.code})</span>
            <span>
              -₹{calculateDiscount().toLocaleString()}
            </span>
          </div>
        )}
 
        <div className="flex justify-between text-slate-400 pb-5 border-b border-slate-50">
          <span>Shipping</span>
          {shippingCharges === 0 ? (
            <span className="text-green-600 italic">Complimentary</span>
          ) : (
            <span className="text-slate-900 font-black">
              ₹{shippingCharges.toLocaleString()}
            </span>
          )}
        </div>
 
        <div className="flex justify-between items-end pt-4">
          <span className="text-sm font-black text-slate-900">Est. Total</span>
          <div className="text-right">
            <span className="text-3xl font-black text-blue-600 tracking-tighter">
              ₹{finalAmount.toLocaleString()}
            </span>
            <span className="block text-[8px] text-slate-400 mt-1 uppercase tracking-loose font-bold">
              Secure Checkout • Incl. Taxes
            </span>
          </div>
        </div>
      </div>

      {/* Coupon Code Input */}
      <div className="mb-10">
        {!coupon.applied ? (
          <button
            onClick={() => setCouponOpen(true)}
            className="w-full flex justify-between items-center py-4 px-5 bg-slate-50 hover:bg-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-500 transition-all duration-300 border border-slate-100 group"
          >
            <span>Have a privilege code?</span>
            <ChevronRight size={14} className="text-slate-300 group-hover:translate-x-1 transition-transform" />
          </button>
        ) : (
          <div className="flex justify-between items-center py-4 px-5 bg-green-50 rounded-2xl border border-green-100 shadow-sm shadow-green-500/5">
            <div>
              <span className="text-[8px] text-green-600 font-black uppercase tracking-[0.2em] mb-1 block">
                Privilege Applied
              </span>
              <div className="font-black text-green-800 text-sm italic">{coupon.code}</div>
            </div>
            <button
              onClick={handleCouponRemove}
              className="p-2.5 bg-white hover:bg-red-50 hover:text-red-600 rounded-xl text-green-600 transition-all duration-300 shadow-sm active:scale-90"
            >
              <X size={14} strokeWidth={3} />
            </button>
          </div>
        )}
      </div>

      <motion.button
        whileHover={{ scale: 1.02, y: -2 }}
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
        className="w-full bg-slate-950 text-white py-5 rounded-[1.5rem] font-black text-[11px] uppercase tracking-[0.2em] hover:bg-blue-600 transition-all duration-500 shadow-2xl shadow-blue-600/10 flex items-center justify-center gap-3 italic mb-2"
      >
        Initiate Checkout <ArrowRight size={16} strokeWidth={3} />
      </motion.button>
    </div>
  );
}
