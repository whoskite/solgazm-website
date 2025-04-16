'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import { CursorProvider } from '@/contexts/CursorContext'
import { SolanaWalletProvider } from '@/components/WalletProvider'
import { AudioProvider } from '@/contexts/AudioContext'
import { CustomWalletModal } from '@/components/CustomWalletModal'

// Dynamically import the Cursor component with no SSR
const Cursor = dynamic(() => import('@/components/Cursor'), { ssr: false })

interface ClientWrapperProps {
  children: React.ReactNode
}

const ClientWrapper = ({ children }: ClientWrapperProps) => {
  return (
    <SolanaWalletProvider>
      <AudioProvider>
        <CursorProvider>
          <Cursor />
          {children}
          <CustomWalletModal />
        </CursorProvider>
      </AudioProvider>
    </SolanaWalletProvider>
  )
}

export default ClientWrapper 