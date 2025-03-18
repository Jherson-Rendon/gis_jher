// src/views/auth/services/authServices.js
import axios from 'axios';


const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';


// Configurar interceptor para refrescar token automáticamente
const setupAxiosInterceptors = () => {
  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      // Si el error es 401 (Unauthorized) y no es un intento de refresh
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          // Intentar refrescar el token
          const refreshToken = localStorage.getItem('refreshToken');
          if (!refreshToken) {
            throw new Error('No refresh token available');
          }

          const response = await axios.post(`${API_URL}/auth/refresh-token`, { refreshToken });
          const { token, refreshToken: newRefreshToken } = response.data;

          // Guardar nuevos tokens
          localStorage.setItem('token', token);
          localStorage.setItem('refreshToken', newRefreshToken);

          // Actualizar el header de la petición original y reintentarla
          originalRequest.headers['Authorization'] = `Bearer ${token}`;
          return axios(originalRequest);
        } catch (refreshError) {
          // Si falla el refresh, logout
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
          window.location.href = '/auth/login';
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );
};

// Llamar a la función para configurar los interceptores
setupAxiosInterceptors();

// Función para registrar un nuevo usuario
export const register = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/register`, userData);
  return response.data;
};

// Función para iniciar sesión
export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/auth/login`, { email, password });
  const { token, refreshToken, user } = response.data;

  // Guardar tokens
  localStorage.setItem('token', token);
  localStorage.setItem('refreshToken', refreshToken);

  // Configurar header de autorización para futuras peticiones
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  return response.data;
};

// Función para cerrar sesión
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
  delete axios.defaults.headers.common['Authorization'];
};

// Función para solicitar recuperación de contraseña
export const forgotPassword = async (email) => {
  const response = await axios.post(`${API_URL}/auth/forgot-password`, { email });
  return response.data;
};

// Función para resetear contraseña
export const resetPassword = async (token, password) => {
  const response = await axios.post(`${API_URL}/auth/reset-password`, { token, password });
  return response.data;
};

// Función para verificar si el usuario está autenticado
export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

// Función para obtener el token actual
export const getToken = () => {
  return localStorage.getItem('token');
};

// Función para obtener el usuario actual
export const getCurrentUser = async () => {
  const token = getToken();
  if (!token) return null;

  try {
    const response = await axios.get(`${API_URL}/auth/me`);
    return response.data;
  } catch (error) {
    return null;
  }
};

export default {
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
  isAuthenticated,
  getToken,
  getCurrentUser
};
