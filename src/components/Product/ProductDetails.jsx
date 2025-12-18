import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaStar, FaHeart } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { getProductBySlug } from "../../services/productApi";
import RelatedProduct from "../../pages/home/RelatedProduct";
import { useCartActions } from "../../hooks/useCartActions";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ReviewTab from "../../pages/Review/ReviewTab"; 

export default function ProductDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [mainImage, setMainImage] = useState(null);
  const [activeTab, setActiveTab] = useState("description");
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
const [popupMessage, setPopupMessage] = useState("");

useEffect(() => {
  if (showPopup) {
    const timer = setTimeout(() => {
      setShowPopup(false);
    }, 10000); // 1.5 sec

    return () => clearTimeout(timer);
  }
}, [showPopup]);

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
      setSelectedColor(product.variants[0]?.color[0]);
      setQuantity(1);
      setActiveTab("description");
    }
  }, [product]);

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
    reviews
  } = product;

  const handleVariantSelect = (variant) => {
    setSelectedVariant(variant);
    setSelectedColor(variant.color[0]);
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  // 🔧 FIX: Correct data structure for addToCart
 const handleAddToCart = async () => {
  if (!selectedVariant || !selectedColor) {
    alert("Please select size and color");
    return;
  }

  const response = await addToCart(
    {
      _id: product._id,
      name: product.name,
      pimage: pimages[0],
      variants: {
        price: selectedVariant.price,
        size: selectedVariant.size,
        color: selectedColor
      },
    },
    selectedVariant.size,
    selectedColor,
    quantity
  );

  if (response.success) {
    setPopupMessage(
      `${name} (${selectedVariant.size}, ${selectedColor}) added to cart successfully!`
    );
    setShowPopup(true);
  } else {
    alert("Failed to add to cart");
  }
};

  const handleBuyNow = async () => {
    // ✅ Popup helpers
const popupImage =
  selectedVariant?.images?.[0] ||
  product?.pimages?.[0];

const popupPrice = selectedVariant?.price;

  if (!selectedVariant || !selectedColor) {
    alert("Please select size and color");
    return;
  }

  const response = await addToCart(
    {
      _id: product._id,
      name: product.name,
      pimage: pimages[0],
      variants: {
        price: selectedVariant.price,
        size: selectedVariant.size,
        color: selectedColor
      },
    },
    selectedVariant.size,
    selectedColor,
    quantity
  );

  if (response.success) {
    setPopupMessage("Product added to cart successfully!");
    setShowPopup(true);
    setTimeout(() => navigate("/cart"), 1200);
  } else {
    alert("Failed to add to cart");
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

            <div className="relative w-full lg:w-[80%] flex justify-center mb-4 lg:mb-0 order-1 lg:order-2">
              <div className="w-full max-h-[22rem] flex justify-center items-center bg-white rounded-xl border border-gray-200 relative overflow-hidden">
                <FaHeart className="absolute top-4 right-4 text-pink-500 cursor-pointer text-xl" />
                <img
                  src={mainImage}
                  alt="Product"
                  className="max-h-[22rem] w-auto max-w-full object-contain transition-transform duration-300 hover:scale-105"
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

            <p className="text-gray-600 text-sm mb-4 leading-relaxed">{description}</p>

            {/* Variants */}
            <div className="mb-5">
              <p className="text-gray-700 font-medium mb-2">Size</p>
              <div className="flex gap-2 flex-wrap mb-3">
                {variants.map((variant, i) => (
                  <button
                    key={i}
                    onClick={() => handleVariantSelect(variant)}
                    className={`border border-gray-300 rounded-md px-3 py-1 text-sm hover:border-pink-500 hover:text-pink-500 transition ${
                      selectedVariant?.size === variant.size ? "bg-pink-100 border-pink-500" : ""
                    }`}
                  >
                    {variant.size}
                  </button>
                ))}
              </div>

              <p className="text-gray-700 font-medium mb-2">Color</p>
              <div className="flex gap-2 flex-wrap">
                {selectedVariant?.color.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => handleColorSelect(color)}
                    className={`border border-gray-300 rounded-md px-3 py-1 text-sm hover:border-pink-500 hover:text-pink-500 transition text-left min-w-[64px] max-w-[200px] ${
                      selectedColor === color ? "bg-pink-100 border-pink-500 text-pink-600 font-medium" : ""
                    }`}
                  >
                    <span className="block line-clamp-2 leading-tight">{color}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector - 🔧 NOW FUNCTIONAL */}
            {/* <div className="mb-4">
              <p className="text-gray-700 font-medium mb-2">Quantity</p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="border border-gray-300 rounded-md px-3 py-1 hover:bg-gray-100"
                >
                  -
                </button>
                <span className="text-lg font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="border border-gray-300 rounded-md px-3 py-1 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div> */}

            {/* Buttons */}
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
              <ReviewTab productId={product._id} reviews={reviews} setReviews={(newReviews) => product.reviews = newReviews} />
            </div>
          )}
        </div>
{showPopup && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
    <div className="bg-white rounded-2xl px-6 py-5 shadow-2xl flex flex-col items-center gap-4 text-center max-w-[90%] md:max-w-md">

      {/* Success Icon */}
      <div className="bg-green-100 text-green-600 w-14 h-14 rounded-full flex items-center justify-center text-2xl">
        ✓
      </div>

      {/* Product Image */}
      <img
        src={mainImage}
        alt={product.name}
        className="w-24 h-24 object-contain rounded-md border"
      />

      {/* Product Details */}
      <div className="text-left w-full px-4">
        <p className="font-semibold text-gray-800 text-sm">
          {product.name}
        </p>
        <p className="text-xs text-gray-600">
          Size: {selectedVariant?.size}
        </p>
        <p className="text-xs text-gray-600">
          Color: {selectedColor}
        </p>
        <p className="text-pink-500 font-semibold text-sm mt-1">
          ₹{selectedVariant?.price}
        </p>
      </div>

      {/* Message */}
      <p className="text-green-600 font-medium text-sm">
        Added to cart successfully!
      </p>

      {/* Buttons – SMALL TEXT + ONE LINE */}
      <div className="flex gap-3 w-full px-4">
        <button
          onClick={() => navigate("/cart")}
          className="flex-1 bg-pink-500 text-white py-2 rounded-lg text-sm font-medium"
        >
          Go to Cart
        </button>

        <button
          onClick={() => setShowPopup(false)}
          className="flex-1 border py-2 rounded-lg text-sm font-medium"
        >
          Continue
        </button>
      </div>
    </div>
  </div>
)}



        {/* Related Products */}
        <RelatedProduct categorySlug={category.slug} />
      </div>
    </div>
  );
}