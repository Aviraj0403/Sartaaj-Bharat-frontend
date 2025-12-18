import React, { useRef, useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Printer, Download } from "lucide-react";
import logo from "../image/logo-cosmetic2.jpg";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function Invoice() {
  const { orderId } = useParams(); // Get the dynamic orderId from the URL
  const invoiceRef = useRef();
  const location = useLocation(); // Get the state passed via navigate

  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    if (location.state?.order) {
      setOrderData(location.state.order); // Set order data from the location state
    }
  }, [location.state]);

  if (!orderData) {
    return <div>Loading...</div>; // Display loading state while data is being fetched
  }

  const { customer, shippingAddress, items, appliedCoupon, finalAmount, subtotal, gst, shipping, paymentMethod, paymentStatus, id: id } = orderData;

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

    pdf.save(`Invoice-${orderIdFromData}.pdf`);
  };

  // PRINT FUNCTION
  const handlePrint = () => {
    const originalTitle = document.title;
    document.title = `Invoice-${orderIdFromData}`;
    window.print();
    document.title = originalTitle;
  };

  return (
    <div className="min-h-screen bg-pink-50 p-4 md:p-6 flex justify-center items-start relative">
      {/* WATERMARK */}
      <img
        src={logo}
        alt="Watermark Logo"
        className="absolute top-1/2 left-1/2 w-[90%] md:w-3/4 max-w-xl opacity-3 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-11 select-none"
      />

      {/* INVOICE CONTAINER */}
      <div
        ref={invoiceRef}
        className="bg-white shadow-xl rounded-2xl p-4 md:p-8 w-full max-w-4xl border border-pink-200 relative z-10"
      >
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 md:mb-8 gap-4">
          {/* Logo + Brand */}
          <div className="flex flex-col md:flex-row items-center gap-3 md:gap-6">
            <img src={logo} alt="Logo" className="w-20 md:w-24" />
            <div className="text-center md:text-left">
              <h1 className="text-2xl md:text-3xl font-bold text-pink-600">
                Gurmeet Kaur Store
              </h1>
              <p className="text-gray-500 text-xs md:text-sm">
                Premium Cosmetics & Beauty Products
              </p>
            </div>
          </div>

          {/* DOWNLOAD + PRINT BUTTONS */}
          <div className="flex gap-2 w-full md:w-auto justify-center print:hidden">
            <button
              onClick={handleDownload}
              className="flex items-center gap-1 md:gap-2 bg-pink-500 hover:bg-pink-600 text-white px-3 md:px-4 py-2 rounded-lg shadow text-xs md:text-sm transition"
            >
              <Download size={14} className="md:w-4" /> Download
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1 md:gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 md:px-4 py-2 rounded-lg shadow text-xs md:text-sm transition"
            >
              <Printer size={14} className="md:w-4" /> Print
            </button>
          </div>
        </div>

        {/* INVOICE INFO */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6 text-xs md:text-sm text-gray-700 border-b border-pink-200 pb-4">
          <div className="space-y-2">
            <p><strong>Invoice #: </strong>{id}</p>
            <p><strong>Date: </strong>{new Date().toLocaleDateString()}</p>
            <p><strong>Payment Method: </strong>{paymentMethod}</p>
            <p>
              <strong>Order Status: </strong>
              <span className={`font-semibold ${paymentStatus === "Pending" ? "text-yellow-500" : "text-green-500"}`}>
                {paymentStatus}
              </span>
            </p>
            <p><strong>Shipping Method: </strong>Standard Delivery</p>
            <p><strong>Coupon Applied: </strong>{appliedCoupon ? appliedCoupon.code : "None"}</p>
          </div>

          <div className="space-y-2">
            <p><strong>Billed To:</strong> {shippingAddress?.name || "N/A"}</p>
            <p>{shippingAddress?.email || "N/A"}</p>
            <p>{shippingAddress?.phoneNumber || "N/A"}</p>
            <p>{shippingAddress?.street || "N/A"}</p>
            <p><strong>Shipping To:</strong> {shippingAddress?.street || "N/A"}</p>
            <p>{shippingAddress?.phoneNumber || "N/A"}</p>
          </div>
        </div>

        {/* ITEMS TABLE */}
        <div className="overflow-x-auto mt-4">
          <table className="w-full text-xs md:text-sm border-collapse border border-pink-100">
            <thead>
              <tr className="bg-pink-50 text-gray-800">
                <th className="py-2 px-3">Item</th>
                <th className="py-2 px-3 text-center">Qty</th>
                <th className="py-2 px-3 text-right">Price</th>
                <th className="py-2 px-3 text-right">Total</th>
              </tr>
            </thead>
           <tbody>
  {items?.map((item, index) => (
    <tr key={index} className="border-b border-pink-100">
      <td className="py-2 px-3">
        {/* Display name, size, and color with fallback for missing values */}
        {item?.selectedVariant?.name 
          ? `${item.selectedVariant.name} : (${item.selectedVariant.size || "N/A"} / ${item.selectedVariant.color || "N/A"})`
          : "N/A"} 
      </td>
      <td className="py-2 px-3 text-center">{item?.quantity || "N/A"}</td>
      <td className="py-2 px-3 text-right">₹{item?.selectedVariant?.price?.toFixed(2) || "0.00"}</td>
      <td className="py-2 px-3 text-right">₹{(item?.selectedVariant?.price * item?.quantity)?.toFixed(2) || "0.00"}</td>
    </tr>
  ))}
</tbody>

          </table>
        </div>

        {/* TOTALS SECTION */}
        <div className="mt-6 flex flex-col items-end text-gray-800 font-semibold text-xs md:text-sm space-y-1">
          <p>Subtotal: ₹{subtotal?.toFixed(2) || "0.00"}</p>
          {appliedCoupon && appliedCoupon.discountAmount ? (
            <p>Coupon Discount: -₹{(appliedCoupon.discountAmount).toFixed(2)}</p>
          ) : appliedCoupon ? (
            <p>Coupon: {appliedCoupon.code}</p>
          ) : null}
          <p>Shipping: {shipping === 0 ? "Free" : `₹${(shipping || 0).toFixed(2)}`}</p>

          <p className="text-lg text-pink-600 font-bold">
            Grand Total: ₹{finalAmount.toFixed(2) || "0.00"}
          </p>
        </div>

        {/* FOOTER */}
        <div className="mt-6 border-t border-pink-200 pt-3 text-xs md:text-sm text-gray-500 space-y-1">
          <p><strong>Note:</strong> Thank you for shopping with Gurmeet Kaur Store.</p>
          <p>
            For any queries, contact{" "}
            <span className="text-pink-600 font-semibold">
              support@gurmeetkaurstore.com
            </span>
          </p>
        </div>

        <p className="text-center text-gray-400 text-[10px] md:text-xs mt-4">
          ❤️ Made with love by Gurmeet Kaur Store
        </p>
      </div>
    </div>
  );
}
