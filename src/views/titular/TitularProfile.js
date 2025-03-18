import React, { useState } from 'react'
import { CCard, CCardBody, CCardHeader, CButton, CInputGroup, CInputGroupText, CFormInput, CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter } from '@coreui/react'
import { useParams, useNavigate } from 'react-router-dom'

const AgregarRepresentante = ({ onSave }) => {
  const [visibleLg, setVisibleLg] = useState(false)
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    telefono: '',
    relacion: '',
  })

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSaveChanges = () => {
    onSave && onSave(formData)
    setVisibleLg(false)
  }

  return (
    <>
      <CButton color="primary" onClick={() => setVisibleLg(!visibleLg)}>
        Agregar Representante Legal
      </CButton>
      <CModal alignment="center" size="lg" visible={visibleLg} onClose={() => setVisibleLg(false)}>
        <CModalHeader>
          <CModalTitle>Nuevo Representante Legal</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CInputGroup className="mb-3">
            <CInputGroupText>Nombre</CInputGroupText>
            <CFormInput name="nombre" placeholder="Nombre" onChange={handleInputChange} />
          </CInputGroup>
          <CInputGroup className="mb-3">
            <CInputGroupText>Apellido</CInputGroupText>
            <CFormInput name="apellido" placeholder="Apellido" onChange={handleInputChange} />
          </CInputGroup>
          <CInputGroup className="mb-3">
            <CInputGroupText>Correo</CInputGroupText>
            <CFormInput name="correo" placeholder="Correo" onChange={handleInputChange} />
          </CInputGroup>
          <CInputGroup className="mb-3">
            <CInputGroupText>Teléfono</CInputGroupText>
            <CFormInput name="telefono" placeholder="Teléfono" onChange={handleInputChange} />
          </CInputGroup>
          <CInputGroup className="mb-3">
            <CInputGroupText>Relación</CInputGroupText>
            <CFormInput name="relacion" placeholder="Relación" onChange={handleInputChange} />
          </CInputGroup>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisibleLg(false)}>Close</CButton>
          <CButton color="primary" onClick={handleSaveChanges}>Save changes</CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

const TitularProfile = () => {
  const { id } = useParams()
  // Dummy data; en un caso real se consultaría usando "id"
  const titular = {
    tipoContribuyente: 'Juridica',
    tipoDocumento: 'Nit',
    numeroIdentificacion: id,
    razonSocial: 'Empresa ABC S.A.S',
    nombreComercial: 'ABC Corp',
    digitoVerificacion: '5',
    primerApellido: 'García',
    segundoApellido: 'López',
    primerNombre: 'Juan',
    otrosNombres: '',
    correo: 'juan@example.com',
    telefono: '1234567',
  }

  const navigate = useNavigate()

  const handleSaveRepresentante = (data) => {
    // Lógica para guardar representante legal
    console.log('Representante guardado:', data)
  }

  return (
    <div style={{ padding: '1rem' }}>
      <CCard className="mb-4">
        <CCardHeader>Perfil de Titular: {titular.nombreComercial}</CCardHeader>
        <CCardBody>
          <p><strong>Tipo Contribuyente:</strong> {titular.tipoContribuyente}</p>
          <p><strong>Tipo Documento:</strong> {titular.tipoDocumento}</p>
          <p><strong>N° Identificación:</strong> {titular.numeroIdentificacion}</p>
          <p><strong>Dígito Verificación:</strong> {titular.digitoVerificacion}</p>
          <p><strong>Primer Apellido:</strong> {titular.primerApellido}</p>
          <p><strong>Segundo Apellido:</strong> {titular.segundoApellido}</p>
          <p><strong>Primer Nombre:</strong> {titular.primerNombre}</p>
          <p><strong>Correo:</strong> {titular.correo}</p>
          <p><strong>Teléfono:</strong> {titular.telefono}</p>
          <CButton color="primary" onClick={() => navigate(-1)}>Volver</CButton>
        </CCardBody>
      </CCard>
      {/* Botón y formulario de agregar representante legal */}
      <AgregarRepresentante onSave={handleSaveRepresentante} />
    </div>
  )
}

export default TitularProfile
