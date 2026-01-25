"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface FormFieldProps {
  id: string;
  label: string;
  type?: "text" | "email" | "textarea";
  placeholder: string;
  error?: FieldError;
  registration: UseFormRegisterReturn;
}

export function FormField({
  id,
  label,
  type = "text",
  placeholder,
  error,
  registration,
}: FormFieldProps) {
  const errorClass = error ? "border-red-500 focus-visible:ring-red-500" : "";
  const isTextarea = type === "textarea";

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>
        {label} <span className="text-red-500">*</span>
      </Label>
      {isTextarea ? (
        <Textarea
          id={id}
          placeholder={placeholder}
          required
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`min-h-[150px] rounded-lg ${errorClass}`}
          {...registration}
        />
      ) : (
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          required
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`rounded-lg ${errorClass}`}
          {...registration}
        />
      )}
      {error && (
        <p id={`${id}-error`} className="text-sm text-red-600 dark:text-red-400">
          {error.message}
        </p>
      )}
    </div>
  );
}
