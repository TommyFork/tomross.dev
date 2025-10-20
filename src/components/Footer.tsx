import Link from "next/link";
import { GitHubIcon, LinkedInIcon, XIcon } from "@/components/icons/SocialIcons";

export default function Footer() {
  return (
    <footer className="py-10 text-sm text-neutral-500">
      <div className="flex items-center justify-between">
        <p>© {new Date().getFullYear()} Tom Ross</p>
        <div className="flex gap-5 text-neutral-700">
          <Link href="https://github.com/tommyross" target="_blank" rel="noreferrer noopener" aria-label="GitHub" className="hover:text-neutral-900">
            <GitHubIcon width={20} height={20} />
          </Link>
          <Link href="https://www.linkedin.com/in/tomross" target="_blank" rel="noreferrer noopener" aria-label="LinkedIn" className="hover:text-neutral-900">
            <LinkedInIcon width={20} height={20} />
          </Link>
          <Link href="https://x.com/tommyross" target="_blank" rel="noreferrer noopener" aria-label="X" className="hover:text-neutral-900">
            <XIcon width={20} height={20} />
          </Link>
        </div>
      </div>
    </footer>
  );
}


