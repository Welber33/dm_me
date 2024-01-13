"use client";

import useConversation from "@/app/hooks/useConversation";
import useRoutes from "@/app/hooks/useRoutes";
import { MobileItem } from "./MobileItem";

export function MobileFooter() {
  const routes = useRoutes();
  const { isOpen } = useConversation();

  if (isOpen) {
    return null;
  }

  return (
    <div
      className="fixed justify-between w-full bottom-0 z-40 flex items-center bg-white border-t-[1px] border-t-silvergray-200 lg:hidden"
    >
      {routes.map((route) => (
        <MobileItem
          key={route.label}
          href={route.href}
          active={route.active}
          icon={route.icon}
          onClick={route.onClick}
        />
      ))}
    </div>
  )
}