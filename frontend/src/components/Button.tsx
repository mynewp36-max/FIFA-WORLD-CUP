import React, { memo } from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = memo(({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className = '', 
  isLoading = false,
  ...props 
}) => {
  const baseStyle = "inline-flex items-center justify-center font-medium transition-all duration-200 rounded-premium focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base disabled:opacity-50 disabled:pointer-events-none active:scale-95 select-none";
  
  const variants = {
    primary: "bg-brand-primary text-text-main hover:bg-blue-600 shadow-glow focus-visible:ring-brand-primary",
    secondary: "bg-bg-elevated text-text-main border border-border-subtle hover:bg-gray-700 hover:border-gray-500 focus-visible:ring-gray-500",
    ghost: "text-text-muted hover:text-text-main hover:bg-bg-elevated focus-visible:ring-gray-500",
    danger: "bg-error text-text-main hover:bg-red-600 focus-visible:ring-error shadow-[0_0_15px_rgba(239,68,68,0.5)]"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg"
  };

  return (
    <button 
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`} 
      disabled={isLoading || props.disabled}
      aria-busy={isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading...
        </span>
      ) : children}
    </button>
  );
});

Button.displayName = 'Button';
