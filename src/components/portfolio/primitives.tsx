import { ReactNode } from "react";

/** Small uppercase label used to head a block of content. */
export function Eyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--muted)] ${
        className ?? ""
      }`}
    >
      {children}
    </p>
  );
}

/** Neutral surface used for every boxed element on the page. */
export function Panel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-[var(--hairline)] bg-[var(--surface)] shadow-[var(--shadow-card)] ${
        className ?? ""
      }`}
    >
      {children}
    </div>
  );
}

/** Pill for stack / focus tags. Picks up the section's --accent. */
export function Chip({ children }: { children: ReactNode }) {
  return (
    <li className="inline-flex items-center gap-1.5 rounded-full border border-[var(--hairline)] bg-[var(--surface)] px-3 py-1.5 text-[13px] font-medium text-[var(--muted)] transition-colors duration-200 hover:border-[color-mix(in_srgb,var(--accent)_45%,transparent)] hover:text-[var(--accent-ink)]">
      <span
        aria-hidden="true"
        className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] opacity-70"
      />
      {children}
    </li>
  );
}

/**
 * Matte frame around a product screenshot, with a soft accent glow beneath so
 * the hero visual reads as the anchor of each case study.
 */
export function Frame({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative ${className ?? ""}`}>
      <div
        aria-hidden="true"
        className="absolute -inset-x-6 -bottom-6 top-8 -z-10 rounded-[32px] bg-[color-mix(in_srgb,var(--accent)_22%,transparent)] blur-3xl opacity-60"
      />
      <div className="overflow-hidden rounded-[20px] border border-[var(--hairline)] bg-[var(--surface-raised)] p-1.5 shadow-[var(--shadow-lifted)] sm:rounded-[24px] sm:p-2">
        <div className="overflow-hidden rounded-[14px] sm:rounded-[18px]">
          {children}
        </div>
      </div>
    </div>
  );
}
