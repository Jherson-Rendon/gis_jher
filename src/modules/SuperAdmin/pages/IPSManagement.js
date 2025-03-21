// src/modules/SuperAdmin/pages/IPSManagement.js
import React, { useState } from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
  CSpinner,
  CBadge,
  CInputGroup,
  CFormInput,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilPencil, cilTrash, cilPlus, cilSearch } from '@coreui/icons';
import { useTheme } from '../../../contexts/ThemeContext';

// Datos de ejemplo
const INITIAL_IPS = [
  {
    id: 1,
    name: 'Hospital Central',
    address: 'Calle 123 #45-67',
    city: 'Bogotá',
    phone: '601-1234567',
    email: 'info@hospitalcentral.com',
    status: 'active',
  },
  {
    id: 2,
    name: 'Clínica del Norte',
    address: 'Av. Principal 789',
    city: 'Medellín',
    phone: '604-7654321',
    email: 'contacto@clinicadelnorte.com',
    status: 'active',
  },
  {
    id: 3,
    name: 'Centro Médico Especializado',
    address: 'Carrera 45 #12-34',
    city: 'Cali',
    phone: '602-9876543',
    email: 'info@centromedico.com',
    status: 'inactive',
  },
];

const IPSManagement = () => {
  const { isDark } = useTheme();
  const [ips, setIps] = useState(INITIAL_IPS);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Filtrar IPS según el término de búsqueda
  const filteredIPS = ips.filter(
    (ips) =>
      ips.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ips.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ips.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <CCard className={isDark ? 'bg-dark text-white' : ''}>
      <CCardHeader className="d-flex justify-content-between align-items-center">
        <h4 className="mb-0">Gestión de IPS</h4>
        <CButton color="primary">
          <CIcon icon={cilPlus} className="me-2" />
          Nueva IPS
        </CButton>
      </CCardHeader>
      <CCardBody>
        {/* Barra de búsqueda */}
        <div className="mb-4">
          <CInputGroup>
            <CFormInput
              placeholder="Buscar IPS..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              startContent={<CIcon icon={cilSearch} />}
            />
          </CInputGroup>
        </div>

        {loading ? (
          <div className="text-center my-4">
            <CSpinner color="primary" />
          </div>
        ) : (
          <CTable hover responsive className={isDark ? 'table-dark' : ''}>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>Nombre</CTableHeaderCell>
                <CTableHeaderCell>Dirección</CTableHeaderCell>
                <CTableHeaderCell>Ciudad</CTableHeaderCell>
                <CTableHeaderCell>Teléfono</CTableHeaderCell>
                <CTableHeaderCell>Email</CTableHeaderCell>
                <CTableHeaderCell>Estado</CTableHeaderCell>
                <CTableHeaderCell>Acciones</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {filteredIPS.length > 0 ? (
                filteredIPS.map((ips) => (
                  <CTableRow key={ips.id}>
                    <CTableDataCell>{ips.name}</CTableDataCell>
                    <CTableDataCell>{ips.address}</CTableDataCell>
                    <CTableDataCell>{ips.city}</CTableDataCell>
                    <CTableDataCell>{ips.phone}</CTableDataCell>
                    <CTableDataCell>{ips.email}</CTableDataCell>
                    <CTableDataCell>
                      <CBadge color={ips.status === 'active' ? 'success' : 'danger'}>
                        {ips.status === 'active' ? 'Activo' : 'Inactivo'}
                      </CBadge>
                    </CTableDataCell>
                    <CTableDataCell>
                      <CButton
                        color="info"
                        size="sm"
                        className="me-2"
                      >
                        <CIcon icon={cilPencil} />
                      </CButton>
                      <CButton
                        color="danger"
                        size="sm"
                      >
                        <CIcon icon={cilTrash} />
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                ))
              ) : (
                <CTableRow>
                  <CTableDataCell colSpan="7" className="text-center">
                    No se encontraron IPS
                  </CTableDataCell>
                </CTableRow>
              )}
            </CTableBody>
          </CTable>
        )}
      </CCardBody>
    </CCard>
  );
};

export default IPSManagement;
