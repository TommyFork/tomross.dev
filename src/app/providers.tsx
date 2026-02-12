"use client";

import type { ReactNode } from "react";

import { ContactModalProvider } from "@/components/ContactModalContext";
import { ThemeProvider } from "@/components/ThemeProvider";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider defaultTheme="light" storageKey="tomross-theme">
      <ContactModalProvider>{children}</ContactModalProvider>
    </ThemeProvider>
  );
}
