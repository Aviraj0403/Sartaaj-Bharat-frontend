import axios from "axios";

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

// Request interceptor — passthrough
Axios.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error),
);

// Response interceptor — handles 401 with token refresh
Axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Routes where we should NOT attempt a token refresh
    const skipRefreshRoutes = [
      "/auth/profile",
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
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !shouldSkipRefresh
    ) {
      if (isRefreshing) {
        // Queue this request until refresh completes
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => Axios(originalRequest))
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Attempt to get a new access token using the refresh token cookie
        await axios.post(
          `${baseURL}/auth/refresh-token`,
          {},
          { withCredentials: true },
        );

        processQueue(null);
        isRefreshing = false;

        // Retry the original request with the new token
        return Axios(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError);
        isRefreshing = false;

        // Emit a custom event so AuthContext can react and clear user state
        window.dispatchEvent(new CustomEvent("auth:logout"));

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
