import React, { useState } from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CRow,
  CCol,
  CButton,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CInputGroup,
  CFormInput,
  CInputGroupText,
  CBadge
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilPlus, cilSearch, cilPencil, cilTrash } from '@coreui/icons';

const IPSManagement = () => {
  // Datos de ejemplo para IPS
  const [ipsList] = useState([
    {
      id: 1,
      name: 'IPS Salud Total',
      address: 'Calle 123 #45-67, Bogotá',
      phone: '601-1234567',
      email: 'contacto@saludtotal.com',
      status: 'active'
    },
    {
      id: 2,
      name: 'Centro Médico Bienestar',
      address: 'Carrera 78 #90-12, Medellín',
      phone: '604-7654321',
      email: 'info@bienestar.com',
      status: 'active'
    },
    {
      id: 3,
      name: 'Hospital San José',
      address: 'Avenida 45 #23-56, Cali',
      phone: '602-3456789',
      email: 'contacto@sanjose.com',
      status: 'inactive'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  // Filtrar IPS por término de búsqueda
  const filteredIPS = ipsList.filter(
    (ips) =>
      ips.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ips.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ips.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
          <h4>Gestión de IPS</h4>
        </CCardHeader>
        <CCardBody>
          <CRow className="mb-3">
            <CCol md={6}>
              <CInputGroup>
                <CInputGroupText>
                  <CIcon icon={cilSearch} />
                </CInputGroupText>
                <CFormInput
                  placeholder="Buscar IPS..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </CInputGroup>
            </CCol>
            <CCol md={6} className="d-flex justify-content-end">
              <CButton color="primary">
                <CIcon icon={cilPlus} className="me-2" />
                Nueva IPS
              </CButton>
            </CCol>
          </CRow>

          <CTable hover responsive>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                <CTableHeaderCell scope="col">Nombre</CTableHeaderCell>
                <CTableHeaderCell scope="col">Dirección</CTableHeaderCell>
                <CTableHeaderCell scope="col">Teléfono</CTableHeaderCell>
                <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                <CTableHeaderCell scope="col">Estado</CTableHeaderCell>
                <CTableHeaderCell scope="col">Acciones</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {filteredIPS.length > 0 ? (
                filteredIPS.map((ips) => (
                  <CTableRow key={ips.id}>
                    <CTableHeaderCell scope="row">{ips.id}</CTableHeaderCell>
                    <CTableDataCell>{ips.name}</CTableDataCell>
                    <CTableDataCell>{ips.address}</CTableDataCell>
                    <CTableDataCell>{ips.phone}</CTableDataCell>
                    <CTableDataCell>{ips.email}</CTableDataCell>
                    <CTableDataCell>
                      <CBadge color={ips.status === 'active' ? 'success' : 'danger'}>
                        {ips.status === 'active' ? 'Activo' : 'Inactivo'}
                      </CBadge>
                    </CTableDataCell>
                    <CTableDataCell>
                      <CButton color="info" size="sm" className="me-2">
                        <CIcon icon={cilPencil} />
                      </CButton>
                      <CButton color="danger" size="sm">
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
        </CCardBody>
      </CCard>
    </>
  );
};

export default IPSManagement;
