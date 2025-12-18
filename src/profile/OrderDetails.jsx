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
        className="mb-4 text-pink-500 text-sm font-semibold"
      >
        ← Back to Orders
      </button>

      {/* Header */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl shadow border border-pink-100 mb-6">
        <div className="flex justify-between items-center flex-wrap gap-3">
          <div className="min-w-0">
           <h1 className="text-xl sm:text-3xl font-bold text-pink-600 break-all">
  {order._id}
</h1>

            <p className="text-gray-500 text-sm">
              Placed on {new Date(order.placedAt).toLocaleDateString()}
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
      <div className="bg-white p-4 sm:p-6 rounded-2xl shadow border border-pink-100 mb-6">
        <h2 className="text-lg sm:text-2xl font-semibold text-gray-800 mb-4">
          Items in Order
        </h2>

        <div className="space-y-4">
          {order.items.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl border border-pink-100 shadow-sm hover:shadow-md transition"
            >
              <img
                src={item.product.pimages[0]}
                alt={item.product.name}
                className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg flex-shrink-0"
              />

              <div className="flex-1 min-w-0">
                <h3 className="text-gray-800 font-semibold text-sm sm:text-base truncate">
                  {item.product.name}
                </h3>
                <p className="text-gray-500 text-xs sm:text-sm">
                  Seller: {item.product.seller || "Gurmeet Kaur Store"}
                </p>
                <p className="text-gray-500 text-xs sm:text-sm">
                  Size: {item.selectedVariant?.size || "N/A"}
                </p>

                <p className="text-pink-500 font-bold text-sm sm:text-base mt-1">
                  ₹{item.selectedVariant?.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Delivery Details */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl shadow border border-pink-100 mb-6">
        <h2 className="text-lg sm:text-2xl font-semibold text-gray-800 mb-2">
          Delivery Details
        </h2>

        <p className="text-gray-700 text-sm">{order.shippingAddress?.name}</p>
        <p className="text-gray-700 text-sm">{order.shippingAddress?.street}</p>
        <p className="text-gray-700 text-sm">{order.shippingAddress?.phoneNumber}</p>
      </div>

      {/* Payment Details */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl shadow border border-pink-100 mb-6">
        <h2 className="text-lg sm:text-2xl font-semibold text-gray-800 mb-2">
          Payment Details
        </h2>

        <p className="text-gray-700">Payment Method: {order.paymentMethod}</p>
        <p className="text-gray-700">Payment Status: {order.paymentStatus}</p>
        <p className="text-gray-700">Order Status: {order.orderStatus}</p>
          {/* Show coupon, shipping and GST (if available) */}
          {order.discountAmount > 0 && (
            <p className="text-gray-700">Coupon Discount: -₹{order.discountAmount}</p>
          )}

          <p className="text-gray-700">Shipping: ₹{order.shipping !== undefined ? order.shipping : (order.totalAmount ? (order.totalAmount - (order.discountAmount || 0) > 10 ? 80 : 0) : 0)}</p>

          {order.gst > 0 && <p className="text-gray-700">GST: ₹{order.gst}</p>}

          <p className="text-pink-500 font-bold mt-2">Total Amount: ₹{order.totalAmount}</p>
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={handleDownloadInvoice}
          className="bg-pink-500 hover:bg-pink-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold flex items-center gap-2 text-sm"
        >
          <Download size={16} /> Download Invoice
        </button>

        <button className="bg-white border border-pink-500 text-pink-500 px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold text-sm hover:bg-pink-50">
          Chat with Support
        </button>

        <button className="bg-white border border-pink-500 text-pink-500 px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold text-sm hover:bg-pink-50">
          Reorder
        </button>
      </div>
    </div>
  );
}
