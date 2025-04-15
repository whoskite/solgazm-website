# Solana Wallet Integration Reference

## Progress Checklist
- [x] 1. Install Solana wallet adapter dependencies
- [x] 2. Set up Wallet Adapter Provider in layout or _app
- [ ] 3. Upgrade Connect Wallet PNG button to trigger wallet connection
- [ ] 4. Display connected wallet address/profile
- [ ] 5. (Optional) Backend API for profile

Check off each step as you complete and verify it.

## Official Documentation
- [Solana Docs](https://solana.com/docs)
- [Solana Wallet Adapter GitHub](https://github.com/solana-labs/wallet-adapter)

## Key Steps for Integration

### 1. Install Dependencies
```
npm install @solana/web3.js @solana/wallet-adapter-react @solana/wallet-adapter-wallets @solana/wallet-adapter-react-ui
```

### 2. Set Up Wallet Adapter Provider (Frontend)
- Wrap your app in `WalletAdapterProvider` in `_app.tsx` or a layout file.
- Import and configure wallets (e.g., Phantom, Solflare).

### 3. Add Connect Wallet Button
- Use the `WalletMultiButton` component from `@solana/wallet-adapter-react-ui` for a ready-made connect button.

### 4. On Connection
- When a wallet is connected, you get the user’s public key.
- Send this public key to your backend for session/profile management.

### 5. Backend API Endpoint
- Create `/api/profile` to accept the wallet address.
- Optionally: implement message signing and verification for authentication.

### 6. Profile Page
- Fetch and display the connected wallet’s info.

---

## Example Code Snippets

**Provider Setup:**
```tsx
// _app.tsx or layout.tsx
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";

const wallets = [new PhantomWalletAdapter()];

<WalletProvider wallets={wallets} autoConnect>
  <WalletModalProvider>
    {/* Your app */}
  </WalletModalProvider>
</WalletProvider>
```

**Connect Button:**
```tsx
<WalletMultiButton />
```

**Get Public Key:**
```tsx
import { useWallet } from "@solana/wallet-adapter-react";
const { publicKey } = useWallet();
```

---

## Useful Links
- [Solana Wallet Adapter Quickstart](https://github.com/solana-labs/wallet-adapter#quickstart)
- [Solana Web3.js Docs](https://solana-labs.github.io/solana-web3.js/)
