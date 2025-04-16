'use client';

import { FC } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useAudio } from '@/contexts/AudioContext';
import { motion } from 'framer-motion';

require('@solana/wallet-adapter-react-ui/styles.css');
import '@/styles/WalletButton.css';

export const WalletButton: FC = () => {
  const { connected } = useWallet();
  const { playInsertCoinSound } = useAudio();

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="wallet-button-container"
    >
      <WalletMultiButton 
        className="custom-wallet-button"
        onClick={() => playInsertCoinSound()}
      />
    </motion.div>
  );
}; 