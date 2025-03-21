import React, { createContext, useContext, useState, useEffect } from 'react'
import mockAuthService from '../views/auth/services/mockAuthService'
import authServices from '../views/auth/services/authServices';

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = mockAuthService.getCurrentUser()
        console.log('Usuario actual:', currentUser)
        setUser(currentUser)
      } catch (error) {
        console.error('Error al verificar autenticación:', error)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  // Modificar la función login para pruebas
  const login = async (credentials) => {
    try {
      const userData = await mockAuthService.login(credentials)
      console.log('Login exitoso, datos de usuario:', userData)
      setUser(userData)
      return userData
    } catch (error) {
      console.error('Error en login:', error)
      throw error
    }
  }

  // // Modificar la función login para producción
  // const login = async (credentials) => {
  //   try {
  //     // Llamar al servicio real de autenticación
  //     const response = await authServices.login(credentials.email, credentials.password);

  //     // Extraer datos del usuario y tokens de la respuesta
  //     const { user, token, refreshToken } = response;

  //     // Establecer el usuario en el estado
  //     setUser({
  //       ...user,
  //       tokens: {
  //         accessToken: token,
  //         refreshToken: refreshToken
  //       }
  //     });

  //     return user;
  //   } catch (error) {
  //     throw error;
  //   }
  // };


  const logout = () => {
    mockAuthService.logout()
    setUser(null)
    // Redireccionar a login después de logout
    window.location.href = '/auth/login'
  }

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: () => !!user,
    hasRole: (role) => user?.role === role,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
