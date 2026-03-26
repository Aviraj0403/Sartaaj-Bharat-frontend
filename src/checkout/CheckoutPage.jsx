import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import axios from "../utils/Axios";
import { useDispatch } from "react-redux";
import { clearCartThunk } from "../features/cart/cartThunk";
import AddressSidebar from "./AddressSidebar";
import { getShippingAmount } from "../utils/shippingCalculator";

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
    shippingCharges = 0,
  } = location.state || {};

  // Calculate dynamic shipping if not provided from cart
  const displayShipping = shippingCharges || getShippingAmount(cartItems);

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  // ✅ CHECK PENDING PAYMENTS ON LOAD
  //   useEffect(() => {
  //     const checkPendingPayments = async () => {
  //       const pendingPayment = localStorage.getItem('pendingPaymentData');
  //       if (pendingPayment && isAuthenticated) {
  //         try {
  //           const data = JSON.parse(pendingPayment);
  //           const timeDiff = Date.now() - new Date(data.timestamp).getTime();

  //           if (timeDiff < 15 * 60 * 1000) {
  //             console.log("🔍 Found pending payment, checking status...");

  //             // const { data: statusData } = await axios.post('/razorpay/check-payment-status', {
  //             //   paymentId: data.paymentId
  //             // }, { withCredentials: true });

  // const { data } = await axios.post(
  //   "/razorpay/check-payment-status",
  //   { paymentId: pendingData.paymentId },
  //   { withCredentials: true }
  // );

  // if (data.success && data.payment.hasOrder) {
  //   finalizeSuccess({ _id: data.payment.orderId });
  // }

  //             if (statusData.success) {
  //               if (statusData.payment.hasOrder) {
  //                 toast.success("Previous order found!");
  //                 localStorage.removeItem('pendingPaymentData');
  //                 localStorage.removeItem('pendingCartData');
  //                 setTimeout(() => navigate(`/invoice/${statusData.payment.orderId}`), 1500);
  //               } else if (statusData.payment.isOrphaned) {
  //                 toast.info("Recovering your previous payment...");
  //                 await recoverPendingPayment(data);
  //               }
  //             }
  //           } else {
  //             localStorage.removeItem('pendingPaymentData');
  //             localStorage.removeItem('pendingCartData');
  //           }
  //         } catch (err) {
  //           console.error("Error checking pending payment:", err);
  //         }
  //       }
  //     };

  //     checkPendingPayments();
  //   }, [isAuthenticated, navigate]);
  useEffect(() => {
    if (!isAuthenticated) return;
    const pending = localStorage.getItem("pendingPaymentData");
    if (!pending) return;

    const data = JSON.parse(pending);
    const age = Date.now() - new Date(data.timestamp).getTime();
    if (age > 15 * 60 * 1000) {
      localStorage.removeItem("pendingPaymentData");
      localStorage.removeItem("pendingCartData");
      return;
    }

    console.log("⚡ Recovering pending payment...");
    recoverPendingPayment(data);
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchAddresses = async () => {
      try {
        const { data } = await axios.get("/users/getaddresses", {
          withCredentials: true,
        });
        setAddresses(data.data || []);
      } catch (err) {
        toast.error("Failed to load addresses");
      }
    };
    fetchAddresses();
  }, [isAuthenticated, isSidebarOpen]);

  useEffect(() => {
    if (addresses.length > 0 && !selectedAddress) {
      const defaultAddr = addresses.find((a) => a.isDefault);
      setSelectedAddress(defaultAddr || addresses[0]);
    }
  }, [addresses]);

  // useEffect(() => {
  //   const script = document.createElement("script");
  //   script.src = "https://checkout.razorpay.com/v1/checkout.js";
  //   script.async = true;
  //   document.body.appendChild(script);
  //   return () => document.body.removeChild(script);
  // }, []);

  const refreshAddresses = () => setIsSidebarOpen(false);

  // ✅ RECOVER PENDING PAYMENT
  const recoverPendingPayment = async (pendingData) => {
    try {
      const cartData = JSON.parse(
        localStorage.getItem("pendingCartData") || "{}",
      );

      if (!cartData.items || cartData.items.length === 0) {
        toast.error("Cart data not found. Please contact support.");
        return;
      }

      const { data } = await axios.post(
        "/razorpay/create-order-after-payment",
        {
          paymentId: pendingData.paymentId,
          items: cartData.items,
          shippingAddress: cartData.shippingAddress,
          discountCode: cartData.discountCode,
          totalAmount: cartData.totalAmount,
        },
        { withCredentials: true },
      );

      if (data.success) {
        toast.success("Order recovered successfully!");
        localStorage.removeItem("pendingPaymentData");
        localStorage.removeItem("pendingCartData");
        await dispatch(clearCartThunk());
        navigate(`/invoice/${data.order._id}`, {
          state: { order: data.order },
        });
      }
    } catch (err) {
      console.error("Recovery failed:", err);
      toast.error(
        "Auto-recovery failed. Please contact support with Payment ID.",
      );
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
      items: cartItems.map((item) => ({
        product: item.id,
        selectedVariant: {
          size: item.size,
          price: Number(item.price),
          color: item.color || "standard",
        },
        quantity: item.quantity,
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
        location: selectedAddress.location || {
          type: "Point",
          coordinates: [0, 0],
        },
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
      localStorage.setItem(
        "pendingCartData",
        JSON.stringify({
          items: orderPayload.items,
          shippingAddress: orderPayload.shippingAddress,
          discountCode: orderPayload.discountCode,
          totalAmount: orderPayload.totalAmount,
          timestamp: new Date().toISOString(),
        }),
      );

      // ✅ FIX: Send amount in rupees, backend converts to paise
      const { data } = await axios.post(
        "/razorpay/createRazorpayOrder",
        {
          amount: Math.round(grandTotal), // In rupees
          userId: user.id,
          items: orderPayload.items,
          shippingAddress: orderPayload.shippingAddress,
          discountCode: orderPayload.discountCode,
          totalAmount: orderPayload.totalAmount,
        },
        { withCredentials: true },
      );

      if (!data.success) {
        throw new Error("Failed to create payment order");
      }

      // ✅ Save payment tracking
      localStorage.setItem(
        "pendingPaymentData",
        JSON.stringify({
          paymentId: data.paymentId,
          razorpayOrderId: data.order_id,
          amount: Math.round(grandTotal),
          timestamp: new Date().toISOString(),
        }),
      );

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
            const pendingData = JSON.parse(
              localStorage.getItem("pendingPaymentData") || "{}",
            );
            pendingData.razorpayPaymentId = response.razorpay_payment_id;
            localStorage.setItem(
              "pendingPaymentData",
              JSON.stringify(pendingData),
            );

            // Step 1: Verify payment signature
            console.log("Verifying payment signature...");
            const verifyResponse = await axios.post(
              "/razorpay/verifyPayment",
              {
                payment_id: response.razorpay_payment_id,
                order_id: response.razorpay_order_id,
                signature: response.razorpay_signature,
                paymentId: data.paymentId,
              },
              { withCredentials: true, timeout: 30000 },
            );

            if (!verifyResponse.data.success) {
              throw new Error("Payment verification failed");
            }
            console.log("Payment verified");

            // Step 2: Try to create order (this might fail if webhook already did it)
            console.log("Creating order...");
            // const orderResponse = await axios.post("/razorpay/create-order-after-payment", {
            //   paymentId: data.paymentId,
            //   items: orderPayload.items,
            //   shippingAddress: orderPayload.shippingAddress,
            //   discountCode: orderPayload.discountCode,
            //   totalAmount: orderPayload.totalAmount
            // }, { withCredentials: true, timeout: 30000 });

            // // Success from frontend call
            // if (orderResponse.data.success) {
            //   console.log("Order created:", orderResponse.data.order._id);
            //   finalizeSuccess(orderResponse.data.order);
            //   return;
            // }
            // ✅ NEW: Just verify payment & wait for webhook
            toast.info("Payment successful. Confirming your order...", {
              autoClose: false,
            });

            let attempts = 0;
            const maxAttempts = 5;
            const interval = setInterval(async () => {
              attempts++;
              try {
                const { data: status } = await axios.post(
                  "/razorpay/check-payment-status",
                  { paymentId: data.paymentId },
                  { withCredentials: true },
                );

                if (status.success && status.payment.hasOrder) {
                  clearInterval(interval);
                  finalizeSuccess({ _id: status.payment.orderId });
                } else if (attempts >= maxAttempts) {
                  clearInterval(interval);
                  toast.info(
                    "Order is being processed. You will see it shortly.",
                  );
                  setIsPlacingOrder(false);
                }
              } catch {
                if (attempts >= maxAttempts) clearInterval(interval);
              }
            }, 2000);

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
              console.log(
                "Order already created by webhook — treating as success",
              );

              const existingOrderId =
                axiosError.orderId || axiosError.order?._id;

              if (existingOrderId) {
                // Optionally fetch full order details if needed
                // Or just redirect
                finalizeSuccess({ _id: existingOrderId });
                toast.success(
                  "Order placed successfully! (Confirmed via secure server)",
                );
                return;
              }
            }

            // WORST CASE: Real failure, but payment succeeded → show recovery message
            // toast.error(
            //   <div>
            //     <p className="font-semibold">Payment successful but order processing delayed!</p>
            //     <p className="text-sm mt-1">No worries — we're recovering your order automatically.</p>
            //     <p className="text-xs mt-2 text-gray-600">
            //       Razorpay Payment ID: {response.razorpay_payment_id}
            //     </p>
            //   </div>,
            //   { autoClose: false }
            // );

            // Auto-recovery after 2 seconds
            setTimeout(async () => {
              const pendingData = JSON.parse(
                localStorage.getItem("pendingPaymentData") || "{}",
              );
              if (pendingData.paymentId) {
                await recoverPendingPayment(pendingData);
              }
            }, 2000);

            setIsPlacingOrder(false);
          }

          // Helper function to avoid code duplication
          function finalizeSuccess(order) {
            localStorage.removeItem("pendingPaymentData");
            localStorage.removeItem("pendingCartData");
            dispatch(clearCartThunk());
            toast.success("Order placed successfully!");
            navigate(`/invoice/${order._id}`, { state: { order: data.order } });
            setIsPlacingOrder(false);
          }
        },
        modal: {
          ondismiss: () => {
            // ✅ NEW: Better messaging for timeouts
            toast.info(
              "Payment cancelled. If payment was completed, we'll recover it automatically.",
              { autoClose: 5000 },
            );
            setIsPlacingOrder(false);
          },
          // ✅ NEW: Handle timeout specifically
          escape: false,
          confirm_close: true,
        },
        prefill: {
          name: user.userName || "Customer",
          email: user.email,
          contact: selectedAddress.phoneNumber,
        },
        theme: { color: "#2563eb" },
        retry: {
          enabled: false,
        },
        // ✅ NEW: Additional options
        send_sms_hash: true,
        remember_customer: false,
      };

      const rzp = new window.Razorpay(options);

      // ✅ Handle payment failure
      rzp.on("payment.failed", function (response) {
        console.error("❌ Payment failed:", response.error);

        // ✅ NEW: Better error messages
        let errorMsg = "Payment failed. Please try again.";

        if (response.error.reason === "payment_timed_out") {
          errorMsg =
            "Payment timed out. The payment window expired after 10 minutes.";
        } else if (response.error.description) {
          errorMsg = response.error.description;
        }

        toast.error(errorMsg, { autoClose: 8000 });

        localStorage.removeItem("pendingPaymentData");
        localStorage.removeItem("pendingCartData");

        setIsPlacingOrder(false);
      });

      rzp.open();
    } catch (err) {
      console.error("❌ Razorpay initiation error:", err);
      toast.error("Payment gateway error. Please try again.");

      localStorage.removeItem("pendingPaymentData");
      localStorage.removeItem("pendingCartData");

      setIsPlacingOrder(false);
    }
  };

  return (
    <div className="min-h-screen bg-white py-12 md:py-20 font-sans">
      <AddressSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        refreshAddresses={refreshAddresses}
        userName={user?.userName || ""}
        email={user?.email || ""}
      />

      <div className="container-custom px-4 sm:px-6">
        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-4 text-orange-500 font-black text-[10px] uppercase tracking-[0.5em] mb-3 italic">
            SECURED CHECKOUT
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter italic leading-none uppercase">
            Order <span className="text-orange-500">Review</span>
          </h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Shipping & Payment */}
          <div className="lg:col-span-7 space-y-10">
            {/* Shipping Info */}
            <section className="bg-slate-50/50 rounded-[2rem] p-6 md:p-10 border border-slate-100">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-black text-slate-900 tracking-tight italic uppercase">
                  Shipping Destination
                </h2>
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className="text-[10px] font-black uppercase tracking-widest text-orange-500 hover:text-orange-600 transition-colors italic"
                >
                  + Add New Address
                </button>
              </div>

              <div className="space-y-4">
                {addresses.length > 0 ? (
                  addresses.map((addr) => (
                    <motion.label
                      key={addr._id}
                      whileHover={{ scale: 1.01 }}
                      className={`block border-2 rounded-2xl p-5 cursor-pointer transition-all duration-300 relative overflow-hidden ${
                        selectedAddress?._id === addr._id
                          ? "border-orange-500 bg-white shadow-xl shadow-orange-900/5"
                          : "border-slate-100 bg-white/50 hover:bg-white hover:border-slate-200"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${selectedAddress?._id === addr._id ? "border-orange-500" : "border-slate-200"}`}
                        >
                          {selectedAddress?._id === addr._id && (
                            <div className="w-2.5 h-2.5 bg-orange-500 rounded-full" />
                          )}
                        </div>
                        <input
                          type="radio"
                          className="hidden"
                          name="address"
                          checked={selectedAddress?._id === addr._id}
                          onChange={() => setSelectedAddress(addr)}
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <span className="font-black text-slate-900 uppercase tracking-tighter text-sm italic">
                              {addr.label || addr.type}
                            </span>
                            {addr.isDefault && (
                              <span className="text-[8px] font-bold bg-slate-900 text-white px-2 py-0.5 rounded-md uppercase tracking-widest">
                                Default
                              </span>
                            )}
                          </div>
                          <p className="text-slate-900 font-bold text-xs mb-1">
                            {addr.name}
                          </p>
                          <p className="text-slate-500 text-xs leading-relaxed max-w-md">
                            {addr.street || addr.flat}, {addr.city},{" "}
                            {addr.state} - {addr.pincode || addr.postalCode}
                          </p>
                          <p className="text-slate-400 font-black text-[10px] mt-2 uppercase tracking-widest italic">
                            {addr.phoneNumber}
                          </p>
                        </div>
                      </div>
                    </motion.label>
                  ))
                ) : (
                  <div className="text-center py-10 bg-white rounded-2xl border border-dashed border-slate-200">
                    <p className="text-slate-400 font-medium italic">
                      No saved addresses found.
                    </p>
                  </div>
                )}
              </div>
            </section>

            {/* Payment Method */}
            <section className="bg-slate-50/50 rounded-[2rem] p-6 md:p-10 border border-slate-100">
              <h2 className="text-xl font-black text-slate-900 tracking-tight italic uppercase mb-8">
                Secure Payment
              </h2>

              <div className="bg-gradient-to-r from-orange-900 to-indigo-900 text-white rounded-[2rem] p-8 mb-8 relative overflow-hidden shadow-2xl shadow-orange-900/20 border border-blue-800">
                <div className="absolute top-0 right-0 w-64 h-full bg-white/5 skew-x-12 translate-x-12 backdrop-blur-3xl"></div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl"></div>
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex gap-5 items-center">
                    <div className="w-14 h-14 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-center shadow-inner">
                      <span className="font-black italic text-2xl">₹</span>
                    </div>
                    <div>
                      <h3 className="font-black italic text-lg uppercase tracking-widest mb-1 flex items-center gap-2">
                        Razorpay{" "}
                        <span className="px-2 py-0.5 bg-blue-500/30 text-[8px] rounded uppercase tracking-[0.2em] border border-blue-400/30">
                          Secured
                        </span>
                      </h3>
                      <p className="text-xs text-blue-100/70 leading-relaxed max-w-sm">
                        Pay seamlessly via UPI, Credit/Debit Card, or Net
                        Banking. Encrypted with bank-grade security.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {["UPI", "Visa", "MasterCard"].map((badge) => (
                      <div
                        key={badge}
                        className="px-3 py-1 bg-white/5 border border-white/10 rounded-md text-[8px] font-black uppercase tracking-widest text-white/60 italic"
                      >
                        {badge}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 bg-white p-6 rounded-[1.5rem] border border-slate-100 shadow-sm">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-1 italic">
                    Total Amount
                  </p>
                  {isPlacingOrder ? (
                    <div className="flex flex-col items-center justify-center py-4">
                      <div className="relative">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="w-20 h-20 border-[3px] border-slate-100 border-t-orange-500 rounded-full"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <ShieldCheck className="text-orange-500/20 w-8 h-8" />
                        </div>
                      </div>
                      <span className="mt-8 text-[11px] font-black uppercase tracking-[0.6em] text-slate-400 italic animate-pulse">
                        Initializing Protocol...
                      </span>
                    </div>
                  ) : (
                    <p className="text-3xl font-black text-slate-900 italic tracking-tighter">
                      ₹{Math.round(grandTotal).toLocaleString()}
                    </p>
                  )}
                </div>
                <div className="text-center sm:text-right w-full sm:w-auto">
                  <motion.button
                    whileHover={{ scale: 1.02, translateY: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => placeOrder("Razorpay")}
                    disabled={isPlacingOrder}
                    className="w-full sm:w-auto bg-orange-500 text-white px-10 py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] shadow-lg shadow-orange-500/20 hover:bg-blue-500 hover:shadow-orange-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed italic border border-blue-500 flex items-center justify-center gap-3"
                  >
                    {isPlacingOrder ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>{" "}
                        Processing
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Pay & Place Order
                      </span>
                    )}
                  </motion.button>
                  <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-3 italic flex items-center justify-center sm:justify-end gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>{" "}
                    AES-256 Encrypted
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: Order Summary */}
          <aside className="lg:col-span-5 w-full sticky top-32">
            <div className="bg-slate-900 text-white p-8 md:p-12 rounded-[2.5rem] shadow-[0_40px_80px_-20px_rgba(15,23,42,0.3)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-orange-500/10 blur-[100px] rounded-full -mr-24 -mt-24"></div>

              <h2 className="text-2xl font-black tracking-tighter italic uppercase mb-10 flex items-center gap-4">
                Summary <div className="h-0.5 flex-1 bg-white/10"></div>
              </h2>

              <div className="space-y-6 mb-10">
                {cartItems.map((item) => (
                  <div
                    key={item.id + item.size + item.color}
                    className="flex justify-between items-start group"
                  >
                    <div className="flex-1 pr-6">
                      <p className="text-xs font-black italic uppercase tracking-tighter leading-tight mb-1 group-hover:text-blue-400 transition-colors">
                        {item.name}
                      </p>
                      <p className="text-[9px] text-white/40 font-bold uppercase tracking-widest">
                        {item.size} {item.color ? `· ${item.color}` : ""} ×{" "}
                        {item.quantity}
                      </p>
                    </div>
                    <span className="font-black italic text-sm tracking-tighter whitespace-nowrap">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-10 border-t border-white/10 mb-10">
                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.3em] text-white/40 italic">
                  <span>Subtotal</span>
                  <span className="text-white">
                    ₹{totalAmount.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.3em] text-white/40 italic">
                  <span>Logistics</span>
                  <span className="text-white">
                    ₹{displayShipping.toLocaleString()}
                  </span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.3em] text-blue-400 italic">
                    <span>Savings ({appliedCoupon.code})</span>
                    <span>
                      -₹
                      {(
                        (totalAmount * appliedCoupon.discountPercentage) /
                        100
                      ).toLocaleString()}
                    </span>
                  </div>
                )}
              </div>

              <div className="pt-6">
                <p className="text-white/30 text-[9px] font-black uppercase tracking-[0.5em] mb-3 italic">
                  Total Amount Payable
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-black text-white italic tracking-tighter">
                    ₹{Math.round(grandTotal).toLocaleString()}
                  </span>
                  <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest">
                    INR
                  </span>
                </div>
              </div>

              <p className="mt-12 text-[9px] font-black uppercase tracking-[0.4em] text-white/20 italic text-center border-t border-white/5 pt-8">
                Securerd by Sartaaj Bharat
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
