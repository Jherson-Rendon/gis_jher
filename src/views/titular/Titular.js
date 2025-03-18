import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CInputGroup,
  CFormInput,
  CFormSelect,
  CInputGroupText,
  CRow,
  CCol,
  CTable,
  CTableHead,
  CTableBody,
  CTableHeaderCell,
  CTableDataCell,
  CTableRow,
  CCard,
  CCardBody,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem
} from '@coreui/react'
import SedesForm from './SedesForm'

const AgregarTitular = ({ onSave }) => {
  const [visibleLg, setVisibleLg] = useState(false)
  const [formData, setFormData] = useState({
    tipoContribuyente: '',
    tipoDocumento: '',
    numeroIdentificacion: '',
    digitoVerificacion: '',
    primerApellido: '',
    segundoApellido: '',
    primerNombre: '',
    otrosNombres: '',
    razonSocial: '',
    nombreComercial: '',
    sigla: '',
    correo: '',
    telefono: '',
  })

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSaveChanges = () => {
    onSave(formData)
    setVisibleLg(false)
  }

  return (
    <>
      <CButton color="primary" onClick={() => setVisibleLg(!visibleLg)}>
        Agregar Titular
      </CButton>
      <CModal alignment="center" size="lg" visible={visibleLg} onClose={() => setVisibleLg(false)}>
        <CModalHeader>
          <CModalTitle>Nuevo Titular</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow>
            <CCol md={6}>
              <CInputGroup className="mb-3">
                <CInputGroupText>Tipo de Contribuyente</CInputGroupText>
                <CFormSelect name="tipoContribuyente" onChange={handleInputChange}>
                  <option value="">Seleccione</option>
                  <option value="Juridica">Jurídica</option>
                  <option value="natural">Natural</option>
                </CFormSelect>
              </CInputGroup>
            </CCol>
            <CCol md={6}>
              <CInputGroup className="mb-3">
                <CInputGroupText>Tipo de Documento</CInputGroupText>
                <CFormSelect name="tipoDocumento" onChange={handleInputChange}>
                  <option value="">Seleccione</option>
                  <option value="Nit">Nit</option>
                  <option value="C.C">C.C</option>
                  <option value="RUC">RUC</option>
                  <option value="Pasaporte">Pasaporte</option>
                  <option value="Carnet de extranjería">Carnet de extranjería</option>
                </CFormSelect>
              </CInputGroup>
            </CCol>
          </CRow>
          {formData.tipoDocumento === 'Nit' ? (
            <CRow>
              <CCol md={8}>
                <CInputGroup className="mb-3">
                  <CInputGroupText>Número de Identificación</CInputGroupText>
                  <CFormInput
                    name="numeroIdentificacion"
                    placeholder="Número de Identificación"
                    onChange={handleInputChange}
                  />
                </CInputGroup>
              </CCol>
              <CCol md={4}>
                <CInputGroup className="mb-3">
                  <CInputGroupText>Dígito de verificación</CInputGroupText>
                  <CFormInput
                    name="digitoVerificacion"
                    placeholder="Dígito"
                    onChange={handleInputChange}
                  />
                </CInputGroup>
              </CCol>
            </CRow>
          ) : (
            <CRow>
              <CCol md={12}>
                <CInputGroup className="mb-3">
                  <CInputGroupText>Número de Identificación</CInputGroupText>
                  <CFormInput
                    name="numeroIdentificacion"
                    placeholder="Número de Identificación"
                    onChange={handleInputChange}
                  />
                </CInputGroup>
              </CCol>
            </CRow>
          )}
          <CRow>
            <CCol md={6}>
              <CInputGroup className="mb-3">
                <CInputGroupText>Primer Apellido</CInputGroupText>
                <CFormInput
                  name="primerApellido"
                  placeholder="Primer Apellido"
                  onChange={handleInputChange}
                />
              </CInputGroup>
            </CCol>
            <CCol md={6}>
              <CInputGroup className="mb-3">
                <CInputGroupText>Segundo Apellido</CInputGroupText>
                <CFormInput
                  name="segundoApellido"
                  placeholder="Segundo Apellido"
                  onChange={handleInputChange}
                />
              </CInputGroup>
            </CCol>
          </CRow>
          <CRow>
            <CCol md={6}>
              <CInputGroup className="mb-3">
                <CInputGroupText>Primer Nombre</CInputGroupText>
                <CFormInput
                  name="primerNombre"
                  placeholder="Primer Nombre"
                  onChange={handleInputChange}
                />
              </CInputGroup>
            </CCol>
            <CCol md={6}>
              <CInputGroup className="mb-3">
                <CInputGroupText>Otros Nombres</CInputGroupText>
                <CFormInput
                  name="otrosNombres"
                  placeholder="Otros Nombres"
                  onChange={handleInputChange}
                />
              </CInputGroup>
            </CCol>
          </CRow>
          <CRow>
            <CCol md={4}>
              <CInputGroup className="mb-3">
                <CInputGroupText>Razon Social</CInputGroupText>
                <CFormInput
                  name="razonSocial"
                  placeholder="Razon Social"
                  onChange={handleInputChange}
                />
              </CInputGroup>
            </CCol>
            <CCol md={4}>
              <CInputGroup className="mb-3">
                <CInputGroupText>Nombre Comercial</CInputGroupText>
                <CFormInput
                  name="nombreComercial"
                  placeholder="Nombre Comercial"
                  onChange={handleInputChange}
                />
              </CInputGroup>
            </CCol>
            <CCol md={4}>
              <CInputGroup className="mb-3">
                <CInputGroupText>Sigla</CInputGroupText>
                <CFormInput
                  name="sigla"
                  placeholder="Sigla"
                  onChange={handleInputChange}
                />
              </CInputGroup>
            </CCol>
          </CRow>
          <CRow>
            <CCol md={6}>
              <CInputGroup className="mb-3">
                <CInputGroupText>Correo</CInputGroupText>
                <CFormInput
                  name="correo"
                  placeholder="Correo"
                  onChange={handleInputChange}
                />
              </CInputGroup>
            </CCol>
            <CCol md={6}>
              <CInputGroup className="mb-3">
                <CInputGroupText>Teléfono</CInputGroupText>
                <CFormInput
                  name="telefono"
                  placeholder="Teléfono"
                  onChange={handleInputChange}
                />
              </CInputGroup>
            </CCol>
          </CRow>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisibleLg(false)}>
            Close
          </CButton>
          <CButton color="primary" onClick={handleSaveChanges}>
            Save changes
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

// Modificado: EditarTitular para usar el mismo formulario que AgregarTitular pero con datos precargados
const EditarTitular = ({ visible, titular, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    tipoContribuyente: titular?.tipoContribuyente || '',
    tipoDocumento: titular?.tipoDocumento || '',
    numeroIdentificacion: titular?.numeroIdentificacion || '',
    digitoVerificacion: titular?.digitoVerificacion || '',
    primerApellido: titular?.primerApellido || '',
    segundoApellido: titular?.segundoApellido || '',
    primerNombre: titular?.primerNombre || '',
    otrosNombres: titular?.otrosNombres || '',
    razonSocial: titular?.razonSocial || '',
    nombreComercial: titular?.nombreComercial || '',
    sigla: titular?.sigla || '',
    correo: titular?.correo || '',
    telefono: titular?.telefono || '',
  })

  React.useEffect(() => {
    setFormData({
      tipoContribuyente: titular?.tipoContribuyente || '',
      tipoDocumento: titular?.tipoDocumento || '',
      numeroIdentificacion: titular?.numeroIdentificacion || '',
      digitoVerificacion: titular?.digitoVerificacion || '',
      primerApellido: titular?.primerApellido || '',
      segundoApellido: titular?.segundoApellido || '',
      primerNombre: titular?.primerNombre || '',
      otrosNombres: titular?.otrosNombres || '',
      razonSocial: titular?.razonSocial || '',
      nombreComercial: titular?.nombreComercial || '',
      sigla: titular?.sigla || '',
      correo: titular?.correo || '',
      telefono: titular?.telefono || '',
    })
  }, [titular])

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSaveChanges = () => {
    onSave(formData)
    onClose()
  }

  return (
    <CModal alignment="center" size="lg" visible={visible} onClose={onClose}>
      <CModalHeader>
        <CModalTitle>Editar Titular</CModalTitle>
      </CModalHeader>
      <CModalBody>
        {/* Row for Tipo de Contribuyente and Tipo de Documento */}
        <CRow>
          <CCol md={6}>
            <CInputGroup className="mb-3">
              <CInputGroupText>Tipo de Contribuyente</CInputGroupText>
              <CFormSelect
                name="tipoContribuyente"
                value={formData.tipoContribuyente}
                onChange={handleInputChange}
              >
                <option value="">Seleccione</option>
                <option value="Juridica">Jurídica</option>
                <option value="natural">Natural</option>
              </CFormSelect>
            </CInputGroup>
          </CCol>
          <CCol md={6}>
            <CInputGroup className="mb-3">
              <CInputGroupText>Tipo de Documento</CInputGroupText>
              <CFormSelect
                name="tipoDocumento"
                value={formData.tipoDocumento}
                onChange={handleInputChange}
              >
                <option value="">Seleccione</option>
                <option value="Nit">Nit</option>
                <option value="C.C">C.C</option>
                <option value="RUC">RUC</option>
                <option value="Pasaporte">Pasaporte</option>
                <option value="Carnet de extranjería">Carnet de extranjería</option>
              </CFormSelect>
            </CInputGroup>
          </CCol>
        </CRow>
        {formData.tipoDocumento === 'Nit' ? (
          <CRow>
            <CCol md={8}>
              <CInputGroup className="mb-3">
                <CInputGroupText>Número de Identificación</CInputGroupText>
                <CFormInput
                  name="numeroIdentificacion"
                  placeholder="Número de Identificación"
                  value={formData.numeroIdentificacion}
                  onChange={handleInputChange}
                />
              </CInputGroup>
            </CCol>
            <CCol md={4}>
              <CInputGroup className="mb-3">
                <CInputGroupText>Dígito de verificación</CInputGroupText>
                <CFormInput
                  name="digitoVerificacion"
                  placeholder="Dígito"
                  value={formData.digitoVerificacion}
                  onChange={handleInputChange}
                />
              </CInputGroup>
            </CCol>
          </CRow>
        ) : (
          <CRow>
            <CCol md={12}>
              <CInputGroup className="mb-3">
                <CInputGroupText>Número de Identificación</CInputGroupText>
                <CFormInput
                  name="numeroIdentificacion"
                  placeholder="Número de Identificación"
                  value={formData.numeroIdentificacion}
                  onChange={handleInputChange}
                />
              </CInputGroup>
            </CCol>
          </CRow>
        )}
        {/* Row for name fields */}
        <CRow>
          <CCol md={6}>
            <CInputGroup className="mb-3">
              <CInputGroupText>Primer Apellido</CInputGroupText>
              <CFormInput
                name="primerApellido"
                placeholder="Primer Apellido"
                value={formData.primerApellido}
                onChange={handleInputChange}
              />
            </CInputGroup>
          </CCol>
          <CCol md={6}>
            <CInputGroup className="mb-3">
              <CInputGroupText>Segundo Apellido</CInputGroupText>
              <CFormInput
                name="segundoApellido"
                placeholder="Segundo Apellido"
                value={formData.segundoApellido}
                onChange={handleInputChange}
              />
            </CInputGroup>
          </CCol>
        </CRow>
        <CRow>
          <CCol md={6}>
            <CInputGroup className="mb-3">
              <CInputGroupText>Primer Nombre</CInputGroupText>
              <CFormInput
                name="primerNombre"
                placeholder="Primer Nombre"
                value={formData.primerNombre}
                onChange={handleInputChange}
              />
            </CInputGroup>
          </CCol>
          <CCol md={6}>
            <CInputGroup className="mb-3">
              <CInputGroupText>Otros Nombres</CInputGroupText>
              <CFormInput
                name="otrosNombres"
                placeholder="Otros Nombres"
                value={formData.otrosNombres}
                onChange={handleInputChange}
              />
            </CInputGroup>
          </CCol>
        </CRow>
        {/* Row for Razon Social, Nombre Comercial and Sigla */}
        <CRow>
          <CCol md={4}>
            <CInputGroup className="mb-3">
              <CInputGroupText>Razon Social</CInputGroupText>
              <CFormInput
                name="razonSocial"
                placeholder="Razon Social"
                value={formData.razonSocial}
                onChange={handleInputChange}
              />
            </CInputGroup>
          </CCol>
          <CCol md={4}>
            <CInputGroup className="mb-3">
              <CInputGroupText>Nombre Comercial</CInputGroupText>
              <CFormInput
                name="nombreComercial"
                placeholder="Nombre Comercial"
                value={formData.nombreComercial}
                onChange={handleInputChange}
              />
            </CInputGroup>
          </CCol>
          <CCol md={4}>
            <CInputGroup className="mb-3">
              <CInputGroupText>Sigla</CInputGroupText>
              <CFormInput
                name="sigla"
                placeholder="Sigla"
                value={formData.sigla}
                onChange={handleInputChange}
              />
            </CInputGroup>
          </CCol>
        </CRow>
        {/* Row for Correo and Teléfono */}
        <CRow>
          <CCol md={6}>
            <CInputGroup className="mb-3">
              <CInputGroupText>Correo</CInputGroupText>
              <CFormInput
                name="correo"
                placeholder="Correo"
                value={formData.correo}
                onChange={handleInputChange}
              />
            </CInputGroup>
          </CCol>
          <CCol md={6}>
            <CInputGroup className="mb-3">
              <CInputGroupText>Teléfono</CInputGroupText>
              <CFormInput
                name="telefono"
                placeholder="Teléfono"
                value={formData.telefono}
                onChange={handleInputChange}
              />
            </CInputGroup>
          </CCol>
        </CRow>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={onClose}>
          Close
        </CButton>
        <CButton color="primary" onClick={handleSaveChanges}>
          Save changes
        </CButton>
      </CModalFooter>
    </CModal>
  )
}


const Titular = () => {
  const navigate = useNavigate()
  const [titulares] = useState([
    {
      tipoContribuyente: 'Juridica',
      tipoDocumento: 'Nit',
      numeroIdentificacion: '800123456',
      razonSocial: 'Empresa ABC S.A.S',
      nombreComercial: 'ABC Corp',
      telefono: '1234567',
    },
    {
      tipoContribuyente: 'Natural',
      tipoDocumento: 'C.C',
      numeroIdentificacion: '1002345678',
      razonSocial: ' - ',
      nombreComercial: 'Juan Pérez',
      telefono: '7654321',
    },
    {
      tipoContribuyente: 'Juridica',
      tipoDocumento: 'RUC',
      numeroIdentificacion: '900345678',
      razonSocial: 'Soluciones XYZ',
      nombreComercial: 'XYZ Soluciones',
      telefono: '5551234',
    },
  ])

  const [filterType, setFilterType] = useState('razonSocial')
  const [filterValue, setFilterValue] = useState('')

  const filteredTitulares = titulares.filter((titular) => {
    if (filterType === 'razonSocial') {
      return titular.razonSocial.toLowerCase().includes(filterValue.toLowerCase())
    } else if (filterType === 'nombreComercial') {
      return titular.nombreComercial.toLowerCase().includes(filterValue.toLowerCase())
    }
    return true
  })

  // NUEVO: Estado y funciones para editar titular mediante el dropdown (según sugerencias previas)
  const [editModalVisible, setEditModalVisible] = useState(false)
  const [editingTitular, setEditingTitular] = useState(null)
  const [editingIndex, setEditingIndex] = useState(null)

  const openEditModal = (index, titular, e) => {
    e.stopPropagation()
    setEditingTitular(titular)
    setEditingIndex(index)
    setEditModalVisible(true)
  }

  const closeEditModal = () => {
    setEditModalVisible(false)
    setEditingTitular(null)
    setEditingIndex(null)
  }

  const handleUpdateTitular = (updatedTitular) => {
    closeEditModal()
  }

  const handleSaveTitular = (newTitular) => {
  }

  const handleEditTitular = (updatedTitular) => {
  }

  // NUEVO: Estado para el modal de sedes
  const [showSedesModal, setShowSedesModal] = useState(false)
  const handleSaveSede = (sedeData) => {
    console.log('Sede guardada:', sedeData)
    // Implementar lógica de guardado según sea necesario
  }

  // NUEVO: Estado para sedes de prueba
  const [sedesTest, setSedesTest] = useState([
    { nombreSede: 'Sede Test 1', direccion: 'Calle 123, Ciudad A' },
    { nombreSede: 'Sede Test 2', direccion: 'Avenida 456, Ciudad B' },
    { nombreSede: 'Sede Test 3', direccion: 'Boulevard 789, Ciudad C' },
  ])

  return (
    <div>
      <AgregarTitular onSave={handleSaveTitular} />


      {/* Added spacing between buttons and table */}
      <div className="my-3"></div>

      <CCard className="mb-4 custom-table-card">
        <CCardBody>
          <div style={{ width: '50%', marginBottom: '1rem' }}>
            <CInputGroup>
              <CFormSelect
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                style={{ backgroundColor: 'white', color: 'black' }}
              >
                <option value="razonSocial">Filter by Razón Social</option>
                <option value="nombreComercial">Filter by Nombre Comercial</option>
              </CFormSelect>
              <CFormInput
                placeholder="Enter filter value"
                value={filterValue}
                onChange={(e) => setFilterValue(e.target.value)}
              />
            </CInputGroup>
          </div>
          <CTable align="middle" className="mb-0 border custom-table" hover responsive>
            <CTableHead>
              <CTableRow>
                {/* Orden: Nombre Comercial primero */}
                <CTableHeaderCell className="bg-body-tertiary">Nombre Comercial</CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary">Tipo Contribuyente</CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary">Tipo Documento</CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary">N° Identificación</CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary">Razón Social</CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary">Teléfono</CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary">Acciones</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {filteredTitulares.map((titular, index) => (
                <CTableRow
                  key={index}
                  onClick={() => navigate(`/titular/profile/${titular.numeroIdentificacion}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <CTableDataCell>{titular.nombreComercial}</CTableDataCell>
                  <CTableDataCell>{titular.tipoContribuyente}</CTableDataCell>
                  <CTableDataCell>{titular.tipoDocumento}</CTableDataCell>
                  <CTableDataCell>{titular.numeroIdentificacion}</CTableDataCell>
                  <CTableDataCell>{titular.razonSocial}</CTableDataCell>
                  <CTableDataCell>{titular.telefono}</CTableDataCell>
                  <CTableDataCell onClick={(e) => e.stopPropagation()}>
                    <CDropdown>
                      <CDropdownToggle color="secondary" caret={false} style={{ borderRadius: '50px' }}>
                        ⋮
                      </CDropdownToggle>
                      <CDropdownMenu>
                        <CDropdownItem onClick={(e) => openEditModal(index, titular, e)}>
                          Editar Titular
                        </CDropdownItem>
                      </CDropdownMenu>
                    </CDropdown>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
      {/* Botón debajo de la lista para generar sede de trabajo */}
      <div className="mb-4" style={{ textAlign: 'left' }}>
        <CButton color="primary" onClick={() => setShowSedesModal(true)}>
          Generar Sede de Trabajo
        </CButton>
      </div>
      {showSedesModal && (
        <SedesForm visible={showSedesModal} onClose={() => setShowSedesModal(false)} onSave={handleSaveSede} />
      )}

      {/* NUEVO: Tabla de sedes de prueba */}
      <CCard className="mb-4 custom-table-card">
        <CCardBody>
          <CTable align="middle" className="mb-0 border custom-table" hover responsive>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>Nombre Sede</CTableHeaderCell>
                <CTableHeaderCell>Dirección</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {sedesTest.map((sede, idx) => (
                <CTableRow key={idx}>
                  <CTableDataCell>{sede.nombreSede}</CTableDataCell>
                  <CTableDataCell>{sede.direccion}</CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>

      {editingTitular && (
        <EditarTitular
          visible={editModalVisible}
          titular={editingTitular}
          onSave={handleUpdateTitular}
          onClose={closeEditModal}
        />
      )}
    </div>
  )
}

export default Titular
