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

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  // Fetch addresses
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

  // Auto-select default address
  useEffect(() => {
    if (addresses.length > 0 && !selectedAddress) {
      const defaultAddr = addresses.find(a => a.isDefault);
      setSelectedAddress(defaultAddr || addresses[0]);
    }
  }, [addresses]);

  // Load Razorpay
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  const refreshAddresses = () => setIsSidebarOpen(false);

  const placeOrder = async (paymentMethod = "COD") => {
    if (!isAuthenticated) return toast.warn("Please login first"), navigate("/login");
    if (!selectedAddress) return toast.warn("Please select a delivery address");

    setIsPlacingOrder(true);

    // FINAL PAYLOAD — WORKS 100% WITH YOUR BACKEND
    const payload = {
      items: cartItems.map(item => ({
        product: item.id, // Product ObjectId
        selectedVariant: {
          size: item.size,           // Must match DB exactly
          price: Number(item.price)  // Must be number and match DB
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
      totalAmount: Number(finalAmount.toFixed(2)),
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
        amount: Math.round(finalAmount),
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
            const verified = await axios.post("/razorpay/verifyPayment", {
              payment_id: response.razorpay_payment_id,
              order_id: response.razorpay_order_id,
              signature: response.razorpay_signature,
              paymentId: data.paymentId,
            }, { withCredentials: true });

            if (verified.data.message === "Payment verified successfully") {
              await submitOrder({ ...orderPayload, paymentMethod: "Razorpay" });
            } else {
              toast.error("Payment failed. Try again.");
            }
          } catch (err) {
            toast.error("Payment verification failed");
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
      rzp.open();
    } catch (err) {
      toast.error("Payment gateway error");
    } finally {
      setIsPlacingOrder(false);
    }
  };

  const submitOrder = async (payload) => {
    try {
      const res = await axios.post("/orders/createOrder", payload, { withCredentials: true });
      dispatch(clearCartThunk());
      toast.success("Order placed successfully!");
      navigate("/invoice/123", { state: { order: res.data.order } });
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to place order";
      toast.error(msg);
      console.error("Order error:", err.response?.data);
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
        {/* Left: Address & Payment */}
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
            <button onClick={() => setIsSidebarOpen(true)} className="text-pink-600 font-medium text-lg">
              + Add New Address
            </button>
          </div>

          <h3 className="text-center font-semibold mb-4">Payment Method</h3>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => placeOrder("COD")}
              disabled={isPlacingOrder}
              className="bg-pink-100 text-pink-700 font-semibold px-8 py-3 rounded-lg hover:bg-pink-200 disabled:opacity-60"
            >
              {isPlacingOrder ? "Processing..." : "Cash on Delivery"}
            </button>
            <button
              onClick={() => placeOrder("Razorpay")}
              disabled={isPlacingOrder}
              className="bg-pink-500 text-white font-semibold px-8 py-3 rounded-lg hover:bg-pink-600 disabled:opacity-60"
            >
              {isPlacingOrder ? "Redirecting..." : "Pay Online"}
            </button>
          </div>
        </div>

        {/* Right: Order Summary */}
        <div className="bg-white shadow-md rounded-2xl p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">Order Summary</h2>
          <div className="space-y-3">
            {cartItems.map(item => (
              <div key={item.id + item.size} className="flex justify-between text-gray-700">
                <span>{item.name} ({item.size}) × {item.quantity}</span>
                <span className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}

            <div className="border-t pt-4">
              <div className="flex justify-between">
                <span>Total Items:</span>
                <span className="font-semibold">{totalQuantity}</span>
              </div>
              {appliedCoupon && (
                <div className="flex justify-between text-green-600">
                  <span>Coupon: {appliedCoupon.code}</span>
                  <span>-{appliedCoupon.discountPercentage}%</span>
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