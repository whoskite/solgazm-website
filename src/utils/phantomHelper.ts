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
 * Get the current Solana wallet type from window.solana
 */
export function getCurrentSolanaWalletType() {
  const solana = (window as any)?.solana;
  const phantomProvider = (window as any)?.phantom?.solana;
  
  return {
    isPhantom: !!solana?.isPhantom && !solana?.isBraveWallet,
    isBrave: !!solana?.isBraveWallet,
    hasPhantomProvider: !!phantomProvider,
    hasWindowSolana: !!solana,
    provider: phantomProvider || solana || null,
  };
}

/**
 * Check if Phantom is installed and available (not Brave)
 */
export function isPhantomInstalled(): boolean {
  // First check for the dedicated Phantom provider (works better in Brave)
  const phantomProvider = (window as any).phantom?.solana;
  if (phantomProvider) {
    return true;
  }
  
  // Fallback to the standard window.solana check
  const solana = (window as any).solana;
  return solana && solana.isPhantom && !solana.isBraveWallet;
}

/**
 * Connect to Phantom wallet directly without using adapter
 */
export async function connectToPhantomDirectly() {
  try {
    console.log('Attempting direct Phantom connection...');
    
    // First try to use window.phantom.solana (more reliable in Brave)
    let provider = (window as any).phantom?.solana;
    
    // Fall back to window.solana if needed
    if (!provider) {
      if (!isPhantomInstalled()) {
        console.error('Phantom not installed');
        throw new Error('Phantom wallet is not installed');
      }
      provider = (window as any).solana;
    }
    
    console.log('Phantom provider found:', provider ? 'Yes' : 'No');
    console.log('Phantom version:', provider?.version || 'Unknown');
    console.log('Phantom state:', provider?.isConnected ? 'connected' : 'disconnected');
    
    // Connect directly to Phantom
    const response = await provider.connect();
    
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
    console.log('Attempting to disconnect from Phantom...');
    
    // First try to use window.phantom.solana (more reliable in Brave)
    let provider = (window as any).phantom?.solana;
    
    // Fall back to window.solana if needed
    if (!provider) {
      if (!isPhantomInstalled()) {
        throw new Error('Phantom wallet is not installed');
      }
      provider = (window as any).solana;
    }
    
    await provider.disconnect();
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

/**
 * Save wallet connection state to localStorage
 * General purpose function for any wallet type
 */
export function saveWalletConnectionState(publicKey: string | null, walletName: string | null) {
  if (publicKey) {
    localStorage.setItem('walletConnected', 'true');
    localStorage.setItem('lastConnectedWallet', walletName || 'unknown');
    // Don't override phantom-specific entries if this isn't phantom
    if (walletName === 'Phantom') {
      localStorage.setItem('phantomConnected', 'true');
      localStorage.setItem('phantomPublicKey', publicKey);
    }
    console.log(`Saved ${walletName || 'wallet'} connection state to localStorage`);
  } else {
    // Clear connection state
    localStorage.setItem('walletConnected', 'false');
    localStorage.removeItem('lastConnectedWallet');
    // Only clear phantom data if explicitly disconnecting phantom
    if (walletName === 'Phantom' || !walletName) {
      localStorage.removeItem('phantomConnected');
      localStorage.removeItem('phantomPublicKey');
    }
    console.log(`Cleared ${walletName || 'wallet'} connection state from localStorage`);
  }
} 