/**
 * Utility functions for direct Phantom wallet connection
 */

import { PublicKey } from '@solana/web3.js';
import { useWallet } from '@solana/wallet-adapter-react';

/**
 * Check if Brave wallet is installed and available
 */
export function isBraveInstalled(): boolean {
  const solana = (window as any).solana;
  return solana && solana.isBraveWallet;
}

/**
 * Get the current Solana wallet type (phantom, brave, or none)
 */
export function getCurrentSolanaWalletType(): 'phantom' | 'brave' | 'none' {
  const solana = (window as any).solana;
  if (solana?.isBraveWallet) return 'brave';
  if (solana?.isPhantom) return 'phantom';
  return 'none';
}

/**
 * Check if Phantom is installed and available (not Brave)
 */
export function isPhantomInstalled(): boolean {
  const solana = (window as any).solana;
  return solana && solana.isPhantom && !solana.isBraveWallet;
}

/**
 * Connect to Phantom wallet directly without using adapter
 */
export async function connectToPhantomDirectly() {
  try {
    console.log('Attempting direct Phantom connection...');
    
    if (!isPhantomInstalled()) {
      console.error('Phantom not installed');
      throw new Error('Phantom wallet is not installed');
    }
    
    const solana = (window as any).solana;
    console.log('Phantom version:', solana.version);
    console.log('Phantom state:', solana.isConnected ? 'connected' : 'disconnected');
    
    // Connect directly to Phantom
    const response = await solana.connect();
    
    console.log('Direct Phantom connection successful!', {
      publicKey: response.publicKey.toString()
    });
    
    // Save connection data to localStorage to help sync state
    localStorage.setItem('phantomConnected', 'true');
    localStorage.setItem('walletConnected', 'true');
    localStorage.setItem('phantomPublicKey', response.publicKey.toString());
    
    // Dispatch a custom event that components can listen for
    window.dispatchEvent(new CustomEvent('phantom-connected', { 
      detail: { publicKey: response.publicKey.toString() } 
    }));
    
    return response;
  } catch (error) {
    console.error('Direct Phantom connection error:', error);
    throw error;
  }
}

/**
 * Disconnect from Phantom directly
 */
export async function disconnectPhantomDirectly() {
  try {
    if (!isPhantomInstalled()) {
      throw new Error('Phantom wallet is not installed');
    }
    
    const solana = (window as any).solana;
    await solana.disconnect();
    console.log('Disconnected from Phantom directly');
    
    // Clear connection data from localStorage
    localStorage.removeItem('phantomConnected');
    localStorage.removeItem('phantomPublicKey');
    localStorage.setItem('walletConnected', 'false');
    
    // Dispatch a custom event for disconnect
    window.dispatchEvent(new CustomEvent('phantom-disconnected'));
    
    return true;
  } catch (error) {
    console.error('Error disconnecting from Phantom:', error);
    throw error;
  }
} 