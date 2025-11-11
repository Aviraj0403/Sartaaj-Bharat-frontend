import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Download } from "lucide-react";

export default function OrderDetails() {
  const { orderId} = useParams();
  const navigate = useNavigate();
 const selectedOrderId = orderId || "12345";
  // Orders data (same as in Orders.js)
  const orders = [
    {
      id: "12345",
      date: "05 Nov 2025",
      status: "Shipped",
      total: 1098,
      description: "Your order has been shipped and is on the way!",
      items: [
        {
          name: "Glow Radiance Face Cream",
          price: 799,
          image:
            "https://www.gurmeetkaurstore.in/uploads/67814ADS_Pro_sensual_Pro_Skin_Primer.png",
          seller: "Gurmeet Kaur Store",
          color: "Pink",
        },
        {
          name: "Hydrating Lip Balm",
          price: 299,
          image: "https://via.placeholder.com/60",
          seller: "Gurmeet Kaur Store",
          color: "Red",
        },
      ],
      delivery: {
        name: "Neha Pandey",
        address: "Noida sector 62, near HCL office, UP, 201301",
        phone: "6202000340, 9523435814",
      },
      payment: {
        method: "UPI, Razorpay",
        listingPrice: 1290,
        specialPrice: 349,
        fees: 9,
        total: 358,
      },
      tracking: [
        { stage: "Order Confirmed", date: "Nov 5" },
        { stage: "Shipped", date: "Nov 6" },
        { stage: "Delivered", date: "Nov 8" },
      ],
    },
    {
      id: "#12346",
      date: "07 Nov 2025",
      status: "Processing",
      total: 999,
      description: "Your order is being processed.",
      items: [
        {
          name: "Luxury Hair Serum",
          price: 999,
          image: "https://via.placeholder.com/60",
          seller: "Gurmeet Kaur Store",
          color: "Blue",
        },
      ],
      delivery: {
        name: "Rahul Singh",
        address: "Noida sector 63, near Wave Mall, UP, 201301",
        phone: "9876543210",
      },
      payment: {
        method: "Card, Stripe",
        listingPrice: 999,
        specialPrice: 0,
        fees: 0,
        total: 999,
      },
      tracking: [
        { stage: "Order Confirmed", date: "Nov 7" },
        { stage: "Processing", date: "Nov 7" },
      ],
    },
  ];

  const order = orders.find((o) => o.id === selectedOrderId);
  console.log("Selected order:", selectedOrderId, order);

  if (!order) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 text-pink-500 hover:text-pink-700 font-semibold"
        >
          &larr; Back to Orders
        </button>
        <p className="text-gray-700">Order not found.</p>
      </div>
    );
  }

  const statusColors = {
    Shipped: "bg-green-400",
    Processing: "bg-yellow-400",
    Cancelled: "bg-red-400",
  };

  const handleDownloadInvoice = () => {
    const blob = new Blob([`Invoice for ${order.id}`], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${order.id}-invoice.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-pink-500 hover:text-pink-700 font-semibold"
      >
        &larr; Back to Orders
      </button>

      {/* Header */}
      <div className="bg-white p-6 rounded-3xl shadow-xl border border-pink-100 mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-pink-600">{order.id}</h1>
          <p className="text-gray-500 text-sm">Placed on: {order.date}</p>
          <p className="text-gray-500 text-sm mt-1">{order.description}</p>
        </div>
        <span
          className={`px-4 py-2 rounded-full text-white font-semibold ${statusColors[order.status]}`}
        >
          {order.status}
        </span>
      </div>

      {/* Items Section */}
      <div className="bg-white p-6 rounded-3xl shadow-xl border border-pink-100 mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Items in Order</h2>
        <div className="space-y-4">
          {order.items.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-4 p-4 rounded-xl border border-pink-100 shadow hover:shadow-lg transition-all duration-300"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-xl"
              />
              <div className="flex-1">
                <h3 className="text-gray-800 font-semibold">{item.name}</h3>
                <p className="text-gray-500 text-sm">Seller: {item.seller}</p>
                <p className="text-gray-500 text-sm">Color: {item.color}</p>
                <p className="text-pink-500 font-bold mt-1">₹{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Delivery Details */}
      <div className="bg-white p-6 rounded-3xl shadow-xl border border-pink-100 mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Delivery Details</h2>
        <p className="text-gray-700">{order.delivery.name}</p>
        <p className="text-gray-700 mt-1">{order.delivery.address}</p>
        <p className="text-gray-700 mt-1">{order.delivery.phone}</p>
      </div>

      {/* Payment Details */}
      <div className="bg-white p-6 rounded-3xl shadow-xl border border-pink-100 mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Payment Details</h2>
        <p className="text-gray-700">Listing Price: ₹{order.payment.listingPrice}</p>
        <p className="text-gray-700">Special Price: ₹{order.payment.specialPrice}</p>
        <p className="text-gray-700">Fees: ₹{order.payment.fees}</p>
        <p className="text-pink-500 font-bold mt-1">Total: ₹{order.payment.total}</p>
        <p className="text-gray-700 mt-1">Payment Method: {order.payment.method}</p>
      </div>

      {/* Tracking Timeline */}
      <div className="bg-white p-6 rounded-3xl shadow-xl border border-pink-100 mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Tracking Updates</h2>
        <div className="space-y-4">
          {order.tracking.map((t, idx) => (
            <div key={idx} className="flex items-center gap-4">
              <div className="w-4 h-4 rounded-full bg-pink-500 flex-shrink-0 mt-1"></div>
              <div>
                <p className="font-semibold text-gray-800">{t.stage}</p>
                <p className="text-gray-500 text-sm">{t.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 mb-12">
        <button
          onClick={handleDownloadInvoice}
          className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-300 flex items-center gap-2"
        >
          <Download size={18} /> Download Invoice
        </button>
        <button className="bg-white border border-pink-500 text-pink-500 px-6 py-3 rounded-2xl font-semibold hover:bg-pink-50 transition-all duration-300">
          Chat with Support
        </button>
        <button className="bg-white border border-pink-500 text-pink-500 px-6 py-3 rounded-2xl font-semibold hover:bg-pink-50 transition-all duration-300">
          Reorder
        </button>
      </div>
    </div>
  );
}
