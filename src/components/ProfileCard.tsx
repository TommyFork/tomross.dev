import Image from "next/image";
import Link from "next/link";
import {
  GitHubIcon,
  LinkedInIcon,
  XIcon,
} from "@/components/icons/SocialIcons";

export default function ProfileCard() {
  return (
    <div className="rounded-lg border border-neutral-200 p-6 flex flex-col items-center gap-4">
      <div className="rounded-full overflow-hidden w-32 h-32 border border-neutral-200">
        <Image src="/headshot.jpeg" alt="Headshot" width={128} height={128} />
      </div>
      <div className="text-center">
        <div className="font-medium">Tom Ross</div>
        <div className="text-sm text-neutral-500">Full‑Stack Developer</div>
      </div>
      <div className="flex items-center gap-4 text-sm text-neutral-700">
        <Link
          href="https://github.com/tommyross"
          target="_blank"
          rel="noreferrer noopener"
          className="hover:text-neutral-900"
          aria-label="GitHub"
        >
          <GitHubIcon />
        </Link>
        <Link
          href="https://www.linkedin.com/in/tomross"
          target="_blank"
          rel="noreferrer noopener"
          className="hover:text-neutral-900"
          aria-label="LinkedIn"
        >
          <LinkedInIcon />
        </Link>
        <Link
          href="https://x.com/tommyross"
          target="_blank"
          rel="noreferrer noopener"
          className="hover:text-neutral-900"
          aria-label="X"
        >
          <XIcon />
        </Link>
      </div>
    </div>
  );
}
