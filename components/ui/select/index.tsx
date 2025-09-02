'use client';
import React, { useEffect, useState } from 'react';
import { FlatList, Modal, Pressable, ScrollView, Text, View } from 'react-native';

type SelectSize = 'sm' | 'md' | 'lg' | 'xl';
type SelectVariant = 'outline' | 'underlined' | 'rounded';

interface SelectProps extends React.ComponentProps<typeof View> {
  value?: string;
  onValueChange?: (value: string) => void;
  defaultValue?: string;
  initialLabel?: string;
  selectedValue?: string;
  placeholder: string;
  closeOnOverlayClick?: boolean;
  children?: React.ReactNode;
}

interface SelectTriggerProps extends React.ComponentProps<typeof Pressable> {
  variant?: SelectVariant;
  size?: SelectSize;
  children?: React.ReactNode;
}

interface SelectInputProps {}

interface SelectIconProps extends React.ComponentProps<typeof View> {
  as?: React.ElementType;
  children?: React.ReactNode;
}

interface SelectItemProps extends React.ComponentProps<typeof Pressable> {
  label?: string;
  value?: string;
  children?: React.ReactNode;
}

interface SelectPortalProps extends React.ComponentProps<typeof Modal> {
  children?: React.ReactNode;
}

interface SelectBackdropProps extends React.ComponentProps<typeof Pressable> {}

interface SelectContentProps extends React.ComponentProps<typeof View> {
  children?: React.ReactNode;
}

interface SelectContextType {
  isOpen: boolean;
  placeholder: string;
  setIsOpen: (isOpen: boolean) => void;
  selectedValue: string;
  selectedLabel: string;
  onValueChange?: (value: string, label?: string) => void;
}

const SelectContext = React.createContext<SelectContextType | null>(null);

// Custom hook to safely access SelectContext
const useSelectContext = () => {
  const context = React.useContext(SelectContext);
  if (!context) {
    throw new Error('useSelectContext must be used within a Select component');
  }
  return context;
};

const getSelectTriggerStyles = (variant: SelectVariant, size: SelectSize): string => {
  const baseStyles = 'flex-row items-center border bg-transparent';
  
  const sizeStyles = {
    sm: 'h-8 px-2 text-sm',
    md: 'h-10 px-3 text-base',
    lg: 'h-12 px-4 text-lg',
    xl: 'h-16 px-5 text-3xl',
  };

  const variantStyles = {
    outline: 'border-slate-200 rounded-md',
    underlined: 'rounded-none border-b border-slate-200 border-t-0 border-l-0 border-r-0',
    rounded: 'rounded-full border-slate-200',
  };

  return `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]}`.trim();
};

function Select({ 
  value, 
  onValueChange, 
  defaultValue, 
  selectedValue, 
  initialLabel,
  placeholder,
  children, 
  ...props 
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentValue, setCurrentValue] = useState(selectedValue || defaultValue || '');
  const [currentLabel, setCurrentLabel] = useState(initialLabel || selectedValue || defaultValue || '');

  const handleValueChange = (newValue: string, newLabel?: string) => {
    setCurrentValue(newValue);
    setCurrentLabel(newLabel || newValue);
    onValueChange?.(newValue);
    setIsOpen(false);
  };

  // Update internal state when external selectedValue changes
  useEffect(() => {
    if (selectedValue !== undefined) {
      setCurrentValue(selectedValue);
      setCurrentLabel(selectedValue);
    }
  }, [selectedValue]);

  return (
    <SelectContext.Provider value={{ 
      isOpen, 
      setIsOpen,
      selectedValue: currentValue,
      selectedLabel: currentLabel,
      placeholder,
      onValueChange: handleValueChange 
    }}>
      <View className="w-full" {...props}>
        {children}
      </View>
    </SelectContext.Provider>
  );
}

function SelectTrigger({ 
  variant = 'outline', 
  size = 'md', 
  children, 
  ...props 
}: SelectTriggerProps) {
  const { setIsOpen } = useSelectContext();

  const handlePress = () => {
    try {
      if (setIsOpen && typeof setIsOpen === 'function') {
        setIsOpen(true);
      }
    } catch (error) {
      console.warn('Error in SelectTrigger handlePress:', error);
    }
  };

  return (
    <Pressable
      className={`${getSelectTriggerStyles(variant, size)} justify-between px-3`}
      onPress={handlePress}
      {...props}
    >
      {children}
    </Pressable>
  );
}

function SelectInput() {
  const { selectedLabel, placeholder } = useSelectContext();

  return (
    <View className="flex-1 h-full">
      <Text className='text-slate-50 text-2xl mt-3 font-light'>
        {String(selectedLabel || placeholder)}
      </Text>
    </View>
  );
}

function SelectIcon({ as: IconComponent, children, ...props }: SelectIconProps) {
  if (IconComponent) {
    return (
      <View className="justify-center items-center" {...props}>
        <IconComponent color="#f1f5f9" size={24} />
      </View>
    );
  }

  return (
    <View className="justify-center items-center" {...props}>
      {children}
    </View>
  );
}

function SelectPortal({ children, ...props }: SelectPortalProps) {
  const { isOpen, setIsOpen } = useSelectContext();

  return (
    <Modal
      visible={isOpen}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setIsOpen(false)}
      {...props}
    >
      <View className="flex-1 justify-end bg-black/50">
        {children}
      </View>
    </Modal>
  );
}

function SelectBackdrop({ ...props }: SelectBackdropProps) {
  const { setIsOpen } = useSelectContext();

  return (
    <Pressable
      className="absolute inset-0"
      onPress={() => setIsOpen(false)}
      {...props}
    />
  );
}

function SelectContent({ children, ...props }: SelectContentProps) {
  return (
    <ScrollView
      className="bg-white rounded-t-2xl max-h-80"
      {...props}
    >
      {children}
    </ScrollView>
  );
}

function SelectItem({ label, value, children, ...props }: SelectItemProps) {
  const { onValueChange } = useSelectContext();

  const handlePress = () => {
    try {
      const itemValue = value || label || '';
      const itemLabel = label || value || '';
      if (onValueChange && typeof onValueChange === 'function') {
        onValueChange(itemValue, itemLabel);
      }
    } catch (error) {
      console.warn('Error in SelectItem handlePress:', error);
    }
  };

  return (
    <Pressable
      className="py-4 px-4 border-b border-gray-100 active:bg-gray-50"
      onPress={handlePress}
      {...props}
    >
      <Text className="text-gray-900 text-xl font-light">
        {String(children || label || value || '')}
      </Text>
    </Pressable>
  );
}

// Placeholder components for compatibility
function SelectDragIndicator() {
  return <View className="w-12 h-1 bg-gray-300 rounded-full mx-auto my-2" />;
}

function SelectDragIndicatorWrapper({ children }: { children?: React.ReactNode }) {
  return (
    <View className="py-2">
      {children}
    </View>
  );
}

const SelectScrollView = ScrollView;
const SelectFlatList = FlatList;

// Export components
export {
  Select, SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper, SelectFlatList, SelectIcon, SelectInput, SelectItem,
  SelectPortal, SelectScrollView, SelectTrigger
};
