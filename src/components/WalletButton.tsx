'use client';

import { FC, useRef, useCallback } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import Image from 'next/image';
import { motion } from 'framer-motion';

// Add type definition for Phantom
declare global {
  interface Window {
    phantom?: {
      solana?: {
        isPhantom?: boolean;
      };
    };
  }
}

export const WalletButton: FC = () => {
  const { connected, disconnect } = useWallet();
  const { setVisible } = useWalletModal();
  const insertCoinAudioRef = useRef<HTMLAudioElement>(null);

  const handleClick = useCallback(() => {
    // Play insert coin sound if not muted
    const insertCoinSound = insertCoinAudioRef.current;
    if (insertCoinSound && !insertCoinSound.muted) {
      insertCoinSound.currentTime = 0;
      insertCoinSound.play().catch(error => {
        console.error("Error playing insert coin sound:", error);
      });
    }

    if (connected) {
      disconnect();
    } else {
      setVisible(true);
    }
  }, [connected, disconnect, setVisible]);

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center justify-center w-28 h-auto cursor-pointer"
        onClick={handleClick}
      >
        {connected ? (
          <Image
            src="/Profile_button.png"
            alt="Profile"
            width={80}
            height={28}
            className="w-full h-auto object-contain hover:opacity-80 transition-opacity duration-300 brightness-100"
            priority
            unoptimized
          />
        ) : (
          <Image
            src="/ConnectWallet_button.png"
            alt="Connect Wallet"
            width={110}
            height={40}
            className="w-full h-auto object-contain hover:opacity-80 transition-opacity duration-300 brightness-100"
            priority
            unoptimized
          />
        )}
      </motion.div>
      <audio ref={insertCoinAudioRef} preload="auto" playsInline>
        <source src="/Insert_Coin.wav" type="audio/wav" />
        Your browser does not support the audio element.
      </audio>
    </>
  );
}; 