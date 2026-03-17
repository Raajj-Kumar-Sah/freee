import axios from 'axios';

// Create axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 - redirect to login
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  me: () => api.get('/auth/me'),
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};

// Courses API
export const coursesAPI = {
  getAll: (params = {}) => api.get('/courses', { params }),
  getById: (id) => api.get(`/courses/${id}`),
  create: (data) => api.post('/courses', data),
  myCourses: () => api.get('/courses/my')
};

// Enrollments API
export const enrollmentsAPI = {
  myEnrollments: () => api.get('/enrollments/me'),
  enroll: (courseId) => api.post(`/enrollments/${courseId}/enroll`)
};

// Payments API
export const paymentsAPI = {
  createOrder: (courseId, amount) => api.post('/payments/create-order', { courseId, amount }),
  verifyPayment: (data) => api.post('/payments/verify-payment', data)
};

// AI API
export const aiAPI = {
  search: (query) => api.post('/ai/search', { query }),
  ask: (data) => api.post('/ai/ask', data)
};

export default api;

