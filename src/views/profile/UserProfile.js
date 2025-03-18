import React from 'react'
import { useLocation } from 'react-router-dom'

const UserProfile = () => {
  const { state } = useLocation()
  const user = state?.user

  if (!user) return <div>No user data available.</div>

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Perfil de Usuario</h2>
      <p>
        <strong>Documento:</strong> {user.tipoDocumento} - {user.numeroDocumento}
      </p>
      <p>
        <strong>Nacionalidad:</strong> {user.nacionalidadDocumento}
      </p>
      <p>
        <strong>Nombres:</strong> {user.primerNombre} {user.segundoNombre}
      </p>
      <p>
        <strong>Apellidos:</strong> {user.primerApellido} {user.segundoApellido}
      </p>
      <p>
        <strong>Correo:</strong> {user.correo}
      </p>
      <p>
        <strong>Tipo de vínculo:</strong> {user.tipoVinculo}
      </p>
      <p>
        <strong>Tipo de usuario:</strong> {user.tipoUsuario}
      </p>
      <p>
        <strong>Módulos con acceso:</strong> {user.modules?.join(', ')}
      </p>
    </div>
  )
}

export default UserProfile
