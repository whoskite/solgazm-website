'use client';

import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import Image from 'next/image';
import { WalletReadyState, WalletName } from '@solana/wallet-adapter-base';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { useAudio } from '@/contexts/AudioContext';
import { connectToPhantomDirectly, isPhantomInstalled, isBraveInstalled, getCurrentSolanaWalletType } from '@/utils/phantomHelper';
import { useCustomWalletModal } from './WalletProvider';

interface WalletOptionProps {
  name: string;
  displayName: string;
  icon: string;
  onClick: () => void;
  detected: boolean;
  readyState: WalletReadyState;
  isConnecting: boolean;
}

const WalletOption: FC<WalletOptionProps> = ({ 
  name, 
  displayName, 
  icon, 
  onClick, 
  detected, 
  readyState,
  isConnecting 
}) => (
  <button
    onClick={onClick}
    disabled={readyState === WalletReadyState.Unsupported || readyState === WalletReadyState.NotDetected || isConnecting}
    className="w-full flex items-center justify-between h-[48px] bg-[#1A1B1F] hover:bg-[#2A2B2F] transition-colors disabled:opacity-50 disabled:cursor-not-allowed px-3 mb-2 rounded"
  >
    <div className="flex items-center">
      <img src={icon} alt={displayName} className="w-6 h-6 mr-3" />
      <span className="text-white text-sm">{displayName}</span>
    </div>
    {isConnecting ? (
      <span className="text-sm text-blue-400">Connecting...</span>
    ) : readyState === WalletReadyState.Installed ? (
      <span className="text-sm text-[#00E599]">Detected</span>
    ) : readyState === WalletReadyState.NotDetected ? (
      <span className="text-sm text-gray-400">Not Detected</span>
    ) : (
      <span className="text-sm text-gray-400">Unsupported</span>
    )}
  </button>
);

export const CustomWalletModal: FC = () => {
  const { visible, setVisible } = useCustomWalletModal();
  const { 
    select,
    wallets,
    connect,
    connecting,
    connected,
    publicKey,
    wallet: selectedWallet,
    disconnect
  } = useWallet();
  const audio = useAudio();
  const [connectingWallet, setConnectingWallet] = useState<string | null>(null);
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [diagnosticInfo, setDiagnosticInfo] = useState<string | null>(null);

  // Browser detection
  const browserInfo = useMemo(() => {
    if (typeof window === 'undefined') return null;
    
    const userAgent = navigator.userAgent;
    let browserName = "Unknown";
    
    if (userAgent.match(/chrome|chromium|crios/i)) {
      browserName = "Chrome";
    } else if (userAgent.match(/firefox|fxios/i)) {
      browserName = "Firefox";
    } else if (userAgent.match(/safari/i)) {
      browserName = "Safari";
    } else if (userAgent.match(/edg/i)) {
      browserName = "Edge";
    }
    
    return {
      browser: browserName,
      userAgent,
      hasWindow: typeof window !== 'undefined',
      hasSolana: !!(window as any)?.solana,
      hasPhantom: !!(window as any)?.solana?.isPhantom,
      version: (window as any)?.solana?.version || 'Unknown'
    };
  }, []);

  // Reset connecting state when modal is closed
  useEffect(() => {
    if (!visible) {
      setConnectingWallet(null);
      setShowMoreOptions(false);
    }
  }, [visible]);

  // Reset connecting state after timeout
  useEffect(() => {
    if (connectingWallet) {
      const timer = setTimeout(() => {
        setConnectingWallet(null);
      }, 5000); // 5 second timeout
      return () => clearTimeout(timer);
    }
  }, [connectingWallet]);

  // Modify wallet list to show correct names - with Brave handling
  const modifiedWallets = useMemo(() => {
    return wallets.map(wallet => {
      let displayName = wallet.adapter.name;
      // If Brave is installed and this is Phantom adapter, label as Brave
      if (isBraveInstalled() && wallet.adapter.name === 'Phantom') {
        displayName = 'Brave';
      }
      return {
        ...wallet,
        displayName,
      };
    });
  }, [wallets]);

  // Get primary wallets and more options
  const { primaryWallets, moreWallets } = useMemo(() => {
    const primary = modifiedWallets.filter(w => 
      w.adapter.name === 'Phantom' || 
      w.adapter.name === 'MetaMask' || 
      w.adapter.name === 'Solflare'
    );
    
    const more = modifiedWallets.filter(w => 
      w.adapter.name !== 'Phantom' && 
      w.adapter.name !== 'MetaMask' && 
      w.adapter.name !== 'Solflare'
    );
    
    return { primaryWallets: primary, moreWallets: more };
  }, [modifiedWallets]);

  // Play floating sound effect when animation cycles
  useEffect(() => {
    if (visible && audio) {
      const interval = setInterval(() => {
        audio.playFloatingSound();
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [visible, audio]);

  // Show toast on wallet connect/disconnect
  useEffect(() => {
    if (!visible) return;
    if (connected && publicKey) {
      toast.success('Wallet connected successfully');
    } else if (!connected && !publicKey) {
      toast('Wallet disconnected', { icon: '🔌' });
    }
  }, [connected, publicKey, visible]);

  const handleWalletClick = useCallback(async (walletName: WalletName) => {
    try {
      if (connecting || connectingWallet) {
        toast.error('Already connecting to wallet, please wait...');
        return;
      }

      setConnectingWallet(walletName);
      
      // Special handling for Phantom wallet
      if (walletName === 'Phantom') {
        try {
          console.log('Trying direct Phantom connection method');
          
          if (!isPhantomInstalled()) {
            toast.error('Phantom wallet is not installed. Please install it first.');
            setConnectingWallet(null);
            return;
          }
          
          // Use our direct connection utility
          const response = await connectToPhantomDirectly();
          
          if (response.publicKey) {
            // Success with direct connection!
            console.log('Successfully connected to Phantom directly');
            
            // IMPORTANT: Force sync with wallet adapter
            try {
              // First select the wallet
              select(walletName);
              
              // Wait until the wallet is actually selected and ready
              let tries = 0;
              while (tries < 40) { // up to 2 seconds
                const current = wallets.find(w => w.adapter.name === walletName);
                if (
                  current &&
                  selectedWallet &&
                  current.adapter.name === selectedWallet.adapter.name &&
                  current.readyState === WalletReadyState.Installed &&
                  selectedWallet.adapter
                ) {
                  break;
                }
                await new Promise(resolve => setTimeout(resolve, 50));
                tries++;
              }
              // Now tell the adapter to connect to the selected wallet
              try {
                await connect();
              } catch (err: any) {
                if (err.name === 'WalletNotSelectedError') {
                  toast.error('Wallet not selected. Please try again.');
                  return;
                }
                throw err;
              }
              console.log('Wallet adapter state synced after direct connection');
            } catch (syncError) {
              console.error('Error syncing adapter state:', syncError);
              // Continue since direct connection worked
            }
            
            toast.success(`Connected to Phantom wallet!`);
            audio?.playSuccessSound();
            setVisible(false);
            
            return;
          }
        } catch (error) {
          console.error('Direct Phantom connection failed:', error);
          // Continue to standard flow as fallback
        }
      }
      
      // Standard flow for other wallets or as fallback
      const wallet = wallets.find(w => w.adapter.name === walletName);
      if (!wallet) {
        toast.error(`${walletName} wallet not found`);
        setConnectingWallet(null);
        return;
      }

      if (wallet.readyState !== WalletReadyState.Installed) {
        if (wallet.adapter.url) {
          window.open(wallet.adapter.url, '_blank');
        }
        toast.error(`Please install ${walletName} wallet`);
        setConnectingWallet(null);
        return;
      }

      // If already connected to a different wallet, disconnect first
      if (connected && selectedWallet?.adapter.name !== walletName) {
        try {
          await disconnect();
          // Add a small delay to allow state to settle after disconnect
          await new Promise(resolve => setTimeout(resolve, 100)); 
        } catch (disconnectError) {
          console.error('Error during disconnect:', disconnectError);
          toast.error('Failed to disconnect previous wallet. Please try again.');
          setConnectingWallet(null);
          return; // Stop if disconnect fails
        }
      }

      try {
        const adapter = wallet.adapter;
        
        console.log(`Attempting standard adapter connection to ${walletName}...`);
        
        await adapter.connect().catch(error => {
          console.error('Detailed connection error:', {
            errorName: error.name,
            errorMessage: error.message,
            errorStack: error.stack,
            walletName: walletName,
            adapterName: adapter.name,
            readyState: wallet.readyState
          });
          throw error;
        });
        
        console.log(`Successfully connected to ${walletName}`);
        
        // Success handling
        audio?.playSuccessSound();
        setVisible(false);
        toast.success(`Connected to ${walletName}`);
      } catch (error: any) {
        setConnectingWallet(null); // Reset connecting state on any error
        console.error('Wallet connection error:', error);

        if (error.message?.includes('User rejected')) {
          toast.error('Connection rejected by user');
        } else if (error.name === 'WalletConnectionError' || error.message?.includes('Unexpected error')) {
          toast.error(`Connection failed. Please try the test page at /phantom-test for detailed diagnostics.`, { duration: 5000 });
        } else if (error.name === 'WalletNotSelectedError') {
          toast.error('Wallet not selected. Please try again.');
        } else {
          toast.error(error.message || 'Failed to connect wallet. Please try again.');
        }
      }
    } catch (error: any) {
      // Catch errors from finding wallet, checking readyState, or disconnecting
      console.error('Error during wallet selection/preparation:', error);
      setConnectingWallet(null);
      toast.error(error.message || 'An error occurred before attempting connection.');
    }
  }, [connecting, connectingWallet, connected, selectedWallet, disconnect, wallets, setVisible, audio, browserInfo, publicKey, select, connect]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/70">
      <div 
        className="relative w-[90%] max-w-[480px] min-h-[520px] flex items-center justify-center"
        style={{
          backgroundImage: 'url(/ModalContainer3_WorldofGazm.png)',
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Close button */}
        <button
          onClick={() => {
            setConnectingWallet(null);
            setVisible(false);
          }}
          className="absolute top-10 right-14 text-white/70 hover:text-white transition-colors z-10"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <div className="px-12 py-11 w-full">
          {/* World of Gazm Logo */}
          <motion.div 
            className="flex justify-center mb-8"
            animate={{
              y: [-5, 5, -5],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              filter: "drop-shadow(3px 3px 5px rgba(0, 0, 0, 0.5)) drop-shadow(0 0 15px rgba(0, 149, 255, 0.5)) drop-shadow(0 0 30px rgba(0, 98, 255, 0.3))"
            }}
          >
            <Image
              src="/1_World of Gazm.png"
              alt="World of Gazm"
              width={280}
              height={280}
              className="w-auto h-auto object-contain max-w-[280px]"
              priority
              unoptimized
            />
          </motion.div>

          {/* Connection Status */}
          {connected && publicKey && (
            <div className="mb-6 text-center">
              <p className="text-[#00E599] text-lg mb-2">Wallet Connected</p>
              <p className="text-white/80 text-sm break-all">
                <span className="font-bold mr-2">{selectedWallet?.adapter.name || 'Wallet'}</span>
                {publicKey.toBase58()}
              </p>
            </div>
          )}

          {/* Wallet connection options when not connected */}
          {!connected ? (
            <>
              {/* Primary Wallet options */}
              <div className="space-y-[1px]">
                {primaryWallets.map((wallet) => (
                  <WalletOption
                    key={wallet.adapter.name}
                    name={wallet.adapter.name}
                    displayName={wallet.displayName}
                    icon={wallet.adapter.icon}
                    onClick={() => handleWalletClick(wallet.adapter.name as WalletName)}
                    detected={wallet.readyState === WalletReadyState.Installed}
                    readyState={wallet.readyState}
                    isConnecting={connectingWallet === wallet.adapter.name}
                  />
                ))}
              </div>
              
              {/* More options toggle */}
              {moreWallets.length > 0 && (
                <div className="mt-4">
                  <button 
                    onClick={() => setShowMoreOptions(!showMoreOptions)}
                    className="text-[#00E599] hover:text-[#00ffaa] text-center w-full flex items-center justify-center gap-1 font-medium"
                  >
                    {showMoreOptions ? 'Hide options' : 'More options'}
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      className={`transition-transform ${showMoreOptions ? 'rotate-180' : ''}`}
                    >
                      <path d="M6 9l6 6 6-6"/>
                    </svg>
                  </button>
                </div>
              )}
              
              {/* More wallets section */}
              {showMoreOptions && (
                <div className="space-y-[1px] mt-4">
                  {moreWallets.map((wallet) => (
                    <WalletOption
                      key={wallet.adapter.name}
                      name={wallet.adapter.name}
                      displayName={wallet.displayName}
                      icon={wallet.adapter.icon}
                      onClick={() => handleWalletClick(wallet.adapter.name as WalletName)}
                      detected={wallet.readyState === WalletReadyState.Installed}
                      readyState={wallet.readyState}
                      isConnecting={connectingWallet === wallet.adapter.name}
                    />
                  ))}
                </div>
              )}
            </>
          ) : (
            // Show disconnect option when connected
            <div className="space-y-4">
              {/* Wallet icon and name if available */}
              {selectedWallet && (
                <div className="flex items-center justify-center mb-8 bg-[#1A1B1F] p-4 rounded">
                  <img 
                    src={selectedWallet.adapter.icon} 
                    alt={selectedWallet.adapter.name} 
                    className="w-8 h-8 mr-4"
                  />
                  <span className="text-white text-lg">{selectedWallet.adapter.name}</span>
                </div>
              )}
              
              {/* Disconnect button */}
              <button
                className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded transition-colors text-lg font-semibold"
                onClick={async () => {
                  try {
                    await disconnect();
                    toast.success('Wallet disconnected successfully');
                    setVisible(false);
                  } catch (error) {
                    toast.error('Failed to disconnect wallet');
                  }
                }}
              >
                Disconnect Wallet
              </button>
              
              {/* Change wallet button */}
              <button
                className="w-full mt-2 bg-[#1A1B1F] hover:bg-[#2A2B2F] text-white py-3 rounded transition-colors"
                onClick={async () => {
                  try {
                    // First disconnect current wallet
                    await disconnect();
                    // Then update UI state to show wallet options
                    setTimeout(() => {
                      setConnectingWallet(null);
                    }, 100);
                  } catch (error) {
                    toast.error('Failed to disconnect wallet');
                  }
                }}
              >
                Change Wallet
              </button>
            </div>
          )}
          
          {/* Show diagnostic info when there's an issue */}
          {connectingWallet && (
            <div className="mt-4 p-2 text-xs text-white/60 border border-white/20 rounded bg-black/30 overflow-auto max-h-[100px]">
              <p>Connecting to {connectingWallet}...</p>
              {browserInfo && (
                <p>Browser: {browserInfo.browser} | Phantom detected: {browserInfo.hasPhantom ? 'Yes' : 'No'}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}; 