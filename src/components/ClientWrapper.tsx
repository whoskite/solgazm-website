'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import { CursorProvider } from '@/contexts/CursorContext'
import { WalletProvider } from '@/contexts/WalletContext'
import { AudioProvider } from '@/contexts/AudioContext'

// Dynamically import the Cursor component with no SSR
const Cursor = dynamic(() => import('@/components/Cursor'), { ssr: false })

interface ClientWrapperProps {
  children: React.ReactNode
}

const ClientWrapper = ({ children }: ClientWrapperProps) => {
  return (
    <WalletProvider>
      <AudioProvider>
        <CursorProvider>
          <Cursor />
          {children}
        </CursorProvider>
      </AudioProvider>
    </WalletProvider>
  )
}

export default ClientWrapper 