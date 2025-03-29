// src/services/api/mockServices.js
export const mockRoleService = {
  // Datos de ejemplo para roles
  roles: [
    {
      id: 'SUPER_ADMIN',
      name: 'Super Administrador',
      description: 'Control total del sistema',
      permissions: ['users_view', 'users_create', 'users_edit', 'users_delete', 'roles_view', 'roles_create', 'roles_edit', 'roles_delete', 'settings_view', 'settings_edit'],
      createdAt: '2023-01-01T00:00:00Z',
      updatedAt: '2023-01-01T00:00:00Z'
    },
    {
      id: 'ADMIN',
      name: 'Administrador',
      description: 'Administración de la IPS',
      permissions: ['users_view', 'users_create', 'users_edit', 'users_delete', 'roles_view', 'settings_view', 'settings_edit'],
      createdAt: '2023-01-02T00:00:00Z',
      updatedAt: '2023-01-02T00:00:00Z'
    },
    {
      id: 'MEDICO',
      name: 'Médico',
      description: 'Personal médico',
      permissions: ['patients_view', 'medical_records_create', 'medical_records_edit'],
      createdAt: '2023-01-03T00:00:00Z',
      updatedAt: '2023-01-03T00:00:00Z'
    },
    {
      id: 'ENFERMERA',
      name: 'Enfermera',
      description: 'Personal de enfermería',
      permissions: ['patients_view', 'vital_signs_update'],
      createdAt: '2023-01-04T00:00:00Z',
      updatedAt: '2023-01-04T00:00:00Z'
    }
  ],

  // Lista de todos los permisos disponibles
  permissions: [
    'users_view', 'users_create', 'users_edit', 'users_delete',
    'roles_view', 'roles_create', 'roles_edit', 'roles_delete',
    'settings_view', 'settings_edit',
    'patients_view', 'patients_create', 'patients_edit', 'patients_delete',
    'medical_records_view', 'medical_records_create', 'medical_records_edit',
    'appointments_view', 'appointments_create', 'appointments_edit', 'appointments_delete',
    'vital_signs_update', 'lab_results_create', 'lab_results_view'
  ],

  // Obtener todos los roles
  getRoles: async () => {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simular delay
    return [...mockRoleService.roles];
  },

  // Obtener un rol por ID
  getRoleById: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const role = mockRoleService.roles.find(r => r.id === id);
    if (!role) {
      throw new Error('Rol no encontrado');
    }
    return { ...role };
  },

  // Crear un nuevo rol
  createRole: async (roleData) => {
    await new Promise(resolve => setTimeout(resolve, 800));

    // Validar que el nombre no esté duplicado
    if (mockRoleService.roles.some(r => r.name.toLowerCase() === roleData.name.toLowerCase())) {
      throw new Error('Ya existe un rol con este nombre');
    }

    const newRole = {
      id: `ROLE_${Date.now()}`,
      ...roleData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    mockRoleService.roles.push(newRole);
    return { ...newRole };
  },

  // Actualizar un rol existente
  updateRole: async (id, roleData) => {
    await new Promise(resolve => setTimeout(resolve, 800));

    const index = mockRoleService.roles.findIndex(r => r.id === id);
    if (index === -1) {
      throw new Error('Rol no encontrado');
    }

    // Validar que el nombre no esté duplicado (excepto para el mismo rol)
    if (mockRoleService.roles.some(r => r.id !== id && r.name.toLowerCase() === roleData.name.toLowerCase())) {
      throw new Error('Ya existe otro rol con este nombre');
    }

    const updatedRole = {
      ...mockRoleService.roles[index],
      ...roleData,
      updatedAt: new Date().toISOString()
    };

    mockRoleService.roles[index] = updatedRole;
    return { ...updatedRole };
  },

  // Eliminar un rol
  deleteRole: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 600));

    const index = mockRoleService.roles.findIndex(r => r.id === id);
    if (index === -1) {
      throw new Error('Rol no encontrado');
    }

    // No permitir eliminar roles predefinidos del sistema
    if (['SUPER_ADMIN', 'ADMIN', 'MEDICO', 'ENFERMERA'].includes(id)) {
      throw new Error('No se pueden eliminar roles predefinidos del sistema');
    }

    mockRoleService.roles.splice(index, 1);
    return { success: true };
  },

  // Obtener todos los permisos disponibles
  getPermissions: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...mockRoleService.permissions];
  }
};

// Servicio mock para usuarios
export const mockUserService = {
  // Datos de ejemplo para usuarios
  users: [
    {
      id: 1,
      documentType: 'cc',
      documentNumber: '1234567890',
      firstName: 'Admin',
      lastName: 'Sistema',
      email: 'admin@example.com',
      roleId: 'SUPER_ADMIN',
      isActive: true,
      createdAt: '2023-01-01T00:00:00Z',
      updatedAt: '2023-01-01T00:00:00Z'
    },
    {
      id: 2,
      documentType: 'cc',
      documentNumber: '0987654321',
      firstName: 'Juan',
      lastName: 'Pérez',
      email: 'juan@example.com',
      roleId: 'MEDICO',
      isActive: true,
      createdAt: '2023-01-02T00:00:00Z',
      updatedAt: '2023-01-02T00:00:00Z'
    },
    {
      id: 3,
      documentType: 'ce',
      documentNumber: '5678901234',
      firstName: 'María',
      lastName: 'López',
      email: 'maria@example.com',
      roleId: 'ENFERMERA',
      isActive: true,
      createdAt: '2023-01-03T00:00:00Z',
      updatedAt: '2023-01-03T00:00:00Z'
    }
  ],

  // Obtener todos los usuarios
  getUsers: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [...mockUserService.users];
  },

  // Obtener un usuario por ID
  getUserById: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const user = mockUserService.users.find(u => u.id === id);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }
    return { ...user };
  },

  // Crear un nuevo usuario
  createUser: async (userData) => {
    await new Promise(resolve => setTimeout(resolve, 800));

    // Validar que el email no esté duplicado
    if (mockUserService.users.some(u => u.email.toLowerCase() === userData.email.toLowerCase())) {
      throw new Error('Ya existe un usuario con este email');
    }

    // Validar que el documento no esté duplicado
    if (mockUserService.users.some(u =>
      u.documentType === userData.documentType &&
      u.documentNumber === userData.documentNumber)) {
      throw new Error('Ya existe un usuario con este documento');
    }

    const newUser = {
      id: mockUserService.users.length + 1,
      ...userData,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    mockUserService.users.push(newUser);
    return { ...newUser };
  },

  // Actualizar un usuario existente
  updateUser: async (id, userData) => {
    await new Promise(resolve => setTimeout(resolve, 800));

    const index = mockUserService.users.findIndex(u => u.id === id);
    if (index === -1) {
      throw new Error('Usuario no encontrado');
    }

    // Validar que el email no esté duplicado (excepto para el mismo usuario)
    if (userData.email && mockUserService.users.some(u =>
      u.id !== id &&
      u.email.toLowerCase() === userData.email.toLowerCase())) {
      throw new Error('Ya existe otro usuario con este email');
    }

    // Validar que el documento no esté duplicado (excepto para el mismo usuario)
    if (userData.documentType && userData.documentNumber && mockUserService.users.some(u =>
      u.id !== id &&
      u.documentType === userData.documentType &&
      u.documentNumber === userData.documentNumber)) {
      throw new Error('Ya existe otro usuario con este documento');
    }

    const updatedUser = {
      ...mockUserService.users[index],
      ...userData,
      updatedAt: new Date().toISOString()
    };

    mockUserService.users[index] = updatedUser;
    return { ...updatedUser };
  },

  // Eliminar un usuario
  deleteUser: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 600));

    const index = mockUserService.users.findIndex(u => u.id === id);
    if (index === -1) {
      throw new Error('Usuario no encontrado');
    }

    // No permitir eliminar el usuario administrador principal
    if (id === 1) {
      throw new Error('No se puede eliminar el usuario administrador principal');
    }

    mockUserService.users.splice(index, 1);
    return { success: true };
  },

  // Cambiar estado de un usuario (activar/desactivar)
  toggleUserStatus: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 400));

    const index = mockUserService.users.findIndex(u => u.id === id);
    if (index === -1) {
      throw new Error('Usuario no encontrado');
    }

    mockUserService.users[index].isActive = !mockUserService.users[index].isActive;
    return { ...mockUserService.users[index] };
  }
};
