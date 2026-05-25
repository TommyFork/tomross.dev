"use client";

import type { ReactNode } from "react";

import { ContactModalProvider } from "@/components/ContactModalContext";
import { ThemeProvider } from "@/components/ThemeContext";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <ContactModalProvider>{children}</ContactModalProvider>
    </ThemeProvider>
  );
}
