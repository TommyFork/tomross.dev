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

  return (
    <div className={`relative h-[560px] w-full ${className}`}>
      <AnimatePresence>
        {images.map((image, i) => {
          if (i > 2) return null;

          const isTop = i === 0;
          const isSecond = i === 1;
          const isThird = i === 2;

          const baseScale = isTop ? 1 : isSecond ? 0.8 : 0.7;
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
                y: isTop ? 0 : -i * 20,
                x: isSecond ? -20 : isThird ? 20 : 0,
                scale,
                rotate: isSecond ? -3.5 : isThird ? 3.5 : 0,
                transition: {
                  type: "spring",
                  stiffness: 110,
                  damping: 20,
                },
              }}
              exit={{
                y: 60,
                scale: 0.85,
                rotate: isTop ? 6 : 0,
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
