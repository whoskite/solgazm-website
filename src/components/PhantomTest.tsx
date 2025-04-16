'use client';

import { useState, useEffect } from 'react';
import { isPhantomInstalled, connectToPhantomDirectly, disconnectPhantomDirectly } from '../utils/phantomHelper';

export function PhantomTest() {
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  // Add a log entry
  const addLog = (message: string) => {
    setLogs(prev => [...prev, `${new Date().toISOString().slice(11, 19)}: ${message}`]);
  };

  // Check if Phantom is installed when component mounts
  useEffect(() => {
    try {
      // Need to check in useEffect because window is not available during SSR
      const phantomInstalled = isPhantomInstalled();
      setIsInstalled(phantomInstalled);
      
      // Check if already connected
      if (phantomInstalled) {
        const solana = (window as any).solana;
        setIsConnected(!!solana.isConnected);
        
        // Listen for connection events
        solana.on('connect', (publicKey: any) => {
          addLog(`Connected: ${publicKey?.toString()}`);
          setPublicKey(publicKey?.toString() || null);
          setIsConnected(true);
        });
        
        // Listen for disconnect events
        solana.on('disconnect', () => {
          addLog('Disconnected');
          setPublicKey(null);
          setIsConnected(false);
        });
      }
    } catch (err) {
      console.error('Error checking Phantom installation:', err);
      addLog(`Error: ${err instanceof Error ? err.message : String(err)}`);
    }
    
    return () => {
      // Clean up event listeners
      if (isPhantomInstalled()) {
        const solana = (window as any).solana;
        solana.removeAllListeners('connect');
        solana.removeAllListeners('disconnect');
      }
    };
  }, []);

  // Handle connect button click
  const handleConnect = async () => {
    setConnecting(true);
    setError(null);
    
    try {
      addLog('Connecting to Phantom...');
      const response = await connectToPhantomDirectly();
      setPublicKey(response.publicKey.toString());
      addLog(`Connected! Public key: ${response.publicKey.toString().slice(0, 8)}...`);
    } catch (err) {
      console.error('Connection error:', err);
      setError(err instanceof Error ? err.message : String(err));
      addLog(`Connection error: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setConnecting(false);
    }
  };

  // Handle disconnect button click
  const handleDisconnect = async () => {
    try {
      addLog('Disconnecting...');
      await disconnectPhantomDirectly();
      setPublicKey(null);
      addLog('Disconnected');
    } catch (err) {
      console.error('Disconnect error:', err);
      setError(err instanceof Error ? err.message : String(err));
      addLog(`Disconnect error: ${err instanceof Error ? err.message : String(err)}`);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto rounded-lg shadow-md bg-gray-900 text-white">
      <h2 className="text-xl font-bold mb-4">Phantom Connection Test</h2>
      
      <div className="mb-4 p-3 rounded bg-gray-800">
        <p>Phantom Installed: <span className={isInstalled ? "text-green-400" : "text-red-400"}>{isInstalled ? "Yes" : "No"}</span></p>
        <p>Connected: <span className={isConnected ? "text-green-400" : "text-red-400"}>{isConnected ? "Yes" : "No"}</span></p>
        {publicKey && (
          <p className="truncate">
            Public Key: <span className="font-mono text-xs text-blue-300">{publicKey}</span>
          </p>
        )}
      </div>
      
      <div className="flex gap-3 mb-4">
        <button
          onClick={handleConnect}
          disabled={connecting || !!publicKey}
          className="px-4 py-2 bg-purple-600 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {connecting ? 'Connecting...' : 'Connect Phantom'}
        </button>
        
        <button
          onClick={handleDisconnect}
          disabled={!publicKey}
          className="px-4 py-2 bg-red-600 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Disconnect
        </button>
      </div>
      
      {error && (
        <div className="mb-4 p-3 rounded bg-red-900/50 text-red-200 text-sm">
          <p className="font-bold">Error:</p>
          <p>{error}</p>
        </div>
      )}
      
      <div className="mb-4">
        <p className="font-bold mb-2">Connection Logs:</p>
        <div className="h-40 overflow-y-auto p-2 bg-black/30 rounded font-mono text-xs">
          {logs.length === 0 ? (
            <p className="text-gray-500">No logs yet...</p>
          ) : (
            logs.map((log, i) => <div key={i} className="mb-1">{log}</div>)
          )}
        </div>
      </div>
      
      <div className="text-xs text-gray-400">
        <p>Troubleshooting:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Make sure Phantom extension is installed and unlocked</li>
          <li>Try refreshing the page before connecting</li>
          <li>Check your browser console for additional errors</li>
          <li>If using Chrome, check that extension permissions are granted</li>
        </ul>
      </div>
    </div>
  );
} 