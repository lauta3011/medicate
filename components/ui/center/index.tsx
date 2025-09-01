import React from 'react';
import { View } from 'react-native';

interface CenterProps extends React.ComponentProps<typeof View> {
  className?: string;
  children?: React.ReactNode;
}

function Center({ className, children, ...props }: CenterProps) {
  return (
    <View
      className={`items-center justify-center ${className || ''}`}
      {...props}
    >
      {children}
    </View>
  );
}

Center.displayName = 'Center';

export { Center };
