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
            className="object-cover"
          />
        </div>
      </Card>
      <div className="relative z-10 -mt-8">
        <Card className="rounded border-blue-200 bg-white/90 backdrop-blur px-6 py-5 text-center">
          <p className="text-[var(--brightbook-dark-blue)] text-lg md:text-xl font-medium">
            {children}
          </p>
        </Card>
      </div>
    </div>
  );
}
