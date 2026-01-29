import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://dsamernapp.onrender.com';

console.log("check", API_URL)

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});


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

export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getProfile: () => api.get('/auth/profile')
};

export const topicsAPI = {
  getAll: () => api.get('/topics'),
  getById: (id) => api.get(`/topics/${id}`),
  create: (data) => api.post('/topics', data)
};


export const problemsAPI = {
  getAll: () => api.get('/problems'),
  getByTopic: (topicId) => api.get(`/problems/topic/${topicId}`),
  create: (data) => api.post('/problems', data),
  toggleCompletion: (id) => api.put(`/problems/${id}/toggle`),
  getProgress: () => api.get('/problems/user/progress')
};

export default api;
