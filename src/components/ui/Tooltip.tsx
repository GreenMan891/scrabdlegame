import React, { ReactNode } from 'react';

interface TooltipProps {
  children: ReactNode; // The element that triggers the tooltip (e.g., a <span>)
  text: string;        // The text to show inside the tooltip
}

export default function Tooltip({ children, text }: TooltipProps) {
  return (
    // This is the main container. `group` is the key Tailwind class.
    <div className="relative inline-block group">
      {children}
      {/* The tooltip popup itself */}
      <div className="
        absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-xs
        bg-gray-900 text-white text-sm rounded-md px-3 py-2
        opacity-0 group-hover:opacity-100 transition-opacity duration-300
        pointer-events-none
      ">
        {text}
        {/* The little arrow pointing down */}
        <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0
          border-x-8 border-x-transparent
          border-t-8 border-t-gray-900
        "></div>
      </div>
    </div>
  );
}