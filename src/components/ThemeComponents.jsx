import React from 'react';

/**
 * StatusBadge Component - Displays status with themed colors
 */
export const StatusBadge = ({ status, children, size = 'sm' }) => {
  const sizeClasses = {
    xs: 'px-2 py-0.5 text-xs',
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  const statusClasses = {
    online: 'theme-success-bg',
    offline: 'theme-error-bg',
    pending: 'theme-warning-bg',
    active: 'theme-success-bg',
    inactive: 'bg-gray-500 text-white',
    busy: 'theme-warning-bg',
    available: 'theme-success-bg',
  };

  const className = `inline-flex items-center font-medium rounded-full ${sizeClasses[size]} ${statusClasses[status] || 'bg-gray-500 text-white'}`;

  return (
    <span className={className}>
      {children}
    </span>
  );
};

/**
 * RoleBadge Component - Displays user roles with themed colors
 */
export const RoleBadge = ({ role, size = 'sm' }) => {
  const sizeClasses = {
    xs: 'px-2 py-0.5 text-xs',
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  const roleClasses = {
    admin: 'bg-primary-500 text-white',
    manager: 'bg-secondary-500 text-white',
    dispatcher: 'bg-success-500 text-white',
    driver: 'bg-warning-500 text-white',
    user: 'bg-gray-500 text-white',
  };

  const roleLabels = {
    admin: 'Admin',
    manager: 'Manager',
    dispatcher: 'Dispatcher',
    driver: 'Driver',
    user: 'User',
  };

  const className = `inline-flex items-center font-medium rounded-md ${sizeClasses[size]} ${roleClasses[role] || roleClasses.user}`;

  return (
    <span className={className}>
      {roleLabels[role] || 'Unknown'}
    </span>
  );
};

/**
 * LoadingSpinner Component - Themed loading indicator
 */
export const LoadingSpinner = ({ size = 'md', color = 'primary' }) => {
  const sizeClasses = {
    xs: 'h-3 w-3',
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
    xl: 'h-12 w-12',
  };

  const colorClasses = {
    primary: 'border-primary-500',
    secondary: 'border-secondary-500',
    success: 'border-success-500',
    warning: 'border-warning-500',
    error: 'border-error-500',
  };

  return (
    <div className={`animate-spin rounded-full border-b-2 ${sizeClasses[size]} ${colorClasses[color]}`}></div>
  );
};

/**
 * Card Component - Themed card wrapper
 */
export const Card = ({ children, className = '', hover = false, ...props }) => {
  const baseClass = `theme-card ${hover ? 'hover:shadow-md transition-shadow' : ''} ${className}`;
  
  return (
    <div className={baseClass} {...props}>
      {children}
    </div>
  );
};

/**
 * CardHeader Component
 */
export const CardHeader = ({ children, className = '', ...props }) => {
  return (
    <div className={`theme-card-header ${className}`} {...props}>
      {children}
    </div>
  );
};

/**
 * CardBody Component
 */
export const CardBody = ({ children, className = '', ...props }) => {
  return (
    <div className={`theme-card-body ${className}`} {...props}>
      {children}
    </div>
  );
};

/**
 * CardFooter Component
 */
export const CardFooter = ({ children, className = '', ...props }) => {
  return (
    <div className={`theme-card-footer ${className}`} {...props}>
      {children}
    </div>
  );
};

/**
 * Button Component - Themed button with variants
 */
export const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  disabled = false, 
  loading = false,
  className = '',
  ...props 
}) => {
  const variantClasses = {
    primary: 'theme-btn-primary',
    secondary: 'theme-btn-secondary',
    outline: 'theme-btn-outline',
    ghost: 'theme-btn-ghost',
    success: 'theme-success-bg',
    warning: 'theme-warning-bg',
    error: 'theme-error-bg',
  };

  const sizeClasses = {
    xs: 'px-2 py-1 text-xs',
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
    xl: 'px-8 py-4 text-lg',
  };

  const baseClass = `theme-btn ${variantClasses[variant]} ${sizeClasses[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`;

  return (
    <button 
      className={baseClass} 
      disabled={disabled || loading}
      {...props}
    >
      {loading && <LoadingSpinner size="sm" color="white" />}
      {loading ? <span className="ml-2">Loading...</span> : children}
    </button>
  );
};

/**
 * Input Component - Themed input field
 */
export const Input = ({ 
  label, 
  error, 
  className = '',
  ...props 
}) => {
  return (
    <div className="space-y-1">
      {label && <label className="theme-label">{label}</label>}
      <input 
        className={`theme-input ${error ? 'border-error-500 focus:border-error-500 focus:ring-error-500' : ''} ${className}`}
        {...props}
      />
      {error && <span className="text-sm theme-error">{error}</span>}
    </div>
  );
};

/**
 * Select Component - Themed select dropdown
 */
export const Select = ({ 
  label, 
  error, 
  children,
  className = '',
  ...props 
}) => {
  return (
    <div className="space-y-1">
      {label && <label className="theme-label">{label}</label>}
      <select 
        className={`theme-input ${error ? 'border-error-500 focus:border-error-500 focus:ring-error-500' : ''} ${className}`}
        {...props}
      >
        {children}
      </select>
      {error && <span className="text-sm theme-error">{error}</span>}
    </div>
  );
};

/**
 * Alert Component - Themed alert messages
 */
export const Alert = ({ 
  children, 
  type = 'info', 
  className = '',
  onClose,
  ...props 
}) => {
  const typeClasses = {
    info: 'bg-primary-50 text-primary-700 border-primary-200',
    success: 'bg-success-50 text-success-700 border-success-200',
    warning: 'bg-warning-50 text-warning-700 border-warning-200',
    error: 'bg-error-50 text-error-700 border-error-200',
  };

  return (
    <div className={`rounded-lg border p-4 ${typeClasses[type]} ${className}`} {...props}>
      <div className="flex items-center justify-between">
        <div>{children}</div>
        {onClose && (
          <button
            onClick={onClose}
            className="ml-4 text-current hover:opacity-75"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
};

/**
 * Avatar Component - User avatar with fallback initials
 */
export const Avatar = ({ 
  src, 
  name, 
  size = 'md',
  className = '',
  ...props 
}) => {
  const sizeClasses = {
    xs: 'h-6 w-6 text-xs',
    sm: 'h-8 w-8 text-sm',
    md: 'h-10 w-10 text-base',
    lg: 'h-12 w-12 text-lg',
    xl: 'h-16 w-16 text-xl',
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const baseClass = `inline-flex items-center justify-center rounded-full bg-primary-500 text-white font-medium ${sizeClasses[size]} ${className}`;

  if (src) {
    return (
      <img 
        src={src} 
        alt={name || 'Avatar'} 
        className={`${baseClass} object-cover`}
        {...props}
      />
    );
  }

  return (
    <div className={baseClass} {...props}>
      {getInitials(name)}
    </div>
  );
};
