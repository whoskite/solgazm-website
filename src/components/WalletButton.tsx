'use client';

import { FC, useRef, useCallback, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { motion } from 'framer-motion';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { useAudio } from '@/contexts/AudioContext';

// Define the Phantom wallet type
interface PhantomWindow extends Window {
  phantom?: {
    solana?: {
      isPhantom?: boolean;
    };
  };
}

declare const window: PhantomWindow;

export const WalletButton: FC = () => {
  const { connected, connecting, disconnect, publicKey } = useWallet();
  const { setVisible } = useWalletModal();
  const { playInsertCoinSound } = useAudio();

  const handleClick = useCallback(async () => {
    try {
      playInsertCoinSound();

      if (!connected) {
        setVisible(true);
      } else {
        await disconnect();
        toast.success('Wallet disconnected successfully');
      }
    } catch (error) {
      console.error('Wallet interaction error:', error);
      toast.error('Failed to interact with wallet');
    }
  }, [connected, disconnect, setVisible, playInsertCoinSound]);

  // Show toast when wallet is connected
  useEffect(() => {
    if (connected && publicKey) {
      const address = publicKey.toBase58();
      const shortAddress = `${address.slice(0, 4)}...${address.slice(-4)}`;
      toast.success(`Connected: ${shortAddress}`, {
        icon: '🎮',
      });
    }
  }, [connected, publicKey]);

  return (
    <motion.div
      onClick={handleClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`flex items-center justify-center ${connected ? 'w-12 h-12' : 'w-28 h-auto'}`}
    >
      <Image
        src={connected ? '/Profile_button.png' : '/ConnectWallet_button.png'}
        alt={connected ? 'Profile Button' : 'Connect Wallet Button'}
        width={connected ? 40 : 100}
        height={connected ? 40 : 35}
        className="w-full h-auto object-contain hover:opacity-80 transition-opacity duration-300 brightness-100"
        priority
        unoptimized
      />
    </motion.div>
  );
}; 