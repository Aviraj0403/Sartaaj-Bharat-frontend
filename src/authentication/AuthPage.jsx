import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-100 flex flex-col items-center justify-center p-4">
      {/* Toggle between Login and Signup */}
      <div className="w-full">
        {isLogin ? <Login /> : <Signup />}

        {/* Switch Buttons */}
        <div className="text-center mt-6">
          {isLogin ? (
            <p className="text-gray-600">
              Don’t have an account?{" "}
              <button
                onClick={() => setIsLogin(false)}
                className="text-pink-500 font-semibold hover:text-pink-600"
              >
                Register
              </button>
            </p>
          ) : (
            <p className="text-gray-600">
              Already have an account?{" "}
              <button
                onClick={() => setIsLogin(true)}
                className="text-pink-500 font-semibold hover:text-pink-600"
              >
                Login
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
