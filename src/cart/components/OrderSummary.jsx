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
    <div className="bg-white/60 backdrop-blur-xl rounded-[2rem] shadow-2xl shadow-slate-200/50 border border-white/40 p-5 sm:p-10 sticky top-24 relative overflow-hidden">
      {/* Subtle background element */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 blur-[60px] rounded-full -mr-16 -mt-16"></div>

      <div className="flex items-center gap-3 mb-6 sm:mb-10 relative z-10">
        <div className="w-1.5 h-6 bg-blue-600 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.4)]"></div>
        <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tighter italic uppercase">ORDER SUMMARY</h2>
      </div>

      <div className="space-y-6 text-[10px] font-black uppercase tracking-[0.2em] mb-10 relative z-10">
        <div className="flex justify-between text-slate-400 italic">
          <span>SUBTOTAL</span>
          <span className="text-slate-950 tabular-nums">
            ₹{totalAmount.toLocaleString()}
          </span>
        </div>
 
        {coupon.applied && (
          <div className="flex justify-between items-center text-blue-600 bg-blue-50/50 px-4 py-3 rounded-xl border border-blue-100 italic transition-all animate-in fade-in slide-in-from-top-2">
            <span>COUPON DISCOUNT ({coupon.code})</span>
            <span className="tabular-nums">
              -₹{calculateDiscount().toLocaleString()}
            </span>
          </div>
        )}
 
        <div className="flex justify-between text-slate-400 pb-6 border-b border-black/5 italic">
          <span>SHIPPING ESTIMATE</span>
          {shippingCharges === 0 ? (
            <span className="text-blue-600 font-black animate-pulse px-2 py-1 bg-blue-50 rounded-lg">FREE SHIPPING</span>
          ) : (
            <span className="text-slate-950 tabular-nums">
              ₹{shippingCharges.toLocaleString()}
            </span>
          )}
        </div>
 
        <div className="flex justify-between items-end pt-2">
          <span className="text-xs font-black text-slate-950 italic">ORDER TOTAL</span>
          <div className="text-right">
            <span className="text-2xl sm:text-4xl font-black text-blue-600 tracking-tighter tabular-nums leading-none">
              ₹{finalAmount.toLocaleString()}
            </span>
            <span className="block text-[8px] text-slate-400 mt-2 font-bold tracking-[0.3em] uppercase">
              INCLUSIVE OF ALL TAXES
            </span>
          </div>
        </div>
      </div>

      {/* Privilege Code Interface */}
      <div className="mb-10 relative z-10">
        {!coupon.applied ? (
          <button
            onClick={() => setCouponOpen(true)}
            className="w-full h-14 flex justify-between items-center px-6 bg-white/50 hover:bg-white rounded-2xl text-[9px] font-black uppercase tracking-[0.3em] text-slate-500 transition-all duration-500 border border-white hover:border-blue-500/30 group italic"
          >
            <span>APPLY PROMO CODE</span>
            <ChevronRight size={14} className="text-slate-300 group-hover:translate-x-1 group-hover:text-blue-500 transition-all" />
          </button>
        ) : (
          <div className="flex justify-between items-center h-16 px-6 bg-blue-600 rounded-2xl border border-blue-500 shadow-lg shadow-blue-600/20 transition-all animate-in zoom-in-95">
            <div>
              <span className="text-[7px] text-white/60 font-black uppercase tracking-[0.4em] mb-1 block">
                PROMO CODE APPLIED
              </span>
              <div className="font-black text-white text-sm italic tracking-widest">{coupon.code}</div>
            </div>
            <button
              onClick={handleCouponRemove}
              className="p-2.5 bg-white/10 hover:bg-white hover:text-blue-600 rounded-xl text-white transition-all active:scale-90"
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
        className="w-full bg-slate-950 text-white h-16 rounded-2xl font-black text-[10px] uppercase tracking-[0.4em] hover:bg-blue-600 transition-all duration-500 shadow-2xl shadow-black/10 flex items-center justify-center gap-3 italic mb-4 active:shadow-inner"
      >
        PROCEED TO CHECKOUT <ArrowRight size={16} strokeWidth={3} className="hidden sm:block" />
      </motion.button>

      <div className="flex items-center justify-center gap-2 opacity-60">
        <ShieldCheck size={14} className="text-blue-600" />
        <span className="text-[7px] font-black uppercase tracking-[0.3em] text-slate-400 italic">SECURE CHECKOUT</span>
      </div>
    </div>
  );
}
