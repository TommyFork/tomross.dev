import Image from "next/image";
import { Eyebrow } from "./primitives";

export type StackItem = {
  label: string;
  src: string;
};

/** Horizontal "built with" band — logo marks with their names spelled out. */
export default function StackRow({
  items,
  heading = "Built with",
}: {
  items: readonly StackItem[];
  heading?: string;
}) {
  return (
    <div className="rounded-2xl border border-[var(--hairline)] bg-[var(--surface)] px-6 py-6 shadow-[var(--shadow-card)] sm:px-8 sm:py-7">
      <Eyebrow>{heading}</Eyebrow>
      <ul className="mt-5 flex flex-wrap gap-x-8 gap-y-5">
        {items.map((item) => (
          <li
            key={item.label}
            className="group flex items-center gap-3 transition-transform duration-200 ease-out hover:-translate-y-0.5"
          >
            <span className="relative flex h-9 w-9 shrink-0 items-center justify-center">
              <Image
                src={item.src}
                alt=""
                fill
                sizes="36px"
                loading="lazy"
                className="object-contain"
              />
            </span>
            <span className="text-sm font-medium text-[var(--muted)] transition-colors duration-200 group-hover:text-[var(--foreground)]">
              {item.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
