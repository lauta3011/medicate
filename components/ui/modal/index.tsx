'use client';
import React from 'react';
import { Pressable, ScrollView, View } from 'react-native';

type ModalSize = 'xs' | 'sm' | 'md' | 'lg' | 'full';

interface ModalProps extends React.ComponentProps<typeof View> {
  className?: string;
  size?: ModalSize;
  isOpen?: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
}

interface ModalBackdropProps extends React.ComponentProps<typeof Pressable> {
  className?: string;
  onPress?: () => void;
}

interface ModalContentProps extends React.ComponentProps<typeof View> {
  className?: string;
  size?: ModalSize;
  children?: React.ReactNode;
}

interface ModalHeaderProps extends React.ComponentProps<typeof View> {
  className?: string;
  children?: React.ReactNode;
}

interface ModalBodyProps extends React.ComponentProps<typeof ScrollView> {
  className?: string;
  children?: React.ReactNode;
}

interface ModalFooterProps extends React.ComponentProps<typeof View> {
  className?: string;
  children?: React.ReactNode;
}

interface ModalCloseButtonProps extends React.ComponentProps<typeof Pressable> {
  className?: string;
  children?: React.ReactNode;
}

const getModalContentStyles = (size: ModalSize) => {
  const baseStyles = 'bg-white rounded-lg overflow-hidden border border-gray-200 shadow-lg p-3';
  
  const sizeStyles = {
    xs: 'w-[60%] max-w-[360px]',
    sm: 'w-[70%] max-w-[420px]',
    md: 'w-[80%] max-w-[520px]',
    lg: 'w-[90%] max-w-[720px] h-[60%]',
    full: 'w-full h-full max-w-none rounded-none',
  };

  return `${baseStyles} ${sizeStyles[size]}`.trim();
};

function Modal({ className, size = 'md', isOpen, children, ...props }: ModalProps) {
  if (!isOpen) return null;

  return (
    <View
      className={`absolute inset-0 w-full h-full justify-center items-center z-50 ${className || ''}`}
      {...props}
    >
      {children}
    </View>
  );
}

function ModalBackdrop({ className, onPress, ...props }: ModalBackdropProps) {
  return (
    <Pressable
      className={`absolute inset-0 h-full bg-black/50 w-full ${className || ''}`}
      onPress={onPress}
      {...props}
    />
  );
}

function ModalContent({ className, size = 'md', children, ...props }: ModalContentProps) {
  return (
    <View
      className={`${getModalContentStyles(size)} ${className || ''}`}
      {...props}
    >
      {children}
    </View>
  );
}

function ModalHeader({ className, children, ...props }: ModalHeaderProps) {
  return (
    <View
      className={`pb-4 border-b border-gray-200 ${className || ''}`}
      {...props}
    >
      {children}
    </View>
  );
}

function ModalBody({ className, children, ...props }: ModalBodyProps) {
  return (
    <ScrollView
      className={`py-4 flex-1 ${className || ''}`}
      {...props}
    >
      {children}
    </ScrollView>
  );
}

function ModalFooter({ className, children, ...props }: ModalFooterProps) {
  return (
    <View
      className={`pt-4 border-t border-gray-200 flex-row justify-end gap-3 ${className || ''}`}
      {...props}
    >
      {children}
    </View>
  );
}

function ModalCloseButton({ className, children, ...props }: ModalCloseButtonProps) {
  return (
    <Pressable
      className={`absolute top-4 right-4 w-8 h-8 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 ${className || ''}`}
      {...props}
    >
      {children}
    </Pressable>
  );
}

Modal.displayName = 'Modal';
ModalBackdrop.displayName = 'ModalBackdrop';
ModalContent.displayName = 'ModalContent';
ModalHeader.displayName = 'ModalHeader';
ModalBody.displayName = 'ModalBody';
ModalFooter.displayName = 'ModalFooter';
ModalCloseButton.displayName = 'ModalCloseButton';

export { Modal, ModalBackdrop, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader };
