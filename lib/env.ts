import { z } from "zod";
import { createEnv } from "@t3-oss/env-nextjs";

export const env = createEnv({
  client: {
    NEXT_PUBLIC_HANDLE: z
      .string("NEXT_PUBLIC_HANDLE is required")
      .min(2, "NEXT_PUBLIC_HANDLE must be at least 2 characters")
      .refine((str) => str.startsWith("@"), {
        error: "NEXT_PUBLIC_HANDLE must start with @",
      }),
    NEXT_PUBLIC_CREATOR: z
      .string("NEXT_PUBLIC_CREATOR is required")
      .min(2, "NEXT_PUBLIC_CREATOR must be at least 2 characters")
      .refine((str) => str.startsWith("@"), {
        error: "NEXT_PUBLIC_CREATOR must start with @",
      }),
    NEXT_PUBLIC_GITHUB_URL: z
      .url("NEXT_PUBLIC_GITHUB_URL is not a valid url")
      .min(2, "NEXT_PUBLIC_GITHUB_URL must be at least 2 characters")
      .refine((str) => str.includes("github.com"), {
        error: "NEXT_PUBLIC_GITHUB_URL is not a valid GitHub url",
      }),
    NEXT_PUBLIC_TWITTER_URL: z
      .url("NEXT_PUBLIC_TWITTER_URL is not a valid url")
      .min(2, "NEXT_PUBLIC_TWITTER_URL must be at least 2 characters")
      .refine((str) => str.includes("twitter.com") || str.includes("x.com"), {
        error: "NEXT_PUBLIC_TWITTER_URL is not a valid GitHub url",
      }),
    NEXT_PUBLIC_SITE_URL: z
      .url("NEXT_PUBLIC_SITE_URL is not a valid url")
      .min(2, "NEXT_PUBLIC_SITE_URL must be at least 2 characters"),
    NEXT_PUBLIC_WISP_BLOG_ID: z
      .string("NEXT_PUBLIC_WISP_BLOG_ID is required")
      .min(1, "NEXT_PUBLIC_WISP_BLOG_ID must be at least 1 character"),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_HANDLE: process.env.NEXT_PUBLIC_HANDLE,
    NEXT_PUBLIC_CREATOR: process.env.NEXT_PUBLIC_CREATOR,
    NEXT_PUBLIC_GITHUB_URL: process.env.NEXT_PUBLIC_GITHUB_URL,
    NEXT_PUBLIC_TWITTER_URL: process.env.NEXT_PUBLIC_TWITTER_URL,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_WISP_BLOG_ID: process.env.NEXT_PUBLIC_WISP_BLOG_ID,
  },
  onValidationError: (issues) => {
    console.error("❌ Invalid environment variables:", issues);
    throw new Error("Invalid environment variables");
  },
  onInvalidAccess: (issues: string) => {
    console.error(
      "❌ Attempted to access a server-side environment variable on the client",
      issues
    );
    throw new Error(
      "❌ Attempted to access a server-side environment variable on the client"
    );
  },
});
