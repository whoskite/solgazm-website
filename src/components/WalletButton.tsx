'use client';

import { FC, useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useWallet } from '@solana/wallet-adapter-react';
import { useCustomWalletModal } from './WalletProvider';
import { useAudio } from '@/contexts/AudioContext';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';

import '@/styles/WalletButton.css';

export const WalletButton: FC = () => {
  const router = useRouter();
  const { 
    connecting, 
    connected, 
    publicKey, 
    disconnect, 
    wallet: selectedWallet,
    autoConnect
  } = useWallet();
  const { setVisible } = useCustomWalletModal();
  const { playInsertCoinSound } = useAudio();
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClick = useCallback(() => {
    if (!connected && !connecting) {
      setVisible(true);
      playInsertCoinSound();
    } else if (connected) {
      setDropdownOpen(prev => !prev);
    }
  }, [connected, connecting, setVisible, playInsertCoinSound]);

  const handleProfileClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDropdownOpen(false);
    router.push('/profile');
  }, [router]);

  const handleDisconnect = useCallback(async (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    try {
      setDropdownOpen(false);
      await disconnect();
    } catch (error) {
      console.error('Failed to disconnect wallet:', error);
    }
  }, [disconnect]);

  const formatAddress = (address: string) => {
    return `${address.slice(0, 4).toUpperCase()}...${address.slice(-4).toUpperCase()}`;
  };

  return (
    <div className="wallet-button-container" ref={dropdownRef}>
      {!connected ? (
        <div className="relative">
          <button
            type="button"
            className={`wallet-address-button ${connecting ? 'connecting' : ''}`}
            onClick={handleClick}
            disabled={connecting}
          >
            {connecting ? (
              <span>Connecting...</span>
            ) : (
              <>Connect Wallet</>
            )}
          </button>
        </div>
      ) : (
        <div className="wallet-address-container flex items-center gap-4 relative">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="wallet-address-button wallet-connected"
            onClick={handleClick}
            aria-label={selectedWallet?.adapter.name || "Connected wallet"}
            aria-expanded={dropdownOpen}
            aria-haspopup="true"
          >
            {publicKey ? (
              <>
                <span className="wallet-address-text" title={publicKey.toBase58()}>
                  {formatAddress(publicKey.toBase58())}
                </span>
                <span className="ml-2">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`h-4 w-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </>
            ) : (
              <span className="text-white">Connected</span>
            )}
          </motion.button>
          <AnimatePresence>
            {dropdownOpen && (
              <motion.div 
                className="absolute top-full right-0 mt-2 w-64 rounded-lg shadow-lg bg-[#1A1B1F] text-white overflow-hidden z-10"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="p-4 border-b border-gray-700">
                  <div className="flex items-center w-full">
                    <span className="font-medium">Wallet</span>
                    <div className="ml-auto wallet-connected-badge px-2 py-0.5 rounded text-xs bg-green-700/80 text-green-200 font-semibold">Connected</div>
                  </div>
                </div>
                <div className="p-2 border-b border-gray-700">
                  <button 
                    type="button"
                    className="wallet-dropdown-item wallet-action-button"
                    onClick={handleProfileClick}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Your Profile
                  </button>
                </div>
                <div className="p-2">
                  <button 
                    type="button"
                    className="wallet-dropdown-item wallet-action-button text-red-400 hover:text-red-300"
                    onClick={handleDisconnect}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Disconnect
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};
