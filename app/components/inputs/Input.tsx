"use client";

import clsx from "clsx";
import { ReactNode } from "react";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  label: string;
  id: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  endAdornment?: ReactNode;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  disabled?: boolean
}

export function Input({ label, id, type, placeholder, required, endAdornment, register, errors, disabled }: InputProps) {
  return (
    <div
      className=""
    >
      <label 
      htmlFor={id}
      className="block text-sm font-medium leading-6 text-silvergray-700"
      >
        {label}
      </label>
      <div className="mt-2">
        <input 
          id={id}
          type={type}
          placeholder={placeholder}
          autoComplete={id}
          disabled={disabled}
          {...register(id, { required })}
          className={clsx(`
            form-input
            block
            w-full
            rounded-md
            border-0
            py-2
            text-silvergray-700
            shadow-sm
            ring-1
            ring-inset
            ring-silvergray-300
            placeholder:text-silvergray-400
            focus:ring-2
            focus:ring-inset
            focus:ring-blueApp-700
            sm:text-sm
            sm:leading-6
          `, 
            errors[id] && "focus:ring-rose-500",
            disabled && "opacity-50 cursor-default"
          )}
        />
        {endAdornment && (
          <div className="absolute inset-y-[52px] right-0 pr-3 flex items-center text-silvergray-500 cursor-pointer">
            {endAdornment}
          </div>
        )}
      </div>
    </div>
  )
}