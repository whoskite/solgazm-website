'use client';

import { FC, useCallback, useEffect } from 'react';
import { WalletName, WalletReadyState } from '@solana/wallet-adapter-base';
import { useWallet as useSolanaWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { WalletModalButton } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@/contexts/WalletContext';
import { useAudio } from '@/contexts/AudioContext';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

require('@solana/wallet-adapter-react-ui/styles.css');
import '@/styles/WalletButton.css';

export const WalletButton: FC = () => {
  const { 
    wallets,
    select,
    connected,
    connecting,
    publicKey,
    wallet: selectedWallet,
  } = useSolanaWallet();
  const { setVisible, visible } = useWalletModal();
  const { setIsConnected } = useWallet();
  const { playInsertCoinSound } = useAudio();

  const handleWalletClick = useCallback(async () => {
    try {
      playInsertCoinSound();
      if (!connected) {
        setVisible(true);
      }
    } catch (error) {
      console.error('Wallet interaction error:', error);
      toast.error('Failed to interact with wallet');
    }
  }, [connected, setVisible, playInsertCoinSound]);

  // Handle wallet selection
  useEffect(() => {
    if (selectedWallet) {
      const walletName = selectedWallet.adapter.name as WalletName;
      const isPhantomOrBrave = walletName === 'Phantom' || walletName === 'Brave';
      
      // For Phantom and Brave, we don't need to do anything special
      if (isPhantomOrBrave) {
        return;
      }

      // For other wallets, ensure they're ready before trying to connect
      const wallet = wallets.find(w => w.adapter.name === walletName);
      if (wallet && wallet.readyState === WalletReadyState.Installed) {
        select(walletName);
      }
    }
  }, [selectedWallet, wallets, select]);

  // Update connection status in context
  useEffect(() => {
    setIsConnected(connected);
  }, [connected, setIsConnected]);

  const buttonText = connected 
    ? `${publicKey?.toBase58().slice(0, 4)}...${publicKey?.toBase58().slice(-4)}`
    : connecting
    ? 'Connecting...'
    : 'Connect Wallet';

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="wallet-button-container"
    >
      <WalletModalButton 
        className="wallet-adapter-button custom-wallet-button"
        onClick={handleWalletClick}
        disabled={connecting}
      >
        {buttonText}
      </WalletModalButton>
    </motion.div>
  );
}; 