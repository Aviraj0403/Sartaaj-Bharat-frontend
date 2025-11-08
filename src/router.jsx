import React ,  { Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "./Layout.jsx";
import Home from "./pages/home/home.jsx";
import NotFoundPage from "./pages/PNF/NotFoundPage.jsx";
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
      { path: "/", element: <Home /> },
  
    ],
  },
    {
    path: "*",
    element: <NotFoundPage />,
  },

]);

export default router;
