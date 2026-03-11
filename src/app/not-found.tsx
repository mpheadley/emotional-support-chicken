import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 — This Chicken Has Flown the Coop",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#2D2D2D] to-[#1a1a1a] text-white px-6">
      <div className="text-center max-w-lg">
        <p className="text-8xl mb-6" aria-hidden="true">
          🐔
        </p>
        <p className="text-sm font-semibold uppercase tracking-widest text-neutral-400 mb-2">
          Error 404
        </p>
        <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
          This Chicken Has Flown the Coop
        </h1>
        <p className="text-lg text-neutral-300 mb-8 leading-relaxed">
          The page you&apos;re looking for has wandered off. Even certified
          emotional support chickens can&apos;t help you find it.
        </p>
        <Link href="/" className="btn-primary">
          Back to the Coop
        </Link>
      </div>
    </div>
  );
}
