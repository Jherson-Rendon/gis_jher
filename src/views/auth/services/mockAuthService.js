// src/views/auth/services/mockAuthService.js (modificado)

const passwordResetTokens = new Map();

// Simulación de tiempos de expiración (en milisegundos)
const ACCESS_TOKEN_EXPIRY = 30000; // 30 segundos (para pruebas)
const REFRESH_TOKEN_EXPIRY = 86400000; // 24 horas

// Función para generar tokens simulados
const generateToken = (type, expiresIn) => {
  const now = Date.now();
  return {
    token: `mock-${type}-token-${now}`,
    expiresAt: now + expiresIn,
  };
};

// Definición de roles y sus permisos
const ROLES = {
  SUPER_ADMIN: {
    name: 'Super Administrador',
    permissions: ['all'],
    modules: ['dashboard', 'admin', 'users', 'patients', 'appointments', 'medical', 'laboratory', 'billing']
  },
  ADMIN: {
    name: 'Administrador',
    permissions: ['create_users', 'edit_users', 'view_users', 'delete_users'],
    modules: ['dashboard', 'users', 'patients', 'appointments', 'medical', 'laboratory', 'billing']
  },
  MEDICO: {
    name: 'Médico',
    permissions: ['view_patients', 'create_medical_records', 'edit_medical_records'],
    modules: ['dashboard', 'patients', 'appointments', 'medical']
  },
  ENFERMERA: {
    name: 'Enfermera',
    permissions: ['view_patients', 'view_medical_records', 'update_vital_signs'],
    modules: ['dashboard', 'patients', 'appointments', 'medical']
  },
  LABORATORIO: {
    name: 'Laboratorio',
    permissions: ['view_patients', 'create_lab_results', 'edit_lab_results'],
    modules: ['dashboard', 'patients', 'laboratory']
  },
  CONTABILIDAD: {
    name: 'Contabilidad',
    permissions: ['view_patients', 'create_bills', 'edit_bills', 'view_reports'],
    modules: ['dashboard', 'patients', 'billing']
  },
  RECEPCION: {
    name: 'Recepción',
    permissions: ['view_patients', 'create_patients', 'edit_patients', 'create_appointments', 'edit_appointments'],
    modules: ['dashboard', 'patients', 'appointments']
  }
};

// Datos de usuario de prueba con roles
const MOCK_USERS = [
  {
    id: 1,
    name: 'Super Admin',
    email: 'superadmin@ips.com',
    password: '123456',
    role: 'SUPER_ADMIN',
    createdBy: null,
    createdAt: new Date('2023-01-01').toISOString()
  },
  {
    id: 2,
    name: 'Administrador',
    email: 'admin@ips.com',
    password: '123456',
    role: 'ADMIN',
    createdBy: 1,
    createdAt: new Date('2023-01-02').toISOString()
  },
  {
    id: 3,
    name: 'Dr. Juan Pérez',
    email: 'medico@ips.com',
    password: '123456',
    role: 'MEDICO',
    createdBy: 2,
    createdAt: new Date('2023-01-03').toISOString()
  },
  {
    id: 4,
    name: 'Enfermera María López',
    email: 'enfermera@ips.com',
    password: '123456',
    role: 'ENFERMERA',
    createdBy: 2,
    createdAt: new Date('2023-01-04').toISOString()
  },
  {
    id: 5,
    name: 'Técnico Laboratorio',
    email: 'lab@ips.com',
    password: '123456',
    role: 'LABORATORIO',
    createdBy: 2,
    createdAt: new Date('2023-01-05').toISOString()
  },
  {
    id: 6,
    name: 'Contador',
    email: 'conta@ips.com',
    password: '123456',
    role: 'CONTABILIDAD',
    createdBy: 2,
    createdAt: new Date('2023-01-06').toISOString()
  },
  {
    id: 7,
    name: 'Recepcionista',
    email: 'recep@ips.com',
    password: '123456',
    role: 'RECEPCION',
    createdBy: 2,
    createdAt: new Date('2023-01-07').toISOString()
  }
];

// Datos de pacientes de prueba
const MOCK_PATIENTS = [
  {
    id: 1,
    documentType: 'CC',
    documentNumber: '1234567890',
    firstName: 'Carlos',
    lastName: 'Rodríguez',
    birthDate: '1985-05-15',
    gender: 'M',
    email: 'carlos@example.com',
    phone: '3001234567',
    address: 'Calle 123 #45-67',
    city: 'Bogotá',
    bloodType: 'O+',
    createdAt: new Date('2023-02-01').toISOString(),
    createdBy: 7 // Creado por recepcionista
  },
  {
    id: 2,
    documentType: 'CC',
    documentNumber: '0987654321',
    firstName: 'Ana',
    lastName: 'Gómez',
    birthDate: '1990-10-20',
    gender: 'F',
    email: 'ana@example.com',
    phone: '3109876543',
    address: 'Carrera 45 #12-34',
    city: 'Medellín',
    bloodType: 'A+',
    createdAt: new Date('2023-02-05').toISOString(),
    createdBy: 7 // Creado por recepcionista
  }
];

// Servicio de autenticación simulado
const mockAuthService = {
  login: async (credentials) => {
    // Simular delay de red
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Buscar usuario por email
    const user = MOCK_USERS.find((u) => u.email === credentials.email);

    // Verificar credenciales
    if (user && user.password === credentials.password) {
      const accessToken = generateToken('access', ACCESS_TOKEN_EXPIRY);
      const refreshToken = generateToken('refresh', REFRESH_TOKEN_EXPIRY);

      const userData = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        permissions: ROLES[user.role].permissions,
        modules: ROLES[user.role].modules,
        tokens: {
          accessToken: accessToken.token,
          refreshToken: refreshToken.token,
          expiresAt: accessToken.expiresAt,
        },
      };

      // Guardar en sessionStorage
      sessionStorage.setItem('auth_tokens', JSON.stringify(userData.tokens));
      sessionStorage.setItem('auth_user', JSON.stringify({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }));

      return userData;
    }

    throw { message: 'Credenciales inválidas' };
  },

  register: async (userData, creatorId) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Verificar si el email ya existe
    if (MOCK_USERS.some((u) => u.email === userData.email)) {
      throw { message: 'El correo electrónico ya está registrado' };
    }

    // Crear nuevo usuario
    const newUser = {
      id: MOCK_USERS.length + 1,
      ...userData,
      createdBy: creatorId,
      createdAt: new Date().toISOString()
    };

    // Agregar a la lista (en una app real, esto iría a la base de datos)
    MOCK_USERS.push(newUser);

    return { success: true, message: 'Usuario registrado correctamente', user: newUser };
  },

  // Método para crear un nuevo usuario (usado por admin y superadmin)
  createUser: async (userData, creatorId) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Verificar si el email ya existe
    if (MOCK_USERS.some((u) => u.email === userData.email)) {
      throw { message: 'El correo electrónico ya está registrado' };
    }

    // Validar que el rol sea válido
    if (!ROLES[userData.role]) {
      throw { message: 'El rol especificado no es válido' };
    }

    // Crear nuevo usuario
    const newUser = {
      id: MOCK_USERS.length + 1,
      name: userData.name,
      email: userData.email,
      password: userData.password || '123456', // Contraseña por defecto
      role: userData.role,
      createdBy: creatorId,
      createdAt: new Date().toISOString()
    };

    // Agregar a la lista
    MOCK_USERS.push(newUser);

    return {
      success: true,
      message: 'Usuario creado correctamente',
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        createdAt: newUser.createdAt
      }
    };
  },

  // Método para obtener todos los usuarios (filtrado según permisos)
  getUsers: async (requestingUserId) => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const requestingUser = MOCK_USERS.find(u => u.id === requestingUserId);

    if (!requestingUser) {
      throw { message: 'Usuario no autorizado' };
    }

    let users;

    // Super Admin ve todos los usuarios
    if (requestingUser.role === 'SUPER_ADMIN') {
      users = MOCK_USERS;
    }
    // Admin ve todos excepto super admins
    else if (requestingUser.role === 'ADMIN') {
      users = MOCK_USERS.filter(u => u.role !== 'SUPER_ADMIN');
    }
    // Otros roles no deberían acceder a esta función, pero por si acaso
    else {
      throw { message: 'No tienes permisos para ver usuarios' };
    }

    // Filtrar información sensible
    return users.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      roleName: ROLES[user.role].name,
      createdBy: user.createdBy,
      createdAt: user.createdAt
    }));
  },

  // Método para obtener un usuario por ID
  getUserById: async (userId, requestingUserId) => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const requestingUser = MOCK_USERS.find(u => u.id === requestingUserId);
    const targetUser = MOCK_USERS.find(u => u.id === userId);

    if (!requestingUser || !targetUser) {
      throw { message: 'Usuario no encontrado' };
    }

    // Verificar permisos
    if (requestingUser.role !== 'SUPER_ADMIN' &&
        targetUser.role === 'SUPER_ADMIN') {
      throw { message: 'No tienes permisos para ver este usuario' };
    }

    // Filtrar información sensible
    return {
      id: targetUser.id,
      name: targetUser.name,
      email: targetUser.email,
      role: targetUser.role,
      roleName: ROLES[targetUser.role].name,
      createdBy: targetUser.createdBy,
      createdAt: targetUser.createdAt
    };
  },

  // Método para actualizar un usuario
  updateUser: async (userId, userData, requestingUserId) => {
    await new Promise((resolve) => setTimeout(resolve, 800));

    const requestingUser = MOCK_USERS.find(u => u.id === requestingUserId);
    const userIndex = MOCK_USERS.findIndex(u => u.id === userId);

    if (!requestingUser || userIndex === -1) {
      throw { message: 'Usuario no encontrado' };
    }

    const targetUser = MOCK_USERS[userIndex];

    // Verificar permisos
    if (requestingUser.role !== 'SUPER_ADMIN' && targetUser.role === 'SUPER_ADMIN') {
      throw { message: 'No tienes permisos para editar este usuario' };
    }

    if (requestingUser.role === 'ADMIN' && userData.role === 'SUPER_ADMIN') {
      throw { message: 'No puedes asignar el rol de Super Admin' };
    }

    // Actualizar usuario
    MOCK_USERS[userIndex] = {
      ...targetUser,
      name: userData.name || targetUser.name,
      email: userData.email || targetUser.email,
      role: userData.role || targetUser.role,
      password: userData.password || targetUser.password
    };

    return {
      success: true,
      message: 'Usuario actualizado correctamente',
      user: {
        id: MOCK_USERS[userIndex].id,
        name: MOCK_USERS[userIndex].name,
        email: MOCK_USERS[userIndex].email,
        role: MOCK_USERS[userIndex].role,
        roleName: ROLES[MOCK_USERS[userIndex].role].name
      }
    };
  },

  // Método para eliminar un usuario
  deleteUser: async (userId, requestingUserId) => {
    await new Promise((resolve) => setTimeout(resolve, 600));

    const requestingUser = MOCK_USERS.find(u => u.id === requestingUserId);
    const userIndex = MOCK_USERS.findIndex(u => u.id === userId);

    if (!requestingUser || userIndex === -1) {
      throw { message: 'Usuario no encontrado' };
    }

    const targetUser = MOCK_USERS[userIndex];

    // Verificar permisos
    if (requestingUser.role !== 'SUPER_ADMIN' && targetUser.role === 'SUPER_ADMIN') {
      throw { message: 'No tienes permisos para eliminar este usuario' };
    }

    if (requestingUser.role === 'ADMIN' && targetUser.role === 'ADMIN') {
      throw { message: 'Un administrador no puede eliminar a otro administrador' };
    }

    // No permitir eliminar al propio usuario
    if (userId === requestingUserId) {
      throw { message: 'No puedes eliminar tu propio usuario' };
    }

    // Eliminar usuario
    MOCK_USERS.splice(userIndex, 1);

    return { success: true, message: 'Usuario eliminado correctamente' };
  },

  // Métodos para pacientes
  getPatients: async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return MOCK_PATIENTS;
  },

  getPatientById: async (patientId) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const patient = MOCK_PATIENTS.find(p => p.id === patientId);

    if (!patient) {
      throw { message: 'Paciente no encontrado' };
    }

    return patient;
  },

  createPatient: async (patientData, creatorId) => {
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Verificar si ya existe un paciente con el mismo documento
    if (MOCK_PATIENTS.some(p => p.documentNumber === patientData.documentNumber)) {
      throw { message: 'Ya existe un paciente con este número de documento' };
    }

    const newPatient = {
      id: MOCK_PATIENTS.length + 1,
      ...patientData,
      createdAt: new Date().toISOString(),
      createdBy: creatorId
    };

    MOCK_PATIENTS.push(newPatient);

    return { success: true, message: 'Paciente creado correctamente', patient: newPatient };
  },

  // Resto de métodos existentes
  forgotPassword: async (email) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const user = MOCK_USERS.find((u) => u.email === email);
    if (!user) {
      throw { message: 'No existe una cuenta con este correo electrónico' };
    }

    const resetToken = `reset-${Date.now()}-${Math.random().toString(36).substr(2)}`;
    console.log('Token generado:', resetToken); // Para debugging

    passwordResetTokens.set(resetToken, {
      userId: user.id,
      expires: Date.now() + 3600000, // 1 hora de validez
    });

    console.log('Token guardado:', passwordResetTokens.get(resetToken)); // Para debugging

    return {
      success: true,
      message: 'Se han enviado instrucciones a tu correo electrónico',
      token: resetToken,
    };
  },

  validateResetToken: async (token) => {
    console.log('Validando token:', token); // Para debugging
    await new Promise((resolve) => setTimeout(resolve, 500));

    const tokenData = passwordResetTokens.get(token);
    console.log('Token data:', tokenData); // Para debugging

    if (!tokenData || tokenData.expires < Date.now()) {
      throw { message: 'Token inválido o expirado' };
    }

    return { valid: true };
  },

  resetPassword: async (token, newPassword) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Validar requisitos de contraseña
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      throw {
        message: 'La contraseña no cumple con los requisitos mínimos',
      };
    }

    const tokenData = passwordResetTokens.get(token);
    if (!tokenData || tokenData.expires < Date.now()) {
      throw { message: 'Token inválido o expirado' };
    }

    // Encontrar y actualizar el usuario
    const userIndex = MOCK_USERS.findIndex((u) => u.id === tokenData.userId);
    if (userIndex === -1) {
      throw { message: 'Usuario no encontrado' };
    }

    // Actualizar contraseña
    MOCK_USERS[userIndex].password = newPassword;

    // Eliminar token usado
    passwordResetTokens.delete(token);

    return {
      success: true,
      message: 'Contraseña actualizada correctamente',
    };
  },

  refreshToken: async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const currentTokens = JSON.parse(sessionStorage.getItem('auth_tokens'));

    if (!currentTokens?.refreshToken) {
      throw { message: 'No refresh token available' };
    }

    // Generar nuevo access token
    const newAccessToken = generateToken('access', ACCESS_TOKEN_EXPIRY);

    const updatedTokens = {
      ...currentTokens,
      accessToken: newAccessToken.token,
      expiresAt: newAccessToken.expiresAt,
    };

    sessionStorage.setItem('auth_tokens', JSON.stringify(updatedTokens));

    return updatedTokens;
  },

  logout: () => {
    sessionStorage.removeItem('auth_tokens');
    sessionStorage.removeItem('auth_user');
  },

getCurrentUser: () => {
  const tokens = JSON.parse(sessionStorage.getItem('auth_tokens'));
  const userData = JSON.parse(sessionStorage.getItem('auth_user'));

  if (!tokens || !userData) {
    console.log('No hay tokens o datos de usuario en sessionStorage');
    return null;
  }

  const user = MOCK_USERS.find(u => u.id === userData.id);

  if (!user) {
    console.log('Usuario no encontrado en MOCK_USERS');
    return null;
  }

  console.log('Usuario recuperado de sessionStorage:', user);

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    permissions: ROLES[user.role].permissions,
    modules: ROLES[user.role].modules,
    tokens,
  };
},

  isTokenExpired: () => {
    const tokens = JSON.parse(sessionStorage.getItem('auth_tokens'));
    if (!tokens?.expiresAt) return true;
    return Date.now() >= tokens.expiresAt;
  },

  // Función auxiliar para pruebas
  simulateTokenExpiration: () => {
    const tokens = JSON.parse(sessionStorage.getItem('auth_tokens'));
    if (tokens) {
      tokens.expiresAt = Date.now() - 1000; // Hacer que el token expire
      sessionStorage.setItem('auth_tokens', JSON.stringify(tokens));
      console.log('Token expirado simulado. El sistema debería intentar renovarlo.');
    }
  },

  // Función para obtener los roles disponibles
  getRoles: () => {
    return Object.keys(ROLES).map(key => ({
      id: key,
      name: ROLES[key].name
    }));
  }
};

export default mockAuthService;
