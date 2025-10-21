import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with me for collaborations, product work, or new opportunities.",
};

import ContactCard from "@/components/ContactCard";

export default function Contact() {
  return (
    <div className="py-10">
      <h1 className="text-2xl font-medium tracking-tight mb-6">Contact</h1>
      <div className="max-w-lg">
        <ContactCard />
      </div>
    </div>
  );
}


