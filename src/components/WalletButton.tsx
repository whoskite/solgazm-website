'use client';

import { FC } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { motion } from 'framer-motion';

export const WalletButton: FC = () => {
  const { connected } = useWallet();

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative inline-block"
      aria-label="Connect Wallet"
      title="Connect Wallet"
    >
      <WalletMultiButton aria-label="Connect Wallet" />
    </motion.div>
  );
}; 