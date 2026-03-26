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
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8 sticky top-24">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

      <div className="space-y-4 text-sm mb-6">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal ({totalItems} items)</span>
          <span className="font-medium text-gray-900">
            ₹{totalAmount.toLocaleString()}
          </span>
        </div>

        {coupon.applied && (
          <div className="flex justify-between text-green-600">
            <span>Discount ({coupon.code})</span>
            <span className="font-medium">
              -₹{calculateDiscount().toLocaleString()}
            </span>
          </div>
        )}

        <div className="flex justify-between text-gray-600 pb-4 border-b border-gray-200">
          <span>Shipping Fee</span>
          {shippingCharges === 0 ? (
            <span className="font-medium text-green-600">Free</span>
          ) : (
            <span className="font-medium text-gray-900">
              ₹{shippingCharges.toLocaleString()}
            </span>
          )}
        </div>

        <div className="flex justify-between items-end pt-2">
          <span className="font-bold text-gray-900">Total</span>
          <div className="text-right">
            <span className="text-2xl font-bold text-blue-600">
              ₹{finalAmount.toLocaleString()}
            </span>
            <span className="block text-xs text-gray-500 mt-0.5">
              Inclusive of all taxes
            </span>
          </div>
        </div>
      </div>

      {/* Coupon Code Input */}
      <div className="mb-6">
        {!coupon.applied ? (
          <button
            onClick={() => setCouponOpen(true)}
            className="w-full flex justify-between items-center py-3 px-4 bg-gray-50 hover:bg-gray-100 rounded-xl text-sm font-medium text-gray-700 transition-colors border border-gray-200"
          >
            Have a coupon code?
            <ChevronRight size={16} className="text-gray-400" />
          </button>
        ) : (
          <div className="flex justify-between items-center py-3 px-4 bg-green-50 rounded-xl border border-green-200">
            <div>
              <span className="text-xs text-green-600 font-semibold uppercase tracking-wider">
                Applied Coupon
              </span>
              <div className="font-bold text-green-800">{coupon.code}</div>
            </div>
            <button
              onClick={handleCouponRemove}
              className="p-2 bg-green-100 hover:bg-red-50 hover:text-red-600 rounded-lg text-green-700 transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        )}
      </div>

      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
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
        className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-base hover:bg-blue-700 transition-colors shadow-sm shadow-blue-600/20 flex items-center justify-center gap-2"
      >
        Proceed to Checkout <ArrowRight size={18} />
      </motion.button>
    </div>
  );
}
