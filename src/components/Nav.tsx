"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/about", label: "About" },
  { href: "/work", label: "Work" },
  { href: "/writing", label: "Writing" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const brandClasses =
    "text-2xl font-semibold tracking-tight text-neutral-900 transition-all duration-500 hover:scale-[1.02] hover:text-neutral-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-800/40" +
    (isScrolled ? "" : " md:text-3xl");

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-500 ${
        isScrolled
          ? "border-neutral-900/10 bg-white/60 backdrop-blur shadow-sm saturate-150"
          : "border-transparent bg-transparent"
      }`}
    >
      <nav
        className={`mx-auto flex max-w-5xl items-center justify-between px-6 transition-all duration-500 ${
          isScrolled ? "py-3" : "py-6"
        }`}
      >
        <Link href="/" className={brandClasses}>
          Tom Ross
        </Link>
        <ul className="flex items-center gap-3 text-sm font-medium">
          {links.map((item) => {
            const active = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`rounded-full px-3 py-1.5 transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-800/40 ${
                    active
                      ? "bg-neutral-900/10 text-neutral-900 shadow-sm"
                      : "text-neutral-500 hover:bg-neutral-900/5 hover:text-neutral-800"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}


