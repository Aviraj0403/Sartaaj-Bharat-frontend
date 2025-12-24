import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { FcGoogle } from "react-icons/fc";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import OtpInput from "../../components/OtpInput";
import "react-toastify/dist/ReactToastify.css";

const SignInPage = () => {
  // const [loginType, setLoginType] = useState("email");
  const [loginType, setLoginType] = useState("mobile");
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");

  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState(30);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    login,
    googleLogin,
    requestPhoneOtp,
    verifyPhoneOtpAndLogin,
  } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const redirectTo =
    (location.state?.from && location.state.from.pathname) ||
    location.state?.from ||
    "/";

  /* ---------------- EMAIL LOGIN ---------------- */
  const handleCustomSignIn = async () => {
    if (!emailOrUsername || !password) {
      toast.error("Please fill all fields");
      return;
    }

    setIsSubmitting(true);
    try {
      await login({
        email: emailOrUsername.includes("@") ? emailOrUsername : undefined,
        userName: !emailOrUsername.includes("@")
          ? emailOrUsername
          : undefined,
        password,
      });
      toast.success("Signed in successfully");
      navigate(redirectTo, { replace: true });
    } catch (err) {
      toast.error(err?.message || "Invalid credentials");
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ---------------- PHONE OTP ---------------- */
  const sendOtp = async () => {
    if (mobile.length !== 10) {
      toast.error("Enter valid 10 digit mobile number");
      return;
    }

    setIsSubmitting(true);
    try {
      await requestPhoneOtp(`+91${mobile}`);
      setOtpSent(true);
      setTimer(30);
      // persist phone so we don't lose it if user is redirected
      localStorage.setItem("otpPhone", mobile);
      localStorage.setItem("otpSent", "1");
      toast.success("OTP sent");
    } catch (err) {
      toast.error(err?.message || "Failed to send OTP");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resendOtp = async () => {
    if (mobile.length !== 10) {
      toast.error("Enter valid 10 digit mobile number");
      return;
    }

    setIsSubmitting(true);
    try {
      await requestPhoneOtp(`+91${mobile}`);
      setTimer(30);
      // re-persist in case it was cleared
      localStorage.setItem("otpPhone", mobile);
      localStorage.setItem("otpSent", "1");
      toast.success("OTP resent");
    } catch (err) {
      toast.error(err?.message || "Failed to resend OTP");
    } finally {
      setIsSubmitting(false);
    }
  };

  const verifyOtp = async (phone) => {
    if (!phone || otp.length !== 6) return;

    setIsSubmitting(true);
    try {
      await verifyPhoneOtpAndLogin(phone, otp);
      toast.success("Login successful");
      // clear persisted otp info on success
      localStorage.removeItem("otpPhone");
      localStorage.removeItem("otpSent");
      navigate(redirectTo, { replace: true });
    } catch (err) {
      toast.error(err?.message || "Invalid OTP");
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleGoogleLogin = async () => {
    setIsSubmitting(true);
    try {
      await googleLogin(); // wait for login to complete
      toast.success("Signed in successfully");
      navigate(redirectTo, { replace: true }); // redirect after login
    } catch (err) {
      toast.error(err?.message || "Google login failed");
    } finally {
      setIsSubmitting(false);
    }
  };



  // restore phone/otp state if user was redirected back here
  useEffect(() => {
    const saved = localStorage.getItem("otpPhone");
    const wasSent = localStorage.getItem("otpSent");
    if (saved && wasSent) {
      setMobile(saved);
      setOtpSent(true);
      setLoginType("mobile");
    }
  }, []);

  /* ---------------- AUTO SUBMIT OTP ---------------- */
  useEffect(() => {
    if (otp.length === 6 && otpSent && mobile.length === 10) {
      verifyOtp(`+91${mobile}`);
    }
  }, [otp, otpSent, mobile]);

  /* ---------------- RESEND TIMER ---------------- */
  useEffect(() => {
    if (!otpSent || timer === 0) return;
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [otpSent, timer]);

  /* ---------------- SMS AUTO READ ---------------- */
  useEffect(() => {
    if (!otpSent) return;

    if ("OTPCredential" in window) {
      navigator.credentials
        .get({ otp: { transport: ["sms"] } })
        .then((otp) => otp?.code && setOtp(otp.code))
        .catch(() => { });
    }
  }, [otpSent]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-pink-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-6">
        <h2 className="text-2xl font-bold text-center mb-4">Welcome Back</h2>

        {/* <button
          onClick={googleLogin}
          className="w-full flex items-center justify-center gap-3 border py-3 rounded-xl mb-4"
        >
          <FcGoogle size={24} /> Continue with Google
        </button> */}
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 border py-3 rounded-xl mb-4"
        >
          <FcGoogle size={24} /> Continue with Google
        </button>


        {/* <div className="flex bg-pink-50 rounded-xl p-1 mb-4">
          <button
            onClick={() => setLoginType("email")}
            className={`flex-1 py-2 rounded-lg ${
              loginType === "email"
                ? "bg-white shadow text-pink-600"
                : "text-gray-500"
            }`}
          >
            Email
          </button>
          <button
            onClick={() => setLoginType("mobile")}
            className={`flex-1 py-2 rounded-lg ${
              loginType === "mobile"
                ? "bg-white shadow text-pink-600"
                : "text-gray-500"
            }`}
          >
            Phone
          </button>
        </div> */}
        <div className="flex bg-pink-50 rounded-xl p-1 mb-4">
          <button
            onClick={() => setLoginType("mobile")}
            className={`flex-1 py-2 rounded-lg ${loginType === "mobile"
                ? "bg-white shadow text-pink-600"
                : "text-gray-500"
              }`}
          >
            Phone
          </button>
          <button
            onClick={() => setLoginType("email")}
            className={`flex-1 py-2 rounded-lg ${loginType === "email"
                ? "bg-white shadow text-pink-600"
                : "text-gray-500"
              }`}
          >
            Email
          </button>
        </div>


        {/* EMAIL */}
        {loginType === "email" && (
          <>
            <input
              placeholder="Email or Username"
              className="w-full mb-3 px-4 py-3 border rounded-xl"
              onChange={(e) => setEmailOrUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full mb-4 px-4 py-3 border rounded-xl"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              onClick={handleCustomSignIn}
              className="w-full bg-pink-500 text-white py-3 rounded-xl"
            >
              Sign In
            </button>
          </>
        )}

        {/* PHONE OTP */}
        {loginType === "mobile" && (
          <>
            {!otpSent ? (
              <div className="flex items-center border rounded-xl px-3">
                <span className="font-semibold text-gray-700">+91</span>
                <input
                  autoFocus
                  maxLength="10"
                  className="flex-1 px-3 py-3 outline-none"
                  placeholder="Mobile number"
                  value={mobile}
                  onChange={(e) =>
                    setMobile(e.target.value.replace(/\D/g, ""))
                  }
                />
              </div>
            ) : (
              <OtpInput value={otp} onChange={setOtp} />
            )}

            <button
              onClick={otpSent ? () => verifyOtp(`+91${mobile}`) : sendOtp}
              className="w-full bg-pink-500 text-white py-3 rounded-xl mt-4"
            >
              {otpSent ? "Verify OTP" : "Continue"}
            </button>

            {otpSent && (
              <div className="text-center text-sm text-gray-500 mt-2">
                {timer > 0 ? (
                  <p>Resend OTP in {timer}s</p>
                ) : (
                  <button
                    onClick={resendOtp}
                    disabled={isSubmitting}
                    className="text-pink-500 font-semibold"
                  >
                    Resend OTP
                  </button>
                )}
              </div>
            )}
          </>
        )}

        <p className="text-center text-sm mt-4">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-pink-500 font-semibold">
            Register
          </Link>
        </p>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default SignInPage;
