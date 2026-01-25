"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  contactFormSchema,
  type ContactFormData,
} from "@/lib/schemas/contact.schema";
import { env } from "@/lib/env";

export function useContactForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState("");

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setServerError("");

    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const response = await fetch(
        `https://formspree.io/f/${env.NEXT_PUBLIC_FORMSPREE_ID}`,
        {
          method: "POST",
          body: formData,
          headers: { Accept: "application/json" },
        }
      );

      if (response.ok) {
        form.reset();
        router.push("/thank-you");
      } else {
        setServerError(
          "Failed to send message. Please try again or contact us directly."
        );
      }
    } catch {
      setServerError("An unexpected error occurred. Please try again later.");
    }
  };

  return {
    form,
    serverError,
    onSubmit: form.handleSubmit(onSubmit),
    isSubmitting: form.formState.isSubmitting,
  };
}
