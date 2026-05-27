import api from "./client"

// Auth
export const authApi = {
  register: (data) => api.post("/auth/register", data, { skipAuthRedirect: true }),
  login: (data) => api.post("/auth/login", data, { skipAuthRedirect: true }),
  logout: () => api.post("/auth/logout", null, { skipAuthRedirect: true }),
  me: () => api.get("/auth/me", { skipAuthRedirect: true }),
  refresh: () => api.post("/auth/refresh", null, { skipAuthRedirect: true, skipAuthRefresh: true }),
}

// Contact
export const contactApi = {
  submit: (data) => api.post("/contact", data),
}

// Products
export const productsApi = {
  getAll: (params) => api.get("/products", { params }),
  getById: (id) => api.get(`/products/${id}`),
  getFeatured: () => api.get("/products/featured"),
  addReview: (id, data) => api.post(`/products/${id}/reviews`, data),
  // Admin
  create: (data) => api.post("/products", data),
  update: (id, data) => api.put(`/products/${id}`, data),
  remove: (id) => api.delete(`/products/${id}`),
}

// Cart
export const cartApi = {
  get: () => api.get("/cart"),
  add: (data) => api.post("/cart", data),
  update: (productId, qty) => api.put(`/cart/${productId}`, { quantity: qty }),
  remove: (productId) => api.delete(`/cart/${productId}`),
  clear: () => api.delete("/cart/clear"),
}

// Orders
export const ordersApi = {
  create: (data) => api.post("/orders", data),
  getMyOrders: () => api.get("/orders/my-orders"),
  getById: (id) => api.get(`/orders/${id}`),
  cancel: (id, reason) => api.put(`/orders/${id}/cancel`, { reason }),
  // Admin
  getAll: (params) => api.get("/orders", { params }),
  updateStatus: (id, data) => api.put(`/orders/${id}/status`, data),
}

// Payment
export const paymentApi = {
  initialize: (orderId) => api.post("/payment/initialize", { orderId }),
  verify: (reference) => api.get(`/payment/verify/${reference}`),
}

// Upload
export const uploadApi = {
  productImages: (formData) =>
    api.post("/upload/products", formData, { headers: { "Content-Type": "multipart/form-data" } }),
  deleteImage: (publicId) => api.delete("/upload/products", { data: { publicId } }),
  avatar: (formData) =>
    api.post("/upload/avatar", formData, { headers: { "Content-Type": "multipart/form-data" } }),
}

// Admin
export const adminApi = {
  getUsers: (params) => api.get("/admin/users", { params }),
  getUserById: (id) => api.get(`/admin/users/${id}`),
  toggleStatus: (id) => api.put(`/admin/users/${id}/toggle-status`),
  changeRole: (id, role) => api.put(`/admin/users/${id}/role`, { role }),
  getAnalytics: () => api.get("/admin/analytics"),
}
