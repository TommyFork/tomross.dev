"use client";
import { ReactNode } from "react";
import Image from "next/image";

interface ProjectPortfolioCardProps {
  logoUrl: string;
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
  logoAlt,
  description,
  scopeText,
  projectColor,
  projectDarkColor,
  leftColumnContent,
  rightColumnContent,
  footerNote,
}: ProjectPortfolioCardProps) {
  return (
    <div className="w-full">
      {/* Header */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="pt-6">
          <div className="h-14 relative w-full max-w-[260px]">
            <Image
              src={logoUrl}
              alt={logoAlt}
              fill
              className="object-contain object-left"
              sizes="260px"
              priority
            />
          </div>
          <p className="mt-4 text-md md:text-base leading-6 text-gray-700">
            {description}
          </p>
        </div>
      </div>

      {/* Technical & Venture Scope */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 mt-6">
        <div
          className="rounded-lg border-[0.5px] border-[#393976]/[0.1] px-10 py-8"
          style={{
            background: `linear-gradient(to right, rgba(var(--brightbook-blue-rgb), 0.15), rgb(255, 255, 255))`,
          }}
        >
          <h3
            className="font-medium text-xl md:text-2xl"
            style={{ color: `var(--brightbook-dark-blue)` }}
          >
            Project Role
          </h3>
          <p className="mt-3 text-md md:text-[15px] leading-7 text-black">
            {scopeText}
          </p>
        </div>
      </div>

      {/* Body Grid */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 mt-6 grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-12">
        {/* Left column */}
        <div className="space-y-6 md:space-y-8 lg:col-span-6 xl:col-span-5">
          {leftColumnContent}
        </div>

        {/* Right column */}
        <div className="lg:col-span-6 xl:col-span-7">{rightColumnContent}</div>
      </div>

      {footerNote && (
        <div className="mx-auto max-w-2xl px-4 sm:px-6 mt-20">
          <p className="text-xs text-gray-500">{footerNote}</p>
        </div>
      )}
    </div>
  );
}
