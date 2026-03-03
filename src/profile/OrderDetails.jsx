import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Download } from "lucide-react";
import Axios from "../utils/Axios";

export default function OrderDetails() {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await Axios.get(`/orders/getOrderById/${orderId}`);
        setOrder(response.data.order);
      } catch (err) {
        setError("Order not found or server error.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrderDetails();
  }, [orderId]);

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (error) return <div className="p-6">{error}</div>;
  if (!order) return <div className="p-6">Order not found</div>;

  const statusColors = {
    Shipped: "bg-green-500",
    Processing: "bg-yellow-500",
    Cancelled: "bg-red-500",
    Pending: "bg-gray-500",
  };

  const handleDownloadInvoice = () => {
    const blob = new Blob([`Invoice for ${order._id}`], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${order._id}-invoice.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen">

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 text-blue-600 text-[10px] font-black uppercase tracking-[0.3em] hover:translate-x-[-4px] transition-transform italic"
      >
        <ArrowRight size={14} className="rotate-180" strokeWidth={3} /> Return to Archives
      </button>

      {/* Header */}
      <div className="bg-white p-6 sm:p-10 rounded-[2.5rem] shadow-sm border border-slate-100 mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
        <div className="flex justify-between items-center flex-wrap gap-6 relative z-10">
          <div className="min-w-0">
            <h1 className="text-2xl sm:text-5xl font-black text-slate-900 italic tracking-tighter uppercase break-all leading-none mb-3">
              Order Protocol <span className="text-blue-600">#{order._id}</span>
            </h1>
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.4em]">
              Authorization Date: {new Date(order.placedAt).toLocaleDateString()}
            </p>
          </div>

          <span
            className={`px-3 py-1 rounded-full text-white text-sm font-semibold whitespace-nowrap ${statusColors[order.orderStatus]}`}
          >
            {order.orderStatus}
          </span>
        </div>

        {/* <p className="text-gray-500 text-sm mt-2">
          {order.description || "No description available."}
        </p> */}
      </div>

      {/* Items Section */}
      <div className="bg-white p-6 sm:p-10 rounded-[2.5rem] shadow-sm border border-slate-100 mb-8">
        <h2 className="text-xl sm:text-3xl font-black text-slate-900 mb-8 italic tracking-tight uppercase">
          Neural Artifacts <span className="text-blue-600 italic">[{order.items.length}]</span>
        </h2>

        <div className="space-y-4">
          {order.items.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-6 p-4 sm:p-6 rounded-[2rem] border border-slate-50 bg-slate-50/30 hover:bg-white hover:border-blue-600 hover:shadow-2xl transition-all duration-500 group"
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-2xl overflow-hidden p-3 border border-slate-100 group-hover:scale-105 transition-transform duration-500">
                <img
                  src={item.product.pimages[0]}
                  alt={item.product.name}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="text-slate-900 font-black text-sm sm:text-lg italic uppercase tracking-tight truncate">
                  {item.product.name}
                </h3>
                <div className="flex gap-4 mt-2">
                  <span className="text-slate-400 text-[9px] font-black uppercase tracking-widest">Seller: Elite Archive</span>
                  <span className="text-slate-400 text-[9px] font-black uppercase tracking-widest">Protocol: {item.selectedVariant?.size || "Alpha"}</span>
                </div>

                <p className="text-blue-600 font-black text-sm sm:text-xl mt-3 italic">
                  ₹{item.selectedVariant?.price?.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Delivery Details */}
      <div className="bg-slate-900 p-6 sm:p-10 rounded-[2.5rem] shadow-2xl mb-8 border border-slate-800 relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-600/10 blur-3xl rounded-full"></div>
        <h2 className="text-xl sm:text-3xl font-black text-white mb-6 italic tracking-tight uppercase relative z-10">
          Neural Node <span className="text-blue-600">Address</span>
        </h2>

        <div className="space-y-2 relative z-10">
          <p className="text-white font-black text-lg italic uppercase tracking-tight">{order.shippingAddress?.name}</p>
          <p className="text-slate-400 font-medium text-sm leading-relaxed max-w-sm">{order.shippingAddress?.street}</p>
          <div className="h-px w-12 bg-blue-600 my-4"></div>
          <p className="text-blue-500 font-black text-xs uppercase tracking-[0.2em]">{order.shippingAddress?.phoneNumber}</p>
        </div>
      </div>

      {/* Payment Details */}
      <div className="bg-white p-6 sm:p-10 rounded-[2.5rem] shadow-sm border border-slate-100 mb-10">
        <h2 className="text-xl sm:text-3xl font-black text-slate-900 mb-8 italic tracking-tight uppercase">
          Financial <span className="text-blue-600">Protocol</span>
        </h2>

        <div className="space-y-4 max-w-sm">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Escrow Type</span>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-900 italic">{order.paymentMethod}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Vault Status</span>
            <span className="text-blue-600 font-black text-[10px] uppercase tracking-[0.3em] italic">{order.paymentStatus}</span>
          </div>
          <div className="h-px bg-slate-50"></div>
          {order.discountAmount > 0 && (
            <div className="flex justify-between items-center text-red-500 font-black text-[10px] uppercase tracking-[0.3em]">
              <span>Discount</span>
              <span>-₹{order.discountAmount}</span>
            </div>
          )}
          <div className="flex justify-between items-center text-slate-900 font-black text-[10px] uppercase tracking-[0.3em]">
            <span>Logistics</span>
            <span>₹80.00</span>
          </div>
          <div className="pt-6 border-t border-slate-200 flex justify-between items-end">
            <span className="text-slate-400 font-black text-[10px] uppercase tracking-[0.4em]">Final Authorization</span>
            <span className="text-blue-600 font-black text-4xl italic leading-none">₹{order.totalAmount?.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap gap-4 mb-20">
        <button
          onClick={handleDownloadInvoice}
          className="bg-blue-600 hover:bg-slate-900 text-white px-8 md:px-12 py-4 md:py-6 rounded-[2rem] font-black text-xs md:text-sm uppercase tracking-[0.3em] flex items-center gap-4 transition-all shadow-xl shadow-blue-500/20 active:scale-95 italic"
        >
          <Download size={20} strokeWidth={3} /> Download Protocol
        </button>

        <button className="px-8 md:px-10 py-4 md:py-6 rounded-[2rem] border-2 border-slate-200 text-slate-400 font-black text-xs uppercase tracking-[0.34em] hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all active:scale-95 italic">
          Intelligence Link
        </button>

        <button className="px-8 md:px-10 py-4 md:py-6 rounded-[2rem] border-2 border-slate-200 text-slate-400 font-black text-xs uppercase tracking-[0.34em] hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all active:scale-95 italic ml-auto md:ml-0">
          Restore Selection
        </button>
      </div>
    </div>
  );
}
