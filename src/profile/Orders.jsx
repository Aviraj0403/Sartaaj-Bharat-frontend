import React, { useEffect, useState } from "react";
import { Download, Plus, ShoppingBag } from "lucide-react";
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
    Pending: "bg-amber-500",
    Shipped: "bg-blue-500",
    Processing: "bg-indigo-500",
    Cancelled: "bg-rose-500",
    Delivered: "bg-emerald-500",
  };

  // 👉 Redirect user to Invoice page
  const handleDownloadInvoice = (orderId) => {
    navigate(`/profile/invoice/${orderId}`);
  };

  if (loading) {
    return <div>Loading your orders...</div>;
  }

  return (
    <div className="p-4 md:p-8 min-h-screen bg-white">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-2 italic tracking-tighter uppercase leading-none">
            Order <span className="text-blue-600">History</span>
          </h1>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.4em] italic">
            Deployment and acquisition logs
          </p>
        </div>
        <div className="flex items-center gap-4 bg-slate-50 px-6 py-3 rounded-2xl border border-slate-100">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
            <ShoppingBag size={20} />
          </div>
          <div>
            <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">
              Total Managed
            </p>
            <p className="text-sm font-black text-slate-900 uppercase italic">
              {orders.length} Protocols
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-8">
        {orders.length === 0 ? (
          <div className="py-24 text-center border-2 border-dashed border-slate-100 rounded-[3rem] bg-slate-50/50">
            <ShoppingBag
              size={48}
              className="mx-auto text-slate-200 mb-6"
              strokeWidth={1}
            />
            <h3 className="text-xl font-black text-slate-400 uppercase tracking-widest italic mb-2">
              No History Found
            </h3>
            <p className="text-slate-400 text-xs font-medium italic">
              You haven't initiated any acquisition protocols yet.
            </p>
          </div>
        ) : (
          orders.map((order) => {
            const mainItem = order.items[0];
            const remainingCount = order.items.length - 1;
            const shippingAmount =
              order.shipping !== undefined ? order.shipping : 80;

            return (
              <div
                key={order._id}
                className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden hover:border-blue-600 transition-all duration-500 group shadow-sm hover:shadow-2xl hover:shadow-blue-500/5"
              >
                {/* Header */}
                <div className="flex justify-between items-center p-6 md:p-8 bg-slate-50/50 border-b border-slate-50 flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center shadow-sm">
                      <ShoppingBag size={20} className="text-slate-900" />
                    </div>
                    <div>
                      <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] leading-none mb-1.5">
                        Log Entry #{order._id.slice(-8).toUpperCase()}
                      </h2>
                      <div className="flex items-center gap-3">
                        <p className="text-slate-900 font-black text-xs italic uppercase tracking-tight">
                          Initiated:{" "}
                          {new Date(order.placedAt).toLocaleDateString(
                            undefined,
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            },
                          )}
                        </p>
                        <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                        <p className="text-blue-600 font-bold text-[10px] uppercase italic">
                          {order.paymentStatus}
                        </p>
                      </div>
                    </div>
                  </div>

                  <span
                    className={`px-6 py-2 rounded-full text-white text-[9px] font-black uppercase tracking-widest italic shadow-lg shadow-current/20 ${statusColors[order.orderStatus] || "bg-slate-400"}`}
                  >
                    {order.orderStatus}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8">
                  <div className="flex gap-6 md:gap-8 items-center">
                    <div className="relative flex-shrink-0">
                      <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-3xl border border-slate-100 p-3 flex items-center justify-center relative z-10 group-hover:rotate-2 transition-transform duration-500">
                        <img
                          src={mainItem.product?.pimages?.[0] || mainItem.product?.pimage || mainItem.product?.image}
                          alt={mainItem.product?.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="absolute inset-0 bg-blue-600/5 blur-2xl rounded-full scale-75 group-hover:scale-100 transition-transform"></div>
                      {remainingCount > 0 && (
                        <div className="absolute -bottom-2 -right-2 bg-slate-900 text-white rounded-xl px-3 py-1.5 text-[10px] font-black flex items-center gap-1.5 shadow-2xl z-20 border border-white/10 italic">
                          <Plus size={12} strokeWidth={3} /> {remainingCount} More
                        </div>
                      )}
                    </div>

                    <div className="space-y-3">
                      <div className="space-y-1">
                        <h3 className="text-slate-900 font-black text-lg md:text-xl italic uppercase tracking-tighter leading-tight">
                          {mainItem.product?.name}
                        </h3>
                        {mainItem.product?.brand && (
                          <p className="text-blue-600 text-[10px] font-black uppercase tracking-widest italic">
                            {mainItem.product?.brand}
                          </p>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-4 pt-2">
                        <div className="bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                          <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">
                            Configuration
                          </p>
                          <p className="text-[10px] font-bold text-slate-700 uppercase italic">
                            {mainItem.selectedVariant?.size} / {mainItem.selectedVariant?.color}
                          </p>
                        </div>
                        <div className="bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                          <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">
                            Quantity
                          </p>
                          <p className="text-[10px] font-bold text-slate-700 italic">
                            {mainItem.quantity || 1} x Units
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-[2rem] p-6 md:p-8 flex flex-col justify-center items-end border border-slate-100 text-right min-w-[200px]">
                    <div className="space-y-1 w-full">
                      <div className="flex justify-between md:flex-col md:items-end gap-2 text-slate-400 text-[9px] font-black uppercase tracking-widest">
                        <span>Delivery Fee</span>
                        <span className="text-slate-600 italic">₹{shippingAmount}</span>
                      </div>
                      {order.discountAmount > 0 && (
                        <div className="flex justify-between md:flex-col md:items-end gap-2 text-emerald-600 text-[9px] font-black uppercase tracking-widest">
                          <span>Credits Applied</span>
                          <span className="italic">-₹{order.discountAmount}</span>
                        </div>
                      )}
                    </div>
                    <div className="h-px w-full bg-slate-200 my-4"></div>
                    <div>
                      <p className="text-slate-400 text-[9px] font-black uppercase tracking-[0.3em] mb-1 italic">
                        Contract Value
                      </p>
                      <p className="text-3xl font-black text-slate-900 italic tracking-tighter">
                        ₹{order.totalAmount?.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="px-6 py-5 bg-white border-t border-slate-50 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <button
                    onClick={() => handleDownloadInvoice(order._id)}
                    className="flex items-center gap-3 text-slate-400 text-[9px] font-black uppercase tracking-[0.3em] hover:text-blue-600 transition-all group italic"
                  >
                    <Download
                      size={18}
                      className="group-hover:-translate-y-1 transition-transform"
                      strokeWidth={2.5}
                    />
                    Acquire Invoice Protocol
                  </button>

                  <button
                    onClick={() => navigate(`/order/${order._id}`)}
                    className="w-full sm:w-auto px-10 py-4 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.4em] rounded-2xl hover:bg-blue-600 transition-all shadow-xl hover:shadow-blue-600/20 active:scale-95 italic border border-white/5"
                  >
                    View Details
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
