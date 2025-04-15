"use client";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export default function SolanaWalletTestButton() {
  return (
    <div style={{ margin: '2rem' }}>
      <WalletMultiButton />
    </div>
  );
}
