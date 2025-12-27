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

  // ✅ CHECK PENDING PAYMENTS ON LOAD
  useEffect(() => {
    const checkPendingPayments = async () => {
      const pendingPayment = localStorage.getItem('pendingPaymentData');
      if (pendingPayment && isAuthenticated) {
        try {
          const data = JSON.parse(pendingPayment);
          const timeDiff = Date.now() - new Date(data.timestamp).getTime();
          
          // If less than 15 minutes old, check status
          if (timeDiff < 15 * 60 * 1000) {
            console.log("🔍 Found pending payment, checking status...");
            
            const { data: statusData } = await axios.post('/razorpay/check-payment-status', {
              paymentId: data.paymentId
            }, { withCredentials: true });

            if (statusData.success) {
              if (statusData.payment.hasOrder) {
                // Order exists, clean up and redirect
                toast.success("Previous order found!");
                localStorage.removeItem('pendingPaymentData');
                localStorage.removeItem('pendingCartData');
                setTimeout(() => navigate(`/invoice/${statusData.payment.orderId}`), 1500);
              } else if (statusData.payment.isOrphaned) {
                // Payment done but no order - auto recover
                toast.info("Recovering your previous payment...");
                await recoverPendingPayment(data);
              }
            }
          } else {
            // Too old, clean up
            localStorage.removeItem('pendingPaymentData');
            localStorage.removeItem('pendingCartData');
          }
        } catch (err) {
          console.error("Error checking pending payment:", err);
        }
      }
    };

    checkPendingPayments();
  }, [isAuthenticated, navigate]);

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

  // ✅ RECOVER PENDING PAYMENT
  const recoverPendingPayment = async (pendingData) => {
    try {
      const cartData = JSON.parse(localStorage.getItem('pendingCartData') || '{}');
      
      if (!cartData.items || cartData.items.length === 0) {
        toast.error("Cart data not found. Please contact support.");
        return;
      }

      const { data } = await axios.post("/razorpay/create-order-after-payment", {
        paymentId: pendingData.paymentId,
        items: cartData.items,
        shippingAddress: cartData.shippingAddress,
        discountCode: cartData.discountCode,
        totalAmount: cartData.totalAmount
      }, { withCredentials: true });

      if (data.success) {
        toast.success("Order recovered successfully!");
        localStorage.removeItem('pendingPaymentData');
        localStorage.removeItem('pendingCartData');
        await dispatch(clearCartThunk());
        navigate(`/invoice/${data.order._id}`, { state: { order: data.order } });
      }
    } catch (err) {
      console.error("Recovery failed:", err);
      toast.error("Auto-recovery failed. Please contact support with Payment ID.");
    }
  };

  const placeOrder = async (paymentMethod = "COD") => {
    if (!isAuthenticated) {
      toast.warn("Please login first");
      return navigate("/signin");
    }
    if (!selectedAddress) {
      return toast.warn("Please select a delivery address");
    }

    setIsPlacingOrder(true);

    const orderPayload = {
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
      discountCode: appliedCoupon?.code || null,
      totalAmount: Number(grandTotal),
    };

    if (paymentMethod === "Razorpay") {
      initiateRazorpay(orderPayload);
    } else {
      // COD flow would go here
      setIsPlacingOrder(false);
    }
  };

  const initiateRazorpay = async (orderPayload) => {
    try {
      console.log("💳 Initiating Razorpay payment...");

      // ✅ CRITICAL: Save cart data BEFORE payment
      localStorage.setItem('pendingCartData', JSON.stringify({
        items: orderPayload.items,
        shippingAddress: orderPayload.shippingAddress,
        discountCode: orderPayload.discountCode,
        totalAmount: orderPayload.totalAmount,
        timestamp: new Date().toISOString()
      }));

      // const { data } = await axios.post("/razorpay/createRazorpayOrder", {
      //   amount: Math.round(grandTotal),
      //   userId: user.id,
      // }, { withCredentials: true });
      const { data } = await axios.post("/razorpay/createRazorpayOrder", {
amount: Math.round(grandTotal),
userId: user.id,
items: orderPayload.items,
shippingAddress: orderPayload.shippingAddress,
discountCode: orderPayload.discountCode,
totalAmount: orderPayload.totalAmount
}, { withCredentials: true });

      if (!data.success) {
        throw new Error("Failed to create payment order");
      }

      // ✅ Save payment tracking
      localStorage.setItem('pendingPaymentData', JSON.stringify({
        paymentId: data.paymentId,
        razorpayOrderId: data.order_id,
        amount: data.amount,
        timestamp: new Date().toISOString()
      }));

      console.log("✅ Payment record created:", data.paymentId);

      const options = {
        key: data.key_id,
        amount: data.amount * 100,
        currency: "INR",
        order_id: data.order_id,
        name: "Gurmeet Kaur Store",
        description: "Complete your purchase",
        handler: async (response) => {
          console.log("💰 Payment successful, processing...");
          
          try {
            // Update pending data with razorpay payment ID
            const pendingData = JSON.parse(localStorage.getItem('pendingPaymentData') || '{}');
            pendingData.razorpayPaymentId = response.razorpay_payment_id;
            localStorage.setItem('pendingPaymentData', JSON.stringify(pendingData));

            // Step 1: Verify payment
            console.log("🔐 Verifying payment signature...");
            const verifyResponse = await axios.post("/razorpay/verifyPayment", {
              payment_id: response.razorpay_payment_id,
              order_id: response.razorpay_order_id,
              signature: response.razorpay_signature,
              paymentId: data.paymentId,
            }, { 
              withCredentials: true,
              timeout: 30000 
            });

            if (!verifyResponse.data.success) {
              throw new Error("Payment verification failed");
            }

            console.log("✅ Payment verified");

            // Step 2: Create order
            console.log("📦 Creating order...");
            const orderResponse = await axios.post("/razorpay/create-order-after-payment", {
              paymentId: data.paymentId,
              items: orderPayload.items,
              shippingAddress: orderPayload.shippingAddress,
              discountCode: orderPayload.discountCode,
              totalAmount: orderPayload.totalAmount
            }, { 
              withCredentials: true,
              timeout: 30000 
            });

            if (!orderResponse.data.success) {
              throw new Error("Order creation failed");
            }

            console.log("✅ Order created:", orderResponse.data.order._id);

            // Clear data and redirect
            localStorage.removeItem('pendingPaymentData');
            localStorage.removeItem('pendingCartData');
            await dispatch(clearCartThunk());
            
            toast.success("Order placed successfully!");
            navigate(`/invoice/${orderResponse.data.order._id}`, { 
              state: { order: orderResponse.data.order } 
            });

          } catch (error) {
            console.error("❌ Error after payment:", error);
            
            const errorMsg = error.response?.data?.message || error.message;
            
            toast.error(
              <div>
                <p className="font-semibold">Payment successful but order creation failed!</p>
                <p className="text-sm mt-1">Don't worry, we'll recover your order automatically.</p>
                <p className="text-xs mt-2 text-gray-600">Payment ID: {response.razorpay_payment_id}</p>
              </div>,
              { autoClose: false }
            );
            
            // Try auto-recovery
            setTimeout(() => {
              const pendingData = JSON.parse(localStorage.getItem('pendingPaymentData') || '{}');
              if (pendingData.paymentId) {
                recoverPendingPayment(pendingData);
              }
            }, 2000);
            
            setIsPlacingOrder(false);
          }
        },
        modal: {
          ondismiss: function() {
            console.log("❌ Payment cancelled by user");
            
            const pendingData = localStorage.getItem('pendingPaymentData');
            if (pendingData) {
              const data = JSON.parse(pendingData);
              // Only clear if no payment was made
              if (!data.razorpayPaymentId) {
                localStorage.removeItem('pendingPaymentData');
                localStorage.removeItem('pendingCartData');
              }
            }
            
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
        retry: {
          enabled: false // Disable auto-retry to prevent duplicate payments
        }
      };

      const rzp = new window.Razorpay(options);
      
      // Handle payment failure
      rzp.on('payment.failed', function (response) {
        console.error('❌ Payment failed:', response.error);
        toast.error(`Payment failed: ${response.error.description}`);
        
        // Clear data on actual failure
        localStorage.removeItem('pendingPaymentData');
        localStorage.removeItem('pendingCartData');
        
        setIsPlacingOrder(false);
      });

      rzp.open();
      
    } catch (err) {
      console.error("❌ Razorpay initiation error:", err);
      toast.error("Payment gateway error. Please try again.");
      
      // Clear data on error
      localStorage.removeItem('pendingPaymentData');
      localStorage.removeItem('pendingCartData');
      
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
          <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
            Shipping Information
          </h2>

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
                        {addr.isDefault && (
                          <span className="text-sm text-gray-500 ml-2">(Default)</span>
                        )}
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

          <div className="flex justify-center gap-3">
            <button
              onClick={() => placeOrder("Razorpay")}
              disabled={isPlacingOrder}
              className="bg-pink-500 text-white font-semibold px-6 py-3 rounded-lg hover:bg-pink-600 disabled:opacity-60 disabled:cursor-not-allowed transition"
            >
              {isPlacingOrder ? "Processing..." : "Pay Online"}
            </button>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
            Order Summary
          </h2>
          <div className="space-y-3">
            {cartItems.map(item => (
              <div key={item.id + item.size + item.color} className="flex justify-between text-gray-700">
                <span>
                  {item.name} ({item.size ? `${item.size}` : "N/A"}
                  {item.color ? `, ${item.color}` : ""}) × {item.quantity}
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