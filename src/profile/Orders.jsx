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
    navigate(`/invoice/${orderId}`);
  };

  if (loading) {
    return <div>Loading your orders...</div>;
  }

  return (
    <div className="p-5 min-h-screen">
      <h1 className="text-3xl font-extrabold text-pink-600 mb-2">My Orders</h1>
      <p className="text-gray-600 mb-6 text-sm">
        Manage and track your recent orders below.
      </p>

      <div className="flex flex-col gap-5">
        {orders.map((order) => {
          const mainItem = order.items[0];
          const remainingCount = order.items.length - 1;

          return (
            <div
              key={order._id} // Use _id from the database as key
              className="bg-white rounded-2xl shadow-md border border-pink-100 overflow-hidden hover:shadow-lg transition-all"
            >
              {/* Header */}
{/* Header */}
<div className="flex justify-between items-center p-4 bg-gradient-to-r from-pink-50 to-pink-100 border-b border-pink-100 flex-wrap gap-2">
  <div className="min-w-0">
    <h2 className="text-sm font-semibold text-gray-800 truncate max-w-[200px]">
      #{order._id}
    </h2>
    <p className="text-gray-500 text-xs">
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
              <div className="p-4 flex items-center gap-4 cursor-pointer">
                <div className="relative flex-shrink-0">
                  <img
                    src={mainItem.product.pimages[0]} // Assuming product images are in pimages array
                    alt={mainItem.product.name}
                    className="w-24 h-24 object-cover rounded-xl border border-pink-100 shadow-sm"
                  />
                  {remainingCount > 0 && (
                    <div className="absolute bottom-1 right-1 bg-pink-600 text-white rounded-full px-1.5 py-0.5 text-xs flex items-center gap-0.5 shadow-md">
                      <Plus size={12} /> {remainingCount}
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <h3 className="text-gray-800 font-semibold text-sm sm:text-base">
                    {mainItem.product.name}
                  </h3>
                  <p className="text-gray-500 text-sm">{mainItem.product.seller}</p>

                  <p className="text-gray-800 font-semibold mt-2 text-sm sm:text-base">
                    Total:{" "}
                    <span className="text-pink-500 font-bold">₹{order.totalAmount}</span> {/* Display total amount */}
                  </p>

                  <p className="text-gray-600 text-sm mt-1">{order.paymentStatus}</p>
                </div>
              </div>

              {/* Footer */}
              <div className="px-4 py-3 border-t border-pink-100 flex justify-between items-center">
                <button
                  onClick={() => handleDownloadInvoice(order._id)} // Navigate to invoice page
                  className="flex items-center gap-2 text-pink-600 text-sm font-medium hover:text-pink-700 transition"
                >
                  <Download size={16} />
                  View Invoice
                </button>

                <button
                  onClick={() => navigate(`/order/${order._id}`)} // Navigate to order details
                  className="px-4 py-1.5 bg-pink-500 text-white text-xs rounded-full hover:bg-pink-600 transition"
                >
                  View Details
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
