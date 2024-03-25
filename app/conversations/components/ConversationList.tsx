"use client";

import clsx from "clsx";

import useConversation from "@/app/hooks/useConversation";

import { FullConversationType } from "@/app/types";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { MdOutlineGroupAdd } from "react-icons/md"
import { ConversationBox } from "./ConversationBox";
import { GroupChatModal } from "./GroupChatModal";
import { User } from "@prisma/client";

interface ConversationListProps {
  initialItems: FullConversationType[];
  users: User[];
}

export function ConversationList({ initialItems, users }: ConversationListProps) {
  const [items, setItems] = useState(initialItems);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();

  const { conversationId, isOpen } = useConversation();

  return (
    <>
      <GroupChatModal
        users={users}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <aside className={clsx(
        `fixed inset-y-0 pb-20 lg:pb-0 lg:left-[89px] lg:w-80 lg:block overflow-y-auto border-r border-silvergray-200`,
        isOpen ? 'hidden' : 'block w-full left-0'
      )}
      >
        <div className="px-5">
          <div className="flex justify-between mb-4 pt-4">
            <div className="text-2xl font-bold text-silvergray-700">
              Messages
            </div>

            <div
              onClick={() => setIsModalOpen(true)}
              className="rounded-full p-2 bg-silvergray-100 text-silvergray-600 hover:opacity-75 transition"
            >
              <MdOutlineGroupAdd size={20} className="hover:text-silvergray-700" />
            </div>
          </div>

          {items.map((item) => (
            <ConversationBox
              key={item.id}
              data={item}
              selected={conversationId === item.id}
            />
          ))}
        </div>
      </aside>
    </>
  )
}