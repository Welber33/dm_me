"use client";

import useConversation from "@/app/hooks/useConversation";
import axios from "axios";
import {
  FieldValues,
  useForm,
} from "react-hook-form";
import { HiPaperAirplane, HiPhoto } from "react-icons/hi2";
import { MessageInput } from "./MessageInput";
import { CldUploadButton } from "next-cloudinary";

const uploadPresetName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_UPLOAD_PRESET_NAME;

export function Form() {
  const { conversationId } = useConversation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<FieldValues>({
    defaultValues: {
      message: ''
    }
  });

  async function onSubmitMessage(data: FieldValues) {
    setValue('message', '', { shouldValidate: true });

    await axios.post('/api/messages', {
      ...data,
      conversationId
    });
  }

  function handleUpload(result: any) {
    axios.post('/api/messages', {
      image: result.info.secure_url,
      conversationId: conversationId
    })
  }

  return (
    <div className="py-4 px-4 bg-white border-t-[1px] border-silvergray-200 flex items-center gap-2 lg:gap-4 w-full">
      <CldUploadButton
        options={{ maxFiles: 1 }}
        onUpload={handleUpload}
        uploadPreset={uploadPresetName}
      >
        <HiPhoto
          size={30}
          className="text-blueApp-800"
        />
      </CldUploadButton>

      <form
        onSubmit={handleSubmit(onSubmitMessage)}
        className="flex items-center gap-2 lg:gap-4 w-full"
      >
        <MessageInput
          id="message"
          register={register}
          errors={errors}
          required
          placeholder="Write a message..."
        />

        <button
          type="submit"
          className="rounded-full p-2 bg-blueApp-800 cursor-pointer"
        >
          <HiPaperAirplane
            size={18}
            className="text-white"
          />
        </button>
      </form>
    </div>
  )
}