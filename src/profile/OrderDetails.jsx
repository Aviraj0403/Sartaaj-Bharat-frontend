import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Download } from "lucide-react";
import Axios from "../utils/Axios"; // Axios instance for API calls

export default function OrderDetails() {
  const { orderId } = useParams();  // Get orderId from URL params
  const navigate = useNavigate();
  
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);  // Loading state for the order
  const [error, setError] = useState(null);  // Error state for any failed requests

  // Fetch order details based on orderId
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await Axios.get(`/orders/getOrderById/${orderId}`);
        setOrder(response.data.order);  // Set the fetched order data
      } catch (err) {
        console.error("Error fetching order:", err);
        setError("Order not found or server error.");  // Set error if request fails
      } finally {
        setLoading(false);  // Stop loading once the request is finished
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  if (loading) {
    return <div className="p-6 bg-gray-50 min-h-screen">Loading...</div>;
  }

  if (error) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 text-pink-500 hover:text-pink-700 font-semibold"
        >
          &larr; Back to Orders
        </button>
        <p className="text-gray-700">{error}</p>
      </div>
    );
  }

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

  // Define status colors for visual feedback
  const statusColors = {
    Shipped: "bg-green-400",
    Processing: "bg-yellow-400",
    Cancelled: "bg-red-400",
    Pending: "bg-gray-400",
  };

  // Handle invoice download (simple text file generation)
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
          <h1 className="text-3xl font-bold text-pink-600">{order._id}</h1>
          <p className="text-gray-500 text-sm">Placed on: {new Date(order.placedAt).toLocaleDateString()}</p>
          <p className="text-gray-500 text-sm mt-1">{order.description || "No description available."}</p>
        </div>
        <span
          className={`px-4 py-2 rounded-full text-white font-semibold ${statusColors[order.orderStatus]}`}
        >
          {order.orderStatus}
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
                src={item.product.pimages[0]}  // Use first image from the product's image array
                alt={item.product.name}
                className="w-20 h-20 object-cover rounded-xl"
              />
              <div className="flex-1">
                <h3 className="text-gray-800 font-semibold">{item.product.name}</h3>
                <p className="text-gray-500 text-sm">Seller: {item.product.seller}</p>
                <p className="text-gray-500 text-sm">Size: {item.selectedVariant?.size || "N/A"}</p>
                <p className="text-pink-500 font-bold mt-1">₹{item.selectedVariant?.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Delivery Details */}
      <div className="bg-white p-6 rounded-3xl shadow-xl border border-pink-100 mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Delivery Details</h2>
        <p className="text-gray-700">{order.shippingAddress?.name}</p>
        <p className="text-gray-700 mt-1">{order.shippingAddress?.street}</p>
        <p className="text-gray-700 mt-1">{order.shippingAddress?.phoneNumber}</p>
      </div>

      {/* Modified Payment Details Section */}
      <div className="bg-white p-6 rounded-3xl shadow-xl border border-pink-100 mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Payment Details</h2>

        {/* Payment Method */}
        <p className="text-gray-700">Payment Method: {order.paymentMethod}</p>
        
        {/* Payment Status */}
        <p className="text-gray-700">Payment Status: {order.paymentStatus}</p>

        {/* Order Status */}
        <p className="text-gray-700">Order Status: {order.orderStatus}</p>

        {/* Total Amount */}
        <p className="text-pink-500 font-bold mt-1">Total Amount: ₹{order.totalAmount}</p>
      </div>


      {/* Tracking Timeline */}
      {/* <div className="bg-white p-6 rounded-3xl shadow-xl border border-pink-100 mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Tracking Updates</h2>
        <div className="space-y-4">
          {order.orderHistory?.map((stage, idx) => (
            <div key={idx} className="flex items-center gap-4">
              <div className="w-4 h-4 rounded-full bg-pink-500 flex-shrink-0 mt-1"></div>
              <div>
                <p className="font-semibold text-gray-800">{stage.stage}</p>
                <p className="text-gray-500 text-sm">{new Date(stage.date).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div> */}

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
