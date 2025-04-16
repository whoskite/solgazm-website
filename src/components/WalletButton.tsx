'use client';

import { FC } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useCustomWalletModal } from './WalletProvider';
import { useAudio } from '@/contexts/AudioContext';
import { motion } from 'framer-motion';

// Use our styles but don't import the default wallet-adapter styles
import '@/styles/WalletButton.css';

export const WalletButton: FC = () => {
  const { connecting, connected, publicKey, disconnect } = useWallet();
  const { setVisible } = useCustomWalletModal();
  const { playInsertCoinSound } = useAudio();
  
  // Create our own custom button that triggers our custom modal
  const handleClick = () => {
    if (!connecting) {
      setVisible(true);
      playInsertCoinSound();
    }
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };
  
  const handleDisconnect = async () => {
    try {
      await disconnect();
    } catch (error) {
      console.error('Failed to disconnect wallet:', error);
    }
  };
  
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="wallet-button-container"
    >
      {!connected ? (
        <button 
          className="wallet-adapter-button-trigger custom-wallet-button"
          onClick={handleClick}
          disabled={connecting}
        >
          {connecting ? 'Connecting...' : 'Select Wallet'}
        </button>
      ) : (
        <div className="wallet-address-container flex items-center">
          <button 
            className="wallet-address-button"
            onClick={handleClick}
          >
            {publicKey ? formatAddress(publicKey.toBase58()) : 'Connected'}
          </button>
          <button
            className="disconnect-button ml-2 bg-red-600 hover:bg-red-700 p-2 rounded-full transition-colors flex items-center justify-center"
            onClick={handleDisconnect}
            title="Disconnect Wallet"
          >
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              className="text-white"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
          </button>
        </div>
      )}
    </motion.div>
  );
}; 