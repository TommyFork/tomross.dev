"use client";

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

  return (
    <header className="py-6">
      <nav className="flex items-center justify-between">
        <Link href="/" className="text-sm font-medium tracking-tight">
          Tom Ross
        </Link>
        <ul className="flex items-center gap-5 text-sm">
          {links.map((item) => {
            const active = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={
                    "transition-colors hover:text-neutral-700 " +
                    (active
                      ? "text-neutral-900 visited:text-neutral-900"
                      : "text-neutral-500 visited:text-neutral-500")
                  }
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


