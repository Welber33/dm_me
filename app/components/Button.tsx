"use client";

import clsx from "clsx";

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset' | undefined;
  fullWidth?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  secondary?: boolean;
  danger?: boolean;
  disabled?: boolean  
}

export function Button({ 
  type, 
  fullWidth, 
  children, 
  onClick, 
  secondary, 
  danger, 
  disabled 
}: ButtonProps){
  return(
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={clsx(`
        flex justify-center rounded-md px-3 py-2 text- font-semibold focus-visible:outline
        focus-visible:outline-2 focus-visible:outline-offset-2
      `,
        disabled && "opacity-50 cursor-default",
        fullWidth && "w-full",
        secondary ? "text-silvergray-700" : "text-white",
        danger && "bg-danger hover:bg-warning focus-visible:outline-rose-600",
        !secondary && !danger && "transition duration-400 bg-blueApp-700 hover:bg-blueApp-800 focus-visible:outline-blueApp-800"
      )}
    >
      {children}
    </button>
  )
}