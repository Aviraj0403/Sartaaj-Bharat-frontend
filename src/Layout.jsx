import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import Header from "./components/Header/header.jsx";
import DesktopHeaderElite from "./components/Header/DesktopHeaderElite.jsx";
import MobileHeaderElite from "./components/Header/MobileHeaderElite.jsx";
import Footer from "./components/Footer/footer.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import ProgressBar from "./components/progressbar/ProgressBar.jsx";
import { useWindowContext } from "./context/windowContext.jsx";
import { useViewport } from "./hooks/useViewport.js";

const Layout = () => {
  const { divRef, progressWidth } = useWindowContext();
  const { isMobile } = useViewport();

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-600 selection:text-white antialiased">
      {/* Toast container for notifications */}
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop closeButton={true} />

      {/* Header Component - Responsive Elite Design */}
      {isMobile ? <MobileHeaderElite /> : <DesktopHeaderElite />}

      {/* Main content area */}
      <div ref={divRef} className="flex-1 overflow-auto">
        {/* Progress Bar (conditionally displayed based on the loading state or some condition) */}
        <ProgressBar progressWidth={progressWidth} />

        {/* Scroll to top functionality for route changes */}
        <ScrollToTop />

        {/* Render the nested routes here */}
        <main className="w-full">

          <Outlet />
        </main>
      </div>

      {/* Footer Component */}
      <Footer />
    </div>
  );
};

export default Layout;
