import { FC, useCallback } from 'react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';
import Image from 'next/image';
import { WalletReadyState } from '@solana/wallet-adapter-base';
import toast from 'react-hot-toast';

interface WalletOptionProps {
  name: string;
  icon: string;
  onClick: () => void;
  detected: boolean;
  readyState: WalletReadyState;
}

const WalletOption: FC<WalletOptionProps> = ({ name, icon, onClick, detected, readyState }) => (
  <button
    onClick={onClick}
    disabled={readyState === WalletReadyState.Unsupported || readyState === WalletReadyState.NotDetected}
    className="w-full flex items-center justify-between h-[48px] bg-[#1A1B1F] hover:bg-[#2A2B2F] transition-colors disabled:opacity-50 disabled:cursor-not-allowed px-3"
  >
    <div className="flex items-center">
      <img src={icon} alt={name} className="w-6 h-6 mr-3" />
      <span className="text-white text-sm">{name}</span>
    </div>
    {readyState === WalletReadyState.Installed && (
      <span className="text-sm text-[#00E599]">Detected</span>
    )}
    {readyState === WalletReadyState.NotDetected && (
      <span className="text-sm text-gray-400">Not Detected</span>
    )}
    {readyState === WalletReadyState.Unsupported && (
      <span className="text-sm text-gray-400">Unsupported</span>
    )}
  </button>
);

export const CustomWalletModal: FC = () => {
  const { visible, setVisible } = useWalletModal();
  const { select, wallets, connect } = useWallet();

  const handleWalletClick = useCallback(async (walletName: string) => {
    try {
      const wallet = wallets.find(w => w.adapter.name === walletName);
      if (!wallet) {
        toast.error(`${walletName} wallet not found`);
        return;
      }

      if (wallet.readyState !== WalletReadyState.Installed) {
        if (wallet.adapter.url) {
          window.open(wallet.adapter.url, '_blank');
        }
        toast.error(`Please install ${walletName} wallet`);
        return;
      }

      await select(wallet.adapter.name);
      await connect();
      setVisible(false);
      toast.success(`Connected to ${walletName}`);
    } catch (error: any) {
      console.error('Error connecting to wallet:', error);
      toast.error(error?.message || 'Failed to connect to wallet');
    }
  }, [wallets, select, connect, setVisible]);

  if (!visible) return null;

  return visible ? (
    <div className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/70">
      <div className="relative w-[90%] max-w-[480px]">
        <div 
          className="w-full min-h-[520px]"
          style={{
            backgroundImage: 'url(/ModalContainer3_WorldofGazm.png)',
            backgroundSize: '100% 100%',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          {/* Close button */}
          <button
            onClick={() => setVisible(false)}
            className="absolute top-10 right-14 text-white/70 hover:text-white transition-colors z-10"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          <div className="px-12 py-11">
            {/* Connect to Enter Logo */}
            <div className="flex justify-center mb-4">
              <Image
                src="/ConnectToEnter_WorldofGazm.png"
                alt="Connect to Enter"
                width={280}
                height={100}
                className="w-auto h-auto object-contain"
                priority
                unoptimized
              />
            </div>

            {/* Wallet options */}
            <div className="space-y-[1px]">
              {wallets.map((wallet) => (
                <WalletOption
                  key={wallet.adapter.name}
                  name={wallet.adapter.name}
                  icon={wallet.adapter.icon}
                  onClick={() => handleWalletClick(wallet.adapter.name)}
                  detected={wallet.readyState === WalletReadyState.Installed}
                  readyState={wallet.readyState}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
}; 