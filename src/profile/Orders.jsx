import React, { useEffect, useState } from "react";
import { Download, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Axios from "../utils/Axios"; // Axios instance for API calls
import { useAuth } from "../context/AuthContext"; // Import AuthContext to get user info

export default function Orders() {
  const { user } = useAuth(); // Get user data from AuthContext
  const navigate = useNavigate();

  // State to hold fetched orders
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch orders on component mount
  useEffect(() => {
    if (user) {
      const fetchOrders = async () => {
        try {
          const response = await Axios.get("/orders/myorders"); // API call to fetch orders
          setOrders(response.data.orders); // Update state with fetched orders
        } catch (error) {
          console.error("Error fetching orders:", error);
        } finally {
          setLoading(false); // Stop loading when data is fetched
        }
      };

      fetchOrders();
    }
  }, [user]); // Only fetch orders if user is logged in

  const statusColors = {
    Pending: "bg-yellow-400",  // Adjusting status colors to match API response
    Shipped: "bg-green-400",
    Processing: "bg-yellow-400",
    Cancelled: "bg-red-400",
  };

  // 👉 Redirect user to Invoice page
  const handleDownloadInvoice = (orderId) => {
    navigate(`/profile/invoice/${orderId}`);
  };

  if (loading) {
    return <div>Loading your orders...</div>;
  }

  return (
    <div className="p-5 min-h-screen bg-slate-50/30">
      <h1 className="text-3xl font-black text-slate-900 mb-2 italic tracking-tighter uppercase">My Orders</h1>
      <p className="text-slate-500 mb-6 text-sm font-medium uppercase tracking-widest">
        Manage and track your recent orders below.
      </p>

      <div className="flex flex-col gap-5">
        {orders.map((order) => {
          // console.log("Order Data:", order); // Debugging
          const mainItem = order.items[0];
          const remainingCount = order.items.length - 1;

          // Compute subtotal and fallback shipping when backend doesn't provide it
          const subtotal = order.items.reduce((acc, it) => acc + (it.selectedVariant?.price || 0) * (it.quantity || 0), 0);
          const couponDiscount = order.discountAmount || 0;
          const finalAmount = subtotal - couponDiscount;
          const shippingAmount = order.shipping !== undefined ? order.shipping : 80;

          return (
            <div
              key={order._id} // Use _id from the database as key
              className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-500 group"
            >
              {/* Header */}
              <div className="flex justify-between items-center p-5 bg-slate-50 border-b border-slate-100 flex-wrap gap-2">
                <div className="min-w-0">
                  <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">
                    Order Protocol #{order._id}
                  </h2>
                  <p className="text-slate-900 font-bold text-xs italic">
                    Placed on {new Date(order.placedAt).toLocaleDateString()}
                  </p>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-white text-xs font-semibold whitespace-nowrap ${statusColors[order.orderStatus]}`}
                >
                  {order.orderStatus}
                </span>
              </div>


              {/* Item */}
              <div className="p-5 flex items-center gap-6 cursor-pointer">
                <div className="relative flex-shrink-0">
                  <img
                    src={mainItem.product?.pimages[0]} // Assuming product images are in pimages array
                    alt={mainItem.product?.name || "GK Store Product"}
                    className="w-24 h-24 object-contain rounded-2xl border border-slate-100 shadow-sm bg-slate-50 p-2 group-hover:scale-105 transition-transform duration-500"
                  />
                  {remainingCount > 0 && (
                    <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white rounded-full px-2 py-1 text-[10px] font-black flex items-center gap-0.5 shadow-xl shadow-blue-500/30">
                      <Plus size={10} strokeWidth={4} /> {remainingCount}
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <h3 className="text-gray-800 font-semibold text-sm sm:text-base">
                    {mainItem.product?.name}
                  </h3>
                  <p className="text-gray-500 text-sm">{mainItem.product?.seller}</p>

                  {/* Display selected color and size */}
                  <div className="text-sm text-gray-600 mt-1">
                    <p><strong>Color:</strong> {mainItem.selectedVariant?.color}</p>
                    <p><strong>Size:</strong> {mainItem.selectedVariant?.size}</p>
                  </div>

                  <div className="text-slate-900 mt-2 text-sm sm:text-base">
                    {couponDiscount > 0 && (
                      <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Coupon: -₹{couponDiscount}</p>
                    )}
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Shipping: ₹{shippingAmount}</p>
                    <p className="text-slate-900 font-bold mt-2 italic">
                      ARCHIVE TOTAL: <span className="text-blue-600 font-black">₹{order.totalAmount}</span>
                    </p>
                  </div>

                  <p className="text-blue-600 font-black text-[9px] uppercase tracking-[0.3em] mt-3">{order.paymentStatus}</p>
                </div>
              </div>


              {/* Footer */}
              <div className="px-5 py-4 border-t border-slate-100 flex justify-between items-center bg-slate-50/50">
                <button
                  onClick={() => handleDownloadInvoice(order._id)} // Navigate to invoice page
                  className="flex items-center gap-2 text-blue-600 text-[10px] font-black uppercase tracking-[0.2em] hover:text-blue-700 transition-colors italic"
                >
                  <Download size={16} strokeWidth={2.5} />
                  Download Protocol
                </button>

                <button
                  onClick={() => navigate(`/order/${order._id}`)} // Navigate to order details
                  className="px-6 py-2 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-xl hover:bg-blue-600 transition-all shadow-lg active:scale-95 italic"
                >
                  Inspection View
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
