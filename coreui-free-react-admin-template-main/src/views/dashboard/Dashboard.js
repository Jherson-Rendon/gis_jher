import React, { useState } from 'react'
import classNames from 'classnames'

import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CFormInput,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CModal,
  CFormSelect,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CInputGroup,
  CInputGroupText,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cibTwitter,
  cilPeople,
  cilUser,
  cilUserFemale,
} from '@coreui/icons'

import avatar1 from 'src/assets/images/avatars/1.jpg'
import avatar2 from 'src/assets/images/avatars/2.jpg'
import avatar3 from 'src/assets/images/avatars/3.jpg'
import avatar4 from 'src/assets/images/avatars/4.jpg'
import avatar5 from 'src/assets/images/avatars/5.jpg'
import avatar6 from 'src/assets/images/avatars/6.jpg'

const AgregarUsuario = ({ onSave }) => {
  const [visibleLg, setVisibleLg] = useState(false)
  const [selectedModules, setSelectedModules] = useState([])
  const [formData, setFormData] = useState({
    tipoDocumento: '',
    numeroDocumento: '',
    nacionalidadDocumento: '',
    primerNombre: '',
    segundoNombre: '',
    primerApellido: '',
    segundoApellido: '',
    correo: '',
    tipoVinculo: '',
    tipoUsuario: '',
  })

  const handleModuleSelect = (event) => {
    const selectedOption = event.target.value
    if (selectedOption && !selectedModules.includes(selectedOption)) {
      setSelectedModules([...selectedModules, selectedOption])
    }
  }

  const removeModule = (module) => {
    setSelectedModules(selectedModules.filter((item) => item !== module))
  }

  const handleCloseModal = () => {
    setVisibleLg(false)
    setSelectedModules([]) // Reset the tags
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSaveChanges = () => {
    onSave({ ...formData, modules: selectedModules })
    handleCloseModal()
  }

  return (
    <>
      <CButton color="primary" onClick={() => setVisibleLg(!visibleLg)}>
        Agregar Usuario
      </CButton>
      <CModal alignment="center" size="lg" visible={visibleLg} onClose={handleCloseModal}>
        <CModalHeader>
          <CModalTitle>Usuario Nuevo</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CInputGroup className="mb-3">
            <CFormSelect
              name="tipoDocumento"
              onChange={handleInputChange}
              aria-label="Default select example"
            >
              <option>Tipo Documento</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </CFormSelect>
            <CInputGroupText id="basic-addon1"># Documento</CInputGroupText>
            <CFormInput
              name="numeroDocumento"
              placeholder="123456789"
              aria-label="Username"
              aria-describedby="basic-addon1"
              onChange={handleInputChange}
            />
            <CInputGroupText id="basic-addon1">Nacionalidad Documento</CInputGroupText>
            <CFormInput
              name="nacionalidadDocumento"
              placeholder="Colombia"
              aria-label="Username"
              aria-describedby="basic-addon1"
              onChange={handleInputChange}
            />
          </CInputGroup>
          <CInputGroup className="mb-3">
            <CInputGroupText id="basic-addon1">Primer Nombre</CInputGroupText>
            <CFormInput
              name="primerNombre"
              placeholder="123456789"
              aria-label="Username"
              aria-describedby="basic-addon1"
              onChange={handleInputChange}
            />
            <CInputGroupText id="basic-addon1">Segundo Nombre</CInputGroupText>
            <CFormInput
              name="segundoNombre"
              placeholder="123456789"
              aria-label="Username"
              aria-describedby="basic-addon1"
              onChange={handleInputChange}
            />
          </CInputGroup>
          <CInputGroup className="mb-3">
            <CInputGroupText id="basic-addon1">Primer Apellido</CInputGroupText>
            <CFormInput
              name="primerApellido"
              placeholder="123456789"
              aria-label="Username"
              aria-describedby="basic-addon1"
              onChange={handleInputChange}
            />
            <CInputGroupText id="basic-addon1">Segundo Apellido</CInputGroupText>
            <CFormInput
              name="segundoApellido"
              placeholder="123456789"
              aria-label="Username"
              aria-describedby="basic-addon1"
              onChange={handleInputChange}
            />
          </CInputGroup>
          <CInputGroup className="mb-3">
            <CInputGroupText>Correo Electrónico</CInputGroupText>
            <CFormInput
              name="correo"
              placeholder="Usuario"
              aria-label="Username"
              onChange={handleInputChange}
            />
            <CInputGroupText>@</CInputGroupText>
            <CFormInput
              name="correo"
              placeholder="correo.com"
              aria-label="Server"
              onChange={handleInputChange}
            />
          </CInputGroup>
          <CInputGroup className="mb-3">
            <CFormSelect
              name="tipoVinculo"
              onChange={handleInputChange}
              aria-label="Default select example"
            >
              <option>Tipo de vinculo con la empresa</option>
              <option value="1">Colaborador con contrato</option>
              <option value="2">Cliente</option>
              <option value="3">Proveedor</option>
            </CFormSelect>
            <CInputGroupText id="basic-addon1">Tipo Usuario</CInputGroupText>
            <CFormInput
              name="tipoUsuario"
              placeholder="Tipo Usuario"
              aria-label="Username"
              aria-describedby="basic-addon1"
              onChange={handleInputChange}
            />
          </CInputGroup>
          <CInputGroup className="mb-3">
            <CInputGroupText id="basic-addon1">Modulos con acceso</CInputGroupText>
            <CFormSelect aria-label="Default select example" onChange={handleModuleSelect}>
              <option>Modulos con acceso</option>
              <option value="Titular1">Titular1</option>
              <option value="Titular2">Titular2</option>
              <option value="Titular3">Titular3</option>
            </CFormSelect>
          </CInputGroup>
          <div className="mb-3">
            {selectedModules.map((module, index) => (
              <span key={index} className="badge bg-primary me-2">
                {module}{' '}
                <span onClick={() => removeModule(module)} style={{ cursor: 'pointer' }}>
                  x
                </span>
              </span>
            ))}
          </div>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={handleCloseModal}>
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

const Dashboard = () => {
  const [tableExample, setTableExample] = useState([
    {
      avatar: { src: avatar1, status: 'success' },
      user: {
        name: 'Yiorgos Avraamu',
        new: true,
        registered: 'Jan 1, 2023',
      },
      country: { name: 'USA', flag: cifUs },
      correo: 'yiorgos@example.com',
      tipoUsuario: 'Admin',
      activity: '10 sec ago',
    },
    {
      avatar: { src: avatar2, status: 'danger' },
      user: {
        name: 'Avram Tarasios',
        new: false,
        registered: 'Jan 1, 2023',
      },
      country: { name: 'Brazil', flag: cifBr },
      correo: 'avram@example.com',
      tipoUsuario: 'User',
      activity: '5 minutes ago',
    },
    {
      avatar: { src: avatar3, status: 'warning' },
      user: { name: 'Quintin Ed', new: true, registered: 'Jan 1, 2023' },
      country: { name: 'India', flag: cifIn },
      correo: 'quintin@example.com',
      tipoUsuario: 'User',
      activity: '1 hour ago',
    },
    {
      avatar: { src: avatar4, status: 'secondary' },
      user: { name: 'Enéas Kwadwo', new: true, registered: 'Jan 1, 2023' },
      country: { name: 'France', flag: cifFr },
      correo: 'eneas@example.com',
      tipoUsuario: 'User',
      activity: 'Last month',
    },
    {
      avatar: { src: avatar5, status: 'success' },
      user: {
        name: 'Agapetus Tadeáš',
        new: true,
        registered: 'Jan 1, 2023',
      },
      country: { name: 'Spain', flag: cifEs },
      correo: 'agapetus@example.com',
      tipoUsuario: 'User',
      activity: 'Last week',
    },
    {
      avatar: { src: avatar6, status: 'danger' },
      user: {
        name: 'Friderik Dávid',
        new: true,
        registered: 'Jan 1, 2023',
      },
      country: { name: 'Poland', flag: cifPl },
      correo: 'friderik@example.com',
      tipoUsuario: 'User',
      activity: 'Last week',
    },
  ])

  const handleSaveUser = (newUser) => {
    setTableExample([
      ...tableExample,
      {
        avatar: { src: avatar1, status: 'success' }, // Example avatar
        user: {
          name: `${newUser.primerNombre} ${newUser.segundoNombre} ${newUser.primerApellido} ${newUser.segundoApellido}`,
          new: true,
          registered: new Date().toLocaleDateString(),
        },
        country: { name: newUser.nacionalidadDocumento, flag: cifUs }, // Example flag
        correo: newUser.correo,
        tipoUsuario: newUser.tipoUsuario,
        activity: 'Just now',
      },
    ])
  }

  return (
    <>
      <CRow>
        <CCol xs>
          <AgregarUsuario onSave={handleSaveUser} />
          <div className="mb-3"></div>
          <CCard className="mb-4 custom-table-card">
            <CTable align="middle" className="mb-0 border custom-table" hover responsive>
              <CTableHead className="text-nowrap">
                <CTableRow>
                  <CTableHeaderCell className="bg-body-tertiary text-center">
                    <CIcon icon={cilPeople} />
                  </CTableHeaderCell>
                  <CTableHeaderCell className="bg-body-tertiary">Usuario</CTableHeaderCell>
                  <CTableHeaderCell className="bg-body-tertiary text-center">
                    Country
                  </CTableHeaderCell>
                  <CTableHeaderCell className="bg-body-tertiary">Correo</CTableHeaderCell>
                  <CTableHeaderCell className="bg-body-tertiary">Tipo Usuario</CTableHeaderCell>
                  <CTableHeaderCell className="bg-body-tertiary">Activity</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {tableExample.map((item, index) => (
                  <CTableRow v-for="item in tableItems" key={index}>
                    <CTableDataCell className="text-center">
                      <CAvatar size="md" src={item.avatar.src} status={item.avatar.status} />
                    </CTableDataCell>
                    <CTableDataCell>
                      <div>{item.user.name}</div>
                      <div className="small text-body-secondary text-nowrap">
                        <span>{item.user.new ? 'New' : 'Recurring'}</span> | Registered:{' '}
                        {item.user.registered}
                      </div>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <CIcon size="xl" icon={item.country.flag} title={item.country.name} />
                    </CTableDataCell>
                    <CTableDataCell>
                      <div>{item.correo}</div>
                    </CTableDataCell>
                    <CTableDataCell>
                      <div>{item.tipoUsuario}</div>
                    </CTableDataCell>
                    <CTableDataCell>
                      <div className="small text-body-secondary text-nowrap">Last login</div>
                      <div className="fw-semibold text-nowrap">{item.activity}</div>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard
