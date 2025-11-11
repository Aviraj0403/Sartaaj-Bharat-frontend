import React from "react";
import { Download, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Orders() {
  const navigate = useNavigate();

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
        },
        {
          name: "Hydrating Lip Balm",
          price: 299,
          image: "https://via.placeholder.com/60",
          seller: "Gurmeet Kaur Store",
        },
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
        },
      ],
    },
  ];

  const statusColors = {
    Shipped: "bg-green-400",
    Processing: "bg-yellow-400",
    Cancelled: "bg-red-400",
  };

  const handleDownloadInvoice = (orderId) => {
    const blob = new Blob([`Invoice for ${orderId}`], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${orderId}-invoice.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="p-  min-h-screen">
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
              key={order.id}
              className="bg-white rounded-2xl shadow-md border border-pink-100 overflow-hidden hover:shadow-lg transition-all"
            >
              {/* Order Header */}
              <div className="flex justify-between items-center p-4 bg-gradient-to-r from-pink-50 to-pink-100 border-b border-pink-100">
                <div>
                  <h2 className="text-base font-semibold text-gray-800">
                    {order.id}
                  </h2>
                  <p className="text-gray-500 text-xs">Placed on {order.date}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-white text-xs font-semibold ${statusColors[order.status]}`}
                >
                  {order.status}
                </span>
              </div>

              {/* Image & Info */}
              <div className="p-4 flex items-center gap-4 cursor-pointer">
                <div className="relative flex-shrink-0">
                  <img
                    src={mainItem.image}
                    alt={mainItem.name}
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
                    {mainItem.name}
                  </h3>
                  <p className="text-gray-500 text-sm">{mainItem.seller}</p>

                  <p className="text-gray-800 font-semibold mt-2 text-sm sm:text-base">
                    Total:{" "}
                    <span className="text-pink-500 font-bold">₹{order.total}</span>
                  </p>

                  <p className="text-gray-600 text-sm mt-1">{order.description}</p>
                </div>
              </div>

              {/* Footer */}
              <div className="px-4 py-3 border-t border-pink-100 flex justify-between items-center">
                <button
                  onClick={() => handleDownloadInvoice(order.id)}
                  className="flex items-center gap-2 text-pink-600 text-sm font-medium hover:text-pink-700 transition"
                >
                  <Download size={16} />
                  Download Invoice
                </button>
                <button
                  onClick={() => navigate(`/order/${order.id}`)}
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
