import React, { useState, useEffect } from "react";
import { Minus, Plus, X, ShoppingBag, ShieldCheck, Truck, ArrowRight, Trash2, RefreshCw } from "lucide-react";
import ApplyCouponPanel from "./ApplyCouponPanel";
import { useNavigate, Link } from "react-router-dom";
import { useCartActions } from "../hooks/useCartActions";
import { useAuth } from "../context/AuthContext";
import { getShippingAmount } from "../utils/shippingCalculator";
import { motion, AnimatePresence } from "framer-motion";

const transformToSlug = (name) => {
  return name
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
};

export default function CartPage() {
  const [couponOpen, setCouponOpen] = useState(false);
  const [coupon, setCoupon] = useState({
    applied: false,
    code: "",
    name: "",
    discountPercentage: null,
    maxDiscountAmount: null,
  });
  const navigate = useNavigate();

  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalAmount,
    totalItems,
    loading,
  } = useCartActions();

  const { cartSyncing, user } = useAuth();
  const shippingCharges = getShippingAmount(cartItems);

  const calculateDiscount = () => {
    if (!coupon.discountPercentage) return 0;
    const discountAmount = (totalAmount * coupon.discountPercentage) / 100;
    return Math.min(discountAmount, coupon.maxDiscountAmount);
  };

  const finalAmount = totalAmount - calculateDiscount() + shippingCharges;

  const handleIncrement = (id, size, color) => {
    const item = cartItems.find((i) => i.id === id && i.size === size && i.color === color);
    if (item) updateQuantity(id, size, color, item.quantity + 1);
  };

  const handleDecrement = (id, size, color) => {
    const item = cartItems.find((i) => i.id === id && i.size === size && i.color === color);
    if (!item) return;
    if (item.quantity <= 1) {
      removeFromCart(id, size, color);
    } else {
      updateQuantity(id, size, color, item.quantity - 1);
    }
  };

  const handleRemoveItem = (id, size, color) => {
    removeFromCart(id, size, color);
  };

  const handleClearCart = () => {
    clearCart();
    setCoupon({ applied: false, code: "", name: "", discountPercentage: null, maxDiscountAmount: null });
  };

  const handleCouponApply = (response, code) => {
    const { offerDetails } = response;
    setCoupon({
      applied: true,
      code,
      name: offerDetails.name,
      discountPercentage: offerDetails.discountPercentage,
      maxDiscountAmount: offerDetails.maxDiscountAmount,
    });
    setCouponOpen(false);
  };

  const handleCouponRemove = () => {
    setCoupon({ applied: false, code: "", name: "", discountPercentage: null, maxDiscountAmount: null });
  };

  if (cartSyncing || loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-slate-100 border-t-blue-600 rounded-full mb-6"
        />
        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400 italic">Syncing Manifest...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-8 md:py-16 font-sans selection:bg-blue-600 selection:text-white overflow-x-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header - Compact & Premium */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 border-b border-slate-50 pb-6">
          <div>
            <div className="flex items-center gap-2 text-blue-600 font-bold text-[9px] uppercase tracking-[0.2em] mb-1 italic">
              <ShoppingBag size={10} /> SELECTION
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter italic leading-none uppercase">
              Shopping <span className="text-blue-600">Cart</span>
            </h1>
          </div>
          {cartItems.length > 0 && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleClearCart}
              className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-slate-400 hover:text-red-500 transition-colors group italic"
            >
              <Trash2 size={12} className="group-hover:rotate-12 transition-transform" /> Clear
            </motion.button>
          )}
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

          {/* Left Column: Items */}
          <div className="lg:col-span-8 space-y-4">
            <AnimatePresence mode="popLayout">
              {cartItems.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-20 md:py-28 bg-slate-50/50 rounded-3xl border border-slate-100 border-dashed relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-40 h-40 bg-blue-600/5 blur-[60px] rounded-full -mr-20 -mt-20"></div>
                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg border border-slate-50">
                      <ShoppingBag size={24} className="text-slate-200" strokeWidth={3} />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 mb-3 tracking-tighter italic uppercase">Bag is Empty</h3>
                    <p className="text-slate-400 font-medium text-sm mb-8 max-w-[240px] mx-auto italic leading-relaxed">Your curated collection awaits. Start discovering premium artifacts.</p>
                    <Link to="/" className="btn-premium px-10 py-4 inline-flex items-center gap-3 text-[10px]">
                      Explore Collection <ArrowRight size={16} />
                    </Link>
                  </div>
                </motion.div>
              ) : (
                cartItems.map((item, idx) => (
                  <motion.div
                    key={`${item.id || idx}-${item.size}-${item.color}`}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ delay: idx * 0.04, ease: "easeOut", duration: 0.4 }}
                    className="group relative flex flex-col sm:flex-row items-center gap-4 p-4 md:p-5 bg-white rounded-3xl border border-slate-100 hover:border-blue-100 transition-all duration-300 hover:shadow-lg hover:shadow-slate-50"
                  >
                    {/* Item Image - Optimized */}
                    <div
                      className="w-24 h-24 md:w-28 md:h-28 rounded-xl bg-slate-50 border border-slate-50 p-3 flex-shrink-0 cursor-pointer overflow-hidden relative group/img"
                      onClick={() => navigate(`/product/${transformToSlug(item.name)}`)}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain mix-blend-multiply group-hover/img:scale-105 transition-transform duration-500"
                        onError={(e) => { e.target.src = '/placeholder-premium.png'; }}
                      />
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 text-center sm:text-left">
                      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
                        <span className="text-[6px] font-black uppercase tracking-[0.2em] text-blue-600 bg-blue-50/50 px-2 py-0.5 rounded-full italic border border-blue-100/30">Premium</span>
                        <span className="text-slate-300 text-[6px] font-bold uppercase tracking-[0.2em] italic">#{item.id?.slice(-4)?.toUpperCase() || 'N/A'}</span>
                      </div>
                      <h2
                        className="text-base md:text-lg font-black text-slate-800 mb-2 tracking-tight italic leading-tight hover:text-blue-600 transition-colors uppercase cursor-pointer"
                        onClick={() => navigate(`/product/${transformToSlug(item.name)}`)}
                      >
                        {item.name}
                      </h2>
                      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-[8px] font-bold uppercase tracking-widest text-slate-400 italic">
                        <div className="flex items-center gap-1.5">
                          <span className="text-slate-300">SIZE:</span>
                          <span className="text-slate-900">{item.size || 'STD'}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-slate-300">COLOR:</span>
                          <span className="text-slate-900">{item.color || 'DFT'}</span>
                        </div>
                      </div>
                    </div>

                    {/* Quantity & Price Panel */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-8 w-full sm:w-auto mt-2 sm:mt-0">
                      <div className="flex items-center bg-slate-50 p-0.5 rounded-lg border border-slate-100">
                        <motion.button
                          whileTap={{ scale: 0.8 }}
                          onClick={() => handleDecrement(item.id, item.size, item.color)}
                          className="w-7 h-7 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-all hover:bg-white rounded shadow-sm"
                        >
                          <Minus size={10} strokeWidth={3} />
                        </motion.button>
                        <span className="w-8 text-center font-black italic text-[10px] text-slate-900">{item.quantity}</span>
                        <motion.button
                          whileTap={{ scale: 0.8 }}
                          onClick={() => handleIncrement(item.id, item.size, item.color)}
                          className="w-7 h-7 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-all hover:bg-white rounded shadow-sm"
                        >
                          <Plus size={10} strokeWidth={3} />
                        </motion.button>
                      </div>

                      <div className="flex flex-col items-center sm:items-end min-w-[80px]">
                        <span className="text-lg font-black text-slate-900 italic tracking-tighter leading-none mb-0.5">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </span>
                        <span className="text-[6px] font-black text-slate-300 uppercase tracking-widest italic tracking-[0.2em]">₹{item.price.toLocaleString()}</span>
                      </div>

                      {/* Remove Button */}
                      <button
                        className="p-2 text-slate-200 hover:text-red-500 transition-all"
                        onClick={() => handleRemoveItem(item.id, item.size, item.color)}
                      >
                         <X size={14} strokeWidth={3} />
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>

            {/* Reassurance Grid - Minimalist */}
            {cartItems.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-slate-50 mt-4">
                {[
                  { icon: ShieldCheck, title: "SECURED", sub: "AES-256" },
                  { icon: Truck, title: "LOGISTICS", sub: "Priority" },
                  { icon: RefreshCw, title: "RETURNS", sub: "30-Day" },
                  { icon: ShoppingBag, title: "AUTHENTIC", sub: "Verified" }
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col items-center text-center gap-1">
                    <div className="w-6 h-6 bg-slate-50/50 rounded-full flex items-center justify-center text-blue-600/50">
                      <item.icon size={10} strokeWidth={2.5} />
                    </div>
                    <div>
                      <span className="block text-[7px] font-black uppercase tracking-widest text-slate-900 italic leading-none">{item.title}</span>
                      <span className="block text-[6px] font-bold text-slate-300 uppercase italic mt-0.5">{item.sub}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Order Summary - Optimized Sidebar */}
          <aside className="lg:col-span-4 w-full sticky top-24">
            <div className="bg-slate-900 text-white p-6 md:p-8 rounded-3xl shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 blur-[60px] rounded-full -mr-16 -mt-16"></div>
              
              <div className="relative z-10">
                <h2 className="text-xl font-black italic tracking-tighter uppercase mb-6 flex items-center gap-3">
                  Summary <div className="h-px flex-1 bg-white/5"></div>
                </h2>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center text-[8px] font-bold uppercase tracking-widest text-white/20 italic">
                    <span>Artifact Count</span>
                    <span className="text-white/60">{totalItems}</span>
                  </div>
                  <div className="flex justify-between items-center text-[8px] font-bold uppercase tracking-widest text-white/20 italic">
                    <span>Subtotal</span>
                    <span className="text-white/60">₹{totalAmount.toLocaleString()}</span>
                  </div>
                  {coupon.applied && (
                    <div className="flex justify-between items-center text-[8px] font-bold uppercase tracking-widest text-blue-400 italic">
                      <span>Privilege Discount</span>
                      <span>-₹{calculateDiscount().toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center text-[8px] font-bold uppercase tracking-widest text-white/20 italic">
                    <span>Logistics</span>
                    <span className="text-blue-500 font-black">Authorized</span>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/5 mb-8 text-center">
                  <p className="text-white/10 text-[7px] font-bold uppercase tracking-[0.3em] mb-1 italic">Final Value</p>
                  <div className="flex items-end justify-center gap-1.5">
                    <span className="text-4xl font-black text-white italic tracking-tighter leading-none">
                      ₹{finalAmount.toLocaleString()}
                    </span>
                    <span className="text-[8px] font-black text-white/10 tracking-widest uppercase mb-1">INR</span>
                  </div>
                </div>

                {/* Coupon Nexus */}
                <div className="mb-8">
                  {!coupon.applied ? (
                    <button
                      onClick={() => setCouponOpen(true)}
                      className="w-full py-3 text-[8px] font-black uppercase tracking-widest text-blue-400 border border-dashed border-blue-400/20 rounded-xl hover:bg-blue-400/5 transition-all italic text-center"
                    >
                      Apply Coupon
                    </button>
                  ) : (
                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/10">
                      <div>
                        <p className="text-[7px] font-black tracking-widest text-blue-400 uppercase italic">Active</p>
                        <p className="text-xs font-black uppercase italic">{coupon.code}</p>
                      </div>
                      <button onClick={handleCouponRemove} className="p-1.5 hover:text-red-400 transition-colors">
                        <X size={14} />
                      </button>
                    </div>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02, translateY: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    if (!user) {
                      // Login Gate: Redirect to signin with return URL
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
                  disabled={cartItems.length === 0}
                  className="w-full bg-blue-600 text-white py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] shadow-lg shadow-blue-600/20 hover:bg-blue-500 hover:shadow-blue-600/40 transition-all disabled:opacity-50 italic flex items-center justify-center gap-3 border border-blue-500"
                >
                  <span className="flex items-center gap-2">Proceed to Checkout <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" /></span>
                </motion.button>

                {!user && (
                  <p className="mt-4 text-center text-[7px] font-bold text-slate-500 uppercase italic">
                    Authentication required for checkout
                  </p>
                )}

                <p className="mt-6 text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-3 italic flex items-center justify-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span> Sartaaj Protocol Secured
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Coupon Modal - Using ApplyCouponPanel for consistency if preferred, otherwise inline as planned */}
      <ApplyCouponPanel
        isOpen={couponOpen}
        onClose={() => setCouponOpen(false)}
        onApply={handleCouponApply}
        appliedCoupon={coupon.applied ? coupon.code : null}
        totalAmount={totalAmount}
      />
    </div>
  );
}
