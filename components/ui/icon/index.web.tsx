'use client';
import React from 'react';
import { View } from 'react-native';

interface IconProps extends React.ComponentProps<typeof View> {
  className?: string;
  as?: React.ElementType;
  size?: number | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  children?: React.ReactNode;
}

const Icon = React.forwardRef<React.ComponentRef<typeof View>, IconProps>(
  function Icon({ className, as: Component = View, size = 'md', children, style, ...props }, ref) {
    const sizeStyle = typeof size === 'number' ? { width: size, height: size } : {};
    
    const sizeClass = typeof size === 'string' ? {
      xs: 'w-3 h-3',
      sm: 'w-4 h-4', 
      md: 'w-5 h-5',
      lg: 'w-6 h-6',
      xl: 'w-8 h-8',
    }[size] || 'w-5 h-5' : '';

    if (Component === View) {
      return (
        <View
          ref={ref}
          className={`items-center justify-center ${sizeClass} ${className || ''}`}
          style={[sizeStyle, style]}
          {...props}
        >
          {children}
        </View>
      );
    }

    return (
      <Component
        ref={ref}
        className={`items-center justify-center ${sizeClass} ${className || ''}`}
        style={[sizeStyle, style]}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Icon.displayName = 'Icon';

export { Icon };

// Export common icons from lucide-react-native for convenience
    export {
        Check as CheckIcon, ChevronDown as ChevronDownIcon, ChevronLeft as ChevronLeftIcon,
        ChevronRight as ChevronRightIcon, ChevronUp as ChevronUpIcon, X as CloseIcon, Eye as EyeIcon,
        EyeOff as EyeOffIcon, Home as HomeIcon, Menu as MenuIcon, Minus as MinusIcon, Plus as PlusIcon, Search as SearchIcon, Settings as SettingsIcon, User as UserIcon
    } from 'lucide-react-native';
