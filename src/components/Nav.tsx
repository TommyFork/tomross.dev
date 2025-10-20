"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const links = [
  { href: "/about", label: "About" },
  { href: "/work", label: "Work" },
  { href: "/writing", label: "Writing" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [pendingHref, setPendingHref] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    links.forEach(({ href }) => {
      router.prefetch(href);
    });
  }, [router]);

  useEffect(() => {
    setPendingHref(null);
  }, [pathname]);

  const activeHref = useMemo(() => pendingHref ?? pathname, [pendingHref, pathname]);

  const brandClasses =
    "text-2xl font-semibold tracking-tight text-neutral-900 transition-all duration-500 hover:scale-[1.02] hover:text-neutral-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-800/40" +
    (isScrolled ? "" : " md:text-3xl");

  return (
    <header
      className={`sticky z-50 transition-[top] duration-500 ${
        isScrolled ? "top-4" : "top-0"
      }`}
    >
      <div
        className={`mx-auto max-w-5xl transition-all duration-500 ${
          isScrolled ? "px-6" : "px-0"
        }`}
      >
        <nav
          className={`flex items-center justify-between transition-all duration-500 ${
            isScrolled
              ? "gap-4 rounded-3xl border border-white/30 bg-white/60 px-5 py-3 shadow-[0_12px_40px_-20px_rgba(15,23,42,0.45)] backdrop-blur-2xl backdrop-saturate-150"
              : "border-transparent bg-transparent px-0 py-7"
          }`}
        >
          <Link href="/" className={brandClasses}>
            Tom Ross
          </Link>
          <ul className="flex items-center gap-3 text-sm font-medium">
            {links.map((item) => {
              const active = activeHref === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setPendingHref(item.href)}
                    onMouseEnter={() => router.prefetch(item.href)}
                    className={`rounded-full px-3 py-1.5 transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-800/40 ${
                      active
                        ? "bg-neutral-900/10 text-neutral-900 shadow-[0_6px_20px_-12px_rgba(15,23,42,0.45)]"
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
      </div>
    </header>
  );
}


