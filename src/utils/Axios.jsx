import axios from "axios";
import Cookies from "js-cookie";

const baseURL = "https://sartaaj-bharat-backend.onrender.com/v1/api";

const Axios = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 30000,
});

// Track refresh state to prevent multiple simultaneous refresh calls
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
  });
  failedQueue = [];
};

// Request interceptor — Attach token if available
Axios.interceptors.request.use(
  (config) => {
    const token = Cookies.get("userToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor — handles 401 with token refresh
Axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Routes where we should NOT attempt a token refresh
    const skipRefreshRoutes = [
      "/auth/login",
      "/auth/logout",
      "/auth/register",
      "/auth/google",
      "/auth/facebook",
      "/auth/refresh-token",
      "/auth/phone/request-otp",
      "/auth/phone/verify-otp",
    ];

    const shouldSkipRefresh = skipRefreshRoutes.some((route) =>
      originalRequest.url?.includes(route),
    );

    // Only attempt refresh for 401 errors on non-auth routes
    const token = Cookies.get("userToken");
    
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !shouldSkipRefresh &&
      token // 🛡️ Safeguard: Only refresh if we actually have a token to begin with
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => {
            originalRequest._retry = true;
            const newToken = Cookies.get("userToken");
            if (newToken) {
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
            }
            return Axios(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshResponse = await axios.post(
          `${baseURL}/auth/refresh-token`,
          {},
          {
            withCredentials: true,
            headers: token ? { Authorization: `Bearer ${token}` } : {},
          },
        );

        const newToken =
          refreshResponse.data?.token ||
          refreshResponse.data?.data?.token ||
          refreshResponse.data?.data?.accessToken;

        if (newToken) {
          Cookies.set("userToken", newToken, { expires: 7 });
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
        }

        processQueue(null);
        isRefreshing = false;

        return Axios(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError);
        isRefreshing = false;

        // Session definitely dead
        if (refreshError.response?.status === 401 || refreshError.response?.status === 403) {
          Cookies.remove("userToken"); // Cleanup immediately
          window.dispatchEvent(new CustomEvent("auth:logout"));
        }

        return Promise.reject(refreshError);
      }
    }

    // Handle network errors gracefully
    if (!error.response) {
      return Promise.reject({
        message: "Network error. Please check your connection.",
        isNetworkError: true,
      });
    }

    return Promise.reject(error);
  },
);

export default Axios;
