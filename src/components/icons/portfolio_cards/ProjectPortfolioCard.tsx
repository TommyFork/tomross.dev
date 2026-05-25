import { ReactNode } from "react";
import Image from "next/image";

interface ProjectPortfolioCardProps {
  logoUrl: string;
  logoDarkUrl?: string;
  logoAlt: string;
  description: ReactNode;
  scopeText: ReactNode;
  projectColor: string;
  projectDarkColor: string;
  leftColumnContent: ReactNode;
  rightColumnContent: ReactNode;
  footerNote?: ReactNode;
}

export default function ProjectPortfolioCard({
  logoUrl,
  logoDarkUrl,
  logoAlt,
  description,
  scopeText,
  projectColor,
  projectDarkColor,
  leftColumnContent,
  rightColumnContent,
  footerNote,
}: ProjectPortfolioCardProps) {
  const gradientStyle = {
    background: `linear-gradient(to right, color-mix(in srgb, var(${projectColor}) 16%, transparent), var(--background))`,
  } as const;

  const headingStyle = { color: `var(${projectDarkColor})` } as const;

  return (
    <div className="w-full space-y-10 sm:space-y-12 md:space-y-16">
      <div className="space-y-4 md:space-y-6">
        <div className="relative h-14 w-full max-w-[260px] sm:max-w-[280px]">
          <Image
            src={logoUrl}
            alt={logoAlt}
            fill
            className={`object-contain object-left ${logoDarkUrl ? "dark:hidden" : ""}`}
            sizes="(min-width: 640px) 280px, 240px"
            loading="lazy"
          />
          {logoDarkUrl && (
            <Image
              src={logoDarkUrl}
              alt={logoAlt}
              fill
              className="object-contain object-left hidden dark:block"
              sizes="(min-width: 640px) 280px, 240px"
              loading="lazy"
            />
          )}
        </div>
        <p className="text-base leading-relaxed text-gray-700 dark:text-neutral-300 md:text-[15px]">
          {description}
        </p>
      </div>

      <div
        className="rounded-2xl border border-[#393976]/[0.1] dark:border-neutral-700/50 px-6 py-7 shadow-[0_16px_60px_rgba(57,57,118,0.08)] dark:shadow-[0_16px_60px_rgba(0,0,0,0.3)] sm:px-8 sm:py-8 md:px-10 md:py-9"
        style={gradientStyle}
      >
        <div className="space-y-3 md:space-y-4">
          <h3 className="text-xl font-medium md:text-2xl" style={headingStyle}>
            Project Role
          </h3>
          <p className="text-base leading-7 text-black dark:text-neutral-200 md:text-[15px]">
            {scopeText}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:gap-8 md:gap-10 lg:grid-cols-12 xl:gap-12">
        <div className="space-y-5 sm:space-y-6 md:space-y-8 lg:col-span-6 xl:col-span-5">
          {leftColumnContent}
        </div>

        <div className="flex justify-center lg:col-span-6 lg:justify-end xl:col-span-7">
          <div className="w-full max-w-md sm:max-w-xl xl:max-w-2xl">{rightColumnContent}</div>
        </div>
      </div>

      {footerNote && (
        <div className="mt-12 border-t border-gray-200/70 dark:border-neutral-700/70 pt-9 md:mt-14 md:pt-11 lg:mt-20 lg:pt-14 xl:mt-24 xl:pt-16">
          <p className="text-xs text-gray-500 dark:text-neutral-400 md:text-sm">{footerNote}</p>
        </div>
      )}
    </div>
  );
}
