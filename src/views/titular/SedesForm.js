import React, { useState } from 'react'
import {
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CInputGroup,
  CInputGroupText,
  CFormInput
} from '@coreui/react'

const SedesForm = ({ visible, onClose, onSave }) => {
  const [formData, setFormData] = useState({ nombreSede: '', direccion: '' })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSave = () => {
    onSave && onSave(formData)
    onClose()
    setFormData({ nombreSede: '', direccion: '' })
  }

  return (
    <CModal alignment="center" size="lg" visible={visible} onClose={onClose}>
      <CModalHeader>
        <CModalTitle>Generar Sede de Trabajo</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CInputGroup className="mb-3">
          <CInputGroupText>Nombre Sede</CInputGroupText>
          <CFormInput name="nombreSede" placeholder="Ingrese el nombre" value={formData.nombreSede} onChange={handleInputChange} />
        </CInputGroup>
        <CInputGroup className="mb-3">
          <CInputGroupText>Dirección</CInputGroupText>
          <CFormInput name="direccion" placeholder="Ingrese la dirección" value={formData.direccion} onChange={handleInputChange} />
        </CInputGroup>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={onClose}>Cerrar</CButton>
        <CButton color="primary" onClick={handleSave}>Guardar Sede</CButton>
      </CModalFooter>
    </CModal>
  )
}

export default SedesForm
