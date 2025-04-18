"use client";
import React, { useState } from "react";
import { useWallet } from '@solana/wallet-adapter-react';
import bs58 from 'bs58';

export default function SignVerifyTest() {
  const { publicKey, signMessage, connected } = useWallet();
  const [message, setMessage] = useState("Hello, World!");
  const [signature, setSignature] = useState<string | null>(null);
  const [verified, setVerified] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSign = async () => {
    setError(null);
    setVerified(null);
    setSignature(null);
    try {
      if (!signMessage) throw new Error('Wallet does not support message signing.');
      if (!publicKey) throw new Error('Wallet not connected.');
      const msgBytes = new TextEncoder().encode(message);
      const sig = await signMessage(msgBytes);
      setSignature(bs58.encode(sig));
    } catch (e: any) {
      setError(e.message || String(e));
    }
  };

  const handleVerify = async () => {
    setError(null);
    setVerified(null);
    try {
      if (!publicKey) throw new Error('Wallet not connected.');
      if (!signature) throw new Error('No signature to verify.');
      const msgBytes = new TextEncoder().encode(message);
      const sigBytes = bs58.decode(signature);
      // Use native webcrypto for verification
      const isValid = await window.crypto.subtle.verify(
        {
          name: "Ed25519"
        },
        await window.crypto.subtle.importKey(
          "raw",
          publicKey.toBytes(),
          { name: "Ed25519", namedCurve: "Ed25519" },
          false,
          ["verify"]
        ),
        sigBytes,
        msgBytes
      );
      setVerified(isValid);
    } catch (e: any) {
      setError(e.message || String(e));
    }
  };

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg max-w-xl w-full mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Sign & Verify Test</h2>
      <label className="block mb-2 font-semibold">Message to Sign:</label>
      <input
        type="text"
        value={message}
        onChange={e => setMessage(e.target.value)}
        className="w-full p-2 rounded bg-gray-800 border border-gray-700 mb-4 text-gray-200"
      />
      <button
        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded mr-2"
        onClick={handleSign}
        disabled={!connected || !signMessage}
      >
        Sign Message with Wallet
      </button>
      <button
        className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
        onClick={handleVerify}
        disabled={!signature || !connected}
      >
        Verify Signature
      </button>
      {signature && (
        <div className="mt-4 break-all">
          <div><span className="font-semibold">Signature (base58):</span> {signature}</div>
        </div>
      )}
      {verified !== null && (
        <div className="mt-2">
          <span className={`font-semibold ${verified ? 'text-green-400' : 'text-red-400'}`}>
            {verified ? 'Signature Verified!' : 'Signature Invalid!'}
          </span>
        </div>
      )}
      {publicKey && (
        <div className="mt-4 break-all text-xs">
          <div><span className="font-semibold">Wallet Public Key:</span> {publicKey.toBase58()}</div>
        </div>
      )}
      {error && (
        <div className="mt-2 text-red-400">Error: {error}</div>
      )}
    </div>
  );
}
