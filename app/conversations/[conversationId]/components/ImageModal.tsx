"use client";

import { Modal } from "@/app/components/Modal";
import Image from "next/image";

interface ImageModalProps {
  isOpen?: boolean;
  onClose: () => void;
  src?: string | null;
}

export function ImageModal({ isOpen, onClose, src }: ImageModalProps) {
  if (!src) {
    return null;
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="w-[460px] h-[460px]">
        <Image
          alt="Image"
          className="object-cover"
          fill
          src={src}
        />
      </div>
    </Modal>
  )
}