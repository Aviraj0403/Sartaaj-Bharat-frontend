import React, { Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/home/home.jsx";
import ProductDetails from "./pages/product/ProductDetails.jsx";
import NotFoundPage from "./pages/PNF/NotFoundPage.jsx";
import AuthPage from "./pages/auth/SignInPage.jsx";
import CartPage from "./cart/CartPage.jsx";

// Minimal router configuration for Sartaaj Bharat Store
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
        <Home />
      </Suspense>
    ),
  },
  {
    path: "/product/:slug",
    element: <ProductDetails />
  },
  {
    path: "/cart",
    element: <CartPage /> // Keeping existing Cart page reference, might need styling updates later
  },
  {
    path: "/auth",
    element: <AuthPage />
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
