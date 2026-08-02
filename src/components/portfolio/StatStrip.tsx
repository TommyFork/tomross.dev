import { ReactNode } from "react";
import AnimatedNumber from "./AnimatedNumber";

export type Stat = {
  /** Counts up when scrolled into view. Use `display` instead for non-numerics. */
  value?: number;
  display?: string;
  prefix?: string;
  suffix?: string;
  label: ReactNode;
};

const columns: Record<number, string> = {
  1: "sm:grid-cols-1",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
};

export default function StatStrip({ stats }: { stats: readonly Stat[] }) {
  return (
    <dl
      className={`grid grid-cols-1 divide-y divide-[var(--hairline)] overflow-hidden rounded-2xl border border-[var(--hairline)] bg-[var(--surface)] shadow-[var(--shadow-card)] sm:divide-x sm:divide-y-0 ${
        columns[stats.length] ?? "sm:grid-cols-3"
      }`}
    >
      {stats.map((stat, index) => (
        <div
          key={index}
          className="flex flex-col items-center gap-2 px-6 py-7 text-center sm:items-start sm:text-left md:px-7 md:py-8"
        >
          <dd className="font-semibold tracking-tight text-[var(--accent-ink)] text-[2rem] leading-none md:text-[2.5rem]">
            {stat.value != null ? (
              <AnimatedNumber
                value={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
              />
            ) : (
              stat.display
            )}
          </dd>
          <dt className="text-sm leading-snug text-[var(--muted)] text-balance">
            {stat.label}
          </dt>
        </div>
      ))}
    </dl>
  );
}
