import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Avora Labs — Little apps and tools that make big differences",
  description:
    "Avora Labs is where Reno builds software for people — on the web, the App Store, and Google Play.",
};

const THEME_INIT_SCRIPT = `
(function () {
  try {
    var theme = localStorage.getItem("avora-theme") || "light";
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
      </head>
      <body className="min-h-full" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
