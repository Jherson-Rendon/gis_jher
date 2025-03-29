// src/services/api/roleService.js
import httpClient from './httpClient';
import { mockRoleService } from './mockServices';

const roleService = {
  // Obtener todos los roles
  getRoles: async () => {
    try {
      // Obtener el modo desde localStorage
      const useMock = localStorage.getItem('use-mock-api') === 'true';

      if (useMock) {
        return await mockRoleService.getRoles();
      }

      const response = await httpClient.get('/roles');
      return response.data;
    } catch (error) {
      console.error('Error al obtener roles:', error);
      throw error;
    }
  },

  // Obtener un rol por ID
  getRoleById: async (id) => {
    try {
      const useMock = localStorage.getItem('use-mock-api') === 'true';

      if (useMock) {
        return await mockRoleService.getRoleById(id);
      }

      const response = await httpClient.get(`/roles/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener rol con ID ${id}:`, error);
      throw error;
    }
  },

  // Crear un nuevo rol
  createRole: async (roleData) => {
    try {
      const useMock = localStorage.getItem('use-mock-api') === 'true';

      if (useMock) {
        return await mockRoleService.createRole(roleData);
      }

      const response = await httpClient.post('/roles', roleData);
      return response.data;
    } catch (error) {
      console.error('Error al crear rol:', error);
      throw error;
    }
  },

  // Actualizar un rol
  updateRole: async (id, roleData) => {
    try {
      const useMock = localStorage.getItem('use-mock-api') === 'true';

      if (useMock) {
        return await mockRoleService.updateRole(id, roleData);
      }

      const response = await httpClient.put(`/roles/${id}`, roleData);
      return response.data;
    } catch (error) {
      console.error(`Error al actualizar rol con ID ${id}:`, error);
      throw error;
    }
  },

  // Eliminar un rol
  deleteRole: async (id) => {
    try {
      const useMock = localStorage.getItem('use-mock-api') === 'true';

      if (useMock) {
        return await mockRoleService.deleteRole(id);
      }

      const response = await httpClient.delete(`/roles/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al eliminar rol con ID ${id}:`, error);
      throw error;
    }
  },

  // Obtener permisos disponibles
  getPermissions: async () => {
    try {
      const useMock = localStorage.getItem('use-mock-api') === 'true';

      if (useMock) {
        return await mockRoleService.getPermissions();
      }

      const response = await httpClient.get('/permissions');
      return response.data;
    } catch (error) {
      console.error('Error al obtener permisos:', error);
      throw error;
    }
  }
};

export default roleService;
