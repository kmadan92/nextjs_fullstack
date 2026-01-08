'use client';
import React from 'react';
import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button label or inner content */
  children: React.ReactNode;
  /** Visual variant of the button */
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
}

/**
 * A reusable, accessible, theme-friendly Button component.
 * - Includes Tailwind defaults
 * - Fully overridable via `className`
 * - Supports variants and sizes
 * - Works with React Hook Form / refs
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant = 'primary',
      size = 'md',
      disabled,
      ...rest
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        {...rest}
        className={clsx(
          // Base styles
          'inline-flex items-center justify-center font-medium rounded-lg transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50',

          // Size variants
          {
            'h-8 px-3 text-sm': size === 'sm',
            'h-10 px-4 text-sm': size === 'md',
            'h-12 px-6 text-base': size === 'lg',
          },

          // Variant styles
          {
            'bg-blue-600 text-white hover:bg-blue-500 active:bg-blue-700 focus-visible:outline-blue-600':
              variant === 'primary',
            'bg-gray-200 text-gray-800 hover:bg-gray-300 active:bg-gray-400 focus-visible:outline-gray-300':
              variant === 'secondary',
            'bg-red-600 text-white hover:bg-red-500 active:bg-red-700 focus-visible:outline-red-600':
              variant === 'danger',
            'bg-transparent text-gray-700 hover:bg-gray-100 active:bg-gray-200 focus-visible:outline-gray-200':
              variant === 'ghost',
          },

          // User overrides (always last)
          className
        )}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
export default Button;
