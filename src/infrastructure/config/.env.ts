import { z } from "zod";

export const envSchema = z.object({
  VITE_API_BASE_URL: z.string().url(),
});

const parsed = envSchema.safeParse({
  VITE_API_BASE_URL: import.meta.env["VITE_API_BASE_URL"],
});

if (!parsed.success) {
  console.error("Invalid environment variables:", parsed.error.format());
  throw new Error("Invalid environment variables");
}