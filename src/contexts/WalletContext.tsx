'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { ConnectionProvider, WalletProvider as SolanaWalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import { toast } from 'react-hot-toast';
import { CustomWalletModal } from '@/components/CustomWalletModal';

// Create context
const WalletContext = createContext<{
  isConnected: boolean;
  setIsConnected: (connected: boolean) => void;
}>({
  isConnected: false,
  setIsConnected: () => {},
});

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);

  // Set up wallet configuration
  const endpoint = useMemo(() => clusterApiUrl('mainnet-beta'), []);
  const wallets = useMemo(() => [new PhantomWalletAdapter()], []);

  // Check local storage for connection state on mount
  useEffect(() => {
    const savedState = localStorage.getItem('walletConnected');
    if (savedState === 'true') {
      setIsConnected(true);
    }
  }, []);

  // Save connection state to local storage
  useEffect(() => {
    localStorage.setItem('walletConnected', isConnected.toString());
    if (isConnected) {
      toast.success('Wallet connected successfully!');
    }
  }, [isConnected]);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <SolanaWalletProvider wallets={wallets} autoConnect={true}>
        <WalletModalProvider>
          <WalletContext.Provider value={{ isConnected, setIsConnected }}>
            {children}
          </WalletContext.Provider>
          <CustomWalletModal />
        </WalletModalProvider>
      </SolanaWalletProvider>
    </ConnectionProvider>
  );
}

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}; 