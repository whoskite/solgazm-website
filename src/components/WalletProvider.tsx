'use client';

import { FC, ReactNode, useMemo, useCallback, useState, createContext, useContext, useEffect } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { 
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  LedgerWalletAdapter,
  TorusWalletAdapter,
  TrustWalletAdapter
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
  // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
  const network = WalletAdapterNetwork.Mainnet;
  
  // You can also provide a custom RPC endpoint.
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking and lazy loading.
  // Only the wallets you configure here will be compiled into your application, and only the dependencies
  // of wallets that your users connect to will be loaded.
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter({ network }),

      new TorusWalletAdapter(),
      new TrustWalletAdapter()
    ],
    [network]
  );

  // Comprehensive error handler that shows more helpful error messages
  const onError = useCallback(
    (error: Error) => {
      console.error('Wallet connection error:', error);
      
      let errorMessage = 'An unexpected wallet error occurred';
      
      if (error.name === 'WalletNotFoundError') {
        errorMessage = 'The selected wallet was not found';
      } else if (error.name === 'WalletNotInstalledError') {
        errorMessage = 'The selected wallet is not installed';
      } else if (error.name === 'WalletConnectionError') {
        errorMessage = 'Failed to connect to the selected wallet';
      } else if (error.name === 'WalletDisconnectedError') {
        errorMessage = 'The wallet was disconnected';
      } else if (error.name === 'WalletTimeoutError') {
        errorMessage = 'The wallet connection timed out';
      } else if (error.name === 'WalletAccountError') {
        errorMessage = 'Error getting the wallet accounts';
      } else if (error.name === 'WalletPublicKeyError') {
        errorMessage = 'Error getting the wallet public key';
      } else if (error.name === 'WalletNotReadyError') {
        errorMessage = 'The wallet is not ready for connections';
      } else if (error.name === 'WalletNotSelectedError') {
        // This is a normal part of the flow, don't show error
        return;
      } else if (error.name === 'WalletSignTransactionError') {
        errorMessage = 'Error signing the transaction with wallet';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast.error(errorMessage);
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