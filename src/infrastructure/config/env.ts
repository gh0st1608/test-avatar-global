import { z } from "zod";

const envSchema =
  z.object({
    VITE_API_BASE_URL:
      z.string().url(),
  });

const parsed =
  envSchema.safeParse({
    VITE_API_BASE_URL:
      import.meta.env.VITE_API_BASE_URL,
  });

if (!parsed.success) {
  throw new Error(
    "Invalid environment variables",
  );
}

export const env =
  parsed.data;