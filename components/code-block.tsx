// This code is adapted from Origin UI
// Source: https://github.com/origin-space/originui/blob/main/components/code-block.tsx
"use client";

import { TbCheck, TbCopy } from "react-icons/tb";
import { cn } from "@/lib/utils";
import { toJsxRuntime } from "hast-util-to-jsx-runtime";
import { JSX, useLayoutEffect, useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import type { BundledLanguage } from "shiki/bundle/web";
import { codeToHast } from "shiki/bundle/web";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { CircleCheckIcon, XIcon } from "lucide-react";
import { Skeleton } from "./ui/skeleton";

export async function highlight(code: string, lang: BundledLanguage) {
  const hast = await codeToHast(code, {
    lang,
    theme: "github-dark",
  });

  return toJsxRuntime(hast, {
    Fragment,
    jsx,
    jsxs,
  }) as JSX.Element;
}

export interface CodeBlockProps {
  code: string | null;
  lang: BundledLanguage;
  initial?: JSX.Element;
  preHighlighted?: JSX.Element | null;
  maxHeight?: number;
  className?: string;
}

export default function CodeBlock({
  code,
  lang,
  initial,
  maxHeight,
  preHighlighted,
  className,
}: CodeBlockProps) {
  const [content, setContent] = useState<JSX.Element | null>(
    preHighlighted || initial || null,
  );

  const [copied, setCopied] = useState(false);

  useLayoutEffect(() => {
    if (preHighlighted) {
      // schedule after layout commit
      requestAnimationFrame(() => setContent(preHighlighted));
      return;
    }

    let isMounted = true;

    if (code) {
      highlight(code, lang).then((result) => {
        if (isMounted) setContent(result);
      });
    } else {
      requestAnimationFrame(() =>
        setContent(
          <pre className="rounded-lg bg-zinc-950 p-4">No code available</pre>,
        ),
      );
    }

    return () => {
      isMounted = false;
    };
  }, [code, lang, preHighlighted]);

  async function handleCopy() {
    if (!code) return;
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
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
                <p className="text-sm">Code block copied successfully</p>
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
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return content ? (
    <div
      className={cn(
        "relative [&_code]:font-mono [&_code]:text-[13px]/2 [&_pre]:max-h-(--pre-max-height) [&_pre]:min-h-128 [&_pre]:overflow-auto [&_pre]:border-l [&_pre]:bg-zinc-950! [&_pre]:p-4 [&_pre]:pt-3 [&_pre]:pr-14 [&_pre]:leading-snug dark:[&_pre]:bg-zinc-900/50!",
        className,
      )}
      style={{ "--pre-max-height": `${maxHeight}px` } as React.CSSProperties}
    >
      {content}

      <Button
        variant="ghost"
        onClick={handleCopy}
        aria-label="Copy code"
        className="absolute top-2.5 right-3 size-8 rounded-sm!"
      >
        {copied ? (
          <TbCheck className="size-4 text-green-400" />
        ) : (
          <TbCopy className="size-4" />
        )}
      </Button>
    </div>
  ) : (
    <Skeleton className="w-full rounded-lg bg-zinc-900 p-6" />
  );
}
