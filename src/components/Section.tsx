import { ReactNode } from "react";

export default function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="py-10">
      <h2 className="text-xl font-medium tracking-tight mb-4">{title}</h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}


