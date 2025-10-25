"use client";

import React from "react";
import NextTopLoader from "nextjs-toploader";
import { Analytics } from "@vercel/analytics/next";

import { Toaster } from "@/components/ui/sonner";
// import { Header } from "@/components/shared/header";
// import { Footer } from "@/components/shared/footer";
import { CustomCursor } from "@/components/shared/cursor";
import { ThemeProvider } from "@/components/provider/theme.provider";

export default function GlobalProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <NextTopLoader color="var(--primary)" showSpinner={false} />
      {/* <Header /> */}
      <CustomCursor />
      <main className="flex-1">{children}</main>
      {/* <Footer /> */}
      <Analytics />
      <Toaster />
    </ThemeProvider>
  );
}
