// src/pages/product/ProductDetails.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaStar, FaHeart } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { getProductBySlug } from "../../services/productApi";
import RelatedProduct from "../../pages/home/RelatedProduct";
import { useCartActions } from "../../hooks/useCartActions";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ReviewTab from "../Product/ReviewTab"; 

export default function ProductDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [mainImage, setMainImage] = useState(null);
  const [activeTab, setActiveTab] = useState("description");
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const { cartItems, addToCart } = useCartActions();

  // Fetch product
  const { data, isLoading, error } = useQuery({
    queryKey: ["product", slug],
    queryFn: () => getProductBySlug(slug),
    enabled: !!slug,
  });

  const product = data?.product;

  // Reset state when product changes (slug changes)
  useEffect(() => {
    if (product?.pimages?.length > 0 && product?.variants?.length > 0) {
      setMainImage(product.pimages[0]);
      setSelectedVariant(product.variants[0]);
      setQuantity(1);
      setActiveTab("description");
    }
  }, [product]); // Re-run when product data changes

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading product details</div>;
  if (!product) return <div>No product found</div>;

  const {
    name,
    category,
    description,
    variants,
    pimages,
    rating,
    reviewCount,
    productCode,
    tags,
    additionalInfo,
  } = product;
  

  const handleSizeSelect = (variant) => {
    setSelectedVariant(variant);
  };

  const handleAddToCart = async () => {
    if (!selectedVariant) return;

    const response = await addToCart(
      {
        _id: product._id,
        name: product.name,
        pimage: selectedVariant.image || pimages[0],
        variants: selectedVariant,
      },
      selectedVariant.size,
      quantity
    );

    if (response.success) {
      toast.success(`${name} (${selectedVariant.size}) added to cart!`, {
        position: "top-right",
        autoClose: 2000,
      });
    } else {
      toast.error(`Failed to add to cart: ${response.error}`, {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  const handleBuyNow = async () => {
    if (!selectedVariant) return;

    const response = await addToCart(
      {
        _id: product._id,
        name: product.name,
        pimage: selectedVariant.image || pimages[0],
        variants: selectedVariant,
      },
      selectedVariant.size,
      quantity
    );

    if (response.success) {
      toast.success(`${name} (${selectedVariant.size}) added to cart!`, {
        position: "top-right",
        autoClose: 2000,
      });
      navigate("/cart");
    } else {
      toast.error(`Failed to add to cart: ${response.error}`, {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="bg-white min-h-screen py-5 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* LEFT — IMAGE GALLERY */}
          <div className="flex-1 flex flex-col lg:flex-row items-center lg:items-start">
            <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible scrollbar-hide py-2 w-full lg:w-auto lg:mr-4 order-2 lg:order-1">
              {pimages.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`thumb-${i}`}
                  onClick={() => setMainImage(img)}
                  className={`w-16 h-16 sm:w-20 sm:h-20 object-contain border-2 rounded-md cursor-pointer transition-transform duration-200 hover:scale-105 ${
                    mainImage === img ? "border-pink-500" : "border-gray-200"
                  }`}
                />
              ))}
            </div>

            {/* Main Image */}
            <div className="relative w-full lg:w-[80%] flex justify-center mb-4 lg:mb-0 order-1 lg:order-2">
              <div className="w-full h-72 sm:h-80 lg:h-[22rem] flex justify-center items-center bg-gray-50 rounded-xl border border-gray-200 relative">
                <FaHeart className="absolute top-4 right-4 text-pink-500 cursor-pointer text-xl" />
                <img
                  src={mainImage}
                  alt="Product"
                  className="h-full object-contain transition-transform duration-300 hover:scale-105"
                />
              </div>
            </div>
          </div>

          {/* RIGHT — PRODUCT INFO */}
          <div className="flex-1">
            <p className="text-sm text-gray-500 mb-1">{category.name}</p>
            <h1 className="text-2xl font-semibold text-gray-800 mb-2">{name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex">
                {Array.from({ length: 5 }, (_, i) => (
                  <FaStar
                    key={i}
                    className={`${
                      i < Math.round(rating) ? "text-yellow-400" : "text-gray-300"
                    } text-sm`}
                  />
                ))}
              </div>
              <span className="text-gray-600 text-sm">
                ({reviewCount || Math.floor(Math.random() * 450)} Reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mb-4">
              <p className="text-2xl font-bold text-pink-500">₹{selectedVariant?.price}</p>
              <p className="text-gray-400 line-through">
                ₹{selectedVariant?.realPrice?.toFixed(2)}
              </p>
              <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-md">
                In Stock
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-sm mb-4 leading-relaxed">{description}</p>

            {/* Variants */}
           <div className="mb-5">
  <p className="text-gray-700 font-medium mb-2">Variants</p>

  {/* Size Selection */}
  <div className="flex gap-2 mb-3">
    {variants.map((variant, i) => (
      <button
        key={i}
        onClick={() => handleSizeSelect(variant)}
        className={`border border-gray-300 rounded-md px-3 py-1 text-sm hover:border-pink-500 hover:text-pink-500 transition ${
          selectedVariant?.size === variant.size ? "bg-pink-100" : ""
        }`}
      >
        {variant.size}
      </button>
    ))}
  </div>

  {/* Color Selection */}
  <p className="text-gray-700 font-medium mb-2">Color</p>
  <div className="flex gap-2">
    {variants.map((variant, i) => (
      <button
        key={i}
        onClick={() => handleColorSelect(variant)}
        className={`border border-gray-300 rounded-md px-3 py-1 text-sm hover:border-pink-500 hover:text-pink-500 transition ${
          selectedVariant?.color === variant.color ? "bg-pink-100" : ""
        }`}
        style={{ backgroundColor: variant.color }} // If you want to display color as background
      >
        {variant.color}
      </button>
    ))}
  </div>
</div>


            {/* Quantity + Buttons */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
              <div className="flex flex-col sm:flex-row gap-3 w-full">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 rounded-lg transition"
                >
                  Add to Cart
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex-1 border border-pink-500 text-pink-500 font-semibold py-2 rounded-lg hover:bg-pink-50 transition"
                >
                  Buy Now
                </button>
              </div>
            </div>

            {/* SKU + Tags */}
            <div className="text-sm text-gray-500 space-y-1">
              <p>
                <span className="font-medium text-gray-700">SKU:</span> {productCode}
              </p>
              <p>
                <span className="font-medium text-gray-700">Tags:</span> {tags.join(", ")}
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-10 border-t border-gray-200 pt-6">
          <div className="flex gap-8 border-b border-gray-200 pb-2 mb-6 overflow-x-auto">
            {["description", "additional", "review"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-2 font-medium capitalize ${
                  activeTab === tab
                    ? "text-pink-500 border-b-2 border-pink-500"
                    : "text-gray-500 hover:text-pink-500"
                }`}
              >
                {tab === "additional" ? "Additional Information" : tab}
              </button>
            ))}
          </div>

          {activeTab === "description" && (
            <div className="text-gray-600 text-sm leading-relaxed">{description}</div>
          )}
          {activeTab === "additional" && (
            <table className="w-full text-sm text-gray-700 border">
              <tbody>
                <tr className="border-b">
                  <td className="p-3 font-medium w-1/3">Skin Type</td>
                  <td className="p-3">{additionalInfo.skinType}</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3 font-medium">Shelf Life</td>
                  <td className="p-3">{additionalInfo.shelfLife} months</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3 font-medium">Application Time</td>
                  <td className="p-3">{additionalInfo.applicationTime || "Morning to Evening"}</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Concern</td>
                  <td className="p-3">{additionalInfo?.usageInstructions || "NA"}</td>
                </tr>
              </tbody>
            </table>
          )}
          {activeTab === "review" && (
            <div className="text-gray-600 text-sm">
              <ReviewTab productId={product._id} reviews={product.reviews} setReviews={(newReviews) => product.reviews = newReviews} />
            </div>
          )}
        </div>

        {/* Related Products */}
        <RelatedProduct categorySlug={category.slug} />
      </div>
    </div>
  );
}