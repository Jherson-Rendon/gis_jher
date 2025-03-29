import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = 'https://salud-1.onrender.com/salud';

// Crear instancia de axios con configuración base
const httpClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar token de autenticación a las solicitudes
httpClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar respuestas y errores
httpClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Si el error es 401 (Unauthorized) y no hemos intentado renovar el token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        // Intentar renovar el token
        const response = await axios.post(`${API_URL}/auth/refresh`, { refreshToken });
        const { tokens } = response.data;

        // Guardar los nuevos tokens
        localStorage.setItem('accessToken', tokens.accessToken);
        localStorage.setItem('refreshToken', tokens.refreshToken);

        // Actualizar el token en la solicitud original y reintentarla
        originalRequest.headers['Authorization'] = `Bearer ${tokens.accessToken}`;
        return httpClient(originalRequest);
      } catch (refreshError) {
        // Si falla la renovación del token, cerrar sesión
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');

        // Mostrar mensaje de error
        toast.error('Tu sesión ha expirado. Por favor, inicia sesión nuevamente.');

        // Redirigir a la página de login
        window.location.href = '/auth/login';
        return Promise.reject(refreshError);
      }
    }

    // Manejar otros errores
    const errorMessage = error.response?.data?.message || 'Ha ocurrido un error';
    if (!originalRequest._noToast) {
      toast.error(errorMessage);
    }

    return Promise.reject(error);
  }
);

export default httpClient;
