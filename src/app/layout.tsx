import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tom Ross — Full‑Stack Developer",
  description: "Portfolio, work, writing, and contact.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="min-h-screen flex flex-col">
          <div className="mx-auto w-full max-w-5xl px-6 flex-1 flex flex-col">
            <Nav />
            <main className="flex-1 flex flex-col">{children}</main>
          </div>
          <div className="mx-auto w-full max-w-5xl px-6">
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
