"use client"

import React from "react"
import { CircleCheckIcon, LucideClipboard, XIcon } from "lucide-react"
import { toast } from "sonner"

import { getColors } from "@/lib/colors"
import { Wrapper } from "@/components/shared/wrapper"
import { Button } from "@/registry/new-york/ui/button"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "@/registry/new-york/ui/select"

interface Props {
  title: string
  description: string
}

type Format = "hex" | "rgb" | "hsl" | "oklch" | "var" | "className"

const FORMAT_META: Record<
  Format,
  { label: string; example: (fam: string) => string }
> = {
  className: { label: "className", example: (fam) => `bg-${fam}-100` },
  hex: { label: "hex", example: () => "#fafafa" },
  rgb: { label: "rgb", example: () => "250 250 250" },
  hsl: { label: "hsl", example: () => "0 0% 98%" },
  oklch: { label: "oklch", example: () => "oklch(0.985 0 0)" },
  var: { label: "var", example: (fam) => `--color-${fam}-50` },
}

export const ColorSection: React.FC<Props> = ({ title, description }) => {
  const [selectedFormat, setSelectedFormat] = React.useState<Format>("hex")
  const colors = getColors()

  const handleCopy = (value: string) => {
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
        ))
      })
      .catch(() => {
        toast.error("Failed to copy")
      })
  }

  return (
    <section className="border-b border-dashed">
      <Wrapper className="flex flex-col gap-16 border-dashed py-16 md:gap-32 md:border-x md:py-32">
        <Wrapper size={"sm"} className="px-0!">
          <div className="flex max-w-xl flex-col gap-4 text-start">
            <h2 className="text-3xl font-bold text-balance md:text-4xl">
              {title}
            </h2>
            <p className="text-muted-foreground">{description}</p>
          </div>
        </Wrapper>

        <div className="flex flex-col gap-16 sm:gap-12">
          {colors.map(({ name, colors }) => (
            <div key={name} className="flex flex-col gap-3">
              <div className="flex items-end justify-between md:px-6">
                <p className="font-mono text-base font-medium capitalize">
                  {name}
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
                          {FORMAT_META.className.example(name)}
                        </span>
                      </SelectItem>
                      <SelectItem value="hex" textValue="hex">
                        hex{" "}
                        <span className="text-muted-foreground">
                          {FORMAT_META.hex.example(name)}
                        </span>
                      </SelectItem>
                      <SelectItem value="rgb" textValue="rgb">
                        rgb{" "}
                        <span className="text-muted-foreground">
                          {FORMAT_META.rgb.example(name)}
                        </span>
                      </SelectItem>
                      <SelectItem value="hsl" textValue="hsl">
                        hsl{" "}
                        <span className="text-muted-foreground">
                          {FORMAT_META.hsl.example(name)}
                        </span>
                      </SelectItem>
                      <SelectItem value="oklch" textValue="oklch">
                        oklch{" "}
                        <span className="text-muted-foreground">
                          {FORMAT_META.oklch.example(name)}
                        </span>
                      </SelectItem>
                      <SelectItem value="var" textValue="var">
                        var{" "}
                        <span className="text-muted-foreground">
                          {FORMAT_META.var.example(name)}
                        </span>
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              {/* Shades Grid */}
              <div className="grid gap-4 sm:grid-cols-11 sm:gap-2">
                {colors.map((color, index) => {
                  return (
                    <div
                      key={index}
                      className="group relative flex w-full flex-col items-center gap-2"
                    >
                      <span
                        role="button"
                        tabIndex={0}
                        onClick={() =>
                          handleCopy(String(color[selectedFormat]))
                        }
                        className="relative aspect-[2.9] w-full rounded-md border sm:aspect-[0.8] sm:rounded-sm"
                        style={{ backgroundColor: color.oklch }}
                      />
                      <LucideClipboard className="pointer-events-none absolute top-2 right-2 z-10 size-4 opacity-0 mix-blend-difference transition duration-150 ease-out group-hover:opacity-100" />

                      <p className="text-muted-foreground group-hover:text-foreground flex items-center font-mono text-sm">
                        <span className="sm:hidden xl:flex">{color.name}-</span>
                        <span>{color.scale}</span>
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </Wrapper>
    </section>
  )
}
