export const cardStyle = (props: any) => {
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

  const size = props.size || 'md';
  const variant = props.variant || 'elevated';
  const className = props.class || '';

  return `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`.trim();
};