import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Download, ArrowLeft, ShieldCheck, Zap, Package, MapPin, CreditCard } from "lucide-react";
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
    Pending: "bg-amber-500",
    Shipped: "bg-blue-500",
    Processing: "bg-indigo-500",
    Cancelled: "bg-rose-500",
    Delivered: "bg-emerald-500",
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
        className="mb-8 flex items-center gap-2 text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] hover:text-blue-600 transition-all italic group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" strokeWidth={3} /> 
        Return to Protocol Logs
      </button>

      {/* Header */}
      <div className="bg-white p-6 sm:p-10 rounded-[2.5rem] shadow-sm border border-slate-100 mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
        <div className="flex justify-between items-center flex-wrap gap-6 relative z-10">
          <div className="min-w-0">
            <h1 className="text-3xl sm:text-6xl font-black text-slate-900 italic tracking-tighter uppercase break-all leading-none mb-3">
              Order <span className="text-blue-600">Details</span>
            </h1>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.4em] italic mb-6">
              Detailed tracking and shipment information
            </p>
            <h2 className="text-slate-900 font-black text-sm sm:text-lg italic uppercase tracking-tight flex items-center gap-2">
              <ShieldCheck className="text-blue-600" size={18} />
              Order Tracking: #{order._id.slice(-8).toUpperCase()}
            </h2>
            <p className="text-blue-600 text-[10px] font-black uppercase tracking-widest italic">
              Verified System Entry
            </p>
          </div>

          <span
            className={`px-8 py-2 rounded-full text-white text-[10px] font-black uppercase tracking-widest italic shadow-lg shadow-current/20 ${statusColors[order.orderStatus] || "bg-slate-400"}`}
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
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-10 italic tracking-tight uppercase flex items-center gap-4">
          <Package className="text-blue-600" size={28} />
          Acquisition <span className="text-blue-600 italic">({order.items.length})</span>
        </h2>

        <div className="space-y-4">
          {order.items.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-6 p-4 sm:p-6 rounded-[2rem] border border-slate-50 bg-slate-50/30 hover:bg-white hover:border-blue-600 hover:shadow-2xl transition-all duration-500 group"
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-2xl overflow-hidden p-3 border border-slate-100 group-hover:scale-105 transition-transform duration-500">
                <img
                  src={item.product?.pimages?.[0] || item.product?.pimage || item.product?.image}
                  alt={item.product?.name}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="text-slate-900 font-black text-sm sm:text-lg italic uppercase tracking-tight truncate">
                  {item.product.name}
                </h3>
                <div className="flex gap-4 mt-2">
                  <span className="text-slate-400 text-[9px] font-black uppercase tracking-widest">
                    Official Store
                  </span>
                  <span className="text-slate-400 text-[9px] font-black uppercase tracking-widest">
                    Size: {item.selectedVariant?.size || "Standard"}
                  </span>
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
        <h2 className="text-2xl sm:text-3xl font-black text-white mb-8 italic tracking-tight uppercase relative z-10 flex items-center gap-4">
          <MapPin className="text-blue-600" size={28} />
          Dispatch <span className="text-blue-600">Node</span>
        </h2>

        <div className="space-y-4 relative z-10">
          <div>
            <p className="text-white font-black text-xl md:text-2xl italic uppercase tracking-tight">
              {order.shippingAddress?.name || "Operator Alpha"}
            </p>
            <div className="h-1 w-12 bg-blue-600 mt-1 opacity-50"></div>
          </div>
          <p className="text-slate-400 font-bold text-sm leading-relaxed max-w-sm italic">
            {order.shippingAddress?.street}, {order.shippingAddress?.city}, {order.shippingAddress?.state} - {order.shippingAddress?.pincode}
          </p>
          <div className="flex items-center gap-3 pt-2">
            <div className="w-8 h-8 rounded-xl bg-blue-600/20 flex items-center justify-center border border-blue-500/30">
              <Zap size={14} className="text-blue-400" />
            </div>
            <p className="text-blue-400 font-black text-[10px] uppercase tracking-[0.3em] italic">
              {order.shippingAddress?.phoneNumber || order.shippingAddress?.phone}
            </p>
          </div>
        </div>
      </div>

      {/* Payment Details */}
      <div className="bg-white p-6 sm:p-10 rounded-[2.5rem] shadow-sm border border-slate-100 mb-10">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-10 italic tracking-tight uppercase flex items-center gap-4">
          <CreditCard className="text-blue-600" size={28} />
          Financial <span className="text-blue-600">Overview</span>
        </h2>

        <div className="space-y-6 max-w-sm">
          <div className="flex justify-between items-center group/fee">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 group-hover:text-slate-600 transition-colors">
              Transfer Method
            </span>
            <span className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-900 italic">
              {order.paymentMethod}
            </span>
          </div>
          <div className="flex justify-between items-center group/fee">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 group-hover:text-slate-600 transition-colors">
              Order Timeline
            </span>
            <span className="text-blue-600 font-black text-[11px] uppercase tracking-[0.3em] italic">
              {order.paymentStatus}
            </span>
          </div>
          <div className="h-px bg-slate-100"></div>
          {order.discountAmount > 0 && (
            <div className="flex justify-between items-center text-emerald-600 font-black text-[10px] uppercase tracking-[0.3em]">
              <span>Credits Applied</span>
              <span className="italic">-₹{order.discountAmount}</span>
            </div>
          )}
          <div className="flex justify-between items-center text-slate-400 font-black text-[10px] uppercase tracking-[0.3em]">
            <span>Logistics Fee</span>
            <span className="italic font-bold">₹{order.shipping || 80}</span>
          </div>
          <div className="pt-8 border-t border-slate-200 flex justify-between items-end">
            <span className="text-slate-400 font-black text-[10px] uppercase tracking-[0.5em] mb-2 italic">
              Contract Value
            </span>
            <span className="text-blue-600 font-black text-5xl italic tracking-tighter leading-none">
              ₹{order.totalAmount?.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap gap-4 mb-20">
        <button
          onClick={handleDownloadInvoice}
          className="bg-blue-600 hover:bg-slate-900 text-white px-8 md:px-12 py-4 md:py-6 rounded-[2rem] font-black text-xs md:text-sm uppercase tracking-[0.3em] flex items-center gap-4 transition-all shadow-xl shadow-blue-500/20 active:scale-95 italic"
        >
          <Download size={20} strokeWidth={3} /> Download Invoice
        </button>

        <button className="px-8 md:px-10 py-4 md:py-6 rounded-[2rem] border-2 border-slate-200 text-slate-400 font-black text-xs uppercase tracking-[0.34em] hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all active:scale-95 italic text-center">
          Track Order
        </button>

        <button className="px-8 md:px-10 py-4 md:py-6 rounded-[2rem] border-2 border-slate-200 text-slate-400 font-black text-xs uppercase tracking-[0.34em] hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all active:scale-95 italic text-center ml-auto md:ml-0">
          Reorder Items
        </button>
      </div>
    </div>
  );
}
