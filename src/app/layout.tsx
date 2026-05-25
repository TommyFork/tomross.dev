import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  alternates: {
    canonical: "https://tomross.dev",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isProd = process.env.NODE_ENV === "production";
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var s=localStorage.getItem('theme');var d=window.matchMedia('(prefers-color-scheme:dark)').matches;if(s==='dark'||(s===null&&d))document.documentElement.classList.add('dark');})();`,
          }}
        />
      </head>
      <body className="antialiased">
        {isProd && <Analytics />}
        <Providers>
          <div className="min-h-screen flex flex-col">
            <div className="mx-auto w-full max-w-5xl px-6 flex-1 flex flex-col">
              <Nav />
              <main className="flex-1 flex flex-col">{children}</main>
            </div>
            <div className="mx-auto w-full max-w-5xl px-6">
              <Footer />
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
