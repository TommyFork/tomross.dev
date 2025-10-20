"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useContactModal } from "@/components/ContactModalContext";

const links = [
  { href: "/about", label: "About" },
  { href: "/work", label: "Work" },
  { href: "/writing", label: "Writing" },
];

export default function Nav() {
  const pathname = usePathname();
  const { openModal } = useContactModal();

  return (
    <header className="py-6">
      <nav className="flex items-center justify-between gap-6">
        <Link href="/" className="text-sm font-medium tracking-tight">
          Tom Ross
        </Link>
        <div className="flex items-center gap-5 text-sm">
          <ul className="flex items-center gap-5">
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
          <button
            type="button"
            onClick={openModal}
            className="inline-flex items-center justify-center rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-600 shadow-sm transition hover:-translate-y-[1px] hover:border-neutral-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-200"
          >
            Let’s chat
          </button>
        </div>
      </nav>
    </header>
  );
}


