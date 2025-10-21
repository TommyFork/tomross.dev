import type { Metadata } from "next";
import WorkContent from "./WorkContent";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Browse my case studies and shipped projects as a full-stack developer.",
};

export default function Work() {
  return <WorkContent />;
}
