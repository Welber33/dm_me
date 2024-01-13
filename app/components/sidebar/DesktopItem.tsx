"use client";

import clsx from "clsx";
import Link from "next/link";

interface DesktopItemProps {
  label: string;
  icon: any;
  href: string;
  onClick?: () => void;
  active?: boolean;
}

export function DesktopItem({ label, icon: Icon, href, onClick, active }: DesktopItemProps) {
  function handleClick() {
    if (onClick) {
      return onClick();
    }
  }

  return (
    <li
      onClick={handleClick}
    >
      <Link
        href={href}
        className={clsx(
          `group flex gap-x-3 rounded-md p-3 text-base leading-6 font-semibold text-silvergray-500 hover:text-blueApp-800 hover:bg-silvergray-100`,
          active && 'bg-silvergray-100 text-blueApp-800'
        )}
      >
        <Icon className={clsx(`
          h-[28px] w-[28px] shrink-0
        `,
          active && "text-blueApp-800"
        )}
        />
        <span className="sr-only">
          {label}
        </span>
      </Link>
    </li>
  )
}