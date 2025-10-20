"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

type ShufflingImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  scaleModifier?: number;
};

type ShufflingGalleryProps = {
  images: ShufflingImage[];
  className?: string;
};

export default function ShufflingGallery({
  images: initialImages,
  className,
}: ShufflingGalleryProps) {
  const [images, setImages] = useState(initialImages);
  const [viewport, setViewport] = useState<"mobile" | "tablet" | "desktop">(
    "desktop",
  );

  useEffect(() => {
    const getViewport = () => {
      if (typeof window === "undefined") return "desktop" as const;
      const width = window.innerWidth;
      if (width < 640) return "mobile" as const;
      if (width < 1024) return "tablet" as const;
      return "desktop" as const;
    };

    const updateViewport = () => {
      setViewport(getViewport());
    };

    updateViewport();

    window.addEventListener("resize", updateViewport);
    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setImages((prevImages) => {
        const newImages = [...prevImages];
        const first = newImages.shift();
        if (first) {
          newImages.push(first);
        }
        return newImages;
      });
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  const galleryHeight =
    viewport === "mobile" ? 360 : viewport === "tablet" ? 440 : 560;
  const horizontalOffset = viewport === "desktop" ? 24 : viewport === "tablet" ? 16 : 0;
  const verticalOffset = viewport === "mobile" ? 12 : 20;
  const rotation = viewport === "desktop" ? 3.5 : viewport === "tablet" ? 2.5 : 0;
  const secondScale = viewport === "desktop" ? 0.85 : viewport === "tablet" ? 0.82 : 0.8;
  const thirdScale = viewport === "desktop" ? 0.75 : viewport === "tablet" ? 0.72 : 0.7;

  return (
    <div
      className={`relative w-full ${className ? className : ""} mx-auto`}
      style={{ height: galleryHeight }}
    >
      <AnimatePresence>
        {images.map((image, i) => {
          if (i > 2) return null;

          const isTop = i === 0;
          const isSecond = i === 1;
          const isThird = i === 2;

          const baseScale = isTop
            ? 1
            : isSecond
            ? secondScale
            : thirdScale;
          const scale = baseScale * (image.scaleModifier || 1);

          return (
            <motion.div
              key={image.src}
              className="absolute w-full h-full origin-bottom"
              style={{
                zIndex: images.length - i,
              }}
              initial={{
                opacity: 0,
                y: 0,
                scale: 1,
                rotate: 0,
              }}
              animate={{
                opacity: 1,
                y: isTop ? 0 : -i * verticalOffset,
                x: isSecond ? -horizontalOffset : isThird ? horizontalOffset : 0,
                scale,
                rotate: isSecond ? -rotation : isThird ? rotation : 0,
                transition: {
                  type: "spring",
                  stiffness: 110,
                  damping: 20,
                },
              }}
              exit={{
                y: 60,
                scale: 0.85,
                rotate: isTop ? rotation + 2.5 : 0,
                opacity: 0,
                transition: {
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1], // easeOutQuint
                },
              }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                className="w-full h-auto object-cover rounded-xl shadow-2xl"
                priority={i < 2}
              />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
