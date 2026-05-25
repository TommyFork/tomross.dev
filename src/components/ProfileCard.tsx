import Image from "next/image";
import Link from "next/link";
import ContactModalLink from "@/components/ContactModalLink";
import {
  GitHubIcon,
  LinkedInIcon,
  EnvelopeIcon,
} from "@/components/icons/SocialIcons";

export default function ProfileCard() {
  return (
    <div className="rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 p-6 flex flex-col items-center gap-4">
      <div className="rounded-full overflow-hidden w-32 h-32 border border-neutral-200 dark:border-neutral-700">
        <Image
          src="/headshot.jpeg"
          alt="Headshot"
          width={128}
          height={128}
          sizes="128px"
          priority
        />
      </div>
      <div className="text-center">
        <div className="font-medium">Tommy Ross</div>
        <div className="text-sm text-neutral-500 dark:text-neutral-400">Full‑Stack Product Engineer</div>
      </div>
      <div className="flex items-center gap-4 text-sm text-neutral-700 dark:text-neutral-300">
        <Link
          href="https://github.com/TommyFork"
          target="_blank"
          rel="noreferrer noopener"
          className="hover:text-neutral-900 dark:hover:text-white"
          aria-label="GitHub"
        >
          <GitHubIcon />
        </Link>
        <Link
          href="https://www.linkedin.com/in/rosstommy/"
          target="_blank"
          rel="noreferrer noopener"
          className="hover:text-neutral-900 dark:hover:text-white"
          aria-label="LinkedIn"
        >
          <LinkedInIcon />
        </Link>
        <ContactModalLink
          href="#contact"
          className="hover:text-neutral-900 dark:hover:text-white"
          aria-label="Contact"
        >
          <EnvelopeIcon />
        </ContactModalLink>
      </div>
    </div>
  );
}
