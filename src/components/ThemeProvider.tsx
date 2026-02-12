"use client";

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from "react";

type Theme = "light" | "dark";

type ThemeProviderProps = {
  children: ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: "light",
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "light",
  storageKey = "theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  const computedSetTheme = useCallback((theme: Theme) => {
    localStorage.setItem(storageKey, theme);
    setTheme(theme);
  }, [setTheme, storageKey]);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    const root = window.document.documentElement;
    const initialTheme = (localStorage.getItem(storageKey) as Theme) || defaultTheme;
    computedSetTheme(initialTheme);
  }, [computedSetTheme]);

  return (
    <ThemeProviderContext.Provider value={{
      theme,
      setTheme: computedSetTheme,
    }}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (context === initialState) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};
