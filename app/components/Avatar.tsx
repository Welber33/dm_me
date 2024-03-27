"use client";

import { User } from "@prisma/client";
import Image from "next/image";
import useActiveList from "../hooks/useActiveList";

interface AvatarProps {
  user: User;
}

export function Avatar({ user }: AvatarProps) {
  const { members } = useActiveList();
  const isActive = members.indexOf(user?.email!) !== -1;

  return (
    <div className="relative">
      <div className="relative inline-block rounded-full overflow-hidden h-9 w-9 md:h-11 md:w-11">
        <Image
          alt="Avatar"
          src={user?.image || "/images/placeholder.jpg"}
          fill
        />
      </div>

      {isActive && (
        <span className="absolute block rounded-full bg-greenActive-500 ring-2 ring-white top-0 right-0 h-2 w-2 mg:h-3 md:w-3 lg:h-3 lg:w-3" />
      )}

    </div>
  )
}