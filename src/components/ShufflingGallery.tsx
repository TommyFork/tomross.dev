"use client";

import { useState, useEffect } from "react";
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
      {images.slice(0, 3).map((image, i) => {
        const isTop = i === 0;
        const isSecond = i === 1;
        const isThird = i === 2;

        const baseScale = isTop
          ? 1
          : isSecond
            ? secondScale
            : thirdScale;
        const scale = baseScale * (image.scaleModifier || 1);
        const translateY = isTop ? 0 : -i * verticalOffset;
        const translateX = isSecond ? -horizontalOffset : isThird ? horizontalOffset : 0;
        const rotate = isSecond ? -rotation : isThird ? rotation : 0;

        return (
          <div
            key={image.src}
            className="absolute h-full w-full origin-bottom transition-transform duration-500 ease-out"
            style={{
              zIndex: images.length - i,
              transform: `translate3d(${translateX}px, ${translateY}px, 0) rotate(${rotate}deg) scale(${scale})`,
            }}
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              sizes="(min-width: 768px) 576px, calc(100vw - 48px)"
              loading={i === 0 ? "eager" : "lazy"}
              className="h-auto w-full rounded-xl object-cover shadow-2xl"
            />
          </div>
        );
      })}
    </div>
  );
}
