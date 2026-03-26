import React from "react";
import { motion } from "framer-motion";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function EmptyCart() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center"
    >
      <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
        <ShoppingBag size={32} className="text-gray-400" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">
        Your cart is empty
      </h3>
      <p className="text-gray-500 mb-8 max-w-sm mx-auto">
        Looks like you haven't added anything to your cart yet. Explore our top
        categories to find something you'll love!
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-sm shadow-blue-600/20"
      >
        Start Shopping <ArrowRight size={18} />
      </Link>
    </motion.div>
  );
}
