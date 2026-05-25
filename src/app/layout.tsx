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
    default: "Tommy Ross — Full‑Stack Product Engineer",
    template: "%s — Tommy Ross",
  },
  description:
    "I'm a full-stack engineer  building polished, data-driven products and experiences.",
  keywords: [
    "Tommy Ross",
    "Full-stack engineer",
    "Product engineer",
    "React",
    "Next.js",
    "Boston",
  ],
  authors: [{ name: "Tommy Ross", url: "https://tomross.dev" }],
  openGraph: {
    title: "Tommy Ross — Full‑Stack Product Engineer",
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
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
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
        {isProd && (
          <>
            <Analytics />
            {gaId && (
              <>
                <Script
                  src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
                  strategy="afterInteractive"
                />
                <Script id="google-analytics" strategy="afterInteractive">
                  {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaId}');`}
                </Script>
              </>
            )}
          </>
        )}
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
