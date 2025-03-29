// src/views/auth/services/authServices.js
import axios from 'axios';

const API_URL = 'https://salud-1.onrender.com/salud';

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

          const response = await axios.post(`${API_URL}/auth/refresh`, { refreshToken });
          const { tokens } = response.data;

          // Guardar nuevos tokens
          localStorage.setItem('accessToken', tokens.accessToken);
          localStorage.setItem('refreshToken', tokens.refreshToken);

          // Actualizar el header de la petición original y reintentarla
          originalRequest.headers['Authorization'] = `Bearer ${tokens.accessToken}`;
          return axios(originalRequest);
        } catch (refreshError) {
          // Si falla el refresh, logout
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

// Llamar a la función para configurar los interceptores
setupAxiosInterceptors();

// Función para iniciar sesión
const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    const userData = response.data;

    // Guardar tokens y datos del usuario
    localStorage.setItem('accessToken', userData.tokens.accessToken);
    localStorage.setItem('refreshToken', userData.tokens.refreshToken);
    localStorage.setItem('user', JSON.stringify({
      id: userData.id,
      firstName: userData.firstName,
      lastName: userData.lastName,
      name: `${userData.firstName} ${userData.lastName}`, // Para compatibilidad con el código existente
      email: userData.email,
      role: userData.role,
      modulesAccess: userData.modulesAccess,
      accessLevels: userData.accessLevels,
      isActive: userData.isActive
    }));

    // Configurar header de autorización para futuras peticiones
    axios.defaults.headers.common['Authorization'] = `Bearer ${userData.tokens.accessToken}`;

    return userData;
  } catch (error) {
    console.error('Error en login:', error);
    throw error.response?.data || { message: 'Error al iniciar sesión' };
  }
};

// Función para cerrar sesión
const logout = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('user');
  delete axios.defaults.headers.common['Authorization'];
};

// Función para refrescar el token
const refreshToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) {
    throw new Error('No refresh token available');
  }

  const response = await axios.post(`${API_URL}/auth/refresh`, { refreshToken });
  const userData = response.data;

  localStorage.setItem('accessToken', userData.tokens.accessToken);
  localStorage.setItem('refreshToken', userData.tokens.refreshToken);

  return userData.tokens;
};

// Función para verificar si el token es válido
const validateToken = async () => {
  try {
    const token = localStorage.getItem('accessToken');
    if (!token) return false;

    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const response = await axios.get(`${API_URL}/auth/validate`);
    return response.data;
  } catch (error) {
    return false;
  }
};

// Función para obtener el usuario actual
const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  const accessToken = localStorage.getItem('accessToken');

  if (!user || !accessToken) {
    return null;
  }

  return JSON.parse(user);
};

// Función para verificar si el usuario está autenticado
const isAuthenticated = () => {
  return !!localStorage.getItem('accessToken');
};

// Función para obtener roles
const getRoles = async () => {
  try {
    const response = await axios.get(`${API_URL}/roles`);
    return response.data.map(role => ({
      id: role.name, // Usar el nombre del rol como ID para compatibilidad
      name: role.name
    }));
  } catch (error) {
    console.error('Error al obtener roles:', error);
    throw error;
  }
};

export default {
  login,
  logout,
  refreshToken,
  validateToken,
  getCurrentUser,
  isAuthenticated,
  getRoles
};
