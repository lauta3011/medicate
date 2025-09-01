// Simple test file to validate our validation functions
// Run this in a JavaScript environment to test the validation logic

import {
    formatPhoneNumber,
    getAuthErrorMessage,
    validateEmail,
    validateLoginForm,
    validateName,
    validatePassword,
    validatePhone,
    validateSignupForm
} from './validation';

// Email validation tests
console.log('=== EMAIL VALIDATION TESTS ===');
console.log('Valid email:', validateEmail('test@example.com')); // Should be valid
console.log('Invalid email (no @):', validateEmail('testexample.com')); // Should be invalid
console.log('Invalid email (no domain):', validateEmail('test@')); // Should be invalid
console.log('Empty email:', validateEmail('')); // Should be invalid
console.log('Spaces in email:', validateEmail(' test@example.com ')); // Should be valid (trimmed)

// Password validation tests
console.log('\n=== PASSWORD VALIDATION TESTS ===');
console.log('Valid password:', validatePassword('Test123')); // Should be valid
console.log('Too short:', validatePassword('Test1')); // Should be invalid
console.log('No uppercase:', validatePassword('test123')); // Should be invalid
console.log('No lowercase:', validatePassword('TEST123')); // Should be invalid
console.log('No number:', validatePassword('TestAbc')); // Should be invalid
console.log('Empty password:', validatePassword('')); // Should be invalid

// Name validation tests
console.log('\n=== NAME VALIDATION TESTS ===');
console.log('Valid name:', validateName('Juan')); // Should be valid
console.log('Valid name with accent:', validateName('José')); // Should be valid
console.log('Valid name with spaces:', validateName('Juan Carlos')); // Should be valid
console.log('Too short:', validateName('J')); // Should be invalid
console.log('Empty name:', validateName('')); // Should be invalid
console.log('Name with numbers:', validateName('Juan123')); // Should be invalid

// Phone validation tests
console.log('\n=== PHONE VALIDATION TESTS ===');
console.log('Valid Chilean mobile:', validatePhone('912345678')); // Should be valid
console.log('Valid with country code:', validatePhone('+56912345678')); // Should be valid
console.log('Valid formatted:', validatePhone('+56 9 1234 5678')); // Should be valid
console.log('Invalid (too short):', validatePhone('91234567')); // Should be invalid
console.log('Invalid (wrong start):', validatePhone('812345678')); // Should be invalid
console.log('Empty phone:', validatePhone('')); // Should be invalid

// Phone formatting tests
console.log('\n=== PHONE FORMATTING TESTS ===');
console.log('Format 912345678:', formatPhoneNumber('912345678')); // Should format
console.log('Format +56912345678:', formatPhoneNumber('+56912345678')); // Should format
console.log('Format with spaces:', formatPhoneNumber('9 1234 5678')); // Should format

// Login form validation tests
console.log('\n=== LOGIN FORM VALIDATION TESTS ===');
console.log('Valid login:', validateLoginForm('test@example.com', 'password123'));
console.log('Invalid email:', validateLoginForm('invalid-email', 'password123'));
console.log('Empty password:', validateLoginForm('test@example.com', ''));

// Signup form validation tests
console.log('\n=== SIGNUP FORM VALIDATION TESTS ===');
const validUserData = {
  name: 'Juan',
  lastName: 'Pérez',
  phone: '912345678',
  email: 'juan@example.com',
  password: 'Test123'
};

const invalidUserData = {
  name: 'J', // Too short
  lastName: '', // Empty
  phone: '123', // Invalid
  email: 'invalid', // Invalid
  password: 'weak' // Too weak
};

console.log('Valid signup data:', validateSignupForm(validUserData));
console.log('Invalid signup data:', validateSignupForm(invalidUserData));

// Error message mapping tests
console.log('\n=== ERROR MESSAGE MAPPING TESTS ===');
console.log('Invalid credentials:', getAuthErrorMessage({ code: 'invalid_credentials' }));
console.log('Email already registered:', getAuthErrorMessage({ code: 'email_address_already_registered' }));
console.log('Network error:', getAuthErrorMessage({ message: 'fetch failed' }));
console.log('Unknown error:', getAuthErrorMessage({ code: 'unknown_error' }));

console.log('\n=== ALL TESTS COMPLETED ===');