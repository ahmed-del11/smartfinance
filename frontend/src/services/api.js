import axios from 'axios';

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
});

// Add token to requests
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Auth API
export const register = (userData) => API.post('/auth/register', userData);
export const login = (credentials) => {
    const formData = new FormData();
    formData.append('username', credentials.email);
    formData.append('password', credentials.password);
    return API.post('/auth/login', formData);
};
export const getCurrentUser = () => API.get('/auth/me');

// Dashboard API
export const getDashboardSummary = () => API.get('/dashboard/summary');
export const getExpenseChart = () => API.get('/dashboard/chart');
export const getIncomeChart = () => API.get('/dashboard/income-chart');

// Transactions API
export const getTransactions = (params) => API.get('/transactions', { params });
export const createTransaction = (data) => API.post('/transactions', data);
export const updateTransaction = (id, data) => API.put(`/transactions/${id}`, data);
export const deleteTransaction = (id) => API.delete(`/transactions/${id}`);

// Categories API
export const getCategories = () => API.get('/categories/');
export const getIncomeCategories = () => API.get('/categories/income');
export const getExpenseCategories = () => API.get('/categories/expense');

export default API;
