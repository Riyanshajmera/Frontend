// Lightweight Axios client with standardized responses and basic retry
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export const http = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Basic retry logic for idempotent methods
http.interceptors.response.use(
  (response) => {
    return {
      success: true,
      status: response.status,
      data: response.data,
      message: ''
    };
  },
  async (error) => {
    const config = error.config || {};
    const method = (config.method || '').toLowerCase();
    const isIdempotent = ['get', 'head', 'options'].includes(method);
    const retryCount = config.__retryCount || 0;
    const maxRetries = 2;

    if (isIdempotent && retryCount < maxRetries) {
      config.__retryCount = retryCount + 1;
      await new Promise((r) => setTimeout(r, 300 * (retryCount + 1)));
      return http(config);
    }

    const status = error.response?.status || 0;
    const data = error.response?.data;
    let message = (data && (data.detail || data.message)) || error.message || 'Request failed';

    // Extract DRF serializer error messages if present
    if (!message && data && typeof data === 'object') {
      const firstKey = Object.keys(data)[0];
      const firstVal = firstKey ? data[firstKey] : null;
      if (Array.isArray(firstVal) && firstVal.length > 0) {
        message = `${firstKey}: ${firstVal.join(', ')}`;
      } else if (typeof firstVal === 'string') {
        message = `${firstKey}: ${firstVal}`;
      } else if (Array.isArray(data) && data.length > 0) {
        message = data.join(', ');
      }
    }

    return Promise.resolve({
      success: false,
      status,
      data,
      message
    });
  }
);

export function toFormData(obj) {
  const fd = new FormData();
  Object.entries(obj || {}).forEach(([key, value]) => {
    if (value !== undefined && value !== null) fd.append(key, value);
  });
  return fd;
}


