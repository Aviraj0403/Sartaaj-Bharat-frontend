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
    <div className="min-h-screen bg-[#fafafa] relative overflow-hidden font-sans">
      {/* Refined Background Elements */}
      <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-blue-600/5 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="relative z-10">
        {/* Page Header - Premium Minimalist */}
        <div className="bg-white/80 backdrop-blur-xl border-b border-gray-100/80 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 mb-1.5"
                >
                  <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">
                    Your Selection
                  </span>
                  <div className="h-px w-6 bg-blue-200"></div>
                </motion.div>
                <motion.h1 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight"
                >
                  Shopping <span className="text-blue-600">Cart</span>
                </motion.h1>
                <p className="text-[10px] sm:text-xs text-slate-400 font-semibold uppercase tracking-widest mt-1">
                  {totalItems} {totalItems === 1 ? "Item" : "Items"} • Total ₹{totalAmount.toLocaleString()}
                </p>
              </div>
              
              <AnimatePresence>
                {cartItems.length > 0 && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    onClick={handleClearCart}
                    className="group flex items-center gap-2 px-6 py-3 text-[10px] font-bold uppercase tracking-wider text-red-500 bg-red-50/50 hover:bg-red-500 hover:text-white rounded-xl transition-all duration-300 w-fit border border-red-100/50 shadow-sm hover:shadow-red-500/20 active:scale-95"
                  >
                    <Trash2 size={14} className="group-hover:rotate-12 transition-transform" />
                    Clear Bag
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
