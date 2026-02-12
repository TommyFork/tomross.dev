import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { Providers } from "./providers";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tomross.dev"),
  title: {
    default: "Tommy Ross — Full‑Stack Developer",
    template: "%s — Tommy Ross",
  },
  description:
    "I'm a full-stack developer building polished, data-driven products and experiences.",
  keywords: [
    "Tommy Ross",
    "Full-stack developer",
    "Product engineer",
    "React",
    "Next.js",
    "Boston",
  ],
  authors: [{ name: "Tommy Ross", url: "https://tomross.dev" }],
  openGraph: {
    title: "Tommy Ross — Full‑Stack Developer",
    description:
      "Explore my portfolio of full-stack product work, writing, and ways to get in touch.",
    url: "https://tomross.dev",
    siteName: "Tommy Ross",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/headshot.jpeg",
        width: 1024,
        height: 1024,
        alt: "Portrait of me, Tommy Ross",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tommy Ross — Full‑Stack Developer",
    description:
      "Explore my portfolio of full-stack product work, writing, and ways to get in touch.",
    creator: "@tommytelos",
  },
  alternates: {
    canonical: "https://tomross.dev",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const isProd = process.env.NODE_ENV === "production";
  return (
    &lt;html lang="en" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning&gt;
      &lt;body className="antialiased"&gt;
        {isProd &amp;&amp; (
          &lt;&gt;
            {gaId &amp;&amp; (
              &lt;&gt;
                &lt;Analytics /&gt;
                &lt;Script
                  src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
                  strategy="afterInteractive"
                /&gt;
                &lt;Script id="google-analytics" strategy="afterInteractive"&gt;
                  {`
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);} 
                  gtag('js', new Date());
                  gtag('config', '${gaId}');
                `}
                &lt;/Script&gt;
              &lt;/&gt;
            )}
          &lt;/&gt;
        )}
        &lt;Providers&gt;
          &lt;div className="min-h-screen flex flex-col bg-background text-foreground"&gt;
            &lt;div className="mx-auto w-full max-w-5xl px-6 flex-1 flex flex-col"&gt;
              &lt;Nav /&gt;
              &lt;main className="flex-1 flex flex-col"&gt;{children}&lt;/main&gt;
            &lt;/div&gt;
            &lt;div className="mx-auto w-full max-w-5xl px-6"&gt;
              &lt;Footer /&gt;
            &lt;/div&gt;
          &lt;/div&gt;
        &lt;/Providers&gt;
      &lt;/body&gt;
    &lt;/html&gt;
  );
}
