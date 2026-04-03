import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import axios from "../utils/Axios";
import { useDispatch } from "react-redux";
import { clearCartThunk } from "../features/cart/cartThunk";
import AddressSidebar from "./AddressSidebar";
import { getShippingAmount } from "../utils/shippingCalculator";
import { ShieldCheck, CreditCard, Lock, Plus, MapPin, ChevronRight } from "lucide-react";

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

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

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

  const placeOrder = async (paymentMethod = "Razorpay") => {
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
    <div className="min-h-screen bg-white relative overflow-hidden font-sans pb-32 md:pb-12">
      {/* Technical Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000003_1px,transparent_1px),linear-gradient(to_bottom,#00000003_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-60"></div>
      
      {/* Background Deep Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-900/5 blur-[120px] rounded-full -translate-x-1/2 translate-y-1/2"></div>

      <AddressSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        refreshAddresses={refreshAddresses}
        userName={user?.userName || ""}
        email={user?.email || ""}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 relative z-10">
        {/* Header - Elite Protocol Standard */}
        <header className="mb-8 sm:mb-10">
          <motion.div 
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 mb-5"
          >
            <div className="h-0.5 w-10 bg-blue-600 rounded-full shadow-[0_0_10px_rgba(37,99,235,0.4)]"></div>
            <span className="text-blue-600 font-black text-[10px] uppercase tracking-[0.4em] italic">
              SECURE CHECKOUT
            </span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[32px] sm:text-[48px] font-black text-slate-900 tracking-tighter leading-[0.8] mb-4 italic uppercase"
          >
            CHECK<span className="text-blue-600">OUT.</span>
          </motion.h1>
          <p className="text-[10px] sm:text-[11px] text-slate-500 font-black uppercase tracking-[0.3em] italic">
            PLEASE REVIEW YOUR ORDER DETAILS
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Terminal Data */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-12">
            
            {/* Shipping Terminal */}
            <section className="bg-white/40 backdrop-blur-md rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 border border-white/60 shadow-xl shadow-slate-200/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 blur-[60px] rounded-full -mr-16 -mt-16"></div>
              
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-5 bg-blue-600 rounded-full"></div>
                  <h2 className="text-xl font-black text-slate-950 tracking-tight italic uppercase">
                    SHIPPING ADDRESS
                  </h2>
                </div>
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className="text-[9px] font-black uppercase tracking-widest text-blue-600 hover:text-blue-700 transition-all italic flex items-center gap-2 group"
                >
                  <Plus size={12} strokeWidth={3} className="group-hover:rotate-90 transition-transform" />
                  ADD NEW ADDRESS
                </button>
              </div>

              <div className="space-y-4">
                {addresses.length > 0 ? (
                  addresses.map((addr) => (
                    <motion.label
                      key={addr._id}
                      whileHover={{ scale: 1.01, x: 5 }}
                      className={`block rounded-2xl p-6 cursor-pointer transition-all duration-500 border relative group ${
                        selectedAddress?._id === addr._id
                          ? "bg-white border-blue-500 shadow-xl shadow-blue-900/5"
                          : "bg-white/40 border-white hover:border-slate-200 hover:bg-white"
                      }`}
                    >
                      <div className="flex items-start gap-5">
                        <div
                          className={`mt-1.5 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${selectedAddress?._id === addr._id ? "border-blue-500" : "border-slate-200"}`}
                        >
                          {selectedAddress?._id === addr._id && (
                            <motion.div 
                              layoutId="activeDot"
                              className="w-2.5 h-2.5 bg-blue-600 rounded-full shadow-[0_0_8px_rgba(37,99,235,0.6)]" 
                            />
                          )}
                        </div>
                        <input
                          type="radio"
                          className="hidden"
                          name="address"
                          checked={selectedAddress?._id === addr._id}
                          onChange={() => setSelectedAddress(addr)}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="font-black text-slate-950 uppercase tracking-widest text-[10px] italic">
                              {addr.label || addr.type || "ADDRESS"}
                            </span>
                            {addr.isDefault && (
                              <span className="text-[7px] font-black bg-slate-950 text-white px-2 py-0.5 rounded-sm uppercase tracking-[0.2em] italic">
                                DEFAULT
                              </span>
                            )}
                          </div>
                          <p className="text-slate-900 font-black text-sm mb-1 uppercase tracking-tight">
                            {addr.name}
                          </p>
                          <p className="text-slate-500 text-[11px] leading-relaxed max-w-md italic font-bold">
                            {addr.street || addr.flat}, {addr.city}, {addr.state} - {addr.pincode || addr.postalCode}
                          </p>
                          <div className="flex items-center gap-3 mt-3">
                             <div className="h-[1px] flex-1 bg-slate-100"></div>
                             <p className="text-blue-600 font-black text-[9px] uppercase tracking-[0.2em] italic">
                               {addr.phoneNumber}
                             </p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Active Scan Effect */}
                      {selectedAddress?._id === addr._id && (
                        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-scan" />
                      )}
                    </motion.label>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-16 bg-white/20 rounded-3xl border border-dashed border-white/60">
                    <MapPin size={24} className="text-slate-300 mb-4 opacity-50" />
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest italic">
                      NO SAVED ADDRESSES FOUND
                    </p>
                  </div>
                )}
              </div>
            </section>

            {/* Payment Terminal */}
            <section className="bg-white/40 backdrop-blur-md rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 border border-white/60 shadow-xl shadow-slate-200/20 relative overflow-hidden">
               <div className="flex items-center gap-3 mb-10">
                  <div className="w-1 h-5 bg-blue-600 rounded-full"></div>
                  <h2 className="text-xl font-black text-slate-950 tracking-tight italic uppercase">
                    PAYMENT METHOD
                  </h2>
                </div>

              <div className="bg-slate-950 text-white rounded-[2rem] p-8 mb-10 relative overflow-hidden shadow-2xl shadow-blue-900/20 group/card">
                {/* Tech background elements */}
                <div className="absolute top-0 right-0 w-full h-full bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:15px_15px] pointer-events-none"></div>
                <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-blue-600/20 rounded-full blur-[80px]"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl flex items-center justify-center">
                      <CreditCard className="text-blue-400" size={24} />
                    </div>
                    <div className="text-right">
                      <p className="text-[7px] text-blue-400 font-black tracking-[0.4em] uppercase mb-1">SECURE CONNECTION</p>
                      <div className="flex items-center gap-2 justify-end">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                        <span className="text-[10px] font-black uppercase italic tracking-widest">SECURE</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-2xl font-black italic uppercase tracking-tighter flex items-center gap-3">
                      RAZORPAY SECURE
                      <span className="px-2 py-0.5 bg-blue-600/30 text-[8px] rounded-sm font-bold tracking-[0.2em] border border-blue-600/30">
                        OFFICIAL PARTNER
                      </span>
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed max-w-sm italic font-medium">
                      Seamless cross-transaction integration supporting UPI, Major Cards, and Digital Wallet protocols. Securely processed via Razorpay's enterprise network.
                    </p>
                  </div>

                  <div className="flex gap-2 mt-8">
                    {["UPI", "VISA", "MASTERCARD", "AMEX"].map((badge) => (
                      <div
                        key={badge}
                        className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[8px] font-black uppercase tracking-widest text-slate-500 italic hover:text-white hover:border-white/30 transition-colors"
                      >
                        {badge}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Secondary Panel */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-8 bg-white p-6 sm:p-8 rounded-[2rem] border border-white shadow-lg overflow-hidden relative">
                <div className="relative z-10 text-center sm:text-left">
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-2 italic">
                    ORDER TOTAL
                  </p>
                  {isPlacingOrder ? (
                    <div className="flex items-center gap-4 py-2">
                       <div className="w-6 h-6 border-2 border-slate-100 border-t-blue-600 rounded-full animate-spin"></div>
                       <span className="text-[11px] font-black uppercase tracking-[0.4em] text-blue-600 animate-pulse">
                         PROCESSING...
                       </span>
                    </div>
                  ) : (
                    <p className="text-4xl font-black text-slate-950 italic tracking-tighter leading-none">
                      ₹{Math.round(grandTotal).toLocaleString()}
                    </p>
                  )}
                </div>
                
                <div className="relative z-10 w-full sm:w-auto">
                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => placeOrder("Razorpay")}
                    disabled={isPlacingOrder}
                    className="w-full sm:w-auto bg-blue-600 text-white px-12 py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] shadow-xl shadow-blue-600/30 hover:bg-slate-950 transition-all disabled:opacity-50 disabled:cursor-not-allowed italic border border-blue-500/50 flex items-center justify-center gap-4"
                  >
                    {isPlacingOrder ? "PROCESSING..." : "PLACE ORDER & PAY"}
                    {!isPlacingOrder && <ChevronRight size={16} strokeWidth={3} />}
                  </motion.button>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: Encrypted Summary */}
          <aside className="lg:col-span-5 w-full sticky top-32">
            <div className="bg-slate-950 text-white p-8 md:p-12 rounded-[2.5rem] md:rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)] relative overflow-hidden ring-1 ring-white/10 mt-6 lg:mt-0">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[100px] rounded-full -mr-32 -mt-32"></div>

              <div className="flex items-center justify-between mb-12">
                <h2 className="text-2xl font-black tracking-tighter italic uppercase flex items-center gap-4">
                  ORDER SUMMARY <div className="h-[2px] w-12 bg-blue-600 rounded-full shadow-[0_0_10px_rgba(37,99,235,0.8)]"></div>
                </h2>
                <div className="text-[9px] font-black uppercase tracking-widest text-slate-500 italic">
                  REF: {Math.random().toString(36).substring(7).toUpperCase()}
                </div>
              </div>

              <div className="space-y-7 mb-12 max-h-[300px] overflow-y-auto pr-4 custom-scrollbar">
                {cartItems.map((item) => (
                  <div
                    key={item.id + item.size + item.color}
                    className="flex justify-between items-start group"
                  >
                    <div className="flex-1 pr-8">
                       <span className="text-[8px] font-black text-blue-500 uppercase tracking-widest mb-1 block italic opacity-60">ITEM DETAILS</span>
                      <p className="text-xs font-black italic uppercase tracking-tighter leading-tight mb-2 group-hover:text-blue-400 transition-colors">
                        {item.name}
                      </p>
                      <div className="flex items-center gap-3 text-[9px] text-white/30 font-bold uppercase tracking-widest">
                        <span>{item.size}</span>
                        <span>·</span>
                        <span>{item.quantity} UNIT{item.quantity > 1 ? "S" : ""}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-black italic text-sm tracking-tighter whitespace-nowrap">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-5 pt-10 border-t border-white/5 mb-10">
                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.4em] text-white/30 italic">
                  <span>SUBTOTAL</span>
                  <span className="text-white tab-nums">
                    ₹{totalAmount.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.4em] text-white/30 italic">
                  <span>SHIPPING ESTIMATE</span>
                  <span className="text-white tab-nums">
                    ₹{displayShipping.toLocaleString()}
                  </span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.4em] text-blue-500 italic">
                    <span>COUPON DISCOUNT</span>
                    <span className="tab-nums">
                      -₹{((totalAmount * appliedCoupon.discountPercentage) / 100).toLocaleString()}
                    </span>
                  </div>
                )}
              </div>

              <div className="pt-8 border-t border-white/10">
                <p className="text-white/20 text-[9px] font-black uppercase tracking-[0.5em] mb-4 italic">
                  TOTAL AMOUNT
                </p>
                <div className="flex items-baseline gap-3">
                  <span className="text-6xl font-black text-white italic tracking-tighter leading-none">
                    ₹{Math.round(grandTotal).toLocaleString()}
                  </span>
                  <span className="text-blue-600 text-[11px] font-black uppercase tracking-[0.3em] italic">
                    INR
                  </span>
                </div>
              </div>

              <div className="mt-12 flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                 <ShieldCheck size={16} className="text-blue-500" />
                 <p className="text-[8px] font-black uppercase tracking-[0.4em] text-slate-500 italic">
                   ENCRYPTED_SESSION_STABLE
                 </p>
                 <Lock size={12} className="text-slate-700" />
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Sticky Mobile Checkout Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-2xl border-t border-slate-100 p-6 z-50 shadow-[0_-20px_40px_rgba(0,0,0,0.08)]">
         <div className="flex items-center justify-between gap-4 max-w-lg mx-auto">
            <div>
               <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic mb-0.5">EST. PAYABLE</p>
               <p className="text-xl font-black text-slate-950 italic tracking-tighter leading-none">₹{Math.round(grandTotal).toLocaleString()}</p>
            </div>
            <motion.button
               whileTap={{ scale: 0.95 }}
               onClick={() => placeOrder("Razorpay")}
               disabled={isPlacingOrder}
               className="flex-1 bg-blue-600 text-white h-14 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] italic shadow-lg shadow-blue-600/20 active:bg-slate-950 transition-all flex items-center justify-center gap-2"
            >
               {isPlacingOrder ? "SYNCING..." : "PAY & PLACE ORDER"}
               {!isPlacingOrder && <ChevronRight size={14} strokeWidth={3} />}
            </motion.button>
         </div>
      </div>
    </div>
  );
}
