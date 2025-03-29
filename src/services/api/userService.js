// src/services/api/userService.js
import httpClient from './httpClient';
import { mockUserService } from './mockServices';

const userService = {
  // Obtener todos los usuarios
  getUsers: async () => {
    try {
      const useMock = localStorage.getItem('use-mock-api') === 'true';

      if (useMock) {
        return await mockUserService.getUsers();
      }

      const response = await httpClient.get('/users');
      return response.data;
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      throw error;
    }
  },

  // Obtener un usuario por ID
  getUserById: async (id) => {
    try {
      const useMock = localStorage.getItem('use-mock-api') === 'true';

      if (useMock) {
        return await mockUserService.getUserById(id);
      }

      const response = await httpClient.get(`/users/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener usuario con ID ${id}:`, error);
      throw error;
    }
  },

  // Crear un nuevo usuario
  createUser: async (userData) => {
    try {
      const useMock = localStorage.getItem('use-mock-api') === 'true';

      if (useMock) {
        return await mockUserService.createUser(userData);
      }

      const response = await httpClient.post('/users', userData);
      return response.data;
    } catch (error) {
      console.error('Error al crear usuario:', error);
      throw error;
    }
  },

  // Actualizar un usuario
  updateUser: async (id, userData) => {
    try {
      const useMock = localStorage.getItem('use-mock-api') === 'true';

      if (useMock) {
        return await mockUserService.updateUser(id, userData);
      }

      const response = await httpClient.put(`/users/${id}`, userData);
      return response.data;
    } catch (error) {
      console.error(`Error al actualizar usuario con ID ${id}:`, error);
      throw error;
    }
  },

  // Eliminar un usuario
  deleteUser: async (id) => {
    try {
      const useMock = localStorage.getItem('use-mock-api') === 'true';

      if (useMock) {
        return await mockUserService.deleteUser(id);
      }

      const response = await httpClient.delete(`/users/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al eliminar usuario con ID ${id}:`, error);
      throw error;
    }
  },

  // Cambiar estado de un usuario (activar/desactivar)
  toggleUserStatus: async (id) => {
    try {
      const useMock = localStorage.getItem('use-mock-api') === 'true';

      if (useMock) {
        return await mockUserService.toggleUserStatus(id);
      }

      const response = await httpClient.patch(`/users/${id}/toggle-status`);
      return response.data;
    } catch (error) {
      console.error(`Error al cambiar estado del usuario con ID ${id}:`, error);
      throw error;
    }
  }
};

export default userService;
