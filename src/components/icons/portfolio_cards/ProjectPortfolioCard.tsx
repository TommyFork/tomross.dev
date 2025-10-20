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
      <div className="w-full">
        {/* Header */}
        <div className="">
          <motion.div
            className="pt-6"
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
              className="h-14 relative w-full max-w-[260px]"
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
                sizes="260px"
                priority
              />
            </motion.div>
            <motion.p
              className="mt-4 text-md md:text-base leading-6 text-gray-700"
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
        </div>

        {/* Technical & Venture Scope */}
        <div className="mt-6">
          <motion.div
            className="rounded-lg border-[0.5px] border-[#393976]/[0.1] px-10 py-8"
            style={gradientStyle}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewport}
          >
            <motion.h3
              className="font-medium text-xl md:text-2xl"
              style={headingStyle}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={viewport}
            >
              Project Role
            </motion.h3>
            <motion.p
              className="mt-3 text-md md:text-[15px] leading-7 text-black"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={viewport}
              transition={{ duration: 0.55, ease: easing }}
            >
              {scopeText}
            </motion.p>
          </motion.div>
        </div>

        {/* Body Grid */}
        <div className="mt-6 grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-12">
          {/* Left column */}
          <div className="space-y-6 md:space-y-8 lg:col-span-6 xl:col-span-5">
            {leftColumnContent}
          </div>

          {/* Right column */}
          <div className="lg:col-span-6 xl:col-span-7">{rightColumnContent}</div>
        </div>

        {footerNote && (
          <motion.div
            className="mt-40"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewport}
            transition={{ duration: 0.5, ease: easing, delay: 0.1 }}
          >
            <p className="text-xs text-gray-500 text-left">{footerNote}</p>
          </motion.div>
        )}
      </div>
    </MotionConfig>
  );
}
