"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ContactModalProvider } from "@/components/ContactModalContext";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider defaultTheme="light" storageKey="theme">
      <ContactModalProvider>
        {children}
      </ContactModalProvider>
    </ThemeProvider>
  );
}
