import type { Metadata } from "next";
import { Playfair_Display, DM_Sans, Dancing_Script } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "700", "800", "900"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const dancingScript = Dancing_Script({
  variable: "--font-accent",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://esc-site-psi.vercel.app"),
  title: "Emotional Support Chicken — Certified Poultry Comfort",
  description:
    "Certified emotional support poultry for the modern, overwhelmed adult. Personalized chicken-human matching, certification packages, and tiny therapeutic vests.",
  openGraph: {
    title: "Emotional Support Chicken — Certified Poultry Comfort",
    description:
      "You deserve a companion who clucks back. Certified emotional support chickens in Calhoun County, AL.",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/images/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Emotional Support Chicken — Certified Poultry Comfort",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Emotional Support Chicken",
    description:
      "Certified emotional support poultry. Tiny vests included.",
    images: ["/images/og-image.webp"],
  },
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${playfair.variable} ${dmSans.variable} ${dancingScript.variable} font-body antialiased`}
      >
        <a href="#main-content" className="skip-link">Skip to main content</a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "LocalBusiness",
                  name: "Emotional Support Chicken",
                  description:
                    "Certified emotional support poultry for the modern, overwhelmed adult. Personalized chicken-human matching, certification packages, and tiny therapeutic vests.",
                  url: "https://emotionalsupportchicken.com",
                  areaServed: {
                    "@type": "Place",
                    name: "Calhoun County, AL",
                  },
                  priceRange: "$149–$749",
                  image: "/images/hero-chicken.webp",
                  creator: {
                    "@type": "Organization",
                    name: "Headley Web & SEO",
                    url: "https://headleyweb.com",
                  },
                },
                {
                  "@type": "FAQPage",
                  mainEntity: [
                    {
                      "@type": "Question",
                      name: "Are chickens actually comforting?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "Science says yes. Chickens produce a low-frequency purr when content that has been shown to reduce cortisol levels in nearby humans.",
                      },
                    },
                    {
                      "@type": "Question",
                      name: "What about the smell?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "Our chickens are professionally groomed and lightly scented with lavender. They smell better than most emotional support dogs.",
                      },
                    },
                    {
                      "@type": "Question",
                      name: "Can I take my chicken on a plane?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "Our certification is recognized by approximately zero airlines. But we provide a very official-looking certificate that might work if you act confident enough.",
                      },
                    },
                    {
                      "@type": "Question",
                      name: "What is the return policy?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "You may return your chicken within 30 days, but we have never had a return. Once you hold a warm chicken in a tiny vest, it is over.",
                      },
                    },
                  ],
                },
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
