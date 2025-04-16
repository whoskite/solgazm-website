declare module '@/contexts/CursorContext' {
  export function CursorProvider({ children }: { children: React.ReactNode }): JSX.Element;
  export function useCursor(): {
    cursorType: 'default' | 'hover';
    updateCursorType: (type: 'default' | 'hover') => void;
    cursorPosition: { x: number; y: number };
    isClicking: boolean;
  };
}

declare module '@/contexts/WalletContext' {
  export function WalletProvider({ children }: { children: React.ReactNode }): JSX.Element;
  export function useWallet(): {
    isConnected: boolean;
    setIsConnected: (connected: boolean) => void;
  };
}

declare module '@/contexts/AudioContext' {
  export function AudioProvider({ children }: { children: React.ReactNode }): JSX.Element;
  export function useAudio(): {
    isPlaying: boolean;
    toggleAudio: () => void;
    playBubbleSound: () => void;
    playInsertCoinSound: () => void;
    playFloatingSound: () => void;
    playSuccessSound: () => void;
  };
} 