import type { Metadata } from "next";
import WorkContent from "./WorkContent";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Browse my favorite shipped projects.",
};

export default function Work() {
  return <WorkContent />;
}
