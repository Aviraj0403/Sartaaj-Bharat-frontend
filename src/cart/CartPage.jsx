import React, { useState } from "react";
import { Trash2, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useCartActions } from "../hooks/useCartActions";
import { useAuth } from "../context/AuthContext";
import { getShippingAmount } from "../utils/shippingCalculator";

// Components
import EmptyCart from "./components/EmptyCart";
import CartItem from "./components/CartItem";
import OrderSummary from "./components/OrderSummary";
import ValueProps from "./components/ValueProps";
import ApplyCouponPanel from "./ApplyCouponPanel";

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
    const item = cartItems.find(
      (i) => i.id === id && i.size === size && i.color === color,
    );
    if (item) updateQuantity(id, size, color, item.quantity + 1);
  };

  const handleDecrement = (id, size, color) => {
    const item = cartItems.find(
      (i) => i.id === id && i.size === size && i.color === color,
    );
    if (!item) return;
    if (item.quantity <= 1) {
      removeFromCart(id, size, color);
    } else {
      updateQuantity(id, size, color, item.quantity - 1);
    }
  };

  const handleRemoveItem = (id, size, color) => removeFromCart(id, size, color);

  const handleClearCart = () => {
    clearCart();
    setCoupon({
      applied: false,
      code: "",
      name: "",
      discountPercentage: null,
      maxDiscountAmount: null,
    });
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
    setCoupon({
      applied: false,
      code: "",
      name: "",
      discountPercentage: null,
      maxDiscountAmount: null,
    });
  };

  if (cartSyncing || loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-gray-50">
        <div className="w-12 h-12 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin" />
        <span className="mt-4 text-sm font-medium text-slate-500">
          Updating your cart...
        </span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white relative overflow-hidden font-sans">
      {/* Technical Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000003_1px,transparent_1px),linear-gradient(to_bottom,#00000003_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-60"></div>
      
      {/* Background Deep Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-900/5 blur-[120px] rounded-full -translate-x-1/2 translate-y-1/2"></div>

      <div className="relative z-10">
        {/* Page Header - Elite Standard */}
        <div className="bg-white/40 backdrop-blur-md border-b border-white/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-7">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 md:gap-8">
              <div className="max-w-xl">
                <motion.div 
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-3 mb-5"
                >
                  <div className="h-0.5 w-10 bg-blue-600 rounded-full"></div>
                  <span className="text-blue-600 font-black text-[10px] uppercase tracking-[0.4em] italic">
                    SHOPPING CART
                  </span>
                </motion.div>
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="text-[28px] sm:text-[40px] md:text-[48px] font-black text-slate-900 tracking-tighter leading-[0.9] mb-4 italic uppercase"
                >
                  YOUR <span className="text-blue-600">CART.</span>
                </motion.h1>
                <p className="text-[11px] sm:text-xs text-slate-500 font-black uppercase tracking-[0.3em] italic">
                  YOU HAVE {totalItems} {totalItems === 1 ? "ITEM" : "ITEMS"} IN YOUR CART
                </p>
              </div>
              
              <AnimatePresence>
                {cartItems.length > 0 && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    onClick={handleClearCart}
                    className="group flex items-center gap-3 px-8 py-4 text-[10px] font-black uppercase tracking-widest text-red-500 bg-white/50 backdrop-blur-md hover:bg-red-500 hover:text-white rounded-2xl transition-all duration-300 w-fit border border-white/60 shadow-lg hover:shadow-red-500/20 active:scale-95 italic"
                  >
                    <Trash2 size={16} strokeWidth={2.5} className="group-hover:rotate-12 transition-transform" />
                    CLEAR CART
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
            {/* Cart Items */}
            <div className="lg:col-span-8">
              <AnimatePresence mode="popLayout">
                {cartItems.length === 0 ? (
                  <EmptyCart />
                ) : (
                  <motion.div className="space-y-4">
                    {cartItems.map((item, idx) => (
                      <CartItem
                        key={`${item.id || idx}-${item.size}-${item.color}`}
                        item={item}
                        idx={idx}
                        navigate={navigate}
                        handleDecrement={handleDecrement}
                        handleIncrement={handleIncrement}
                        handleRemoveItem={handleRemoveItem}
                      />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {cartItems.length > 0 && (
                <div className="mt-8 lg:mt-12">
                  <ValueProps />
                </div>
              )}
            </div>

            {/* Order Summary */}
            {cartItems.length > 0 && (
              <div className="lg:col-span-4">
                <OrderSummary
                  totalItems={totalItems}
                  totalAmount={totalAmount}
                  coupon={coupon}
                  calculateDiscount={calculateDiscount}
                  shippingCharges={shippingCharges}
                  finalAmount={finalAmount}
                  handleCouponRemove={handleCouponRemove}
                  setCouponOpen={setCouponOpen}
                  user={user}
                  navigate={navigate}
                  cartItems={cartItems}
                />
              </div>
            )}
          </div>
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
