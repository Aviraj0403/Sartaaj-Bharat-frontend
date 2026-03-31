import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ChevronRight, Sparkles, Heart, ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import ProductCard from "../../components/Product/ProductCard";
import { useProduct, useRecommendations, useWishlist } from "../../hooks";
import { useCartActions } from "../../hooks/useCartActions";

// Components
import ProductGallery from "./components/ProductGallery";
import ProductInfo from "./components/ProductInfo";
import ProductTabs from "./components/ProductTabs";

const ProductDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { addToCart } = useCartActions();

  const { data: product, isLoading, error } = useProduct(slug);
  const productData = product?.product || product?.data || product;

  const { data: recommendationsData, isLoading: isRecLoading } =
    useRecommendations(productData?._id || productData?.id, 4);
  const { isAuthenticated } = window.store?.getState()?.auth || {
    isAuthenticated: false,
  }; // fallback
  const { isWishlisted, addToWishlist, removeFromWishlist } = useWishlist();
  const inWishlist = isWishlisted(productData?._id || productData?.id);

  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const data = product?.product || product?.data || product;
    if (data && data._id) {
      setSelectedVariant(data.variants?.[0] || null);
      setActiveImage(0);
      window.scrollTo(0, 0);
    }
  }, [product]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 font-medium">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">
          Product Not Found
        </h2>
        <Link
          to="/"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  const images = productData?.images?.length > 0 ? productData.images : [productData?.image || productData?.pimage];
  const currentPrice = selectedVariant?.price || productData?.price || 0;
  const oldPrice = selectedVariant?.compareAtPrice || productData?.oldPrice || 0;
  const discount = productData?.discount || (oldPrice
    ? Math.round(((oldPrice - currentPrice) / oldPrice) * 100)
    : 0);

  const handleAddToCart = async () => {
    try {
      await addToCart(
        productData,
        selectedVariant?.size || "Standard",
        selectedVariant?.color || "Default",
        quantity,
        selectedVariant?._id,
      );
      toast.success(`${product.name} added to cart!`);
    } catch (err) {
      toast.error(err.message || "Failed to add to cart");
    }
  };

  const toggleWishlist = (e) => {
    e.stopPropagation();
    if (!product) return;

    if (inWishlist) {
      removeFromWishlist(product._id || product.id);
    } else {
      addToWishlist(product._id || product.id);
    }
  };

  return (
    <div className="bg-white min-h-screen pb-24 lg:pb-0">
      {/* Breadcrumb */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="container-custom py-3">
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <Link to="/" className="hover:text-blue-600 transition-colors">
              Home
            </Link>
            <ChevronRight size={14} />
            <Link
              to={`/category/${productData?.category?.slug || productData?.categoryId?.slug || ""}`}
              className="hover:text-blue-600 transition-colors"
            >
              {productData?.category?.name || productData?.categoryId?.name || "Category"}
            </Link>
            <ChevronRight size={14} />
            <span className="text-slate-900 font-medium truncate">
              {product.name}
            </span>
          </div>
        </div>
      </div>

      <div className="container-custom py-4 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
          <ProductGallery
            images={images}
            activeImage={activeImage}
            setActiveImage={setActiveImage}
            product={product}
            discount={discount}
            inWishlist={inWishlist}
            toggleWishlist={toggleWishlist}
          />

          <ProductInfo
            product={productData}
            selectedVariant={selectedVariant}
            setSelectedVariant={setSelectedVariant}
            currentPrice={currentPrice}
            oldPrice={oldPrice}
            discount={discount}
            quantity={quantity}
            setQuantity={setQuantity}
            handleAddToCart={handleAddToCart}
          />
        </div>

        <ProductTabs
          product={productData}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          showFullDesc={showFullDesc}
          setShowFullDesc={setShowFullDesc}
        />

        {/* Related Products / Recommendations */}
        <div className="mt-16 md:mt-24 border-t border-slate-100 pt-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
            <div className="text-center md:text-left">
              <span className="text-[10px] font-black text-blue-600 tracking-[0.3em] uppercase mb-1 block italic">
                Related Selection
              </span>
              <h2 className="text-2xl md:text-4xl font-black text-slate-950 tracking-tighter italic uppercase">
                Recommended <span className="text-blue-600">For You</span>
              </h2>
            </div>
            <Link
              to={`/category/${product.categoryId?.slug || ""}`}
              className="bg-slate-50 text-slate-900 px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all shadow-sm flex items-center gap-3 italic border border-slate-100"
            >
              View Entire Collection <ChevronRight size={14} strokeWidth={3} />
            </Link>
          </div>

          {!isRecLoading &&
          (!recommendationsData ||
            (Array.isArray(recommendationsData)
              ? recommendationsData.length === 0
              : recommendationsData?.products?.length === 0)) ? (
            <div className="bg-slate-50 rounded-[3rem] p-16 text-center border border-dashed border-slate-200">
              <Sparkles
                className="mx-auto text-slate-300 mb-6"
                size={48}
                strokeWidth={1}
              />
              <h3 className="text-xl font-black text-slate-400 uppercase tracking-widest italic mb-2">
                No Similar Artifacts Found
              </h3>
              <p className="text-slate-400 text-sm font-medium italic">
                Our curator is still cataloging related items for this specified
                protocol.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {isRecLoading
                ? [...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="aspect-[4/5] bg-slate-50 animate-pulse rounded-[2rem]"
                    ></div>
                  ))
                : (Array.isArray(recommendationsData)
                    ? recommendationsData
                    : recommendationsData?.products || []
                  )
                    .slice(0, 4)
                    .map((p) => (
                      <ProductCard key={p._id || p.id} product={p} />
                    ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Sticky Footer */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-16 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-slate-200 p-4 lg:hidden z-40 shadow-[0_-10px_30px_rgba(0,0,0,0.1)]"
      >
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <span className="text-[8px] font-black uppercase tracking-widest text-slate-400 leading-none block mb-1">
              Premium Collection
            </span>
            <span className="text-xs font-black text-slate-900 truncate block tracking-tight italic uppercase">
              {product.name}
            </span>
            <span className="text-blue-600 font-bold text-xs italic">
              ₹{(selectedVariant?.price || productData?.price || 0).toLocaleString()}
            </span>
          </div>
          <button
            onClick={toggleWishlist}
            className={`w-12 h-12 rounded-xl flex items-center justify-center border-2 transition-all ${
              inWishlist
                ? "bg-red-50 border-red-500 text-red-500"
                : "border-slate-200 text-slate-400"
            }`}
          >
            <Heart size={18} fill={inWishlist ? "currentColor" : "none"} />
          </button>
          <button
            onClick={handleAddToCart}
            className="bg-slate-900 text-white px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 shadow-xl italic"
          >
            <ShoppingCart size={16} />
            Add to Cart
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductDetails;
