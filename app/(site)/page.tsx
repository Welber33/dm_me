import Image from "next/image";

import { AuthForm } from "./components/AuthForm";

export default function Home() {
  return (
    <div
      className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 bg-silvergray-50"
    >
      <div className="sm:mx-auto sm:sm:w-full sm:max-w-md">
        <Image
          alt="Logo"
          height="70"
          width="70"
          className="mx-auto w-auto"
          src="/images/logo-dm-me.png"
        />
        <div className="flex flex-row items-center justify-center content-evenly gap-2">
          <span className="mt-6 text-silvergray-500">welcome to</span>
          <h2
            className="mt-6 text-center text-3xl font-bold tracking-tight text-blueApp-700"
          >
            DM_me
          </h2>
        </div>

      </div>

      <AuthForm />
    </div>
  )
}
