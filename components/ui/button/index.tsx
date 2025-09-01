'use client';
import React from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';

type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type ButtonAction = 'primary' | 'secondary' | 'positive' | 'negative' | 'default';
type ButtonVariant = 'solid' | 'outline' | 'link';

interface ButtonProps extends React.ComponentProps<typeof Pressable> {
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  action?: ButtonAction;
  children?: React.ReactNode;
}

interface ButtonTextProps extends React.ComponentProps<typeof Text> {
  className?: string;
  children?: React.ReactNode;
}

interface ButtonIconProps extends React.ComponentProps<typeof View> {
  className?: string;
  as?: React.ElementType;
  children?: React.ReactNode;
}

interface ButtonGroupProps extends React.ComponentProps<typeof View> {
  className?: string;
  space?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  isAttached?: boolean;
  flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  children?: React.ReactNode;
}

const getButtonStyles = (variant: ButtonVariant, size: ButtonSize, action: ButtonAction) => {
  const baseStyles = 'flex-row items-center justify-center rounded';
  
  const sizeStyles = {
    xs: 'px-3.5 py-2 h-8',
    sm: 'px-4 py-2 h-9',
    md: 'px-5 py-2.5 h-10',
    lg: 'px-6 py-3 h-11',
    xl: 'px-7 py-3.5 h-12',
  };

  const actionStyles = {
    primary: {
      solid: 'bg-blue-500 active:bg-blue-700',
      outline: 'border border-blue-500 bg-transparent active:bg-blue-50',
      link: 'bg-transparent active:bg-transparent',
    },
    secondary: {
      solid: 'bg-gray-500 active:bg-gray-700',
      outline: 'border border-gray-500 bg-transparent active:bg-gray-50',
      link: 'bg-transparent active:bg-transparent',
    },
    positive: {
      solid: 'bg-green-500 active:bg-green-700',
      outline: 'border border-green-500 bg-transparent active:bg-green-50',
      link: 'bg-transparent active:bg-transparent',
    },
    negative: {
      solid: 'bg-red-500 active:bg-red-700',
      outline: 'border border-red-500 bg-transparent active:bg-red-50',
      link: 'bg-transparent active:bg-transparent',
    },
    default: {
      solid: 'bg-gray-200 active:bg-gray-300',
      outline: 'border border-gray-300 bg-transparent active:bg-gray-50',
      link: 'bg-transparent active:bg-transparent',
    },
  };

  return `${baseStyles} ${sizeStyles[size]} ${actionStyles[action][variant]}`.trim();
};

function Button({ className, variant = 'solid', size = 'md', action = 'primary', children, ...props }: ButtonProps) {
  return (
    <Pressable
      className={`${getButtonStyles(variant, size, action)} ${className || ''}`}
      {...props}
    >
      {children}
    </Pressable>
  );
}

function ButtonText({ className, children, ...props }: ButtonTextProps) {
  return (
    <Text
      className={`font-semibold ${className || ''}`}
      {...props}
    >
      {children}
    </Text>
  );
}

const ButtonSpinner = ActivityIndicator;

function ButtonIcon({ className, as: Component = View, children, ...props }: ButtonIconProps) {
  return (
    <Component
      className={`items-center justify-center ${className || ''}`}
      {...props}
    >
      {children}
    </Component>
  );
}

function ButtonGroup({ 
  className, 
  space = 'md', 
  isAttached = false, 
  flexDirection = 'column', 
  children, 
  ...props 
}: ButtonGroupProps) {
  const spaceStyles = {
    xs: 'gap-1',
    sm: 'gap-2',
    md: 'gap-3',
    lg: 'gap-4',
    xl: 'gap-5',
    '2xl': 'gap-6',
    '3xl': 'gap-7',
    '4xl': 'gap-8',
  };

  const directionStyles = {
    row: 'flex-row',
    column: 'flex-col',
    'row-reverse': 'flex-row-reverse',
    'column-reverse': 'flex-col-reverse',
  };

  const styles = `${directionStyles[flexDirection]} ${!isAttached ? spaceStyles[space] : ''} ${className || ''}`.trim();

  return (
    <View
      className={styles}
      {...props}
    >
      {children}
    </View>
  );
}

Button.displayName = 'Button';
ButtonText.displayName = 'ButtonText';
ButtonSpinner.displayName = 'ButtonSpinner';
ButtonIcon.displayName = 'ButtonIcon';
ButtonGroup.displayName = 'ButtonGroup';

export { Button, ButtonGroup, ButtonIcon, ButtonSpinner, ButtonText };
