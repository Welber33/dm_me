import Image from "next/image";

export function EmptyState() {
  return (
    <div className="px-4 py-10 sm:px-6 lg:px-8 h-full flex justify-center items-center bg-silvergray-100">
      <div className="text-center items-center flex flex-col">
        <div className="h-28 w-28 mb-4">
          <Image
            alt="Logo"
            height="50"
            width="50"
            className="mx-auto w-auto"
            src="/images/message-square.svg"
          />
        </div>
        <h5 className="mt-2 text-xl font-medium text-silvergray-500">
          Select a chat from your contacts
        </h5>
        <br />
        <span className="my-2 text-silvergray-400 font-bold text-lg">
          or
        </span>
        <br />
        <h3 className="text-3xl font-extrabold text-silvergray-700">
          Start a new conversation
        </h3>
      </div>
    </div>
  )
}