"use client";

import React from "react";
import { useTheme } from "next-themes";
import Image, { ImageProps } from "next/image";

import { siteConfig } from "@/config/site.config";

interface Props extends ImageProps {
  src: "light" | "dark";
  type?: "logo" | "icon";
}

export const LogoIcon: React.FC<Props> = ({
  type = "logo",
  src,
  alt,
  ...props
}) => {
  const { theme, resolvedTheme } = useTheme();
  const [logo, setLogo] = React.useState<"light" | "dark">(
    src as "light" | "dark",
  );

  React.useEffect(() => {
    const updateLogo = (currentTheme: string | undefined) => {
      const isDark =
        currentTheme === "dark" ||
        (currentTheme === "system" &&
          window.matchMedia("(prefers-color-scheme: dark)").matches);

      setLogo(isDark ? "light" : "dark");
    };

    updateLogo(theme); // Update immediately

    // Listen to system color scheme changes only if theme is 'system'
    const darkModeMediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)",
    );
    const handleSystemChange = () => {
      if (theme === "system") {
        updateLogo("system");
      }
    };

    if (theme === "system") {
      darkModeMediaQuery.addEventListener("change", handleSystemChange);
    }

    return () => {
      darkModeMediaQuery.removeEventListener("change", handleSystemChange);
    };
  }, [theme, resolvedTheme, setLogo]);

  return (
    <Image
      priority
      quality={100}
      alt={alt || siteConfig.name}
      src={`/assets/svg/${type === "logo" ? "dappui" : "logo"}-${logo.toString()}.svg`}
      {...props}
    />
  );
};
