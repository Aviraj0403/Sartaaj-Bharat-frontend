import React, { useRef, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Printer, Download } from "lucide-react";
import logo from "../image/logo-cosmetic2.jpg";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Axios from "../utils/Axios"; // Axios for fetching order data

export default function Invoice() {
  const { orderId } = useParams();
  const invoiceRef = useRef();
  const [order, setOrder] = useState(null); // State to hold order data
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    // Fetch the order details based on the orderId
    const fetchOrderDetails = async () => {
      try {
        const response = await Axios.get(`/orders/getOrderById/${orderId}`);
        setOrder(response.data.order);
      } catch (error) {
        console.error("Error fetching order details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrderDetails();
  }, [orderId]);

  if (loading) return <div className="p-6 text-center">Loading...</div>;

  if (!order) return <div className="p-6">Order not found</div>;

  // Extracting order details for rendering
  const customer = {
    name: order.shippingAddress.name,
    email: order.user.email,
    phone: order.shippingAddress.phoneNumber,
    address: order.shippingAddress.street,
  };

  const shippingAddress = {
    name: order.shippingAddress.name,
    address: order.shippingAddress.street,
    phone: order.shippingAddress.phoneNumber,
  };

  const items = order.items.map(item => ({
    name: item.product.name,
    size: item.selectedVariant.size,
    color: item.selectedVariant.color,
    qty: item.quantity,
    price: item.selectedVariant.price,
  }));

  const subtotal = items.reduce((acc, item) => acc + item.price * item.qty, 0);
  const couponDiscount = order.discountAmount || 0;
  const finalAmount = subtotal - couponDiscount;
  // No GST as per new policy
  // Prefer backend shipping when available; otherwise use static ₹80
  const shipping = order.shipping !== undefined ? order.shipping : 80;
  // Prefer backend totalAmount when available; otherwise compute
  const total = order.totalAmount !== undefined ? order.totalAmount : (subtotal - couponDiscount);

  // PDF DOWNLOAD FUNCTION
  const handleDownload = async () => {
    const input = invoiceRef.current;

    const canvas = await html2canvas(input, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      logging: false,
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    let heightLeft = pdfHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
    heightLeft -= pdf.internal.pageSize.getHeight();

    while (heightLeft > 0) {
      position = heightLeft - pdfHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
      heightLeft -= pdf.internal.pageSize.getHeight();
    }

    pdf.save(`Invoice-${orderId}.pdf`);
  };

  // PRINT FUNCTION
  const handlePrint = () => {
    const originalTitle = document.title;
    document.title = `Invoice-${orderId}`;
    window.print();
    document.title = originalTitle;
  };

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 md:p-12 flex justify-center items-start relative selection:bg-blue-600 selection:text-white overflow-hidden">

      {/* BACKGROUND DECORATION */}
      <div className="absolute top-0 right-0 w-[50rem] h-[50rem] bg-blue-600/5 blur-[150px] rounded-full translate-x-1/2 -translate-y-1/2 -z-0"></div>
      <div className="absolute bottom-0 left-0 w-[40rem] h-[40rem] bg-slate-900/5 blur-[120px] rounded-full -translate-x-1/2 translate-y-1/2 -z-0"></div>

      {/* WATERMARK */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] text-[15rem] font-black text-slate-900 rotate-[-25deg] pointer-events-none z-0 whitespace-nowrap select-none italic tracking-tighter">
        ELITE SYSTEMS
      </div>

      {/* INVOICE CONTAINER */}
      <div
        ref={invoiceRef}
        className="bg-white shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] rounded-[3rem] p-8 md:p-16 w-full max-w-5xl border border-slate-100 relative z-10"
      >

        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 md:mb-8 gap-4">

          {/* Logo + Brand */}
          <div className="flex flex-col md:flex-row items-center gap-3 md:gap-6">
            <img src={logo} alt="Logo" className="w-20 md:w-24" />
            <div className="text-center md:text-left">
              {/* DOWNLOAD + PRINT BUTTONS */}
              <div className="flex gap-4 w-full md:w-auto justify-center print:hidden">
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-3 bg-blue-600 hover:bg-slate-900 text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] transition-all shadow-xl shadow-blue-500/20 active:scale-95 italic"
                >
                  <Download size={16} strokeWidth={3} /> Download
                </button>

                <button
                  onClick={handlePrint}
                  className="flex items-center gap-3 bg-slate-50 hover:bg-slate-100 text-slate-600 px-8 py-4 rounded-2xl border border-slate-200 text-[10px] font-black uppercase tracking-[0.3em] transition-all active:scale-95 italic"
                >
                  <Printer size={16} strokeWidth={2.5} /> Print
                </button>
              </div>
            </div>

            {/* Brand Refinement */}
            <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-8 pb-12 border-b border-slate-50">
              <div>
                <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-2 italic tracking-tighter uppercase leading-none">
                  Elite <span className="text-blue-600">Enterprise</span>
                </h1>
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.4em]">Global Distribution Protocol</p>
              </div>
              <div className="text-right">
                <div className="bg-slate-950 px-6 py-2 rounded-full mb-3 inline-block">
                  <span className="text-blue-500 font-black text-[9px] uppercase tracking-[0.5em] italic">Authorized Invoice</span>
                </div>
                <p className="text-slate-900 font-black text-lg italic tracking-tight uppercase">TRANS-ID: {orderId}</p>
              </div>
            </div>

            {/* INVOICE INFO */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 mb-16 text-[11px] font-medium text-slate-600">
              <div className="space-y-6">
                <div className="space-y-1">
                  <span className="text-slate-400 font-black text-[9px] uppercase tracking-[0.4em] mb-2 block">Protocol Metadata</span>
                  <p><strong className="text-slate-900 uppercase font-black tracking-tight italic">Authorization: </strong>{orderId}</p>
                  <p><strong className="text-slate-900 uppercase font-black tracking-tight italic">Timestamp: </strong>{new Date(order.placedAt).toLocaleDateString()}</p>
                  <p><strong className="text-slate-900 uppercase font-black tracking-tight italic">Escrow: </strong>{order.paymentMethod}</p>
                </div>

                <div className="space-y-1">
                  <span className="text-slate-400 font-black text-[9px] uppercase tracking-[0.4em] mb-2 block">Current Status</span>
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${order.orderStatus === "Shipped" ? "bg-green-500" : "bg-blue-600"} animate-pulse`}></div>
                    <span className="text-slate-900 font-black uppercase tracking-widest italic">{order.orderStatus}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <span className="text-slate-400 font-black text-[9px] uppercase tracking-[0.4em] mb-2 block">Recipient Branch</span>
                  <p className="text-slate-900 font-black text-lg italic tracking-tight uppercase leading-none">{customer.name}</p>
                  <p className="font-bold">{customer.email}</p>
                  <div className="h-[2px] w-8 bg-blue-600 mt-4 mb-2"></div>
                  <p className="leading-relaxed">{customer.address}</p>
                  <p className="font-black text-slate-900 mt-2">{customer.phone}</p>
                </div>
              </div>
            </div>

            {/* ITEMS TABLE */}
            <div className="overflow-x-auto mt-4 px-2">
              <table className="w-full text-[11px] font-medium border-collapse">
                <thead>
                  <tr className="bg-slate-950 text-white">
                    <th className="py-5 px-6 text-left font-black uppercase tracking-[0.4em] italic rounded-l-2xl">Class Artifact</th>
                    <th className="py-5 px-6 text-center font-black uppercase tracking-[0.4em] italic">Quantity</th>
                    <th className="py-5 px-6 text-right font-black uppercase tracking-[0.4em] italic">Unit Price</th>
                    <th className="py-5 px-6 text-right font-black uppercase tracking-[0.4em] italic rounded-r-2xl">Branch Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {items.map((item, index) => (
                    <tr key={index} className="group hover:bg-slate-50/50 transition-colors">
                      <td className="py-6 px-6">
                        <p className="text-slate-900 font-black text-sm uppercase tracking-tight italic">{item.name}</p>
                        <p className="text-slate-400 text-[9px] font-black uppercase tracking-widest mt-1">SPEC: {item?.size || "Alpha"} / {item?.color || "N/A"}</p>
                      </td>
                      <td className="py-6 px-6 text-center text-slate-900 font-bold">{item.qty}</td>
                      <td className="py-6 px-6 text-right text-slate-900 font-bold">₹{item.price?.toLocaleString()}</td>
                      <td className="py-6 px-6 text-right text-blue-600 font-black italic">₹{(item.price * item.qty)?.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* TOTALS SECTION */}
            <div className="mt-16 flex flex-col items-end px-6">
              <div className="w-full max-w-xs space-y-4">
                <div className="flex justify-between items-center text-[11px] font-black uppercase tracking-[0.3em] text-slate-400">
                  <span>Voucher Reduction</span>
                  <span className="text-red-500">-₹{couponDiscount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-[11px] font-black uppercase tracking-[0.3em] text-slate-400">
                  <span>Logistics Protocol</span>
                  <span className="text-slate-900">₹{shipping.toFixed(2)}</span>
                </div>
                <div className="pt-8 border-t-2 border-slate-950 flex justify-between items-end">
                  <span className="text-slate-400 font-black text-[10px] uppercase tracking-[0.5em] italic">Final Settlement</span>
                  <span className="text-blue-600 font-black text-5xl leading-none italic tracking-tighter">₹{total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Footer Note */}
            <div className="mt-24 pt-12 border-t border-slate-50 text-center">
              <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.6em] italic mb-4">Enterprise Authenticated Document</p>
              <p className="text-slate-400 text-[10px] font-medium max-w-lg mx-auto leading-relaxed italic">This is a digitally generated protocol authorization. No physical signature required for neural validation.</p>
            </div>

          </div>
        </div>
        );
}
