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

const transformToSlug = (name) => {
  if (!name) return "";
  return name
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
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
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Page Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                <ShoppingBag size={20} className="text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Shopping Cart
                </h1>
                <p className="text-sm text-slate-500">
                  {totalItems} {totalItems === 1 ? "item" : "items"} in your
                  cart
                </p>
              </div>
            </div>
            {cartItems.length > 0 && (
              <button
                onClick={handleClearCart}
                className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-red-500 bg-red-50 hover:bg-red-100 rounded-xl transition-colors w-fit border border-red-100"
              >
                <Trash2 size={15} />
                Clear Cart
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="popLayout">
              {cartItems.length === 0 ? (
                <EmptyCart />
              ) : (
                <motion.div className="space-y-3">
                  {cartItems.map((item, idx) => (
                    <CartItem
                      key={`${item.id || idx}-${item.size}-${item.color}`}
                      item={item}
                      idx={idx}
                      navigate={navigate}
                      transformToSlug={transformToSlug}
                      handleDecrement={handleDecrement}
                      handleIncrement={handleIncrement}
                      handleRemoveItem={handleRemoveItem}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {cartItems.length > 0 && (
              <div className="mt-8">
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
