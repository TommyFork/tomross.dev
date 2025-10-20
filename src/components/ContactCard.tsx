import EmailReveal from "@/components/EmailReveal";

type ContactCardProps = {
  title?: string;
  description?: string;
  ctaLabel?: string;
  className?: string;
};

export default function ContactCard({
  title = "Contact",
  description,
  ctaLabel = "Email me",
  className = "",
}: ContactCardProps) {
  const cardClasses =
    "rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm" +
    (className ? ` ${className}` : "");

  return (
    <div className={cardClasses}>
      <div className="text-xs font-semibold uppercase tracking-[0.32em] text-neutral-500">
        {title}
      </div>
      {description && (
        <p className="mt-2 text-sm leading-relaxed text-neutral-600">{description}</p>
      )}
      <div className="mt-4">
        <EmailReveal label={ctaLabel} />
      </div>
    </div>
  );
}



