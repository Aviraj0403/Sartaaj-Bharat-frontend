import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import axios from "../utils/Axios";
import { useDispatch } from "react-redux";
import { clearCartThunk } from "../features/cart/cartThunk";
import AddressSidebar from "./AddressSidebar";

export default function CheckoutPage() {
  const { user } = useAuth();
  const isAuthenticated = !!user;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const {
    cartItems = [],
    totalAmount = 0,
    totalQuantity = 0,
    grandTotal = 0,
    appliedCoupon = null,
    finalAmount = grandTotal,
  } = location.state || {};

  const displayShipping = (finalAmount && finalAmount > 10) ? 80 : 0;

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchAddresses = async () => {
      try {
        const { data } = await axios.get("/users/getaddresses", { withCredentials: true });
        setAddresses(data.data || []);
      } catch (err) {
        toast.error("Failed to load addresses");
      }
    };
    fetchAddresses();
  }, [isAuthenticated, isSidebarOpen]);

  useEffect(() => {
    if (addresses.length > 0 && !selectedAddress) {
      const defaultAddr = addresses.find(a => a.isDefault);
      setSelectedAddress(defaultAddr || addresses[0]);
    }
  }, [addresses]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  const refreshAddresses = () => setIsSidebarOpen(false);

  const placeOrder = async (paymentMethod = "COD") => {
    if (!isAuthenticated) return toast.warn("Please login first"), navigate("/signin");
    if (!selectedAddress) return toast.warn("Please select a delivery address");

    setIsPlacingOrder(true);
    const shipping = (finalAmount && finalAmount > 10) ? 80 : 0;

    const payload = {
      items: cartItems.map(item => ({
        product: item.id,
        selectedVariant: {
          size: item.size,
          price: Number(item.price),
          color: item.color || "standard"
        },
        quantity: item.quantity
      })),
      shippingAddress: {
        label: selectedAddress.label || selectedAddress.type || "Home",
        name: selectedAddress.name || user.userName || "Customer",
        email: user.email,
        phoneNumber: selectedAddress.phoneNumber,
        street: selectedAddress.street || selectedAddress.flat || "",
        city: selectedAddress.city,
        state: selectedAddress.state,
        postalCode: selectedAddress.pincode || selectedAddress.postalCode,
        country: selectedAddress.country || "India",
        location: selectedAddress.location || { type: "Point", coordinates: [0, 0] },
      },
      paymentMethod,
      discountCode: appliedCoupon?.code || null,
      totalAmount: Number(grandTotal),
      shipping,
      gst: 0,
    };

    if (paymentMethod === "Razorpay") {
      initiateRazorpay(payload);
    } else {
      await submitOrder(payload);
    }
  };

  const initiateRazorpay = async (orderPayload) => {
    try {
      const { data } = await axios.post("/razorpay/createRazorpayOrder", {
        amount: Math.round(grandTotal),
        userId: user.id,
      }, { withCredentials: true });

      const options = {
        key: data.key_id,
        amount: data.amount * 100,
        currency: "INR",
        order_id: data.order_id,
        name: "Gurmeet Kaur Store",
        description: "Thank you for shopping!",
        handler: async (response) => {
          try {
            // First verify payment
            const verified = await axios.post("/razorpay/verifyPayment", {
              payment_id: response.razorpay_payment_id,
              order_id: response.razorpay_order_id,
              signature: response.razorpay_signature,
              paymentId: data.paymentId,
            }, { withCredentials: true });

            if (verified.data.message === "Payment verified successfully") {
              // CRITICAL FIX: Pass paymentId to order creation
              await submitOrder({ 
                ...orderPayload, 
                paymentMethod: "Razorpay",
                paymentId: data.paymentId  // ✅ This was missing!
              });
            } else {
              toast.error("Payment verification failed. Contact support with Payment ID: " + response.razorpay_payment_id);
              setIsPlacingOrder(false);
            }
          } catch (err) {
            console.error("Payment verification error:", err);
            toast.error("Payment verification failed. Your payment is safe. Contact support with Payment ID: " + response.razorpay_payment_id);
            setIsPlacingOrder(false);
          }
        },
        modal: {
          ondismiss: function() {
            toast.info("Payment cancelled");
            setIsPlacingOrder(false);
          }
        },
        prefill: {
          name: user.userName || "Customer",
          email: user.email,
          contact: selectedAddress.phoneNumber,
        },
        theme: { color: "#ec4899" },
      };

      const rzp = new window.Razorpay(options);
      
      // Handle payment failure
      rzp.on('payment.failed', function (response) {
        console.error('Payment failed:', response.error);
        toast.error(`Payment failed: ${response.error.description}`);
        setIsPlacingOrder(false);
      });

      rzp.open();
    } catch (err) {
      console.error("Razorpay initiation error:", err);
      toast.error("Payment gateway error. Please try again.");
      setIsPlacingOrder(false);
    }
  };

  const submitOrder = async (payload) => {
    try {
      console.log("Submitting order with payload:", payload);
      
      const res = await axios.post("/orders/createOrder", payload, { 
        withCredentials: true,
        timeout: 30000 // 30 second timeout
      });

      // Clear cart only after successful order creation
      await dispatch(clearCartThunk());
      
      toast.success("Order placed successfully!");
      const orderId = res.data.order._id;
      navigate(`/invoice/${orderId}`, { state: { order: res.data.order } });
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to place order";
      console.error("Order creation error:", err.response?.data || err);
      
      // If payment was already made, show special message
      if (payload.paymentMethod === "Razorpay" && payload.paymentId) {
        toast.error(`Order creation failed but payment was successful. Please contact support with Payment ID for assistance.`);
      } else {
        toast.error(msg);
      }
    } finally {
      setIsPlacingOrder(false);
    }
  };

  return (
    <div className="min-h-screen bg-pink-50 flex justify-center items-start p-4 sm:p-8">
      <AddressSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        refreshAddresses={refreshAddresses}
        userName={user?.userName || ""}
        email={user?.email || ""}
      />

      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-md rounded-2xl p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">Shipping Information</h2>

          <div className="space-y-4 mb-6">
            {addresses.length > 0 ? (
              addresses.map(addr => (
                <label
                  key={addr._id}
                  className={`block border-2 rounded-xl p-4 cursor-pointer transition ${
                    selectedAddress?._id === addr._id
                      ? "border-pink-500 bg-pink-50"
                      : "border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="address"
                      checked={selectedAddress?._id === addr._id}
                      onChange={() => setSelectedAddress(addr)}
                      className="mt-1 text-pink-500"
                    />
                    <div>
                      <p className="font-semibold text-gray-800">
                        {addr.label || addr.type} ({addr.phoneNumber})
                        {addr.isDefault && <span className="text-sm text-gray-500 ml-2">(Default)</span>}
                      </p>
                      <p className="text-sm text-gray-600">
                        {addr.street || addr.flat}, {addr.city}, {addr.state} - {addr.pincode || addr.postalCode}
                      </p>
                    </div>
                  </div>
                </label>
              ))
            ) : (
              <p className="text-center text-gray-500">No saved addresses</p>
            )}
          </div>

          <div className="text-center mb-8">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="bg-pink-500 text-white font-semibold px-4 py-2 md:px-6 md:py-3 rounded-lg hover:bg-pink-600 shadow-md transition"
            >
              + Add New Address
            </button>
          </div>

          <h3 className="text-center font-semibold mb-4">Payment Method</h3>

          <div className="flex justify-center gap-3 flex-nowrap">
            <button
              onClick={() => placeOrder("Razorpay")}
              disabled={isPlacingOrder}
              className="bg-pink-500 text-white font-semibold px-4 py-2 md:px-8 md:py-3 rounded-lg hover:bg-pink-600 disabled:opacity-60 whitespace-nowrap"
            >
              {isPlacingOrder ? "Processing..." : "Pay Online"}
            </button>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">Order Summary</h2>
          <div className="space-y-3">
            {cartItems.map(item => (
              <div key={item.id + item.size + item.color} className="flex justify-between text-gray-700">
                <span>
                  {item.name} 
                  ({item.size ? `${item.size}` : "N/A"}
                  {item.color ? `, ${item.color}` : ""} )
                  × {item.quantity}
                </span>
                <span className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}

            <div className="border-t pt-4">
              <div className="flex justify-between">
                <span>Total Items:</span>
                <span className="font-semibold">{totalQuantity}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Shipping:</span>
                <span>₹{displayShipping.toFixed(2)}</span>
              </div>
              {appliedCoupon && (
                <div className="flex justify-between text-green-600">
                  <span>Coupon: {appliedCoupon.code}</span>
                  <span>{appliedCoupon.discountPercentage}%</span>
                </div>
              )}
              <div className="flex justify-between text-xl font-bold text-gray-800 mt-4 border-t pt-4">
                <span>Total Payable:</span>
                <span className="text-pink-600">₹{Number(grandTotal).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}