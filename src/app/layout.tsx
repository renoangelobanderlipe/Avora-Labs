import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { THEME_STORAGE_KEY } from "./theme";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const TITLE = "Avora Labs — Little apps and tools that make big differences";
const DESCRIPTION =
  "Avora Labs is where Reno builds software for people — on the web, the App Store, and Google Play.";

export const metadata: Metadata = {
  metadataBase: new URL("https://avoralabs.dev"),
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://avoralabs.dev",
    siteName: "Avora Labs",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Avora Labs",
  url: "https://avoralabs.dev",
  logo: "https://avoralabs.dev/images/avora-icon.png",
  description: DESCRIPTION,
};

const THEME_INIT_SCRIPT = `
(function () {
  try {
    var theme = localStorage.getItem("${THEME_STORAGE_KEY}") || "light";
    document.documentElement.setAttribute("data-theme", theme);
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable}`} suppressHydrationWarning>
      <head>
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: trusted inline script, sets theme before paint to avoid flash */}
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: trusted static JSON-LD, no user input
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(ORGANIZATION_JSON_LD),
          }}
        />
      </head>
      <body className="min-h-full" suppressHydrationWarning>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
