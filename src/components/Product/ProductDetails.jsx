import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Star, Heart, Share2, Truck, ShieldCheck, ArrowLeft, Minus, Plus, ShoppingCart } from "lucide-react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { products } from "../../data/mockData";

const ProductDetails = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");

  useEffect(() => {
    // Find product by slug
    const foundProduct = products.find((p) => p.slug === slug);
    if (foundProduct) {
      setProduct(foundProduct);
      setActiveImage(foundProduct.image);
    }
  }, [slug]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const handleQuantity = (type) => {
    if (type === "dec") {
      setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
    } else {
      setQuantity((prev) => prev + 1);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100 py-4">
        <div className="container-custom flex items-center gap-2 text-sm text-gray-500">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <span>/</span>
          <span className="capitalize">{product.category.replace('-', ' ')}</span>
          <span>/</span>
          <span className="text-gray-900 font-medium truncate max-w-xs">{product.name}</span>
        </div>
      </div>

      <div className="container-custom py-12">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

            {/* Left: Image Gallery */}
            <div className="space-y-4">
              <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden border border-gray-100 flex items-center justify-center p-4">
                <img src={activeImage} alt={product.name} className="w-full h-full object-contain" />
              </div>
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                <button
                  onClick={() => setActiveImage(product.image)}
                  className={`w-20 h-20 rounded-md border-2 overflow-hidden flex-shrink-0 p-2 ${activeImage === product.image ? 'border-blue-600' : 'border-gray-200 hover:border-gray-300'}`}
                >
                  <img src={product.image} className="w-full h-full object-contain" />
                </button>
                {product.images?.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`w-20 h-20 rounded-md border-2 overflow-hidden flex-shrink-0 p-2 ${activeImage === img ? 'border-blue-600' : 'border-gray-200 hover:border-gray-300'}`}
                  >
                    <img src={img} className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Product Info */}
            <div>
              <div className="mb-2 text-blue-600 text-sm font-medium uppercase tracking-wide">
                {product.category.replace("-", " ")}
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex text-yellow-400 text-sm">
                  {'★'.repeat(Math.round(product.rating))}
                  <span className="text-gray-300">{'★'.repeat(5 - Math.round(product.rating))}</span>
                </div>
                <span className="text-gray-500 text-sm">(124 Reviews)</span>
                <div className="w-px h-4 bg-gray-300"></div>
                <span className="text-green-600 text-sm font-medium flex items-center gap-1">
                  <ShieldCheck size={16} /> In Stock
                </span>
              </div>

              <div className="flex items-end gap-3 mb-8">
                <span className="text-4xl font-bold text-blue-600">₹{product.price.toFixed(2)}</span>
                {product.oldPrice && (
                  <div className="mb-1">
                    <span className="text-gray-400 line-through text-lg">₹{product.oldPrice.toFixed(2)}</span>
                    <span className="ml-2 bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded">
                      -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
                    </span>
                  </div>
                )}
              </div>

              <p className="text-gray-600 leading-relaxed mb-8">
                {product.description || "Experience the best of technology with this premium device. Featuring a stunning display, powerful processor, and long-lasting battery life."}
              </p>

              <div className="border-t border-b border-gray-100 py-6 mb-8">
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Quantity */}
                  <div className="flex items-center border border-gray-300 rounded-lg w-fit">
                    <button onClick={() => handleQuantity('dec')} className="p-3 hover:bg-gray-50 text-gray-600"><Minus size={18} /></button>
                    <span className="w-12 text-center font-medium">{quantity}</span>
                    <button onClick={() => handleQuantity('inc')} className="p-3 hover:bg-gray-50 text-gray-600"><Plus size={18} /></button>
                  </div>

                  {/* Add to Cart */}
                  <button className="flex-1 bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition flex items-center justify-center gap-2">
                    <ShoppingCart size={20} /> Add to Cart
                  </button>

                  {/* Wishlist */}
                  <button className="p-3 border border-gray-300 rounded-lg hover:border-blue-600 hover:text-blue-600 transition">
                    <Heart size={24} />
                  </button>
                </div>
              </div>

              <div className="flex gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Truck size={18} /> Free Delivery
                </div>
                <div className="flex items-center gap-2">
                  <Share2 size={18} /> Share
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-16">
            <div className="flex border-b border-gray-200 mb-8">
              {['description', 'details', 'reviews'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-8 py-4 font-medium text-sm transition relative ${activeTab === tab ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'
                    }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  {activeTab === tab && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"></span>}
                </button>
              ))}
            </div>

            <div className="prose max-w-none text-gray-600">
              {activeTab === 'description' && (
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  <br /><br />
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
              )}
              {activeTab === 'details' && (
                <ul className="list-disc pl-5 space-y-2">
                  <li>Brand: {product.category === 'apple' ? 'Apple' : 'Samsung'}</li>
                  <li>Model: {product.name}</li>
                  <li>Condition: New</li>
                  <li>Warranty: 1 Year Manufacturer Warranty</li>
                </ul>
              )}
              {activeTab === 'reviews' && (
                <div className="p-4 bg-gray-50 rounded text-center">
                  No reviews yet. Be the first to review!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetails;