"use client"

import { createContext, useContext, useEffect, useState, ReactNode, type ReactElement } from "react"

type Theme = "dark" | "light"

type ThemeProviderProps = {
  children: ReactNode
  defaultTheme?: Theme
  storageKey?: string
  forcedTheme?: Theme
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme | ((theme: Theme) => Theme)) => void
}

const initialState: ThemeProviderState = {
  theme: "light",
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState | undefined>(undefined)

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "tomross-theme",
  forcedTheme,
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>("light")

  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove("light", "dark")

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"

      root.classList.add(systemTheme)
      return
    }

    root.classList.add(theme)
  }, [theme])

  const handleThemeChange = (themeOrFn: Theme | ((theme: Theme) => Theme)) => {
    const nextTheme = typeof themeOrFn === "function"
      ? themeOrFn(theme)
      : themeOrFn
    setTheme(nextTheme)
  }

  useEffect(() => {
    const root = window.documentElement

    if (forcedTheme) {
      root.classList.remove("light", "dark")
      root.classList.add(forcedTheme)
      return
    }

    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem(storageKey) as Theme | null
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"

      const theme = savedTheme ?? defaultTheme ?? systemTheme

      root.classList.remove("light", "dark")
      root.classList.add(theme)
      setTheme(theme as Theme)
    }
  }, []) 

  useEffect(() => {
    const root = window.documentElement

    if (forcedTheme) {
      root.classList.remove("light", "dark")
      root.classList.add(forcedTheme)
    } else {
      root.classList.remove("light", "dark")
      root.classList.add(theme)
    }
  }, [theme])

  useEffect(() => {
    if (!forcedTheme) {
      localStorage.setItem(storageKey, theme)
    }
  }, [storageKey, theme, forcedTheme])

  const value = {
    theme,
    setTheme: handleThemeChange,
  } satisfies ThemeProviderState

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }

  return context
}
