"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { SessionProvider } from "next-auth/react";

export function Provider({ children, ...props }: ThemeProviderProps) {
  const theme = useTheme();
  props.defaultTheme = theme.theme;

  return (
    <NextThemesProvider {...props}>
      <SessionProvider>{children}</SessionProvider>
    </NextThemesProvider>
  );
}
