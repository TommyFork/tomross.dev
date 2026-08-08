"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GitHubIcon, LinkedInIcon } from "@/components/icons/SocialIcons";
import { SOCIAL_LINKS } from "@/lib/social-links";

export default function Footer() {
  const isAboutPage = usePathname() === "/";

  return (
    <footer className="relative py-10 text-sm text-neutral-500 dark:text-neutral-400">
      <div
        className={`flex items-center justify-between ${
          isAboutPage ? "border-t border-neutral-200/70 dark:border-neutral-700/70 pt-10" : ""
        }`}
      >
        <p>© {new Date().getFullYear()} Tommy Ross</p>
        <div className="flex items-center gap-5 text-neutral-700 dark:text-neutral-300">
          <Link
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="GitHub"
            className="transition-colors duration-150 hover:text-neutral-900 dark:hover:text-white"
          >
            <GitHubIcon width={20} height={20} />
          </Link>
          <Link
            href={SOCIAL_LINKS.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="LinkedIn"
            className="transition-colors duration-150 hover:text-neutral-900 dark:hover:text-white"
          >
            <LinkedInIcon width={20} height={20} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
