"use client";
import { useWallet } from "@solana/wallet-adapter-react";
import { useCustomWalletModal } from "./WalletProvider";

export default function SolanaWalletTestButton() {
  const { connecting, connected, publicKey } = useWallet();
  const { setVisible } = useCustomWalletModal();
  
  const formatAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };
  
  return (
    <div style={{ margin: '2rem' }}>
      <button 
        className="wallet-adapter-button-trigger"
        onClick={() => setVisible(true)}
        disabled={connecting}
      >
        {!connected 
          ? (connecting ? 'Connecting...' : 'Select Wallet') 
          : (publicKey ? formatAddress(publicKey.toBase58()) : 'Connected')}
      </button>
    </div>
  );
}
