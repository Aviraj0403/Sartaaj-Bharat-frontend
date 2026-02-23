import React, { useState, useEffect } from "react";
import { Minus, Plus, X, ShoppingBag, ShieldCheck, Truck, ArrowRight, Trash2 } from "lucide-react";
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
    <div className="min-h-screen bg-slate-50/50 py-12 md:py-24 font-sans selection:bg-blue-600 selection:text-white">
      <div className="container-custom">

        {/* Header - Elite Aesthetic */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 px-4">
          <div>
            <div className="flex items-center gap-4 text-blue-600 font-black text-[10px] uppercase tracking-[0.5em] mb-4 italic">
              <ShoppingBag size={14} /> Acquisition Manifest
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter italic leading-none">
              Your <span className="text-blue-600">Lounge</span> Selection
            </h1>
          </div>
          {cartItems.length > 0 && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleClearCart}
              className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-red-500 transition-colors group italic"
            >
              <Trash2 size={16} className="group-hover:rotate-12 transition-transform" /> Reset Manifest
            </motion.button>
          )}
        </header>

        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-12 items-start">

          {/* Left Column: Items */}
          <div className="lg:col-span-8 w-full space-y-6">
            <AnimatePresence mode="popLayout">
              {cartItems.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-24 md:py-40 glass-surface rounded-3xl md:rounded-[2rem] border border-slate-100 border-dashed"
                >
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl border border-slate-50">
                    <ShoppingBag size={32} className="text-slate-200" strokeWidth={3} />
                  </div>
                  <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tighter italic">Selection is Empty</h3>
                  <p className="text-slate-400 font-medium text-lg mb-12 max-w-sm mx-auto italic">No artifacts have been authorized for checkout yet.</p>
                  <Link to="/" className="btn-premium px-12 py-5 inline-flex items-center gap-4">
                    Explore Gallery <ArrowRight size={20} />
                  </Link>
                </motion.div>
              ) : (
                cartItems.map((item, idx) => (
                  <motion.div
                    key={`${item.id}-${item.size}-${item.color}`}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: idx * 0.05 }}
                    className="glass-surface p-6 md:p-8 rounded-3xl md:rounded-[2rem] border border-slate-100 flex flex-col md:flex-row items-center gap-8 group hover:border-blue-200 transition-all duration-500 hover:shadow-2xl hover:shadow-slate-200/50"
                  >
                    {/* Item Image */}
                    <div
                      className="w-32 h-32 md:w-40 md:h-40 rounded-[2rem] bg-white border border-slate-100 p-4 flex-shrink-0 cursor-pointer overflow-hidden relative group/img"
                      onClick={() => navigate(`/product/${transformToSlug(item.name)}`)}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain mix-blend-multiply group-hover/img:scale-110 transition-transform duration-700"
                      />
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 text-center md:text-left">
                      <div className="flex items-center justify-center md:justify-start gap-4 mb-2">
                        <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full italic">Elite Artifact</span>
                        <span className="text-slate-300 text-[10px] font-bold uppercase tracking-widest">ID: {item.id.slice(-6)}</span>
                      </div>
                      <h2
                        className="text-2xl md:text-3xl font-black text-slate-900 mb-2 tracking-tighter italic cursor-pointer hover:text-blue-600 transition-colors"
                        onClick={() => navigate(`/product/${transformToSlug(item.name)}`)}
                      >
                        {item.name}
                      </h2>
                      <div className="flex items-center justify-center md:justify-start gap-6 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 italic">
                        <span>Size: <span className="text-slate-900">{item.size}</span></span>
                        <div className="w-1 h-1 bg-slate-200 rounded-full"></div>
                        <span>Spectrum: <span className="text-slate-900">{item.color}</span></span>
                      </div>
                    </div>

                    {/* Price & Actions */}
                    <div className="flex flex-col items-center md:items-end gap-6">
                      <div className="flex items-center bg-slate-50 p-2 rounded-2xl border border-slate-100">
                        <motion.button
                          whileTap={{ scale: 0.8 }}
                          onClick={() => handleDecrement(item.id, item.size, item.color)}
                          className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-all"
                        >
                          <Minus size={16} strokeWidth={3} />
                        </motion.button>
                        <span className="w-10 text-center font-black italic text-sm">{item.quantity}</span>
                        <motion.button
                          whileTap={{ scale: 0.8 }}
                          onClick={() => handleIncrement(item.id, item.size, item.color)}
                          className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-all"
                        >
                          <Plus size={16} strokeWidth={3} />
                        </motion.button>
                      </div>
                      <div className="flex flex-col items-center md:items-end">
                        <span className="text-2xl font-black text-blue-600 italic tracking-tighter">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </span>
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">₹{item.price.toLocaleString()} / Unit</span>
                      </div>
                    </div>

                    {/* Remove Action */}
                    <button
                      className="absolute top-6 right-6 p-3 rounded-full text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100 hidden md:block"
                      onClick={() => handleRemoveItem(item.id, item.size, item.color)}
                    >
                      <X size={20} strokeWidth={3} />
                    </button>
                    <button
                      className="md:hidden text-red-500 text-[10px] font-black uppercase tracking-widest mt-4 flex items-center gap-2"
                      onClick={() => handleRemoveItem(item.id, item.size, item.color)}
                    >
                      <Trash2 size={12} /> Vaporize Item
                    </button>
                  </motion.div>
                ))
              )}
            </AnimatePresence>

            {/* Reassurance Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
              {[
                { icon: ShieldCheck, title: "Secured", sub: "AES-Encrypted Checkout" },
                { icon: Truck, title: "Nexus Link", sub: "Priority Global Transit" },
                { icon: ShoppingBag, title: "Elite Care", sub: "30-Day Resolution Center" }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 p-6 glass-surface rounded-[2rem] border border-slate-100">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-sm border border-slate-50">
                    <item.icon size={20} strokeWidth={2.5} />
                  </div>
                  <div className="flex flex-col justify-center">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-900 italic">{item.title}</span>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">{item.sub}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <aside className="lg:col-span-4 w-full sticky top-32">
            <div className="glass-surface p-6 md:p-10 rounded-3xl md:rounded-[2rem] border border-blue-100/30 flex flex-col gap-8 shadow-3xl shadow-slate-200/40 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 blur-[80px] rounded-full -mr-16 -mt-16"></div>

              <h2 className="text-2xl font-black text-slate-900 tracking-tighter italic flex items-center gap-3">
                <ShieldCheck size={24} className="text-blue-600" /> Summary
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 italic">
                  <span>Artifact Count</span>
                  <span className="text-slate-900">{totalItems} Units</span>
                </div>
                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 italic">
                  <span>Manifest Total</span>
                  <span className="text-slate-900">₹{totalAmount.toLocaleString()}</span>
                </div>
                {coupon.applied && (
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.3em] text-green-600 italic">
                    <span>Elite Privilege</span>
                    <span>-₹{calculateDiscount().toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 italic">
                  <span>Logistics Fee</span>
                  <span className="text-slate-900">{shippingCharges > 0 ? `₹${shippingCharges.toLocaleString()}` : 'Authorized Priority'}</span>
                </div>
              </div>

              <div className="py-8 bg-slate-900 rounded-[2rem] text-center shadow-2xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <p className="text-white/40 text-[9px] font-black uppercase tracking-[0.5em] mb-2 italic">Final Valuation</p>
                <p className="text-4xl font-black text-white italic tracking-tighter">
                  ₹{finalAmount.toLocaleString()}
                </p>
              </div>

              {/* Coupon Nexus */}
              {!coupon.applied ? (
                <button
                  onClick={() => setCouponOpen(true)}
                  className="w-full py-4 text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 border-2 border-dashed border-blue-200 rounded-2xl hover:bg-blue-50 transition-all italic"
                >
                  Apply Privilege Code
                </button>
              ) : (
                <div className="bg-green-50 border border-green-100 rounded-2xl p-6 relative overflow-hidden group">
                  <div className="relative z-10 flex justify-between items-center">
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-widest text-green-600 mb-1 italic">Authorized Privilege</p>
                      <p className="text-lg font-black text-slate-900 italic">{coupon.code}</p>
                    </div>
                    <button onClick={handleCouponRemove} className="text-slate-400 hover:text-red-500 transition-colors">
                      <X size={18} strokeWidth={3} />
                    </button>
                  </div>
                  <div className="absolute top-0 right-0 w-24 h-full bg-green-500/5 skew-x-12 translate-x-8"></div>
                </div>
              )}

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
                className="btn-premium w-full py-6 flex items-center justify-center gap-4 text-sm group"
              >
                <ShieldCheck size={20} className="group-hover:rotate-12 transition-transform" />
                Authorize Acquisition
              </motion.button>

              <p className="text-center text-[9px] font-black uppercase tracking-[0.3em] text-slate-300 italic">
                Secured by Sartaaj Bharat Vault
              </p>
            </div>
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
