import Image from "next/image";

export default function Home() {
  return (
    <div
      className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 bg-silvergray-50"
    >
      <div className="sm:mx-auto sm:sm:w-full sm:max-w-md">
        <Image
          alt="Logo"
          height="50"
          width="50"
          className="mx-auto w-auto"
          src="/images/logo-dm-me.png"
        />
        <h2
          className="mt-6 text-center text-3xl font-bold tracking-tight text-blueApp-700"
        >
          Login to your account
        </h2>
      </div>

      {/** AuthForm */}
    </div>
  )
}
