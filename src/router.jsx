import React, { Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout.jsx";
import Home from "./pages/home/home.jsx";
import NotFoundPage from "./pages/PNF/NotFoundPage.jsx";
import ProfilePage from "./profile/ProfilePage";
import OrderDetails from "./profile/OrderDetails";

import CartPage from "./cart/CartPage.jsx";
import CheckoutPage from "./checkout/CheckoutPage.jsx";
import AuthPage from "./authentication/AuthPage.jsx";
import NewProductsPage from "./pages/NewProductsPage.jsx";
import ProductDetails from "./pages/home/ProductDetails.jsx";
import CategoryDetails from "./pages/home/CategoryDetails.jsx";

// import Login from "./authentication/Login.jsx";
// import Signup from "./authentication/Signup.jsx";

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
      { path: "/order/12345", element: <OrderDetails /> },
      
      { path: "/cart", element: <CartPage /> },
      { path: "/checkout", element: <CheckoutPage/> },
      { path: "/new-product", element: <NewProductsPage/> },
      { path: "/product/:id", element: <ProductDetails /> },
      {path: "/category/:id", element: <CategoryDetails/>},


      // {path: "/auth", element: < Login/>},
      {path: "/auth", element: < AuthPage/>},
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
