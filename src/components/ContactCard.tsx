import EmailReveal from "@/components/EmailReveal";

export default function ContactCard({ title = "Contact" }: { title?: string }) {
  return (
    <div className="rounded-lg border border-neutral-200 p-4 bg-white">
      <div className="text-sm text-neutral-500 mb-2">{title}</div>
      <EmailReveal />
    </div>
  );
}



