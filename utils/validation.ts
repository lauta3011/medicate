export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export interface FieldValidationResult {
  isValid: boolean;
  error?: string;
}

// Email validation
export const validateEmail = (email: string): FieldValidationResult => {
  if (!email.trim()) {
    return { isValid: false, error: 'El correo electrónico es requerido' };
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return { isValid: false, error: 'Ingresa un correo electrónico válido' };
  }
  
  return { isValid: true };
};

// Password validation
export const validatePassword = (password: string): FieldValidationResult => {
  if (!password) {
    return { isValid: false, error: 'La contraseña es requerida' };
  }
  
  if (password.length < 6) {
    return { isValid: false, error: 'La contraseña debe tener al menos 6 caracteres' };
  }
  
  // Check for at least one uppercase, lowercase, and number
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  
  if (!hasUppercase || !hasLowercase || !hasNumber) {
    return { 
      isValid: false, 
      error: 'La contraseña debe contener al menos una mayúscula, una minúscula y un número' 
    };
  }
  
  return { isValid: true };
};

// Name validation
export const validateName = (name: string, fieldName: string = 'Nombre'): FieldValidationResult => {
  if (!name.trim()) {
    return { isValid: false, error: `${fieldName} es requerido` };
  }
  
  if (name.trim().length < 2) {
    return { isValid: false, error: `${fieldName} debe tener al menos 2 caracteres` };
  }
  
  // Only allow letters, spaces, and common Spanish characters
  const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
  if (!nameRegex.test(name.trim())) {
    return { isValid: false, error: `${fieldName} solo puede contener letras` };
  }
  
  return { isValid: true };
};

// Phone validation (Chilean format)
export const validatePhone = (phone: string): FieldValidationResult => {
  if (!phone.trim()) {
    return { isValid: false, error: 'El teléfono es requerido' };
  }
  
  // Remove all non-numeric characters for validation
  const numericPhone = phone.replace(/\D/g, '');
  
  // Chilean mobile numbers: 9 digits starting with 9, or with country code +56 9
  const phoneRegex = /^(\+?56)?9\d{8}$/;
  
  if (!phoneRegex.test(numericPhone)) {
    return { 
      isValid: false, 
      error: 'Ingresa un número de teléfono chileno válido (ej: +56 9 1234 5678)' 
    };
  }
  
  return { isValid: true };
};

// Format phone number for display
export const formatPhoneNumber = (phone: string): string => {
  const numericPhone = phone.replace(/\D/g, '');
  
  if (numericPhone.length === 9 && numericPhone.startsWith('9')) {
    // Format as: 9 1234 5678
    return `${numericPhone.slice(0, 1)} ${numericPhone.slice(1, 5)} ${numericPhone.slice(5)}`;
  } else if (numericPhone.length === 11 && numericPhone.startsWith('569')) {
    // Format as: +56 9 1234 5678
    return `+56 ${numericPhone.slice(2, 3)} ${numericPhone.slice(3, 7)} ${numericPhone.slice(7)}`;
  }
  
  return phone; // Return original if doesn't match expected format
};

// Login form validation
export const validateLoginForm = (email: string, password: string): ValidationResult => {
  const errors: string[] = [];
  
  const emailValidation = validateEmail(email);
  if (!emailValidation.isValid) {
    errors.push(emailValidation.error!);
  }
  
  if (!password.trim()) {
    errors.push('La contraseña es requerida');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Signup form validation
export const validateSignupForm = (userData: {
  name: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  profilePicture?: string | null;
}): ValidationResult => {
  const errors: string[] = [];
  
  // Validate name
  const nameValidation = validateName(userData.name, 'Nombre');
  if (!nameValidation.isValid) {
    errors.push(nameValidation.error!);
  }
  
  // Validate last name
  const lastNameValidation = validateName(userData.lastName, 'Apellido');
  if (!lastNameValidation.isValid) {
    errors.push(lastNameValidation.error!);
  }
  
  // Validate phone
  const phoneValidation = validatePhone(userData.phone);
  if (!phoneValidation.isValid) {
    errors.push(phoneValidation.error!);
  }
  
  // Validate email
  const emailValidation = validateEmail(userData.email);
  if (!emailValidation.isValid) {
    errors.push(emailValidation.error!);
  }
  
  // Validate password
  const passwordValidation = validatePassword(userData.password);
  if (!passwordValidation.isValid) {
    errors.push(passwordValidation.error!);
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Auth error message mapping
export const getAuthErrorMessage = (error: any): string => {
  if (typeof error === 'string') return error;
  
  const errorCode = error?.code || error?.message || '';
  
  // Supabase auth error mappings
  switch (errorCode) {
    case 'invalid_credentials':
    case 'Invalid login credentials':
      return 'Credenciales inválidas. Verifica tu email y contraseña.';
    case 'email_not_confirmed':
      return 'Debes confirmar tu email antes de iniciar sesión.';
    case 'user_not_found':
      return 'No existe una cuenta con este email.';
    case 'weak_password':
      return 'La contraseña es muy débil. Debe tener al menos 6 caracteres.';
    case 'email_address_invalid':
      return 'El formato del email no es válido.';
    case 'signup_disabled':
      return 'El registro de nuevos usuarios está deshabilitado.';
    case 'email_address_already_registered':
    case 'User already registered':
      return 'Ya existe una cuenta con este email.';
    case 'rate_limit_exceeded':
      return 'Demasiados intentos. Intenta de nuevo más tarde.';
    case 'network_error':
      return 'Error de conexión. Verifica tu internet e intenta de nuevo.';
    default:
      // Check if error message contains common patterns
      if (errorCode.includes('email')) {
        return 'Error relacionado con el email. Verifica el formato.';
      }
      if (errorCode.includes('password')) {
        return 'Error relacionado con la contraseña.';
      }
      if (errorCode.includes('network') || errorCode.includes('fetch')) {
        return 'Error de conexión. Verifica tu internet e intenta de nuevo.';
      }
      
      return 'Error inesperado. Intenta de nuevo más tarde.';
  }
};