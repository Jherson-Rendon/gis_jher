// src/views/auth/services/authServices.js (modificar)
import axios from 'axios';
import { toast } from 'react-toastify';
import mockAuthService from './mockAuthService';

const API_URL = 'https://salud-1.onrender.com/salud';

// Configurar interceptor para refrescar token automáticamente
const setupAxiosInterceptors = () => {
  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const refreshToken = localStorage.getItem('refreshToken');
          if (!refreshToken) {
            throw new Error('No refresh token available');
          }

          const response = await axios.post(`${API_URL}/auth/refresh`, { refreshToken });
          const { tokens } = response.data;

          localStorage.setItem('accessToken', tokens.accessToken);
          localStorage.setItem('refreshToken', tokens.refreshToken);

          originalRequest.headers['Authorization'] = `Bearer ${tokens.accessToken}`;
          return axios(originalRequest);
        } catch (refreshError) {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('user');
          window.location.href = '/auth/login';
          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(error);
    }
  );
};

setupAxiosInterceptors();

const realAuthService = {
  login: async (credentials) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, credentials);
      const userData = response.data;

      localStorage.setItem('accessToken', userData.tokens.accessToken);
      localStorage.setItem('refreshToken', userData.tokens.refreshToken);
      localStorage.setItem('user', JSON.stringify({
        id: userData.id,
        firstName: userData.firstName,
        lastName: userData.lastName,
        name: `${userData.firstName} ${userData.lastName}`,
        email: userData.email,
        role: userData.role,
        modulesAccess: userData.modulesAccess,
        accessLevels: userData.accessLevels,
        isActive: userData.isActive
      }));

      axios.defaults.headers.common['Authorization'] = `Bearer ${userData.tokens.accessToken}`;
      return userData;
    } catch (error) {
      console.error('Error en login:', error);
      throw error.response?.data || { message: 'Error al iniciar sesión' };
    }
  },

  logout: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
  },

  validateToken: async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) return false;

      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const response = await axios.get(`${API_URL}/auth/validate`);
      return response.data;
    } catch (error) {
      return false;
    }
  },

  getCurrentUser: () => {
    try {
      const userStr = localStorage.getItem('user');
      if (!userStr) return null;
      return JSON.parse(userStr);
    } catch (error) {
      console.error('Error al obtener usuario actual:', error);
      return null;
    }
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('accessToken');
  },

  forgotPassword: async (email) => {
    try {
      const response = await axios.post(`${API_URL}/auth/forgot-password`, { email });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error al procesar la solicitud' };
    }
  },

  resetPassword: async (token, newPassword) => {
    try {
      const response = await axios.post(`${API_URL}/auth/reset-password`, {
        token,
        newPassword
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error al restablecer la contraseña' };
    }
  },

  validateResetToken: async (token) => {
    try {
      const response = await axios.get(`${API_URL}/auth/validate-reset-token/${token}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Token inválido o expirado' };
    }
  }
};

// Exportar un objeto que selecciona el servicio adecuado según el contexto
const authServices = {
  // Este método será reemplazado por un proxy en tiempo de ejecución
  getCurrentService: () => {
    // Este es un placeholder, será reemplazado por el hook useApiMode
    return realAuthService;
  },
};

// Crear un proxy para redirigir las llamadas al servicio correcto
export default new Proxy(authServices, {
  get: (target, prop) => {
    // Si la propiedad es getCurrentService, devolver la función original
    if (prop === 'getCurrentService') {
      return target[prop];
    }

    // Para cualquier otra propiedad, obtener el servicio actual y llamar al método correspondiente
    const useMock = localStorage.getItem('use-mock-api') === 'true';
    const currentService = useMock ? mockAuthService : realAuthService;

    return currentService[prop];
  }
});
