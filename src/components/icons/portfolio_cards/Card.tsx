import { ReactNode } from "react";

type CardProps = {
  className?: string;
  children: ReactNode;
};

export default function Card({ className, children }: CardProps) {
  return (
    <div
      className={`rounded-xl border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 ${
        className ?? ""
      }`}
    >
      {children}
    </div>
  );
}
