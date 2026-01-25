"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { FormField } from "./FormField";
import { useContactForm } from "./useContactForm";

export function ContactForm() {
  const { form, serverError, onSubmit, isSubmitting } = useContactForm();
  const { errors } = form.formState;

  return (
    <Card className="p-8 rounded-[1.618rem] transition-all duration-300 hover:shadow-lg dark:hover:shadow-gray-800/50">
      <h2 className="text-2xl font-semibold mb-6 bg-gradient-to-b from-blue-700 to-blue-400 bg-clip-text text-transparent dark:from-blue-400 dark:to-blue-600">
        Send us a Message
      </h2>

      {serverError && (
        <div className="mb-6 p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
          <p className="text-red-700 dark:text-red-400 text-sm">{serverError}</p>
        </div>
      )}

      <form onSubmit={onSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            id="name"
            label="Name"
            placeholder="Your name"
            error={errors.name}
            registration={form.register("name")}
          />
          <FormField
            id="email"
            label="Email"
            type="email"
            placeholder="your@email.com"
            error={errors.email}
            registration={form.register("email")}
          />
        </div>

        <FormField
          id="subject"
          label="Subject"
          placeholder="What's this about?"
          error={errors.subject}
          registration={form.register("subject")}
        />

        <FormField
          id="message"
          label="Message"
          type="textarea"
          placeholder="Your message here..."
          error={errors.message}
          registration={form.register("message")}
        />

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full md:w-auto bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-700 text-white dark:from-blue-600 dark:to-purple-500 dark:hover:from-purple-500 dark:hover:to-blue-400"
        >
          {isSubmitting ? (
            "Processing..."
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Send Message
            </>
          )}
        </Button>
      </form>
    </Card>
  );
}
