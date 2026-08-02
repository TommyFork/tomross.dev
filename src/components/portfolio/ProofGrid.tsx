import Image from "next/image";
import { ReactNode } from "react";
import { Panel } from "./primitives";
import Reveal from "./Reveal";

export type Proof =
  | { kind: "photo"; src: string; alt: string; caption: ReactNode }
  | {
      kind: "credential";
      src: string;
      darkSrc?: string;
      alt: string;
      caption: ReactNode;
    };

function CredentialMark({
  src,
  darkSrc,
  alt,
  className,
}: {
  src: string;
  darkSrc?: string;
  alt: string;
  className: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="240px"
        loading="lazy"
        className={`object-contain ${darkSrc ? "dark:hidden" : ""}`}
      />
      {darkSrc && (
        <Image
          src={darkSrc}
          alt={alt}
          fill
          sizes="240px"
          loading="lazy"
          className="hidden object-contain dark:block"
        />
      )}
    </div>
  );
}

function Caption({ children }: { children: ReactNode }) {
  return (
    <p className="text-[15px] font-medium leading-snug text-[var(--foreground)] text-balance">
      {children}
    </p>
  );
}

function ProofCard({ proof }: { proof: Proof }) {
  if (proof.kind === "credential") {
    return (
      <Panel className="flex h-full flex-col items-center justify-center gap-5 px-6 py-9 text-center">
        <CredentialMark
          src={proof.src}
          darkSrc={proof.darkSrc}
          alt={proof.alt}
          className="h-16 w-40 sm:h-20 sm:w-48"
        />
        <Caption>{proof.caption}</Caption>
      </Panel>
    );
  }

  return (
    <Panel className="group h-full overflow-hidden p-0">
      <div className="relative aspect-[3/2] w-full overflow-hidden">
        <Image
          src={proof.src}
          alt={proof.alt}
          fill
          sizes="(min-width: 1024px) 320px, (min-width: 640px) 45vw, calc(100vw - 48px)"
          loading="lazy"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      </div>
      <div className="px-5 py-5">
        <Caption>{proof.caption}</Caption>
      </div>
    </Panel>
  );
}

export default function ProofGrid({ proofs }: { proofs: readonly Proof[] }) {
  if (proofs.length === 0) return null;

  // A lone credential reads better as a wide banner than as an orphaned column.
  if (proofs.length === 1 && proofs[0].kind === "credential") {
    const proof = proofs[0];
    return (
      <Reveal>
        <Panel className="flex flex-col items-center gap-6 px-7 py-8 text-center sm:flex-row sm:gap-10 sm:px-10 sm:text-left">
          <CredentialMark
            src={proof.src}
            darkSrc={proof.darkSrc}
            alt={proof.alt}
            className="h-16 w-44 shrink-0 sm:h-20 sm:w-52"
          />
          <div
            aria-hidden="true"
            className="hidden h-16 w-px shrink-0 bg-[var(--hairline)] sm:block"
          />
          <p className="text-lg font-medium leading-snug text-[var(--foreground)] text-balance">
            {proof.caption}
          </p>
        </Panel>
      </Reveal>
    );
  }

  return (
    <div
      className={`grid grid-cols-1 gap-5 sm:grid-cols-2 ${
        proofs.length % 3 === 0 ? "lg:grid-cols-3" : ""
      }`}
    >
      {proofs.map((proof, index) => (
        <Reveal key={proof.src} delay={index * 90} className="h-full">
          <ProofCard proof={proof} />
        </Reveal>
      ))}
    </div>
  );
}
