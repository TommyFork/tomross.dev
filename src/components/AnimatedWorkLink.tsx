"use client";

import Link from "next/link";
import { useState } from "react";

export default function AnimatedWorkLink() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href="/work"
      className="rounded-lg border border-neutral-200 p-4 hover:shadow-sm hover:-translate-y-[1px] transition-all block relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Static background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0)), url(/blue-abstract-gradient.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: isHovered ? 0 : 1,
          transition: "opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      />
      
      {/* Animated background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0)), url(/blue-abstract-gradient.png)",
          backgroundSize: "200%",
          backgroundPosition: "0% center",
          opacity: isHovered ? 1 : 0,
          animation: isHovered 
            ? "smoothPanAndFocus 1.5s cubic-bezier(0.25, 0.1, 0.25, 1) forwards" 
            : "slideBackToStart 1s cubic-bezier(0.4, 0, 0.2, 1) forwards",
          transition: "opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        <div className="text-sm text-white/80">Explore</div>
        <div className="text-base text-lg font-medium mt-1 text-white">
          See my work
        </div>
      </div>

      <style jsx>{`
        @keyframes smoothPanAndFocus {
          0% {
            background-position: 0% center;
            background-size: 200%;
          }
          100% {
            background-position: 100% center;
            background-size: 140%;
          }
        }

        @keyframes slideBackToStart {
          0% {
            background-position: 100% center;
            background-size: 140%;
          }
          100% {
            background-position: 0% center;
            background-size: 200%;
          }
        }
      `}</style>
    </Link>
  );
}

