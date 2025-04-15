'use client';

import { FC, useRef, useCallback, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { motion } from 'framer-motion';
import Image from 'next/image';

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
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleClick = useCallback(async () => {
    try {
      if (audioRef.current) {
        audioRef.current.play().catch(console.error);
      }

      if (!connected) {
        setVisible(true);
      } else {
        await disconnect();
      }
    } catch (error) {
      console.error('Wallet interaction error:', error);
    }
  }, [connected, disconnect, setVisible]);

  // Log connection state changes for debugging
  useEffect(() => {
    if (connected) {
      console.log('Wallet connected:', publicKey?.toBase58());
    }
  }, [connected, publicKey]);

  return (
    <>
      <audio ref={audioRef} src="/Insert_Coin.wav" preload="auto" />
      <motion.div
        onClick={handleClick}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        style={{ cursor: 'pointer' }}
      >
        <Image
          src={connected ? '/Profile_button.png' : '/ConnectWallet_button.png'}
          alt={connected ? 'Profile Button' : 'Connect Wallet Button'}
          width={200}
          height={50}
          priority
        />
      </motion.div>
    </>
  );
}; 