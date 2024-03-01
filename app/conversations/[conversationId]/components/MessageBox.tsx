"use client";

import { Avatar } from "@/app/components/Avatar";
import { FullMessageType } from "@/app/types";
import clsx from "clsx";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import Image from "next/image";

interface MessageBoxProps {
  data: FullMessageType;
  isLast?: boolean
}

export function MessageBox({ data, isLast }: MessageBoxProps) {
  const session = useSession();

  const isOwnMessage = session?.data?.user?.email === data?.sender?.email;

  /* Getting the list of users that have seen the message in a group without 
     displaying the user who has sent the message 
  */
  const seenList = (data.seen || [])
    .filter((user) => user.email !== data?.sender?.email)
    .map((user) => user.name)
    .join(', ');

  const container = clsx(
    "flex gap-3 p-4",
    isOwnMessage && "justify-end"
  );

  const avatar = clsx(isOwnMessage && "order-2");

  const body = clsx(
    "flex flex-col gap-2",
    isOwnMessage && "items-end"
  );

  const message = clsx(
    "text-sm w-fit overflow-hidden",
    isOwnMessage ? "bg-blueApp-600 text-white" : "bg-silvergray-300",
    data.image ? "rounded-lg p-0" : "rounded-lg py-2 px-3"
  );

  return (
    <div className={container}>
      <div className={avatar}>
        <Avatar
          user={data.sender}
        />
      </div>

      <div className={body}>
        <div className="flex items-center gap-1">
          <div className="text-sm text-silvergray-600">
            {data.sender.name}
          </div>

          <div className="text-xs text-silvergray-400">
            {format(new Date(data.createdAt), 'p')}
          </div>
        </div>

        <div className={message}>
          {data.image ? (
            <Image
              src={data.image}
              alt="Image"
              height="288"
              width="288"
              className="object-cover cursor-pointer border-2 border-blueApp-600 rounded-lg hover:scale-110 transition translate"
            />
          ) : (
            <div>
              {data.body}
            </div>
          )}
        </div>

        {isLast && isOwnMessage && seenList.length > 0 && (
          <div className="text-xs font-light text-silvergray-600">
            {`seen by ${seenList}`}
          </div>
        )}
      </div>
    </div>
  )
}