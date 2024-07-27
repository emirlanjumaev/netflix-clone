import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Provider } from "@/provider";
import GlobalContext from "@/context";
import { ReactNode } from "react";
import { Toaster } from "@/components/ui/toaster";
import { useTheme } from "next-themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Netflix Clone",
  description: "Netflix Clone built with Next.js",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider attribute="class" enableSystem disableTransitionOnChange>
          <GlobalContext>
            {children}
            <Toaster />
          </GlobalContext>
        </Provider>
      </body>
    </html>
  );
}
