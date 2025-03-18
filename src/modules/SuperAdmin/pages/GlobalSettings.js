import React, { useState } from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CRow,
  CCol,
  CForm,
  CFormLabel,
  CFormInput,
  CFormSelect,
  CFormSwitch,
  CButton,
  CAlert
} from '@coreui/react';

const GlobalSettings = () => {
  const [formData, setFormData] = useState({
    siteName: 'Sistema de Gestión IPS',
    siteDescription: 'Plataforma integral para la gestión de Instituciones Prestadoras de Salud',
    adminEmail: 'admin@sistema-ips.com',
    defaultLanguage: 'es',
    defaultTimeZone: 'America/Bogota',
    enableRegistration: true,
    enablePasswordReset: true,
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    maintenanceMode: false
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });

    if (saved) setSaved(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para guardar la configuración
    console.log('Configuración guardada:', formData);
    setSaved(true);

    // Simular una petición al servidor
    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
          <h4>Configuración Global del Sistema</h4>
        </CCardHeader>
        <CCardBody>
          {saved && (
            <CAlert color="success" dismissible>
              Configuración guardada correctamente.
            </CAlert>
          )}

          <CForm onSubmit={handleSubmit}>
            <CRow className="mb-3">
              <CCol md={6}>
                <CFormLabel htmlFor="siteName">Nombre del Sistema</CFormLabel>
                <CFormInput
                  id="siteName"
                  name="siteName"
                  value={formData.siteName}
                  onChange={handleChange}
                />
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="adminEmail">Email de Administración</CFormLabel>
                <CFormInput
                  type="email"
                  id="adminEmail"
                  name="adminEmail"
                  value={formData.adminEmail}
                  onChange={handleChange}
                />
              </CCol>
            </CRow>

            <CRow className="mb-3">
              <CCol md={12}>
                <CFormLabel htmlFor="siteDescription">Descripción del Sistema</CFormLabel>
                <CFormInput
                  id="siteDescription"
                  name="siteDescription"
                  value={formData.siteDescription}
                  onChange={handleChange}
                />
              </CCol>
            </CRow>

            <CRow className="mb-3">
              <CCol md={6}>
                <CFormLabel htmlFor="defaultLanguage">Idioma Predeterminado</CFormLabel>
                <CFormSelect
                  id="defaultLanguage"
                  name="defaultLanguage"
                  value={formData.defaultLanguage}
                  onChange={handleChange}
                >
                  <option value="es">Español</option>
                  <option value="en">Inglés</option>
                  <option value="pt">Portugués</option>
                </CFormSelect>
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="defaultTimeZone">Zona Horaria</CFormLabel>
                <CFormSelect
                  id="defaultTimeZone"
                  name="defaultTimeZone"
                  value={formData.defaultTimeZone}
                  onChange={handleChange}
                >
                  <option value="America/Bogota">Bogotá (GMT-5)</option>
                  <option value="America/Mexico_City">Ciudad de México (GMT-6)</option>
                  <option value="America/Santiago">Santiago (GMT-4)</option>
                  <option value="America/Buenos_Aires">Buenos Aires (GMT-3)</option>
                </CFormSelect>
              </CCol>
            </CRow>

            <CRow className="mb-3">
              <CCol md={6}>
                <CFormLabel htmlFor="sessionTimeout">Tiempo de Sesión (minutos)</CFormLabel>
                <CFormInput
                  type="number"
                  id="sessionTimeout"
                  name="sessionTimeout"
                  value={formData.sessionTimeout}
                  onChange={handleChange}
                  min="5"
                  max="120"
                />
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="maxLoginAttempts">Intentos Máximos de Login</CFormLabel>
                <CFormInput
                  type="number"
                  id="maxLoginAttempts"
                  name="maxLoginAttempts"
                  value={formData.maxLoginAttempts}
                  onChange={handleChange}
                  min="3"
                  max="10"
                />
              </CCol>
            </CRow>

            <CRow className="mb-4">
              <CCol md={6}>
                <CFormSwitch
                  label="Permitir Registro de Usuarios"
                  id="enableRegistration"
                  name="enableRegistration"
                  checked={formData.enableRegistration}
                  onChange={handleChange}
                />
              </CCol>
              <CCol md={6}>
                <CFormSwitch
                  label="Permitir Recuperación de Contraseña"
                  id="enablePasswordReset"
                  name="enablePasswordReset"
                  checked={formData.enablePasswordReset}
                  onChange={handleChange}
                />
              </CCol>
            </CRow>

            <CRow className="mb-4">
              <CCol md={12}>
                <CFormSwitch
                  label="Modo Mantenimiento"
                  id="maintenanceMode"
                  name="maintenanceMode"
                  checked={formData.maintenanceMode}
                  onChange={handleChange}
                />
                {formData.maintenanceMode && (
                  <div className="text-danger mt-2">
                    <small>
                      El modo mantenimiento bloqueará el acceso a todos los usuarios excepto administradores.
                    </small>
                  </div>
                )}
              </CCol>
            </CRow>

            <CRow>
              <CCol>
                <CButton type="submit" color="primary">
                  Guardar Configuración
                </CButton>
              </CCol>
            </CRow>
          </CForm>
        </CCardBody>
      </CCard>
    </>
  );
};

export default GlobalSettings;
