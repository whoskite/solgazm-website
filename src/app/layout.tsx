import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClientLayout } from "@/components/ClientLayout";
import '@solana/wallet-adapter-react-ui/styles.css';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "World of Gazm",
  description: "Welcome to the World of Gazm",
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
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/solgazm-favicon-32x32.png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/solgazm-favicon-32x32.png" />
      </head>
      <body className={inter.className}>
        <ClientLayout>
          {children}
        </ClientLayout>
        <Toaster 
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#333',
              color: '#fff',
              borderRadius: '8px',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#4ade80',
                secondary: '#333',
              },
            },
          }}
        />
      </body>
    </html>
  );
}
