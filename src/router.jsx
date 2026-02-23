import React, { Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/home/home.jsx";
import ProductDetails from "./pages/product/ProductDetails.jsx";
import CategoryDetails from "./pages/category/CategoryDetails.jsx";
import SearchPage from "./pages/search/SearchPage.jsx";
import SignInPage from "./pages/auth/SignInPage.jsx";
import SignupPage from "./pages/auth/SignupPage.jsx";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage.jsx";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage.jsx";
import CartPage from "./cart/CartPage.jsx";
import NotFoundPage from "./pages/PNF/NotFoundPage.jsx";
import Layout from "./Layout.jsx";

// Minimal router configuration for Sartaaj Bharat Store
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "product/:slug",
        element: <ProductDetails />
      },
      {
        path: "category/:categorySlug",
        element: <CategoryDetails />
      },
      {
        path: "search",
        element: <SearchPage />
      },
      {
        path: "cart",
        element: <CartPage />
      },
      {
        path: "signin",
        element: <SignInPage />
      },
      {
        path: "signup",
        element: <SignupPage />
      },
      {
        path: "forgot-password",
        element: <ForgotPasswordPage />
      },
      {
        path: "reset-password",
        element: <ResetPasswordPage />
      },
      {
        path: "auth", // Legacy support
        element: <SignInPage />
      },
    ]
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
