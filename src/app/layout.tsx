import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { NextAuthProvider } from "@/components/NextAuthProvider";
import { AIAssistant } from "@/components/AIAssistant";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "DIGIPIN | Enterprise Location Intelligence",
  description: "Decode, generate, and manage locations with precision using the world's most advanced DIGIPIN platform.",
  keywords: ["DIGIPIN", "Location", "Maps", "Coordinates", "GPS", "Location Intelligence", "Logistics", "Routing"],
  authors: [{ name: "DIGIPIN Enterprise" }],
  creator: "DIGIPIN",
  publisher: "DIGIPIN",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://digipin.io"),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'DIGIPIN | Enterprise Location Intelligence',
    description: "Decode, generate, and manage locations with precision using the world's most advanced DIGIPIN platform.",
    url: 'https://digipin.io',
    siteName: 'DIGIPIN',
    images: [
      {
        url: 'https://digipin.io/og-image.png',
        width: 1200,
        height: 630,
        alt: 'DIGIPIN Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DIGIPIN | Enterprise Location Intelligence',
    description: "Decode, generate, and manage locations with precision.",
    creator: '@digipin_app',
    images: ['https://digipin.io/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full antialiased">
      <body className={`${outfit.variable} min-h-full flex flex-col font-sans relative`}>
        <NextAuthProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="bg-blobs">
              <div className="blob blob-1"></div>
              <div className="blob blob-2"></div>
            </div>
            {children}
            <AIAssistant />
          </ThemeProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
