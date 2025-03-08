
import React from 'react';
import { cn } from "@/lib/utils";

interface AnimatedLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const AnimatedLogo: React.FC<AnimatedLogoProps> = ({ 
  className,
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  return (
    <div className={cn('relative', sizeClasses[size], className)}>
      {/* Circular base with rotation */}
      <div className="absolute inset-0 rounded-full bg-leaf-100 dark:bg-leaf-900 animate-pulse-gentle"></div>
      
      {/* Leaf symbol */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-2/3 h-2/3 text-leaf-600 dark:text-leaf-400 animate-float"
        >
          <path
            d="M21 5C21 16.5 14.5 19 9.5 19C5.5 19 2 17.5 2 12C2 8.5 5 3 13.5 3C17.5 3 21 4.5 21 5Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9.5 19C9.5 19 5 13 9.5 8"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      
      {/* Pulsing dot */}
      <div className="absolute bottom-0 right-0 w-3 h-3 bg-sky-500 rounded-full animate-pulse-gentle"></div>
    </div>
  );
};

export default AnimatedLogo;
