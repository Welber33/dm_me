"use Client"

import ReactSelect from "react-select";

interface SelectProps {
  disabled?: boolean;
  label: string;
  options: Record<string, any>[];
  value?: Record<string, any>;
  onChange: (value: Record<string, any>) => void;
}

export function Select({ disabled, label, options, value, onChange }: SelectProps) {
  return (
    <div className="z-[100]">
      <label className="block text-sm font-medium leading-6 text-silvergray-700">
        {label}
      </label>

      <div className="mt-2">
        <ReactSelect
          isDisabled={disabled}
          value={value}
          onChange={onChange}
          isMulti
          options={options}
          menuPortalTarget={document.body}
          styles={{
            menuPortal: (base) => ({
              ...base,
              zIndex: 9999,
            })
          }}
          classNames={{
            control: () => "text-sm"
          }}
        />
      </div>
    </div>
  )
}
