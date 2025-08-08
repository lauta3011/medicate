import { View, ViewProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface SafeAreaWrapperProps extends ViewProps {
  children: React.ReactNode;
  includeBottom?: boolean;
  includeTop?: boolean;
}

export default function SafeAreaWrapper({ 
  children, 
  includeBottom = true, 
  includeTop = true,
  style,
  ...props 
}: SafeAreaWrapperProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        {
          paddingTop: includeTop ? insets.top : 0,
          paddingBottom: includeBottom ? insets.bottom : 0,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
} 