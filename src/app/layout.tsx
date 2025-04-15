import './globals.css'
import '@solana/wallet-adapter-react-ui/styles.css'
import dynamic from 'next/dynamic'
import React from 'react'

// Dynamically import ClientWrapper to avoid SSR issues
const ClientWrapper = dynamic(() => import('../components/ClientWrapper'), {
  ssr: false
})

export const metadata = {
  title: 'SOLGAZM',
  description: 'SOLGAZM NFT Collection',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ClientWrapper>
          {children}
        </ClientWrapper>
      </body>
    </html>
  )
}
