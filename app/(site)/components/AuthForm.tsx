"use client";

import axios from "axios";

import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import { BsGithub, BsGoogle } from "react-icons/bs";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

import { Input } from "@/app/components/inputs/Input";
import { Button } from "@/app/components/Button";
import { AuthSocialButton } from "./AuthSocialButton";

import toast from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export type Variant = 'LOGIN' | 'REGISTER';

export function AuthForm() {
  const session = useSession();
  const router = useRouter();
  const [variant, setVariant] = useState<Variant>('LOGIN');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (session?.status === 'authenticated') {
      router.push('/users');

    }
  }, [session, router]);

  const toggleVariant = useCallback(() => {
    if (variant === 'LOGIN') {
      setVariant('REGISTER');
    } else {
      setVariant('LOGIN');
    }
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: {
      errors
    }
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    }
  });

  function togglePasswordVisibility() {
    setShowPassword(prevState => !prevState);
  }

  async function onSubmit(data: FieldValues) {
    setIsLoading(true);

    if (variant === 'REGISTER') {
      await axios.post('/api/register', data)
        .then(() => signIn('credentials', data))
        .catch(() => toast.error('Something went wrong when trying to register user'))
        .finally(() => setIsLoading(false));
    }

    if (variant === 'LOGIN') {
      signIn('credentials', {
        ...data,
        redirect: false
      })
        .then((callback) => {
          if (callback?.error) {
            toast.error('Invalid credentials to Sign in');
          }

          if (callback?.ok && !callback?.error) {
            toast.success('Signed in successfully!');
            router.push('/users');
          }
        })
        .finally(() => setIsLoading(false))
    }
  }

  function socialAction(action: string) {
    setIsLoading(true);

    signIn(action, { redirect: false })
      .then((callback) => {
        if (callback?.error) {
          toast.error('Invalid social credentials');
        }

        if (callback?.ok && !callback?.error) {
          toast.success('Signed in successfully')
        }
      })
      .finally(() => setIsLoading(false));
  }

  return (
    <div
      className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
    >
      <div
        className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10"
      >
        <form
          className="space-y-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          {variant === 'REGISTER' && (
            <Input
              id="name"
              label="Name"
              placeholder="John Doe"
              register={register}
              errors={errors}
              disabled={isLoading}
            />
          )}

          <Input
            id="email"
            label="Email address"
            type="email"
            placeholder="john.doe@your_email_provider.com"
            register={register}
            errors={errors}
            disabled={isLoading}
          />

          <div className="relative">
            <Input
              id="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••••••••"
              register={register}
              errors={errors}
              disabled={isLoading}
              endAdornment={
                showPassword ? (
                  <FaRegEye
                    size={20}
                    onClick={togglePasswordVisibility}
                  />
                ) : (
                  <FaRegEyeSlash
                    size={20}
                    onClick={togglePasswordVisibility}
                  />
                )}
            />
          </div>

          <div>
            <Button
              disabled={isLoading}
              fullWidth
              type="submit"
            >
              {variant === 'LOGIN' ? 'Sign in' : 'Register'}
            </Button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div
              className="absolute inset-0 flex items-center"
            >
              <div className="w-full border-t-[2px] border-silvergray-100" />
            </div>

            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-[15px] text-silvergray-400">
                Or
              </span>
            </div>
          </div>

          <div className="mt-6 w-full flex flex-col gap-4">
            <AuthSocialButton
              icon={BsGoogle}
              buttonInfoSignIn="google"
              onClick={() => socialAction('google')}
              disabled={isLoading}
            />
            <AuthSocialButton
              icon={BsGithub}
              buttonInfoSignIn="github"
              onClick={() => socialAction('github')}
              disabled={isLoading}
            />
          </div>
        </div>

        <div
          className="flex gap-2 justify-center text-sm mt-6 px-2 text-silvergray-400"
        >
          <div>
            {variant === 'LOGIN' ? 'New to DM_me?' : 'Already have an account ?'}
          </div>
          <div
            onClick={toggleVariant}
            className="underline cursor-pointer hover:text-silvergray-700"
          >
            {variant === 'LOGIN' ? 'Create an account' : 'Sign in'}
          </div>
        </div>

      </div>
    </div>
  )
}