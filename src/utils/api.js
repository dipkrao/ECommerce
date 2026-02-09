import axios from "axios";

// Normalize base URL so env can be either "http://localhost:5000" OR "http://localhost:5000/api"
const rawBaseUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";
const normalizedBaseUrl = rawBaseUrl.endsWith("/api")
  ? rawBaseUrl
  : `${rawBaseUrl.replace(/\/$/, "")}/api`;

// Create axios instance with base configuration
const api = axios.create({
  baseURL: normalizedBaseUrl,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("userToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid - clear auth data
      localStorage.removeItem("userToken");
      localStorage.removeItem("user");
      // Don't automatically redirect to login
      // Let the components handle authentication state
    }
    return Promise.reject(error);
  }
);

// API endpoints
export const authAPI = {
  login: (credentials) => api.post("/auth/login", credentials),
  register: (userData) => api.post("/auth/register", userData),
  getProfile: () => api.get("/auth/profile"),
  updateProfile: (data) => api.put("/auth/profile", data),
  changePassword: (data) => api.put("/auth/change-password", data),
};

export const productAPI = {
  getAll: (params) => api.get("/products", { params }),
  getById: (id) => api.get(`/products/${id}`),
  getByCategory: (categoryId) => api.get(`/products?category=${categoryId}`),
  search: (query) => api.get(`/products?search=${query}`),
};

export const categoryAPI = {
  getAll: () => api.get("/categories"),
};

export const bannerAPI = {
  getAll: () => api.get("/banners"),
  getById: (id) => api.get(`/banners/${id}`),
  create: (data) => api.post("/banners", data),
  update: (id, data) => api.put(`/banners/${id}`, data),
  delete: (id) => api.delete(`/banners/${id}`),
  toggleStatus: (id) => api.patch(`/banners/${id}/toggle`),
  reorder: (bannerOrders) => api.post("/banners/reorder", { bannerOrders }),
  // Public endpoint that doesn't require authentication
  getPublic: () => {
    const publicApi = axios.create({
      baseURL: normalizedBaseUrl,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return publicApi.get("/banners/active");
  },
};

export const legalPageAPI = {
  getAll: () => api.get("/legal-pages"),
  getByType: (pageType) => api.get(`/legal-pages/${pageType}`),
  create: (data) => api.post("/legal-pages", data),
  update: (pageType, data) => api.put(`/legal-pages/${pageType}`, data),
  delete: (pageType) => api.delete(`/legal-pages/${pageType}`),
  toggleStatus: (pageType) => api.patch(`/legal-pages/${pageType}/toggle`),
  getPublic: (pageType) => api.get(`/legal-pages/public/${pageType}`),
};

export const settingsAPI = {
  // Public storefront endpoint (no auth)
  getPublic: () => api.get("/settings/public"),
};

export const orderAPI = {
  create: (orderData) => api.post("/orders", orderData),
  getMyOrders: () => api.get("/orders/my-orders"),
  getById: (id) => api.get(`/orders/${id}`),
};

export const cartAPI = {
  addToCart: (productId, quantity) =>
    api.post("/cart/add", { productId, quantity }),
  getCart: () => api.get("/cart"),
  updateQuantity: (productId, quantity) =>
    api.put(`/cart/${productId}`, { quantity }),
  removeFromCart: (productId) => api.delete(`/cart/${productId}`),
  clearCart: () => api.delete("/cart"),
};

export default api;
