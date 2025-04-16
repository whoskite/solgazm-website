'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { ConnectionProvider, WalletProvider as SolanaWalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { 
  PhantomWalletAdapter,
  TrustWalletAdapter
} from '@solana/wallet-adapter-wallets';
import { clusterApiUrl, Connection, Commitment } from '@solana/web3.js';
import { toast } from 'react-hot-toast';
import { WalletError } from '@solana/wallet-adapter-base';

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

  // Set up wallet configuration with proper commitment
  const commitment: Commitment = 'confirmed';
  const endpoint = useMemo(() => clusterApiUrl('mainnet-beta'), []);
  
  // Create connection
  const connection = useMemo(
    () => new Connection(endpoint, { commitment }),
    [endpoint]
  );

  // Initialize wallets with configuration
  const wallets = useMemo(
    () => {
      // Check if we're in Brave browser with Solana wallet
      const isBrave = (window as any)?.solana?.isBraveWallet;
      
      // If we're in Brave, only show Phantom
      // This is because Brave's built-in wallet is detected as Phantom
      if (isBrave) {
        return [new PhantomWalletAdapter()];
      }
      
      // Otherwise show both Phantom and Trust
      return [
        new PhantomWalletAdapter(),
        new TrustWalletAdapter()
      ];
    },
    []
  );

  const handleError = (error: WalletError) => {
    console.error('Wallet error:', error);
    
    if (error.name === 'WalletNotReadyError') {
      toast.error('Please unlock your wallet and try again');
    } else if (error.name === 'WalletConnectionError') {
      toast.error('Failed to connect to wallet. Please try again.');
      setIsConnected(false);
    } else if (error.name === 'WalletDisconnectedError') {
      toast.error('Wallet disconnected. Please reconnect.');
      setIsConnected(false);
    } else if (error.name === 'WalletTimeoutError') {
      toast.error('Wallet connection timed out. Please try again.');
      setIsConnected(false);
    } else if (error.name === 'WalletNotSelectedError') {
      // This is a normal part of the flow, don't show error
      setIsConnected(false);
    } else {
      toast.error(error.message || 'An unexpected wallet error occurred');
      setIsConnected(false);
    }
  };

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
  }, [isConnected]);

  return (
    <ConnectionProvider endpoint={endpoint} config={{ commitment }}>
      <SolanaWalletProvider 
        wallets={wallets}
        autoConnect={false}
        onError={handleError}
      >
        <WalletModalProvider>
          <WalletContext.Provider value={{ isConnected, setIsConnected }}>
            {children}
          </WalletContext.Provider>
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