import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDateString(dateString: Date): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}

export function getInitials(value: string): string {
  const words = value.trim().split(" ");
  if (words.length <= 2) {
    return words.map((word) => word.charAt(0).toUpperCase()).join("");
  }
  return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase();
}

/**
 * Consistent error handler with strict typing
 *
 * @param err - Any caught error (unknown type from try/catch)
 * @param fallbackMessage - Default message if not an Error instance
 * @returns HandledError object with safe, typed fields
 */
export function errorHandler(
  err: unknown,
  fallbackMessage: string = "An unexpected error occurred"
): {
  isError: boolean;
  message: string;
  name?: string;
  cause?: string;
  stack?: string;
  raw: unknown;
} {
  if (err instanceof Error) {
    return {
      isError: true,
      message: err.message || fallbackMessage,
      name: err.name,
      cause: err.cause ? String(err.cause) : undefined,
      stack: err.stack,
      raw: err,
    };
  }

  return {
    isError: false,
    message: fallbackMessage,
    raw: err,
  };
}
