import type { Metadata } from "next";
import { Montserrat, Caveat, Instrument_Serif } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { LogRocketInit } from "@/components/LogRocketInit";
import { ModeProvider } from "@/components/mode/ModeProvider";
import { SmoothScrollProvider } from "@/components/motion/SmoothScrollProvider";
import "./globals.css";
import "@/styles/mode-see.css";
import "@/styles/mode-read.css";
import "@/styles/case-study.css";
import "@/styles/pages.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-montserrat",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-caveat",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
});

export const metadata: Metadata = {
  title: "Charen - Product Designer",
  description: "Product Designer specializing in AI-powered access management solutions and 0-1 product development",
  authors: [{ name: "Charen" }],
  openGraph: {
    type: "website",
    title: "Charen - Product Designer Portfolio",
    description: "Product designer building AI-powered access management solutions",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning: the inline script below mutates data-mode on
    // <html> before hydration when a stored "see" preference exists.
    <html lang="en" data-mode="read" suppressHydrationWarning>
      <body
        className={`${montserrat.variable} ${caveat.variable} ${instrumentSerif.variable} antialiased`}
      >
        <script
          // Pre-paint mode restore: read is the default landing mode; strip
          // the attribute for visitors who previously chose "see", with no
          // flash of the "read" default.
          dangerouslySetInnerHTML={{
            __html:
              "try{if(localStorage.getItem('portfolio-mode')==='see')delete document.documentElement.dataset.mode}catch(e){}",
          }}
        />
        <ModeProvider>
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
        </ModeProvider>
        <LogRocketInit />
      </body>
      <GoogleAnalytics gaId="G-BCJZTX3QTN" />
    </html>
  );
}
