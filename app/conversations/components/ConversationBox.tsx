"use client";

import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Conversation, Message, User } from "@prisma/client";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import clsx from "clsx";
import { FullConversationType } from "@/app/types";
import useOtherUser from "@/app/hooks/useOtherUser";
import { Avatar } from "@/app/components/Avatar";
import { AvatarGroup } from "@/app/components/AvatarGroup";

interface ConversationBoxProps {
  data: FullConversationType,
  selected?: boolean;
}

export function ConversationBox({ data, selected }: ConversationBoxProps) {
  const otherUser = useOtherUser(data);
  const session = useSession();
  const router = useRouter();

  const handleClick = useCallback(() => {
    router.push(`/conversations/${data.id}`)
  }, [router, data.id]);

  const lastMessage = useMemo(() => {
    const messages = data.messages || [];

    return messages[messages.length - 1];
  }, [data.messages]);

  const userEmail = useMemo(() => {
    return session.data?.user?.email;
  }, [session.data?.user?.email]);

  const hasSeen = useMemo(() => {
    if (!lastMessage) {
      return false;
    }

    const seenArray = lastMessage.seen || [];

    if (!userEmail) {
      return false;
    }

    return seenArray.filter(user => user.email === userEmail).length !== 0;
  }, [lastMessage, userEmail]);

  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) {
      return "Image Sent";
    }

    if (lastMessage?.body) {
      return lastMessage.body;
    }

    return "Just started a conversation";
  }, [lastMessage]);

  return (
    <div
      onClick={handleClick}
      className={clsx(`
        w-full relative flex items-center space-x-3 hover:bg-silvergray-100 rounded-lg transition cursor-pointer p-3
      `,
        selected ? 'bg-silvergray-100' : 'bg-white'
      )}
    >

      {data.isGroup ? (
        <AvatarGroup users={data.users} />
      ) : (
        <Avatar user={otherUser} />
      )}

      <div className="min-2-0 flex-1">
        <div className="focus:outline-none">
          <div
            className="flex justify-between items-center mb-1"
          >
            <p className="text-md font-medium text-silvergray-700">
              {data.name || otherUser.name}
            </p>

            {lastMessage?.createdAt && (
              <p className="text-xs text-silvergray-400 font-light">
                {format(new Date(lastMessage.createdAt), 'p')}
              </p>
            )}
          </div>

          <p className={clsx(`
            truncate text-sm
          `,
            hasSeen ? 'text-silvergray-500' : 'text-blueApp-800'
          )}
          >
            {lastMessageText}
          </p>
        </div>
      </div>
    </div>
  )
}