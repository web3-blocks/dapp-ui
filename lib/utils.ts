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

export type Format = "hex" | "rgb" | "hsl" | "oklch" | "var" | "className";

export const FORMAT_META: Record<
  Format,
  { label: string; example: (fam: string) => string }
> = {
  className: { label: "className", example: (fam) => `bg-${fam}-100` },
  hex: { label: "hex", example: () => "#fafafa" },
  rgb: { label: "rgb", example: () => "250 250 250" },
  hsl: { label: "hsl", example: () => "0 0% 98%" },
  oklch: { label: "oklch", example: () => "oklch(0.985 0 0)" },
  var: { label: "var", example: (fam) => `--color-${fam}-50` },
};

export function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

export function toHex(n: number) {
  const h = clamp(Math.round(n), 0, 255).toString(16).padStart(2, "0");
  return h;
}

export function rgbToHsl(r: number, g: number, b: number) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h = 0,
    s = 0;
  const l = (max + min) / 2;
  const d = max - min;
  if (d !== 0) {
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

export function parseNormalizedColorToRgb(
  normalized: string
): { r: number; g: number; b: number } | null {
  // Handles "#rrggbb", "rgb(r g b / a)", and "rgb(r, g, b)" forms
  if (!normalized) return null;
  const hexMatch = normalized.match(/^#([0-9a-f]{6})$/i);
  if (hexMatch) {
    const int = parseInt(hexMatch[1], 16);
    return { r: (int >> 16) & 255, g: (int >> 8) & 255, b: int & 255 };
  }
  const rgbMatch = normalized
    .replace(/\//g, " ")
    .match(
      /rgb\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)(?:[\s,]+([\d.]+))?\s*\)/i
    );
  if (rgbMatch) {
    return {
      r: Math.round(parseFloat(rgbMatch[1])),
      g: Math.round(parseFloat(rgbMatch[2])),
      b: Math.round(parseFloat(rgbMatch[3])),
    };
  }
  return null;
}

export function parseOklch(
  input: string
): { L: number; C: number; h: number } | null {
  // Accepts oklch(L C H) where L may be in % and H in degrees
  const m = input
    .trim()
    .match(
      /oklch\(\s*([\d.]+%?)\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*[\d.]+)?\s*\)/i
    );
  if (!m) return null;
  let L = m[1].endsWith("%") ? parseFloat(m[1]) / 100 : parseFloat(m[1]);
  const C = parseFloat(m[2]);
  const h = parseFloat(m[3]);
  if (Number.isNaN(L) || Number.isNaN(C) || Number.isNaN(h)) return null;
  L = clamp(L, 0, 1);
  return { L, C, h };
}

export function oklchToSrgbJS(
  input: string
): { r: number; g: number; b: number } | null {
  const p = parseOklch(input);
  if (!p) return null;
  const { L, C } = p;
  const hr = (p.h * Math.PI) / 180;
  const a = C * Math.cos(hr);
  const b = C * Math.sin(hr);

  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.291485548 * b;

  const l = l_ ** 3;
  const m = m_ ** 3;
  const s = s_ ** 3;

  let r = +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
  let g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
  let b2 = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s;

  // Gamma encode and clamp to 0..255
  function encode(v: number) {
    v = Math.max(0, Math.min(1, v));
    return v <= 0.0031308 ? 12.92 * v : 1.055 * Math.pow(v, 1 / 2.4) - 0.055;
  }
  r = encode(r);
  g = encode(g);
  b2 = encode(b2);

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b2 * 255),
  };
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
