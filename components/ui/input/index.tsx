'use client';
import React from 'react';
import { Pressable, TextInput, View } from 'react-native';

type InputSize = 'sm' | 'md' | 'lg' | 'xl';
type InputVariant = 'outline' | 'underlined' | 'rounded';

interface InputProps extends React.ComponentProps<typeof View> {
  className?: string;
  variant?: InputVariant;
  size?: InputSize;
  children?: React.ReactNode;
}

interface InputFieldProps extends React.ComponentProps<typeof TextInput> {
  className?: string;
}

interface InputIconProps extends React.ComponentProps<typeof View> {
  className?: string;
  as?: React.ElementType;
  children?: React.ReactNode;
}

interface InputSlotProps extends React.ComponentProps<typeof Pressable> {
  className?: string;
  children?: React.ReactNode;
}

const getInputStyles = (variant: InputVariant, size: InputSize) => {
  const baseStyles = 'flex-row items-center overflow-hidden border-gray-300 focus:border-blue-500';
  
  const sizeStyles = {
    sm: 'h-9',
    md: 'h-10',
    lg: 'h-11',
    xl: 'h-12',
  };

  const variantStyles = {
    outline: 'rounded border',
    underlined: 'rounded-none border-b',
    rounded: 'rounded-full border',
  };

  return `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]}`.trim();
};

function Input({ className, variant = 'outline', size = 'md', children, ...props }: InputProps) {
  return (
    <View
      className={`${getInputStyles(variant, size)} ${className || ''}`}
      {...props}
    >
      {children}
    </View>
  );
}

function InputField({ className, ...props }: InputFieldProps) {
  return (
    <TextInput
      className={`flex-1 text-gray-900 py-0 px-3 text-base placeholder:text-gray-500 h-full ${className || ''}`}
      {...props}
    />
  );
}

function InputIcon({ className, as: Component = View, children, ...props }: InputIconProps) {
  return (
    <Component
      className={`justify-center items-center text-gray-400 ${className || ''}`}
      {...props}
    >
      {children}
    </Component>
  );
}

function InputSlot({ className, children, ...props }: InputSlotProps) {
  return (
    <Pressable
      className={`justify-center items-center ${className || ''}`}
      {...props}
    >
      {children}
    </Pressable>
  );
}

Input.displayName = 'Input';
InputIcon.displayName = 'InputIcon';
InputSlot.displayName = 'InputSlot';
InputField.displayName = 'InputField';

export { Input, InputField, InputIcon, InputSlot };
