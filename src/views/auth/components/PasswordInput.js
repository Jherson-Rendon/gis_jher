// src/views/auth/components/PasswordInput.js
import React, { useState } from 'react';
import {
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CFormFeedback
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilLockLocked, cilLockUnlocked } from '@coreui/icons';

const PasswordInput = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  error,
  required = false,
  autoComplete = 'new-password'
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="mb-3">
      {label && <label className="form-label">{label}</label>}
      <CInputGroup>
        <CFormInput
          type={showPassword ? 'text' : 'password'}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          invalid={!!error}
          required={required}
          autoComplete={autoComplete}
        />
        <CInputGroupText
          onClick={togglePasswordVisibility}
          style={{ cursor: 'pointer' }}
          title={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
        >
          <CIcon icon={showPassword ? cilLockUnlocked : cilLockLocked} />
        </CInputGroupText>
      </CInputGroup>
      {error && (
        <CFormFeedback invalid>{error}</CFormFeedback>
      )}
    </div>
  );
};

export default PasswordInput;
