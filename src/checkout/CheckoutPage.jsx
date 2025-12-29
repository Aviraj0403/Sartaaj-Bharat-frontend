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
          
          if (timeDiff < 15 * 60 * 1000) {
            console.log("🔍 Found pending payment, checking status...");
            
            const { data: statusData } = await axios.post('/razorpay/check-payment-status', {
              paymentId: data.paymentId
            }, { withCredentials: true });

            if (statusData.success) {
              if (statusData.payment.hasOrder) {
                toast.success("Previous order found!");
                localStorage.removeItem('pendingPaymentData');
                localStorage.removeItem('pendingCartData');
                setTimeout(() => navigate(`/invoice/${statusData.payment.orderId}`), 1500);
              } else if (statusData.payment.isOrphaned) {
                toast.info("Recovering your previous payment...");
                await recoverPendingPayment(data);
              }
            }
          } else {
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
      setIsPlacingOrder(false);
    }
  };

  const initiateRazorpay = async (orderPayload) => {
    try {
      console.log("💳 Initiating Razorpay payment...");

      // ✅ Save cart data BEFORE payment
      localStorage.setItem('pendingCartData', JSON.stringify({
        items: orderPayload.items,
        shippingAddress: orderPayload.shippingAddress,
        discountCode: orderPayload.discountCode,
        totalAmount: orderPayload.totalAmount,
        timestamp: new Date().toISOString()
      }));

      // ✅ FIX: Send amount in rupees, backend converts to paise
      const { data } = await axios.post("/razorpay/createRazorpayOrder", {
        amount: Math.round(grandTotal), // In rupees
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
        amount: Math.round(grandTotal),
        timestamp: new Date().toISOString()
      }));

      console.log("✅ Payment record created:", data.paymentId);

      const options = {
        key: data.key_id,
        amount: data.amount, // Already in paise from backend
        currency: "INR",
        order_id: data.order_id,
        name: "Gurmeet Kaur Store",
        description: "Complete your purchase",
        timeout: 600, // ✅ NEW: 10 minute timeout
        handler: async (response) => {
  console.log("Payment successful, processing...");

  try {
    // Update pending data with Razorpay payment ID
    const pendingData = JSON.parse(localStorage.getItem('pendingPaymentData') || '{}');
    pendingData.razorpayPaymentId = response.razorpay_payment_id;
    localStorage.setItem('pendingPaymentData', JSON.stringify(pendingData));

    // Step 1: Verify payment signature
    console.log("Verifying payment signature...");
    const verifyResponse = await axios.post("/razorpay/verifyPayment", {
      payment_id: response.razorpay_payment_id,
      order_id: response.razorpay_order_id,
      signature: response.razorpay_signature,
      paymentId: data.paymentId,
    }, { withCredentials: true, timeout: 30000 });

    if (!verifyResponse.data.success) {
      throw new Error("Payment verification failed");
    }
    console.log("Payment verified");

    // Step 2: Try to create order (this might fail if webhook already did it)
    console.log("Creating order...");
    const orderResponse = await axios.post("/razorpay/create-order-after-payment", {
      paymentId: data.paymentId,
      items: orderPayload.items,
      shippingAddress: orderPayload.shippingAddress,
      discountCode: orderPayload.discountCode,
      totalAmount: orderPayload.totalAmount
    }, { withCredentials: true, timeout: 30000 });

    // Success from frontend call
    if (orderResponse.data.success) {
      console.log("Order created:", orderResponse.data.order._id);
      finalizeSuccess(orderResponse.data.order);
      return;
    }

    // If not success, fall through to catch block (will handle gracefully below)
    throw new Error("Order creation failed in response");

  } catch (error) {
    console.error("Error after payment:", error);

    const axiosError = error.response?.data;
    const status = error.response?.status;

    // BEST CASE: Webhook already created the order → backend returns info about existing order
    if (
      axiosError &&
      (axiosError.message === "This payment has already been used" ||
       axiosError.message.includes("already been used") ||
       axiosError.orderId ||
       axiosError.order)
    ) {
      console.log("Order already created by webhook — treating as success");

      const existingOrderId = axiosError.orderId || axiosError.order?._id;

      if (existingOrderId) {
        // Optionally fetch full order details if needed
        // Or just redirect
        finalizeSuccess({ _id: existingOrderId });
        toast.success("Order placed successfully! (Confirmed via secure server)");
        return;
      }
    }

    // WORST CASE: Real failure, but payment succeeded → show recovery message
    toast.error(
      <div>
        <p className="font-semibold">Payment successful but order processing delayed!</p>
        <p className="text-sm mt-1">No worries — we're recovering your order automatically.</p>
        <p className="text-xs mt-2 text-gray-600">
          Razorpay Payment ID: {response.razorpay_payment_id}
        </p>
      </div>,
      { autoClose: false }
    );

    // Auto-recovery after 2 seconds
    setTimeout(async () => {
      const pendingData = JSON.parse(localStorage.getItem('pendingPaymentData') || '{}');
      if (pendingData.paymentId) {
        await recoverPendingPayment(pendingData);
      }
    }, 2000);

    setIsPlacingOrder(false);
  }

  // Helper function to avoid code duplication
  function finalizeSuccess(order) {
    localStorage.removeItem('pendingPaymentData');
    localStorage.removeItem('pendingCartData');
    dispatch(clearCartThunk());
    toast.success("Order placed successfully!");
    navigate(`/invoice/${order._id}`, { state: { order } });
    setIsPlacingOrder(false);
  }
},
        modal: {
          ondismiss: () => {
            // ✅ NEW: Better messaging for timeouts
            toast.info(
              "Payment cancelled. If payment was completed, we'll recover it automatically.",
              { autoClose: 5000 }
            );
            setIsPlacingOrder(false);
          },
          // ✅ NEW: Handle timeout specifically
          escape: false,
          confirm_close: true
        },
        prefill: {
          name: user.userName || "Customer",
          email: user.email,
          contact: selectedAddress.phoneNumber,
        },
        theme: { color: "#ec4899" },
        retry: {
          enabled: false
        },
        // ✅ NEW: Additional options
        send_sms_hash: true,
        remember_customer: false
      };

      const rzp = new window.Razorpay(options);
      
      // ✅ Handle payment failure
      rzp.on('payment.failed', function (response) {
        console.error('❌ Payment failed:', response.error);
        
        // ✅ NEW: Better error messages
        let errorMsg = "Payment failed. Please try again.";
        
        if (response.error.reason === 'payment_timed_out') {
          errorMsg = "Payment timed out. The payment window expired after 10 minutes.";
        } else if (response.error.description) {
          errorMsg = response.error.description;
        }
        
        toast.error(errorMsg, { autoClose: 8000 });
        
        localStorage.removeItem('pendingPaymentData');
        localStorage.removeItem('pendingCartData');
        
        setIsPlacingOrder(false);
      });

      rzp.open();
      
    } catch (err) {
      console.error("❌ Razorpay initiation error:", err);
      toast.error("Payment gateway error. Please try again.");
      
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

          {/* ✅ NEW: Payment info alert */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4 text-sm text-gray-700">
            <p className="font-medium mb-1">⏰ Important:</p>
            <p>Complete payment within 10 minutes to avoid timeout.</p>
          </div>

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