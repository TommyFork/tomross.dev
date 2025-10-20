"use client";

import type { ReactNode } from "react";

import { ContactModalProvider } from "@/components/ContactModalContext";

export function Providers({ children }: { children: ReactNode }) {
  return <ContactModalProvider>{children}</ContactModalProvider>;
}
