// src/pages/Invoice.jsx
import React from "react";
import { useParams } from "react-router-dom";
import { Printer, Download } from "lucide-react";
import logo from "../image/logo-cosmetic2.jpg"; // Using imported logo

export default function Invoice() {
  const { orderId } = useParams();

  // Customer & Order Data
  const customer = {
    name: "Abhishek Kumar",
    email: "abhishek@example.com",
    phone: "+91 98765 43210",
    address: "123 Beauty Street, Cosmetic City, CC 12345",
  };

  const shippingAddress = {
    name: "Abhishek Kumar",
    address: "123 Beauty Street, Cosmetic City, CC 12345",
    phone: "+91 98765 43210",
  };

  const items = [
    { name: "Glow Radiance Face Cream", qty: 1, price: 799 },
    { name: "Hydrating Lip Balm", qty: 2, price: 299 },
  ];

  const subtotal = items.reduce((acc, item) => acc + item.price * item.qty, 0);
  const gst = subtotal * 0.18; // 18% GST
  const couponDiscount = 150; // Example coupon
  const shipping = 0; // Free shipping
  const total = subtotal + gst + shipping - couponDiscount;

  return (
    <div className="min-h-screen bg-pink-50 p-6 flex justify-center items-start relative">
      {/* Watermark using imported logo */}
      {/* Watermark using imported logo */}
<img
  src={logo}
  alt="Watermark Logo"
  className="absolute top-1/2 left-1/2 w-3/4 max-w-2xl opacity-4 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-11 select-none"
/>


      <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-4xl border border-pink-200 relative z-10">
        {/* Header with imported Logo */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6">
            <img src={logo} alt="Logo" className="w-30 md:w-20" />
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold text-pink-600 mb-1">Gurmeet Kaur Store</h1>
              <p className="text-gray-500 text-sm">Premium Cosmetics & Beauty Products</p>
            </div>
          </div>

          <div className="flex gap-2 mt-4 md:mt-0">
            <button className="flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg shadow transition">
              <Download size={16} /> Download
            </button>
            <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg shadow transition">
              <Printer size={16} /> Print
            </button>
          </div>
        </div>

        {/* Invoice & Customer Info */}
        <div className="grid md:grid-cols-2 gap-6 mb-6 text-sm text-gray-700 border-b border-pink-200 pb-4">
          {/* Left Column */}
          <div className="space-y-2">
            <p><strong>Invoice #: </strong>{orderId}</p>
            <p><strong>Date: </strong>05 Nov 2025</p>
            <p><strong>Payment Method: </strong>Online</p>
            <p><strong>Order Status: </strong><span className="text-green-500 font-semibold">Paid</span></p>
            <p><strong>Shipping Method: </strong>Standard Delivery</p>
            <p><strong>Coupon Applied: </strong>Beauty150</p>
          </div>

          {/* Right Column */}
          <div className="space-y-2">
            <p><strong>Billed To:</strong> {customer.name}</p>
            <p>{customer.email}</p>
            <p>{customer.phone}</p>
            <p>{customer.address}</p>
            <p><strong>Shipping To:</strong> {shippingAddress.address}</p>
            <p>{shippingAddress.phone}</p>
          </div>
        </div>

        {/* Items Table */}
        <div className="overflow-x-auto mt-6">
          <table className="w-full text-sm border-collapse border border-pink-100">
            <thead>
              <tr className="bg-pink-50 text-gray-800">
                <th className="py-3 px-4 border-b border-pink-200 text-left">Item</th>
                <th className="py-3 px-4 border-b border-pink-200 text-center">Qty</th>
                <th className="py-3 px-4 border-b border-pink-200 text-right">Price</th>
                <th className="py-3 px-4 border-b border-pink-200 text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index} className="border-b border-pink-100">
                  <td className="py-3 px-4">{item.name}</td>
                  <td className="py-3 px-4 text-center">{item.qty}</td>
                  <td className="py-3 px-4 text-right">₹{item.price}</td>
                  <td className="py-3 px-4 text-right">₹{item.price * item.qty}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals & Taxes */}
        <div className="mt-6 flex flex-col items-end text-gray-800 font-semibold text-sm space-y-1">
          <p>Subtotal: ₹{subtotal.toFixed(2)}</p>
          <p>GST (18%): ₹{gst.toFixed(2)}</p>
          <p>Coupon Discount: -₹{couponDiscount.toFixed(2)}</p>
          <p>Shipping: {shipping === 0 ? "Free" : `₹${shipping.toFixed(2)}`}</p>
          <p className="text-lg text-pink-600 font-bold">Grand Total: ₹{total.toFixed(2)}</p>
        </div>

        {/* Notes & Footer */}
        <div className="mt-8 border-t border-pink-200 pt-4 text-sm text-gray-500 space-y-2">
          <p><strong>Note:</strong> Thank you for shopping with Gurmeet Kaur Store. Enjoy your premium beauty products!</p>
          <p>If you have any queries regarding your order, contact us at <span className="text-pink-600 font-semibold">support@gurmeetkaurstore.com</span> or +91 98765 43210.</p>
        </div>

        <p className="text-center text-gray-400 text-xs mt-6">
          ❤️ Made with love by Gurmeet Kaur Store
        </p>
      </div>
    </div>
  );
}
