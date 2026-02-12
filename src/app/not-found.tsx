"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          router.replace("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8 text-center">
      <div className="max-w-md w-full mx-auto space-y-8">
        <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tight mb-6">404</h1>
        <div className="space-y-2">
          <p className="text-2xl md:text-3xl font-medium text-slate-600">Page not found</p>
        </div>
        <Link
          href="/"
          className="inline-flex items-center px-8 py-4 rounded-full border border-slate-200 bg-white shadow-lg text-lg font-semibold text-slate-900 hover:shadow-xl hover:border-slate-300 hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-400/50 focus:ring-offset-2 transition-all duration-200 hover:-translate-y-1 active:scale-95"
        >
          Take me home
        </Link>
        <p className="text-sm text-neutral-500">
          You will be redirected home in{" "}
          <span className="font-bold text-slate-900">{countdown}</span> seconds.
        </p>
      </div>
    </div>
  );
}
