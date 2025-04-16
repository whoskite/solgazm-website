import { FC } from 'react';
import { useWallet as useSolanaWallet } from '@solana/wallet-adapter-react';
import { toast } from 'react-hot-toast';

export const WalletInfo: FC = () => {
  const { publicKey, disconnect, disconnecting, wallet: selectedWallet } = useSolanaWallet();

  const handleDisconnect = async () => {
    try {
      if (disconnecting) {
        toast.error('Already disconnecting wallet');
        return;
      }

      await disconnect();
      toast.success('Wallet disconnected successfully');
    } catch (error) {
      console.error('Error disconnecting wallet:', error);
      toast.error('Failed to disconnect wallet');
    }
  };

  if (!publicKey) {
    return (
      <div className="flex items-center space-x-2">
        <div className="bg-[#1A1B1F] px-4 py-2 rounded-lg">
          <span className="text-gray-400 text-sm">Not Connected</span>
        </div>
      </div>
    );
  }

  // Format the wallet address to show first 4 and last 4 characters
  const formattedAddress = `${publicKey.toString().slice(0, 4)}...${publicKey.toString().slice(-4)}`;
  const walletName = selectedWallet?.adapter.name || 'Wallet';

  return (
    <div className="flex items-center space-x-2">
      <div className="bg-[#1A1B1F] px-4 py-2 rounded-lg">
        <span className="text-white text-sm font-mono">
          <span className="font-bold mr-2">{walletName}</span>
          {formattedAddress}
        </span>
      </div>
      <button
        onClick={handleDisconnect}
        disabled={disconnecting}
        className={`${
          disconnecting 
            ? 'bg-red-400 cursor-not-allowed' 
            : 'bg-red-500 hover:bg-red-600 cursor-pointer'
        } text-white px-4 py-2 rounded-lg transition-colors`}
      >
        {disconnecting ? 'Disconnecting...' : 'Disconnect'}
      </button>
    </div>
  );
}; 