import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Solgazm",
  description: "Made to Orgasm",
  metadataBase: new URL('https://solgazm.vercel.app'),
  openGraph: {
    type: 'website',
    title: 'Solgazm',
    description: 'Made to Orgasm',
    siteName: 'Solgazm',
    images: [
      {
        url: '/SocialSharingImage_Solgazm.png',
        width: 1200,
        height: 630,
        alt: 'Solgazm Share Image',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Solgazm',
    description: 'Made to Orgasm',
    images: ['/SocialSharingImage_Solgazm.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/solgazm-favicon-32x32.png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/solgazm-favicon-32x32.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
