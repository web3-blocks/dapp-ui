"use client"

import * as React from "react"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider as NextThemesProvider } from "next-themes"

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      enableColorScheme
      {...props}
    >
      <Analytics />
      {children}
    </NextThemesProvider>
  )
}
