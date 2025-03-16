import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.example.com", // Base URL for your API
  timeout: 10000, // Request timeout (in milliseconds)
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Example: Auth token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("Unauthorized! Redirecting to login...");
      // Handle logout or redirect logic
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
