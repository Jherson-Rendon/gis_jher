import React from 'react';
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
  CSpinner
} from '@coreui/react';

const DeleteConfirmationModal = ({
  visible,
  onClose,
  onConfirm,
  title = 'Confirmar eliminación',
  message = '¿Está seguro que desea eliminar este elemento?',
  loading = false
}) => {
  return (
    <CModal visible={visible} onClose={onClose} backdrop="static">
      <CModalHeader>
        <CModalTitle>{title}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <p>{message}</p>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={onClose} disabled={loading}>
          Cancelar
        </CButton>
        <CButton color="danger" onClick={onConfirm} disabled={loading}>
          {loading ? <CSpinner size="sm" /> : 'Eliminar'}
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default DeleteConfirmationModal;
