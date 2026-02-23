import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

export default function RequireAuth({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  // While auth status is being validated, show an elite loading state
  if (loading) {
    return (
      <div className="h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
        <div className="w-16 h-16 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mb-6"></div>
        <span className="text-slate-500 font-black text-[10px] uppercase tracking-[0.3em] animate-pulse">
          Authenticating Neural Identity...
        </span>
      </div>
    );
  }

  if (!user) {
    // User not logged in → redirect to signin and include the full location so user returns here after login
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return children;
}
