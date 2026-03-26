import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronDown, Star } from "lucide-react";

export default function ProductTabs({
  product,
  activeTab,
  setActiveTab,
  showFullDesc,
  setShowFullDesc,
}) {
  return (
    <div className="mt-12 md:mt-16">
      <div className="border-b border-slate-200">
        <div className="flex gap-8 overflow-x-auto no-scrollbar">
          {["overview", "specifications", "reviews"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 px-2 font-semibold capitalize whitespace-nowrap transition-colors relative ${
                activeTab === tab
                  ? "text-blue-600"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === "overview" && (
              <div className="max-w-4xl space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">
                    Product Description
                  </h3>
                  <div
                    className={`text-slate-700 leading-relaxed ${!showFullDesc && "line-clamp-4"}`}
                  >
                    {product.longDescription || product.description}
                  </div>
                  {(product.longDescription || product.description)?.length >
                    200 && (
                    <button
                      onClick={() => setShowFullDesc(!showFullDesc)}
                      className="text-blue-600 font-medium mt-2 hover:underline flex items-center gap-1"
                    >
                      {showFullDesc ? "Show Less" : "Read More"}
                      <ChevronDown
                        size={16}
                        className={`transition-transform ${showFullDesc && "rotate-180"}`}
                      />
                    </button>
                  )}
                </div>

                {product.features && product.features.length > 0 && (
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-4">
                      Key Features
                    </h3>
                    <ul className="space-y-2">
                      {product.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <Check
                            size={20}
                            className="text-green-600 flex-shrink-0 mt-0.5"
                          />
                          <span className="text-slate-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {activeTab === "specifications" && (
              <div className="max-w-4xl">
                <h3 className="text-xl font-bold text-slate-900 mb-6">
                  Technical Specifications
                </h3>
                {product.details && Object.keys(product.details).length > 0 ? (
                  <div className="bg-slate-50 rounded-xl overflow-hidden">
                    {Object.entries(product.details).map(
                      ([key, value], idx) => (
                        <div
                          key={key}
                          className={`grid grid-cols-1 md:grid-cols-3 gap-4 p-4 ${
                            idx % 2 === 0 ? "bg-white" : "bg-slate-50"
                          }`}
                        >
                          <div className="font-semibold text-slate-900">
                            {key}
                          </div>
                          <div className="md:col-span-2 text-slate-700">
                            {value}
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                ) : (
                  <div className="bg-slate-50 rounded-xl p-8 text-center">
                    <p className="text-slate-600">
                      Specifications will be updated soon
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="max-w-4xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-slate-900">
                    Customer Reviews
                  </h3>
                  <button className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                    Write a Review
                  </button>
                </div>

                {/* Rating Summary */}
                <div className="bg-slate-50 rounded-xl p-6 mb-8">
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="text-center md:text-left">
                      <div className="text-5xl font-bold text-slate-900 mb-2">
                        {product.rating || "4.5"}
                      </div>
                      <div className="flex items-center gap-1 justify-center md:justify-start mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={20}
                            fill="#fbbf24"
                            className="text-yellow-400"
                          />
                        ))}
                      </div>
                      <p className="text-sm text-slate-600">
                        Based on {product.reviewCount || "1,234"} reviews
                      </p>
                    </div>
                    <div className="flex-1 space-y-2">
                      {[5, 4, 3, 2, 1].map((star) => (
                        <div key={star} className="flex items-center gap-3">
                          <span className="text-sm font-medium text-slate-700 w-8">
                            {star} ★
                          </span>
                          <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-yellow-400"
                              style={{ width: `${Math.random() * 100}%` }}
                            />
                          </div>
                          <span className="text-sm text-slate-600 w-12 text-right">
                            {Math.floor(Math.random() * 500)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sample Review */}
                <div className="space-y-6">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="border border-slate-200 rounded-xl p-6"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, idx) => (
                                <Star
                                  key={idx}
                                  size={16}
                                  fill="#fbbf24"
                                  className="text-yellow-400"
                                />
                              ))}
                            </div>
                            <span className="font-semibold text-slate-900">
                              Excellent Product!
                            </span>
                          </div>
                          <p className="text-sm text-slate-600">
                            by Customer {i} • 2 days ago
                          </p>
                        </div>
                        <div className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
                          Verified Purchase
                        </div>
                      </div>
                      <p className="text-slate-700 leading-relaxed">
                        Great product with excellent build quality. Highly
                        recommended for anyone looking for premium quality at
                        this price point.
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
