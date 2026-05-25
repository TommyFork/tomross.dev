"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function AnimatedWorkLink() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href="/portfolio"
      className="rounded-lg border border-neutral-200 dark:border-neutral-700 p-4 hover:shadow-sm hover:-translate-y-[1px] transition-all block relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image
        src="/blue-abstract-gradient.png"
        alt=""
        fill
        sizes="(min-width: 768px) 320px, calc(100vw - 48px)"
        priority
        className={`object-cover transition-transform duration-700 ease-out ${
          isHovered ? "scale-125 translate-x-5" : "scale-105"
        }`}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/0" />

      <div className="relative z-10">
        <div className="text-sm text-white/80">Explore</div>
        <div className="text-lg font-medium mt-1 text-white">
          See my work
        </div>
      </div>
    </Link>
  );
}
