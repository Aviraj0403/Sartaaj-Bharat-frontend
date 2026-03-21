import React, { useState, useEffect } from "react";
import { Minus, Plus, X, ShoppingBag, ShieldCheck, Truck, ArrowRight, Trash2, RefreshCw, ChevronRight, Luggage } from "lucide-react";
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
        <div className="relative">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="w-20 h-20 border-[3px] border-slate-100 border-t-orange-500 rounded-full"
          />
          <div className="absolute inset-0 flex items-center justify-center">
             <ShoppingBag className="text-orange-500/20 w-8 h-8" />
          </div>
        </div>
        <span className="mt-8 text-[11px] font-black uppercase tracking-[0.6em] text-slate-400 italic animate-pulse">Synchronizing Inventory...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] py-12 md:py-24 font-sans selection:bg-orange-500 selection:text-white overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Header - Premium Minimalist */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="inline-flex items-center gap-3 px-3 py-1 bg-orange-50 text-orange-600 rounded-full text-[9px] font-black uppercase tracking-[0.2em] mb-4 border border-orange-100/50">
              <Luggage size={12} className="stroke-[3]" /> YOUR CURATION
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter leading-[0.9] uppercase italic">
              CART <span className="text-orange-500 font-light block md:inline md:ml-4">PROTOCOL</span>
            </h1>
          </motion.div>
          
          {cartItems.length > 0 && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleClearCart}
              className="group flex items-center gap-3 px-6 py-3 bg-white border border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-red-500 hover:border-red-100 transition-all shadow-sm hover:shadow-md italic"
            >
              <Trash2 size={14} className="group-hover:rotate-12 transition-transform" /> Clear Selection
            </motion.button>
          )}
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">

          {/* Left Column: Items */}
          <div className="lg:col-span-8 space-y-6">
            <AnimatePresence mode="popLayout">
              {cartItems.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="relative group py-24 px-8 bg-white rounded-[3rem] border border-slate-100 shadow-2xl shadow-slate-200/50 text-center overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-orange-500/5 to-transparent rounded-full -mr-32 -mt-32 blur-3xl"></div>
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-blue-500/5 to-transparent rounded-full -ml-32 -mb-32 blur-3xl"></div>
                  
                  <div className="relative z-10 max-w-sm mx-auto">
                    <div className="w-24 h-24 bg-slate-50 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-inner border border-slate-100 group-hover:scale-110 transition-transform duration-500">
                      <ShoppingBag size={40} className="text-slate-200" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tighter uppercase italic">The Vault is Empty</h3>
                    <p className="text-slate-500 font-medium text-sm mb-10 italic leading-relaxed">Your collection of luxury artifacts is waiting to be curated. Explore our latest acquisitions.</p>
                    <Link to="/" className="inline-flex items-center gap-4 px-10 py-5 bg-slate-900 text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.3em] hover:bg-orange-600 transition-all shadow-xl shadow-slate-900/20 hover:shadow-orange-600/30 group">
                      Discover Excellence <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              ) : (
                cartItems.map((item, idx) => (
                  <motion.div
                    key={`${item.id || idx}-${item.size}-${item.color}`}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: idx * 0.05, ease: "circOut", duration: 0.6 }}
                    className="group relative flex flex-col md:flex-row items-center gap-8 p-6 md:p-8 bg-white rounded-[2.5rem] border border-slate-100 hover:border-orange-200 transition-all duration-500 shadow-sm hover:shadow-2xl hover:shadow-orange-500/5"
                  >
                    {/* Item Image - Large & Impactful */}
                    <div
                      className="w-32 h-32 md:w-40 md:h-40 rounded-[2rem] bg-[#fdfdfd] border border-slate-50 p-6 flex-shrink-0 cursor-pointer overflow-hidden relative group/img shadow-inner"
                      onClick={() => navigate(`/product/${transformToSlug(item.name)}`)}
                    >
                      <motion.img
                        layoutId={`img-${item.id}-${item.size}-${item.color}`}
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain mix-blend-multiply transition-all duration-700 group-hover/img:scale-110 group-hover/img:rotate-3"
                        onError={(e) => { e.target.src = '/placeholder-premium.png'; }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-orange-500/5 opacity-0 group-hover/img:opacity-100 transition-opacity"></div>
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 text-center md:text-left space-y-3">
                      <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                        <span className="px-3 py-1 bg-slate-900 text-white text-[8px] font-black uppercase tracking-widest rounded-full italic shadow-lg shadow-slate-900/10">AUTHENTIC</span>
                        <span className="text-slate-300 text-[8px] font-bold uppercase tracking-[0.4em] italic border-l border-slate-100 pl-3">PRO-ID: {item.id?.slice(-6)?.toUpperCase() || 'REF-NUL'}</span>
                      </div>
                      <h2
                        className="text-xl md:text-2xl font-black text-slate-900 tracking-tight italic leading-none hover:text-orange-500 transition-colors uppercase cursor-pointer"
                        onClick={() => navigate(`/product/${transformToSlug(item.name)}`)}
                      >
                        {item.name}
                      </h2>
                      <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-[9px] font-black uppercase tracking-widest text-slate-400 italic">
                        <div className="flex items-center gap-2">
                          <span className="text-slate-200 px-1.5 py-0.5 border border-slate-100 rounded">SZ</span>
                          <span className="text-slate-900">{item.size || 'STD'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-slate-200 px-1.5 py-0.5 border border-slate-100 rounded">CL</span>
                          <span className="text-slate-900">{item.color || 'DFT'}</span>
                        </div>
                      </div>
                    </div>

                    {/* Controls & Price */}
                    <div className="flex flex-col items-center md:items-end gap-6 min-w-[140px] pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-slate-50 md:pl-8">
                      <div className="flex items-center gap-2 bg-slate-50/80 backdrop-blur-sm p-1 rounded-2xl border border-slate-100 shadow-inner">
                        <motion.button
                          whileTap={{ scale: 0.8 }}
                          onClick={() => handleDecrement(item.id, item.size, item.color)}
                          className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-900 transition-all rounded-xl"
                        >
                          <Minus size={14} strokeWidth={3} />
                        </motion.button>
                        <span className="w-10 text-center font-black italic text-sm text-slate-900">{item.quantity}</span>
                        <motion.button
                          whileTap={{ scale: 0.8 }}
                          onClick={() => handleIncrement(item.id, item.size, item.color)}
                          className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-900 transition-all rounded-xl"
                        >
                          <Plus size={14} strokeWidth={3} />
                        </motion.button>
                      </div>

                      <div className="text-center md:text-right">
                        <div className="text-2xl font-black text-slate-900 italic tracking-tighter leading-none mb-1">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </div>
                        <div className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em] italic">Unit: ₹{item.price.toLocaleString()}</div>
                      </div>
                    </div>

                    {/* Elite Exit Button */}
                    <button
                      className="absolute top-6 right-6 md:top-8 md:right-8 p-2.5 text-slate-200 hover:text-red-500 hover:bg-red-50 rounded-full transition-all group/exit"
                      onClick={() => handleRemoveItem(item.id, item.size, item.color)}
                    >
                       <X size={18} strokeWidth={3} className="group-hover/exit:rotate-90 transition-transform duration-300" />
                    </button>
                  </motion.div>
                ))
              )}
            </AnimatePresence>

            {/* Premium Trust Grid */}
            {cartItems.length > 0 && (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-12">
                {[
                  { icon: ShieldCheck, title: "SECURE NODE", sub: "End-to-End Encryption" },
                  { icon: Truck, title: "EXPRESS LOGISTICS", sub: "Priority Dispatch" },
                  { icon: RefreshCw, title: "VALUATION GUARANTEE", sub: "30-Day Protocol" },
                  { icon: ShoppingBag, title: "CERTIFIED ORIGIN", sub: "Quality Audited" }
                ].map((item, idx) => (
                  <motion.div 
                    key={idx} 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + idx * 0.1 }}
                    className="flex flex-col items-center text-center p-6 bg-white rounded-3xl border border-slate-50"
                  >
                    <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-500 mb-4 shadow-sm">
                      <item.icon size={20} strokeWidth={2.5} />
                    </div>
                    <span className="block text-[10px] font-black uppercase tracking-widest text-slate-900 italic leading-none mb-2">{item.title}</span>
                    <span className="block text-[8px] font-bold text-slate-300 uppercase italic leading-tight">{item.sub}</span>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Checkout Nexus */}
          <aside className="lg:col-span-4 w-full sticky top-32">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-slate-900 text-white rounded-[3rem] p-8 md:p-12 shadow-[0_40px_80px_-20px_rgba(15,23,42,0.3)] relative overflow-hidden group/nexus border border-slate-800"
            >
              {/* Dynamic Background FX */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-orange-500/20 to-transparent blur-[120px] rounded-full pointer-events-none transition-transform duration-1000 group-hover/nexus:scale-110"></div>
              
              <div className="relative z-10">
                <h2 className="text-2xl font-black italic tracking-tighter uppercase mb-10 flex items-center gap-4">
                  CHECKOUT <span className="h-[2px] w-12 bg-orange-500 rounded-full"></span>
                </h2>

                <div className="space-y-6 mb-12">
                  <div className="flex justify-between items-center group/row">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 italic">Quantity</span>
                    <span className="text-sm font-black italic">{totalItems} Units</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 italic">Subtotal</span>
                    <span className="text-sm font-black italic">₹{totalAmount.toLocaleString()}</span>
                  </div>
                  {coupon.applied && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="flex justify-between items-center pt-2 border-t border-white/5"
                    >
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-400 italic">Privilege Off</span>
                      <span className="text-sm font-black italic text-orange-400">-₹{calculateDiscount().toLocaleString()}</span>
                    </motion.div>
                  )}
                  <div className="flex justify-between items-center group/row">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 italic">Logistics</span>
                    <span className="flex items-center gap-2 text-[10px] font-black text-green-400 uppercase italic">
                      COMPLIMENTARY <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></div>
                    </span>
                  </div>
                </div>

                <div className="py-10 border-y border-white/5 mb-10 text-center relative">
                   <div className="text-slate-500 text-[10px] font-black uppercase tracking-[0.5em] mb-4 italic">Settlement amount</div>
                   <div className="flex items-baseline justify-center gap-3">
                     <span className="text-[12px] font-black text-white/20 uppercase tracking-widest italic mb-2">INR</span>
                     <span className="text-6xl font-black text-white italic tracking-tighter leading-none">
                       {finalAmount.toLocaleString()}
                     </span>
                   </div>
                </div>

                {/* Voucher Integration */}
                <div className="mb-10">
                  {!coupon.applied ? (
                    <button
                      onClick={() => setCouponOpen(true)}
                      className="w-full py-4 text-[10px] font-black uppercase tracking-[0.3em] text-orange-500 border-2 border-dashed border-orange-500/30 rounded-2xl hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all duration-300 italic"
                    >
                      Enter Promo Code
                    </button>
                  ) : (
                    <div className="flex items-center justify-between p-4 bg-orange-500/10 rounded-2xl border border-orange-500/20 backdrop-blur-md">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                           <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                           <p className="text-[8px] font-black tracking-[0.3em] text-orange-500 uppercase italic">Privilege Active</p>
                        </div>
                        <p className="text-lg font-black uppercase italic tracking-tight">{coupon.code}</p>
                      </div>
                      <button onClick={handleCouponRemove} className="w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-red-500/20 hover:text-red-500 rounded-xl transition-all">
                        <X size={20} />
                      </button>
                    </div>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02, translateY: -5 }}
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
                  disabled={cartItems.length === 0}
                  className="group relative w-full bg-orange-500 text-white py-6 rounded-2xl font-black text-[12px] uppercase tracking-[0.4em] shadow-2xl shadow-orange-500/30 hover:bg-orange-600 transition-all disabled:opacity-50 italic flex items-center justify-center gap-4 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  INITIALIZE ACQUISITION <ChevronRight size={20} className="group-hover:translate-x-2 transition-transform duration-300" />
                </motion.button>

                {!user && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-6 flex items-center justify-center gap-3 py-3 px-4 bg-white/5 rounded-xl border border-white/5"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                    <span className="text-[9px] font-black text-slate-400 uppercase italic tracking-widest">
                      ID Sync Required for Order Dispatch
                    </span>
                  </motion.div>
                )}

                <div className="mt-12 flex flex-col items-center gap-4">
                  <div className="flex items-center gap-2 py-2 px-4 bg-white/5 rounded-full border border-white/10">
                    <ShieldCheck size={14} className="text-orange-500" />
                    <span className="text-[9px] font-black text-white/40 uppercase tracking-[0.3em] italic">Protocol Secured</span>
                  </div>
                  <div className="flex gap-4 opacity-20 grayscale hover:grayscale-0 transition-all duration-700">
                     {/* Payment Logos Placeholder */}
                     <div className="h-4 w-12 bg-white rounded"></div>
                     <div className="h-4 w-12 bg-white rounded"></div>
                     <div className="h-4 w-12 bg-white rounded"></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </aside>
        </div>
      </div>

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
