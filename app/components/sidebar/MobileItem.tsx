"use client";

import Link from "next/link";
import clsx from "clsx";

interface MobileItemProps {
  icon: any;
  href: string;
  onClick?: () => void;
  active?: boolean;
}

export function MobileItem({ icon: Icon, href, onClick, active }: MobileItemProps) {

  function handleClick() {
    if (onClick) {
      return onClick();
    }
  }

  return (
    <Link
      onClick={onClick}
      href={href}
      className={clsx(
        `group flex gap-x-3 text-sm leading-6 font-semibold w-full justify-center p-4 text-silvergray-500 hover:text-blueApp-800 hover:bg-silvergray-100`,
        active && "bg-silvergray-100 text-blueApp-800"
      )}
    >
      <Icon className={clsx(`h-6 w-6`, active && "text-blueApp-800")} />
    </Link>
  )
}