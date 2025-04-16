'use client';

import { FC, ReactNode, useMemo, useCallback, useState, createContext, useContext, useEffect } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { 
  PhantomWalletAdapter,
  SolflareWalletAdapter
} from '@solana/wallet-adapter-wallets';
import { WalletModalProvider, useWalletModal } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import { toast } from 'react-hot-toast';

// Default styles that can be overridden by your app
require('@solana/wallet-adapter-react-ui/styles.css');

interface Props {
  children: ReactNode;
}

// Create a context to share the custom visibility state
const CustomWalletModalContext = createContext<{
  visible: boolean;
  setVisible: (visible: boolean) => void;
}>({
  visible: false,
  setVisible: () => undefined,
});

// Hook to use the custom wallet modal visibility
export const useCustomWalletModal = () => useContext(CustomWalletModalContext);

// This custom provider prevents the default wallet modal from showing
// while still providing the wallet modal context for our custom modal
const NoModalWalletProvider: FC<{ children: ReactNode }> = ({ children }) => {
  // Manage our own visibility state
  const [visible, setVisible] = useState(false);
  
  // Get the default modal context to override it
  const defaultWalletModal = useWalletModal();
  
  // Override the default modal's visibility with our own
  useEffect(() => {
    // Hide the default modal whenever it might appear
    if (defaultWalletModal.visible) {
      defaultWalletModal.setVisible(false);
    }
  }, [defaultWalletModal.visible]);
  
  return (
    <CustomWalletModalContext.Provider value={{ visible, setVisible }}>
      {children}
    </CustomWalletModalContext.Provider>
  );
};

export const SolanaWalletProvider: FC<Props> = ({ children }) => {
  // Use the standard RPC endpoint - avoid custom endpoints that might cause issues
  const endpoint = useMemo(() => clusterApiUrl(WalletAdapterNetwork.Mainnet), []);

  // Simple wallet configuration - avoid excess options that might conflict
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter()
    ],
    []
  );

  // Simple error handler
  const onError = useCallback(
    (error: Error) => {
      console.error('Wallet error:', error);
      toast.error(`Wallet error: ${error.message}`);
    },
    []
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider 
        wallets={wallets} 
        autoConnect={false}
        onError={onError}
      >
        <WalletModalProvider>
          <NoModalWalletProvider>
            {children}
          </NoModalWalletProvider>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}; 