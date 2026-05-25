import Image from "next/image";
import { ReactNode } from "react";
import Card from "./Card";

type ImageCardProps = {
  src: string;
  alt: string;
  children: ReactNode;
};

export default function ImageCard({ src, alt, children }: ImageCardProps) {
  return (
    <div>
      <Card className="p-0 overflow-hidden rounded-b-none">
        <div className="aspect-[3/2] relative w-full">
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(min-width: 1024px) 420px, (min-width: 640px) 576px, calc(100vw - 48px)"
            loading="lazy"
            className="object-cover"
          />
        </div>
      </Card>
      <div className="relative z-10 -mt-8">
        <Card className="rounded border-blue-200 dark:border-blue-900/60 bg-white/90 dark:bg-neutral-900/90 backdrop-blur px-6 py-5 text-center">
          <p className="text-[var(--brightbook-dark-blue)] dark:text-blue-300 text-lg md:text-xl font-medium">
            {children}
          </p>
        </Card>
      </div>
    </div>
  );
}
