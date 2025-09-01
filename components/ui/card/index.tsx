import React from 'react';
import { View, ViewProps } from 'react-native';

type CardSize = 'sm' | 'md' | 'lg';
type CardVariant = 'elevated' | 'outline' | 'ghost' | 'filled';

interface CardProps extends ViewProps {
  className?: string;
  size?: CardSize;
  variant?: CardVariant;
  children?: React.ReactNode;
}

const getCardStyles = (size: CardSize, variant: CardVariant) => {
  const baseStyles = 'rounded-lg';
  
  const sizeStyles = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  };

  const variantStyles = {
    elevated: 'bg-white shadow-md shadow-black/10',
    outline: 'bg-white border border-gray-200',
    ghost: 'bg-transparent',
    filled: 'bg-gray-50',
  };

  return `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]}`.trim();
};

function Card({ className, size = 'md', variant = 'elevated', children, ...props }: CardProps) {
  return (
    <View
      className={`${getCardStyles(size, variant)} ${className || ''}`}
      {...props}
    >
      {children}
    </View>
  );
}

Card.displayName = 'Card';

export { Card };
