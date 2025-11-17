import { z } from 'zod';

const envSchema = z.object({
  NEXT_PUBLIC_FORMSPREE_ID: z.string().min(1, 'Formspree ID is required'),
  NEXT_PUBLIC_GA_ID: z.string().optional(),
  NEXT_PUBLIC_WHATSAPP_NUMBER: z.string().optional(),
});

export const env = envSchema.parse({
  NEXT_PUBLIC_FORMSPREE_ID: process.env.NEXT_PUBLIC_FORMSPREE_ID,
  NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID,
  NEXT_PUBLIC_WHATSAPP_NUMBER: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER,
});

export type Env = z.infer<typeof envSchema>;
