import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getMe: () => api.get('/auth/me'),
  updateProfile: (data) => api.put('/auth/profile', data),
  changePassword: (data) => api.put('/auth/change-password', data)
};

// Courses API
export const coursesAPI = {
  getAllCourses: (params) => api.get('/courses', { params }),
  getCourse: (id) => api.get(`/courses/${id}`),
  getCourseBySlug: (slug) => api.get(`/courses/slug/${slug}`),
  getMyCourses: () => api.get('/courses/user/my-courses'),
  getCourseProgress: (courseId) => api.get(`/courses/${courseId}/progress`),
  updateLessonProgress: (courseId, lessonId) =>
    api.post(`/courses/${courseId}/progress/${lessonId}`),
  // Admin
  createCourse: (data) => api.post('/courses', data),
  updateCourse: (id, data) => api.put(`/courses/${id}`, data),
  deleteCourse: (id) => api.delete(`/courses/${id}`)
};

// Orders API
export const ordersAPI = {
  createOrder: (data) => api.post('/orders', data),
  getMyOrders: () => api.get('/orders/my-orders'),
  getOrder: (id) => api.get(`/orders/${id}`),
  // Admin
  getAllOrders: () => api.get('/orders')
};

// Payments API
export const paymentsAPI = {
  createStripeIntent: (orderId) =>
    api.post('/payments/stripe/create-intent', { orderId }),
  confirmStripePayment: (paymentIntentId, orderId) =>
    api.post('/payments/stripe/confirm', { paymentIntentId, orderId }),
  createMercadoPagoPreference: (orderId) =>
    api.post('/payments/mercadopago/create-preference', { orderId }),
  getPaymentStatus: (orderId) => api.get(`/payments/status/${orderId}`)
};

// Users API (Admin)
export const usersAPI = {
  getAllUsers: () => api.get('/users'),
  getUser: (id) => api.get(`/users/${id}`)
};

export default api;
