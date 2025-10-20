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
  const [menuOpen, setMenuOpen] = useState(false);

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
    setMenuOpen(false);
  }, [pathname]);

  const activeHref = useMemo(() => pendingHref ?? pathname, [pendingHref, pathname]);

  const handleNavClick = (href: string) => {
    setPendingHref(href);
    setMenuOpen(false);
  };

  const brandClasses =
    "text-2xl font-semibold tracking-tight text-neutral-900 transition-all duration-500 hover:scale-[1.02] hover:text-neutral-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-800/40" +
    (isScrolled ? "" : " md:text-3xl");

  const renderBackdrop = (active: boolean) => (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit] opacity-0 transition-opacity duration-700"
      style={{ opacity: active ? 0.95 : 0 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-white/35 to-white/25" />
      <div className="absolute inset-0 mix-blend-screen opacity-80">
        <div className="absolute -inset-24 animate-[liquidDrift_16s_ease-in-out_infinite] bg-[radial-gradient(circle_at_15%_20%,rgba(255,255,255,0.85),transparent_55%),radial-gradient(circle_at_70%_25%,rgba(148,163,184,0.3),transparent_60%),radial-gradient(circle_at_50%_80%,rgba(226,232,240,0.35),transparent_60%)]" />
        <div className="absolute -inset-32 animate-[liquidPulse_22s_ease-in-out_infinite] bg-[radial-gradient(circle_at_20%_80%,rgba(125,211,252,0.35),transparent_60%),radial-gradient(circle_at_80%_60%,rgba(94,234,212,0.3),transparent_60%)]" />
      </div>
      <div className="absolute inset-[1px] rounded-[inherit] border border-white/50" />
    </div>
  );

  return (
    <header className="sticky top-0 z-50">
      <div
        className={`mx-auto max-w-5xl transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] ${
          isScrolled ? "px-6 pt-4" : "px-0 pt-0"
        }`}
      >
        <nav
          className={`relative flex items-center justify-between transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] ${
            isScrolled
              ? "gap-3 rounded-2xl border border-white/45 bg-white/30 px-4 py-3 shadow-[0_30px_80px_-45px_rgba(15,23,42,0.85)] backdrop-blur-[28px] backdrop-saturate-[1.35]"
              : "border-transparent bg-transparent px-0 py-7"
          }`}
        >
          {renderBackdrop(isScrolled)}
          <Link href="/" className={brandClasses} onClick={() => setMenuOpen(false)}>
            Tom Ross
          </Link>
          <button
            type="button"
            className="relative flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full border border-neutral-200 text-sm font-medium text-neutral-700 transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-800/40 md:hidden"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-expanded={menuOpen}
            aria-label="Toggle navigation menu"
          >
            <span className="sr-only">Toggle navigation</span>
            <span
              className={`block h-[2px] w-5 origin-center rounded-full bg-current transition-transform duration-300 ${
                menuOpen ? "translate-y-[6px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-[2px] w-5 origin-center rounded-full bg-current transition-opacity duration-300 ${
                menuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`block h-[2px] w-5 origin-center rounded-full bg-current transition-transform duration-300 ${
                menuOpen ? "-translate-y-[6px] -rotate-45" : ""
              }`}
            />
          </button>
          <ul
            className={`hidden items-center gap-3 text-sm font-medium md:flex ${
              isScrolled ? "pr-1" : ""
            }`}
          >
            {links.map((item) => {
              const active = activeHref === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => handleNavClick(item.href)}
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
          <div
            className={`absolute left-0 right-0 top-full mt-3 overflow-hidden rounded-2xl border border-white/45 bg-white/45 shadow-[0_30px_80px_-45px_rgba(15,23,42,0.85)] backdrop-blur-[28px] backdrop-saturate-[1.35] transition-[max-height,opacity,transform] duration-500 md:hidden ${
              menuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
            } ${isScrolled ? "translate-y-0" : "translate-y-1"}`}
            style={{ pointerEvents: menuOpen ? "auto" : "none" }}
          >
            <div className="relative px-4 py-4">
              {renderBackdrop(true)}
              <ul className="flex flex-col gap-2 text-base font-medium text-neutral-700">
                {links.map((item) => {
                  const active = activeHref === item.href;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => handleNavClick(item.href)}
                        className={`block rounded-xl px-3 py-2 transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-800/40 ${
                          active
                            ? "bg-neutral-900/10 text-neutral-900"
                            : "text-neutral-600 hover:bg-neutral-900/5 hover:text-neutral-900"
                        }`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </nav>
      </div>
      <style jsx global>{`
        @keyframes liquidDrift {
          0% {
            transform: translate3d(-4%, -6%, 0) scale(1.05) rotate(0deg);
          }
          50% {
            transform: translate3d(6%, 5%, 0) scale(1.12) rotate(1deg);
          }
          100% {
            transform: translate3d(-4%, -6%, 0) scale(1.05) rotate(0deg);
          }
        }

        @keyframes liquidPulse {
          0% {
            transform: translate3d(8%, -8%, 0) scale(1);
            opacity: 0.35;
          }
          40% {
            opacity: 0.6;
          }
          50% {
            transform: translate3d(-6%, 6%, 0) scale(1.15);
          }
          100% {
            transform: translate3d(8%, -8%, 0) scale(1);
            opacity: 0.35;
          }
        }
      `}</style>
    </header>
  );
}


