"use client";

import { useMemo, useState } from "react";
import colors from "tailwindcss/colors";
import { LuClipboard } from "react-icons/lu";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "@/components/ui/select";
import { Wrapper } from "@/components/shared/wrapper";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { CircleCheckIcon, XIcon } from "lucide-react";
import {
  Format,
  FORMAT_META,
  oklchToSrgbJS,
  parseNormalizedColorToRgb,
  rgbToHsl,
  toHex,
} from "@/lib/utils";

export const ColorSection = () => {
  const [selectedFormat, setSelectedFormat] = useState<Format>("hex");

  // Reuse a single canvas to leverage the browser's color engine for OKLCH -> sRGB
  const canvasCtx = useMemo(() => {
    if (typeof window === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 1;
    canvas.height = 1;
    return canvas.getContext("2d");
  }, []);

  const families = useMemo(
    () =>
      Object.keys(colors).filter(
        (key) =>
          !["inherit", "current", "transparent", "black", "white"].includes(
            key
          ) && typeof colors[key as keyof typeof colors] === "object"
      ),
    []
  );

  function oklchToRgb(ok: string): { r: number; g: number; b: number } | null {
    // Try browser-native parsing first
    if (canvasCtx) {
      try {
        // Create a new context to avoid modifying state directly
        const ctx = canvasCtx.canvas.getContext("2d");
        if (!ctx) return null;
        // Detect support by setting a sentinel color first
        ctx.fillStyle = "#000000";
        const before = ctx.fillStyle as string;
        ctx.fillStyle = ok;
        const normalized = ctx.fillStyle as string;
        const parsed = parseNormalizedColorToRgb(normalized);
        if (parsed && normalized !== before) return parsed;
      } catch {}
    }
    // Fallback to JS conversion if browser parsing unsupported
    const converted = oklchToSrgbJS(ok);
    return converted;
  }

  function toFormat(
    format: Format,
    oklch: string,
    fam: string,
    shade: string
  ): string {
    if (format === "oklch") return oklch;
    if (format === "className") return `bg-${fam}-${shade}`;
    if (format === "var") return `var(--color-${fam}-${shade})`;

    const rgb = oklchToRgb(oklch);
    if (!rgb) return oklch; // Fallback

    if (format === "hex") {
      return `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`;
    }
    if (format === "rgb") {
      return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`; // Tailwind's space-separated RGB
    }
    if (format === "hsl") {
      const { h, s, l } = rgbToHsl(rgb.r, rgb.g, rgb.b);
      return `hsl(${h} ${s}% ${l}%)`;
    }
    return oklch;
  }

  const handleCopyColor = (value: string) => {
    navigator.clipboard
      .writeText(value)
      .then(() => {
        toast.custom((t) => (
          <div className="bg-background text-foreground w-full rounded-md border px-4 py-3 shadow-lg sm:w-(--width)">
            <div className="flex gap-2">
              <div className="flex grow gap-3">
                <CircleCheckIcon
                  className="mt-0.5 shrink-0 text-emerald-500"
                  size={16}
                  aria-hidden="true"
                />
                <div className="flex grow justify-between gap-12">
                  <p className="text-sm">Copied {value}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                className="group -my-1.5 -me-2 size-8 shrink-0 p-0 hover:bg-transparent"
                onClick={() => toast.dismiss(t)}
                aria-label="Close banner"
              >
                <XIcon
                  size={16}
                  className="opacity-60 transition-opacity group-hover:opacity-100"
                  aria-hidden="true"
                />
              </Button>
            </div>
          </div>
        ));
      })
      .catch(() => {
        toast.error("Failed to copy");
      });
  };

  return (
    <section className="border-b border-dashed">
      <Wrapper className="flex flex-col gap-16 border-dashed py-16 md:gap-32 md:border-x md:py-32">
        <Wrapper size={"sm"} className="px-0!">
          <div className="flex max-w-xl flex-col gap-4 text-start">
            <h2 className="text-3xl font-bold text-balance md:text-4xl">
              Tailwind Colors in Every Format
            </h2>
            <p className="text-muted-foreground">
              The complete Tailwind color palette in HEX, RGB, HSL, CSS
              variables, and classes. Ready to copy and paste into your project.
            </p>
          </div>
        </Wrapper>

        <div className="flex flex-col gap-16 sm:gap-12">
          {families.map((fam, index) => {
            const shades = Object.entries(
              colors[fam as keyof typeof colors] as Record<string, string>
            );

            return (
              <div className="flex flex-col gap-3" key={index}>
                <div className="flex items-end justify-between md:px-6">
                  <p className="font-mono text-base font-medium capitalize">
                    {fam}
                  </p>

                  <Select
                    value={selectedFormat}
                    onValueChange={(v) => setSelectedFormat(v as Format)}
                  >
                    <SelectTrigger>
                      <span>{FORMAT_META[selectedFormat].label}</span>
                    </SelectTrigger>
                    <SelectContent align="end">
                      <SelectGroup>
                        <SelectLabel>Formats</SelectLabel>
                        <SelectItem value="className" textValue="className">
                          className{" "}
                          <span className="text-muted-foreground">
                            {FORMAT_META.className.example(fam)}
                          </span>
                        </SelectItem>
                        <SelectItem value="hex" textValue="hex">
                          hex{" "}
                          <span className="text-muted-foreground">
                            {FORMAT_META.hex.example(fam)}
                          </span>
                        </SelectItem>
                        <SelectItem value="rgb" textValue="rgb">
                          rgb{" "}
                          <span className="text-muted-foreground">
                            {FORMAT_META.rgb.example(fam)}
                          </span>
                        </SelectItem>
                        <SelectItem value="hsl" textValue="hsl">
                          hsl{" "}
                          <span className="text-muted-foreground">
                            {FORMAT_META.hsl.example(fam)}
                          </span>
                        </SelectItem>
                        <SelectItem value="oklch" textValue="oklch">
                          oklch{" "}
                          <span className="text-muted-foreground">
                            {FORMAT_META.oklch.example(fam)}
                          </span>
                        </SelectItem>
                        <SelectItem value="var" textValue="var">
                          var{" "}
                          <span className="text-muted-foreground">
                            {FORMAT_META.var.example(fam)}
                          </span>
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                {/* Shades Grid */}
                <div className="grid gap-4 sm:grid-cols-11 sm:gap-2">
                  {shades.map(([shade, oklch]) => {
                    const value = toFormat(selectedFormat, oklch, fam, shade);
                    return (
                      <div
                        key={shade}
                        className="group relative flex w-full flex-col items-center gap-2"
                      >
                        <span
                          role="button"
                          tabIndex={0}
                          aria-label={`Copy ${value}`}
                          title={value}
                          onClick={() => handleCopyColor(value)}
                          className="relative aspect-[2.9] w-full rounded-md border sm:aspect-[0.8] sm:rounded-sm"
                          style={{ backgroundColor: oklch }}
                        />
                        <LuClipboard className="pointer-events-none absolute top-2 right-2 z-10 size-4 opacity-0 mix-blend-difference transition duration-150 ease-out group-hover:opacity-100" />

                        <p className="text-muted-foreground group-hover:text-foreground flex items-center font-mono text-sm">
                          <span className="sm:hidden xl:flex">{fam}-</span>
                          <span>{shade}</span>
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </Wrapper>
    </section>
  );
};
