// API configuration for development and production environments
const isDevelopment = import.meta.env.MODE === 'development';

// Base URL for the backend API
// TODO: Replace with your actual Render URL after deployment
export const BASE_API_URL = isDevelopment 
  ? 'http://localhost:8080/api/v1' 
  : import.meta.env.VITE_API_URL || 'https://your-render-app-name.onrender.com/api/v1';

// API endpoints
export const USER_API = `${BASE_API_URL}/user/`;
export const COURSE_API = `${BASE_API_URL}/course`;
export const COURSE_PURCHASE_API = `${BASE_API_URL}/purchase`;
export const COURSE_PROGRESS_API = `${BASE_API_URL}/progress`;
export const RAZORPAY_API = `${BASE_API_URL}/payment`;
export const MEDIA_API = `${BASE_API_URL}/media`; 