"use client";

import { motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";

const SunIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zM4 4a1 1 0 11-2 0 1 1 0 012 0zm14 0a1 1 0 11-2 0 1 1 0 012 0zM5 13a1 1 0 100 2h6a1 1 0 100-2H5zM3.293 13.293a1 1 0 011.414 0l2 2a1 1 0 01-1.414 1.414l-2-2a1 1 0 010-1.414zM13 11a1 1 0 100 2h6a1 1 0 100-2h-6zM11.293 13.293a1 1 0 011.414 0l2 2a1 1 0 01-1.414 1.414l-2-2a1 1 0 010-1.414zM10 15a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.293 16.707a1 1 0 011.414 0l2 2a1 1 0 01-1.414 1.414l-2-2a1 1 0 010-1.414zM15.293 16.707a1 1 0 011.414 0l2 2a1 1 0 01-1.414 1.414l-2-2a1 1 0 010-1.414z"/>
  </svg>
);

const MoonIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path d="M17.293 13.293A8 8 0 0 1 6.707 2.707a8.001 8.001 0 1 0 11.586 11.586z"/>
  </svg>
);

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <motion.button
      id="theme-toggle"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      className="p-1.5 rounded-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-white/50 dark:border-slate-800/60 shadow-sm hover:shadow-md transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.97]"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.05 }}
    >
      <motion.div
        style={{ position: "relative", height: "20px", width: "20px" }}
        animate={{ 
          rotate: theme === "light" ? 0 : 180,
          scale: theme === "light" ? 1 : 1
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <SunIcon className={`text-slate-900 dark:text-slate-100 transition-colors duration-200 ${theme === "dark" ? "opacity-0" : "opacity-100"}`} />
        <MoonIcon className={`absolute inset-0 text-slate-900 dark:text-slate-100 transition-colors duration-200 ${theme === "light" ? "opacity-0" : "opacity-100"}`} />
      </motion.div>
    </motion.button>
  );
}
