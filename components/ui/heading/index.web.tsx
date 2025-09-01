import React from 'react';
import { Text } from 'react-native';

type HeadingSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl';

interface HeadingProps extends React.ComponentProps<typeof Text> {
  className?: string;
  size?: HeadingSize;
  children?: React.ReactNode;
}

const Heading = React.forwardRef<React.ComponentRef<typeof Text>, HeadingProps>(
  function Heading({ className, size = 'lg', children, ...props }, ref) {
    const sizeStyles = {
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
      '2xl': 'text-2xl',
      '3xl': 'text-3xl',
      '4xl': 'text-4xl',
      '5xl': 'text-5xl',
      '6xl': 'text-6xl',
    };

    const baseStyles = 'font-bold text-gray-900';
    const sizeClass = sizeStyles[size];

    return (
      <Text
        ref={ref}
        className={`${baseStyles} ${sizeClass} ${className || ''}`}
        {...props}
      >
        {children}
      </Text>
    );
  }
);

Heading.displayName = 'Heading';

export { Heading };
