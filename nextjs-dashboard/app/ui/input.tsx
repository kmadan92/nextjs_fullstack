'use client';
import clsx from 'clsx';
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  labelClassname?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, labelClassname, id, className, ...rest }, ref) => {
    const inputId = id || React.useId();

    return (
      <div className="flex flex-col space-y-1">
        {label && (
          <label
            htmlFor={inputId}
            className={clsx('text-sm font-medium text-gray-700', labelClassname)}
          >
            {label}
          </label>
        )}
        <input
          id={inputId}
          ref={ref}
          {...rest}
          className={clsx(
            'h-10 w-full rounded-lg border border-gray-300 px-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
        />
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;
