import React, { Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout.jsx";
import Home from "./pages/home/home.jsx";
import NotFoundPage from "./pages/PNF/NotFoundPage.jsx";
import ProfilePage from "./profile/ProfilePage";
import OrderDetails from "./profile/OrderDetails";

import CartPage from "./cart/CartPage.jsx";
import CheckoutPage from "./checkout/CheckoutPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={null}>
        <Layout />
      </Suspense>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: "/profile", element: <ProfilePage /> },
      { path: "/order/:orderId", element: <OrderDetails /> },
      { path: "/cart", element: <CartPage /> },
      { path: "/checkout", element: <CheckoutPage/> },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
