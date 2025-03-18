import React from 'react';
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton
} from '@coreui/react';

const DeleteConfirmationModal = ({ visible, onClose, onConfirm, title, message }) => {
  return (
    <CModal visible={visible} onClose={onClose}>
      <CModalHeader>
        <CModalTitle>{title || 'Confirmar eliminación'}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        {message || '¿Está seguro que desea eliminar este elemento?'}
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={onClose}>
          Cancelar
        </CButton>
        <CButton color="danger" onClick={onConfirm}>
          Eliminar
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default DeleteConfirmationModal;
