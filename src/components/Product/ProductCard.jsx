import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Eye } from 'lucide-react';
import { toast } from 'react-toastify';
import QuickViewModal from './QuickViewModal';

const ProductCard = ({ product }) => {
  const [showQuickView, setShowQuickView] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault(); // Prevent navigation if clicking button inside Link
    toast.success(`${product.name} added to cart!`, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <>
      <div className="bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-2xl hover:border-blue-100 transition-all duration-500 group relative card-hover">
        {/* Image Area */}
        <div className="relative h-72 overflow-hidden bg-gray-50 flex items-center justify-center p-6">
          {/* Badges */}
          <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
            {product.isNew && (
              <span className="bg-gray-900 text-white text-[10px] uppercase font-bold px-3 py-1 rounded-full shadow-lg">New</span>
            )}
            {product.oldPrice && (
              <span className="bg-red-500 text-white text-[10px] uppercase font-bold px-3 py-1 rounded-full shadow-lg">
                -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
              </span>
            )}
          </div>

          {/* Product Image */}
          <Link to={`/product/${product.slug}`} className="block w-full h-full relative">
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110 mix-blend-multiply"
            />
            {/* Secondary Image on Hover */}
            {product.images && product.images[0] && (
              <img
                src={product.images[0]}
                alt={product.name}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-contain opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gray-50 mix-blend-multiply"
              />
            )}
          </Link>

          {/* Quick Actions overlay */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col gap-3 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-300 delay-75">
            <button
              className="p-3 bg-white text-gray-600 rounded-full shadow-lg hover:bg-blue-600 hover:text-white transition-all hover:scale-110"
              title="Add to Wishlist"
            >
              <Heart size={18} />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                setShowQuickView(true);
              }}
              className="p-3 bg-white text-gray-600 rounded-full shadow-lg hover:bg-blue-600 hover:text-white transition-all hover:scale-110"
              title="Quick View"
            >
              <Eye size={18} />
            </button>
          </div>

          {/* Add to Cart Button (Slide up) */}
          <div className="absolute bottom-0 left-0 w-full p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <button
              onClick={handleAddToCart}
              className="w-full bg-gray-900 text-white py-3 rounded-lg font-bold text-sm hover:bg-blue-600 transition flex items-center justify-center gap-2 shadow-xl"
            >
              <ShoppingCart size={16} /> Add to Cart
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-5">
          <div className="mb-2 min-h-[20px]">
            {/* Simple star rating display */}
            <div className="flex text-yellow-400 text-xs">
              {'★'.repeat(Math.round(product.rating))}
              <span className="text-gray-200">{'★'.repeat(5 - Math.round(product.rating))}</span>
            </div>
          </div>

          <h3 className="text-gray-900 font-bold text-base mb-3 leading-snug line-clamp-2 hover:text-blue-600 transition cursor-pointer">
            <Link to={`/product/${product.slug}`}>{product.name}</Link>
          </h3>

          <div className="flex items-center gap-3">
            <span className="text-blue-600 font-extrabold text-xl">₹{product.price.toFixed(2)}</span>
            {product.oldPrice && (
              <span className="text-gray-400 text-sm line-through">₹{product.oldPrice.toFixed(2)}</span>
            )}
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      {showQuickView && (
        <QuickViewModal product={product} onClose={() => setShowQuickView(false)} />
      )}
    </>
  );
};

export default ProductCard;
