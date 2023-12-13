import { IconType } from "react-icons";

import clsx from "clsx";
import { Variant } from "./AuthForm";

type VariantAuthSocial = Variant & {}

export interface AuthSocialButtonProps {
  icon: IconType;
  buttonInfoSignIn?: 'github' | 'google';
  onClick: () => void;
  disabled: boolean; 
}

export function AuthSocialButton({ icon: Icon, buttonInfoSignIn,  onClick, disabled }: AuthSocialButtonProps) {  
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(`
        inline-flex 
        gap-3
        w-full 
        justify-center 
        rounded-md 
        bg-white 
        px-4 
        py-2 
        transition 
        duration-400
        text-silvergray-500 
        shadow-sm 
        ring-1 
        ring-inset 
        ring-silvergray-500 
        hover:border-1
        hover:text-white
        hover:bg-silvergray-700
        ${disabled ? 'opacity-50 cursor-default': ' hover:ring-silvergray-700'}
        focus:outline-offset-0
      `,
      buttonInfoSignIn && "text-[15px]",
      )}
    >
      <Icon size={22} />
      {buttonInfoSignIn === 'google' ? 'Continue with Google' : 'Continue with Github'}
    </button>
  )
}