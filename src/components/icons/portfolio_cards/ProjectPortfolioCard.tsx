"use client";
import { ReactNode } from "react";
import { MotionConfig, motion } from "framer-motion";
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
  const viewport = { once: true, amount: 0.65, margin: "-10% 0px" } as const;
  const easing: [number, number, number, number] = [0.33, 1, 0.68, 1];

  const gradientStyle = {
    background: `linear-gradient(to right, color-mix(in srgb, var(${projectColor}) 16%, transparent), #ffffff)`,
  } as const;

  const headingStyle = { color: `var(${projectDarkColor})` } as const;

  return (
    <MotionConfig transition={{ duration: 0.6, ease: easing }}>
      <div className="w-full space-y-12 md:space-y-16">
        {/* Header */}
        <motion.div
          className="space-y-5 md:space-y-6"
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.12 },
            },
          }}
        >
          <motion.div
            className="relative h-14 w-full max-w-[260px] sm:max-w-[280px]"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { duration: 0.55 },
              },
            }}
          >
            <Image
              src={logoUrl}
              alt={logoAlt}
              fill
              className="object-contain object-left"
              sizes="(min-width: 640px) 280px, 240px"
              priority
            />
          </motion.div>
          <motion.p
            className="text-base leading-relaxed text-gray-700 md:text-[15px]"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { duration: 0.55 },
              },
            }}
          >
            {description}
          </motion.p>
        </motion.div>

        {/* Technical & Venture Scope */}
        <motion.div
          className="rounded-2xl border border-[#393976]/[0.1] px-8 py-8 shadow-[0_16px_60px_rgba(57,57,118,0.08)] md:px-10 md:py-9"
          style={gradientStyle}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewport}
        >
          <motion.div
            className="space-y-3 md:space-y-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewport}
            transition={{ duration: 0.55, ease: easing }}
          >
            <motion.h3
              className="text-xl font-medium md:text-2xl"
              style={headingStyle}
            >
              Project Role
            </motion.h3>
            <motion.p className="text-base leading-7 text-black md:text-[15px]">
              {scopeText}
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Body Grid */}
        <div className="grid grid-cols-1 gap-8 md:gap-10 lg:grid-cols-12 xl:gap-12">
          {/* Left column */}
          <div className="space-y-6 md:space-y-8 lg:col-span-6 xl:col-span-5">
            {leftColumnContent}
          </div>

          {/* Right column */}
          <div className="flex justify-center lg:col-span-6 lg:justify-end xl:col-span-7">
            <div className="w-full max-w-xl xl:max-w-2xl">{rightColumnContent}</div>
          </div>
        </div>

        {footerNote && (
          <motion.div
            className="mt-12 border-t border-gray-200/70 pt-9 md:mt-14 md:pt-11"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewport}
            transition={{ duration: 0.5, ease: easing, delay: 0.1 }}
          >
            <p className="text-xs text-gray-500 md:text-sm">{footerNote}</p>
          </motion.div>
        )}
      </div>
    </MotionConfig>
  );
}
