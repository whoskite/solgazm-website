'use client';

import { FC, ReactNode } from 'react';
import { SolanaWalletProvider } from './WalletProvider';

interface Props {
  children: ReactNode;
}

export const ClientLayout: FC<Props> = ({ children }) => {
  return (
    <SolanaWalletProvider>
      {children}
    </SolanaWalletProvider>
  );
}; 