import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { APP_CONFIG } from "@/lib/constants";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: APP_CONFIG.metadata.title,
  description: APP_CONFIG.metadata.description,
  keywords: APP_CONFIG.metadata.keywords,
  authors: APP_CONFIG.metadata.authors,
  creator: APP_CONFIG.metadata.creator,
  metadataBase: new URL(APP_CONFIG.domain),

  openGraph: {
    title: APP_CONFIG.metadata.title,
    description: APP_CONFIG.metadata.description,
    url: APP_CONFIG.domain,
    siteName: APP_CONFIG.siteName,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: APP_CONFIG.metadata.title,
        type: "image/png",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.className} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute="class">
          <Header />

          <main className="mx-auto min-h-screen w-full px-6 md:max-w-[1280px]">{children}</main>

          <Footer />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
