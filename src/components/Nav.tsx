"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
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
  const [sampledColor, setSampledColor] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

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

  useEffect(() => {
    const navEl = navRef.current;
    if (!navEl || typeof window === "undefined") {
      return;
    }

    let frame = 0;

    const resolveColor = (element: Element | null): string | null => {
      let current: HTMLElement | null = element as HTMLElement | null;
      const isTransparent = (value: string | null) => {
        if (!value) return true;
        if (value === "transparent") return true;
        if (value === "rgba(0, 0, 0, 0)" || value === "rgba(0,0,0,0)") return true;
        if (value === "hsla(0, 0%, 0%, 0)" || value === "hsla(0,0%,0%,0)") return true;
        if (value === "" || value === "initial") return true;
        return false;
      };

      while (current && current !== document.documentElement) {
        const style = window.getComputedStyle(current);
        if (!isTransparent(style.backgroundColor)) {
          return style.backgroundColor;
        }
        if (style.backgroundImage && style.backgroundImage !== "none") {
          const bodyColor = window.getComputedStyle(document.body).backgroundColor;
          return bodyColor || null;
        }
        current = current.parentElement;
      }

      const bodyColor = window.getComputedStyle(document.body).backgroundColor;
      if (bodyColor && !isTransparent(bodyColor)) {
        return bodyColor;
      }

      return null;
    };

    const sampleUnderlyingColor = () => {
      const rect = navEl.getBoundingClientRect();
      const sampleX = rect.left + rect.width / 2;
      const sampleY = rect.top + rect.height / 2;

      const previousPointer = navEl.style.pointerEvents;
      navEl.style.pointerEvents = "none";
      const element = document.elementFromPoint(sampleX, sampleY);
      navEl.style.pointerEvents = previousPointer;

      const color = resolveColor(element);
      if (color) {
        setSampledColor((prev) => (prev === color ? prev : color));
      }
    };

    const requestSample = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(sampleUnderlyingColor);
    };

    requestSample();

    window.addEventListener("scroll", requestSample, { passive: true });
    window.addEventListener("resize", requestSample);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestSample);
      window.removeEventListener("resize", requestSample);
    };
  }, [pathname]);

  const activeHref = useMemo(() => pendingHref ?? pathname, [pendingHref, pathname]);

  const handleNavClick = (href: string) => {
    setPendingHref(href);
    setMenuOpen(false);
  };

  const brandClasses =
    "text-2xl font-semibold tracking-tight text-neutral-950 transition-all duration-500 hover:scale-[1.02] hover:text-neutral-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-800/40" +
    (isScrolled ? "" : " md:text-3xl");

  const glassVariables: CSSProperties = sampledColor
    ? {
        ["--glass-source" as const]: sampledColor,
      }
    : {};

  const renderBackdrop = (active: boolean) => (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit] opacity-0 transition-opacity duration-700"
      style={{
        opacity: active ? 1 : 0,
        ...glassVariables,
      }}
    >
      <div className="absolute inset-0 bg-[color-mix(in_srgb,var(--glass-source,rgba(241,245,249,1))_50%,rgba(255,255,255,0.45))]" />
      <div className="absolute inset-0 mix-blend-screen opacity-90">
        <div className="absolute -inset-28 animate-[liquidCurrent_18s_cubic-bezier(0.65,0,0.35,1)_infinite] bg-[radial-gradient(circle_at_20%_30%,rgba(147,197,253,0.26),transparent_60%),radial-gradient(circle_at_75%_15%,rgba(186,230,253,0.24),transparent_68%),radial-gradient(circle_at_35%_80%,rgba(167,243,208,0.22),transparent_62%)]" />
        <div className="absolute -inset-32 animate-[liquidGlow_24s_cubic-bezier(0.37,0,0.63,1)_infinite] bg-[radial-gradient(circle_at_80%_85%,rgba(254,205,211,0.22),transparent_70%),radial-gradient(circle_at_15%_90%,rgba(221,214,254,0.2),transparent_60%)]" />
      </div>
      <div className="absolute inset-0">
        <div className="absolute inset-x-3 top-0 h-px bg-white/70 blur-[1px]" />
        <div className="absolute inset-x-6 top-1 h-px bg-white/30" />
        <div className="absolute inset-x-4 bottom-0 h-[2px] bg-white/25 blur-[2px]" />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.26)_0%,rgba(255,255,255,0.08)_45%,rgba(255,255,255,0.28)_100%)] opacity-70" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'160\' height=\'160\' viewBox=\'0 0 160 160\'%3E%3Crect width=\'1\' height=\'1\' x=\'24\' y=\'32\' fill=\'rgba(255,255,255,0.16)\'/%3E%3Crect width=\'1\' height=\'1\' x=\'112\' y=\'120\' fill=\'rgba(255,255,255,0.12)\'/%3E%3Crect width=\'1\' height=\'1\' x=\'64\' y=\'72\' fill=\'rgba(255,255,255,0.1)\'/%3E%3C/svg%3E')] opacity-40" />
      <div className="absolute inset-[1px] rounded-[inherit] border border-white/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.55)]" />
    </div>
  );

  return (
    <header className="sticky top-0 z-50" ref={navRef}>
      <div
        className={`mx-auto max-w-5xl px-0 transition-[padding,transform] duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] ${
          isScrolled ? "pt-4" : "pt-2"
        }`}
      >
        <nav
          className={`relative flex items-center justify-between transition-[padding,background-color,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] ${
            isScrolled
              ? "gap-3 rounded-2xl border border-white/60 bg-[color-mix(in_srgb,var(--glass-source,rgba(241,245,249,1))_68%,rgba(255,255,255,0.28))] px-4 py-3 shadow-[0_30px_85px_-50px_rgba(15,23,42,0.28)] backdrop-blur-[36px] backdrop-saturate-[1.65]"
              : "border-transparent bg-transparent px-0 py-6"
          }`}
          style={glassVariables}
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
                    className={`rounded-full px-3 py-1.5 text-neutral-900 transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-800/40 ${
                      active
                        ? "bg-neutral-900/10 shadow-[0_6px_20px_-12px_rgba(15,23,42,0.35)]"
                        : "text-neutral-700 hover:bg-neutral-900/5 hover:text-neutral-950"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div
            className={`absolute left-0 right-0 top-full mt-3 overflow-hidden rounded-2xl border border-white/60 bg-[color-mix(in_srgb,var(--glass-source,rgba(241,245,249,1))_70%,rgba(255,255,255,0.24))] shadow-[0_30px_85px_-55px_rgba(15,23,42,0.32)] backdrop-blur-[32px] backdrop-saturate-[1.6] transition-[max-height,opacity,transform] duration-500 md:hidden ${
              menuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
            } ${isScrolled ? "translate-y-0" : "translate-y-1"}`}
            style={{ pointerEvents: menuOpen ? "auto" : "none" }}
          >
            <div className="relative px-4 py-4">
              {renderBackdrop(true)}
              <ul className="flex flex-col gap-2 text-base font-medium text-neutral-900">
                {links.map((item) => {
                  const active = activeHref === item.href;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => handleNavClick(item.href)}
                        className={`block rounded-xl px-3 py-2 transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-800/40 ${
                          active
                            ? "bg-neutral-900/10 text-neutral-950"
                            : "text-neutral-700 hover:bg-neutral-900/5 hover:text-neutral-950"
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
        @keyframes liquidCurrent {
          0% {
            transform: translate3d(-6%, -8%, 0) scale(1.05);
          }
          50% {
            transform: translate3d(6%, 5%, 0) scale(1.12);
          }
          100% {
            transform: translate3d(-6%, -8%, 0) scale(1.05);
          }
        }

        @keyframes liquidGlow {
          0% {
            transform: translate3d(4%, 6%, 0) scale(1);
            opacity: 0.35;
          }
          40% {
            opacity: 0.55;
          }
          50% {
            transform: translate3d(-5%, -4%, 0) scale(1.18);
          }
          100% {
            transform: translate3d(4%, 6%, 0) scale(1);
            opacity: 0.35;
          }
        }
      `}</style>
    </header>
  );
}


