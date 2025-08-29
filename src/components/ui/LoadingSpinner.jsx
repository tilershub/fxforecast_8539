import React from 'react';

const LoadingSpinner = ({ 
  size = 'md', 
  color = 'primary', 
  text = 'Loading...',
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  }

  const colorClasses = {
    primary: 'text-blue-600',
    secondary: 'text-gray-600',
    success: 'text-green-600',
    error: 'text-red-600',
    warning: 'text-yellow-600'
  }

  return (
    <div className={`flex flex-col items-center justify-center space-y-2 ${className}`}>
      <div
        className={`animate-spin rounded-full border-2 border-gray-300 border-t-transparent ${sizeClasses?.[size]} ${colorClasses?.[color]}`}
        style={{ borderTopColor: 'currentColor' }}
      ></div>
      {text && (
        <p className="text-sm text-gray-600 font-medium">
          {text}
        </p>
      )}
    </div>
  );
}

export default LoadingSpinner