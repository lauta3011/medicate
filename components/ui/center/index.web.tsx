import React from 'react';
import { View } from 'react-native';

interface CenterProps extends React.ComponentProps<typeof View> {
  className?: string;
  children?: React.ReactNode;
}

const Center = React.forwardRef<React.ComponentRef<typeof View>, CenterProps>(
  function Center({ className, children, ...props }, ref) {
    return (
      <View
        ref={ref}
        className={`items-center justify-center ${className || ''}`}
        {...props}
      >
        {children}
      </View>
    );
  }
);

Center.displayName = 'Center';

export { Center };
