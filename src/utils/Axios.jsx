import axios from "axios";

const baseURL = 'http://localhost:6005/v1/api';
// const baseURL = 'https://sartaaj-bharat-backend.onrender.com/v1/api';

const Axios = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 30000, // 30 second timeout
});

// Track if we're currently refreshing to prevent multiple refresh calls
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Request interceptor
Axios.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
Axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Don't retry on these endpoints
    const skipRefreshRoutes = [
      '/auth/me',
      '/auth/phoneV2/send-otp',
      '/auth/phoneV2/verify-otp',
      '/auth/phoneV2/refresh-token',
      '/auth/user/logout'
    ];

    const shouldSkipRefresh = skipRefreshRoutes.some(route =>
      originalRequest.url?.includes(route)
    );

    // Handle 401 errors
    if (error.response?.status === 401 && !originalRequest._retry && !shouldSkipRefresh) {

      if (isRefreshing) {
        // If already refreshing, queue this request
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => Axios(originalRequest))
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await axios.post(
          `${baseURL}/auth/refresh-token`,
          {},
          { withCredentials: true }
        );

        processQueue(null);
        isRefreshing = false;

        return Axios(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        isRefreshing = false;

        // Clear local data and redirect to login
        console.error("❌ Refresh token failed. Redirecting to login.");

        // Clear all auth-related storage
        localStorage.removeItem("user");
        sessionStorage.clear();

        // Redirect to login with return URL
        const currentPath = window.location.pathname;
        if (currentPath !== '/signin' && currentPath !== '/signup') {
          window.location.href = `/signin?redirect=${encodeURIComponent(currentPath)}`;
        }

        return Promise.reject(refreshError);
      }
    }

    // Handle network errors
    if (!error.response) {
      console.error("Network error:", error.message);
      return Promise.reject({
        message: "Network error. Please check your connection.",
        isNetworkError: true
      });
    }

    return Promise.reject(error);
  }
);

export default Axios;