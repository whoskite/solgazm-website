'use client';

import { createContext, useContext, useEffect, useState, useRef } from 'react';

interface AudioContextType {
  isPlaying: boolean;
  toggleAudio: () => void;
  playBubbleSound: () => void;
  playInsertCoinSound: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const backgroundAudioRef = useRef<HTMLAudioElement | null>(null);
  const bubbleAudioRef = useRef<HTMLAudioElement | null>(null);
  const insertCoinAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio elements only once
    if (!backgroundAudioRef.current) {
      backgroundAudioRef.current = new Audio('/AUDIO_3722.mp3');
      backgroundAudioRef.current.loop = true;
    }
    if (!bubbleAudioRef.current) {
      bubbleAudioRef.current = new Audio('/Bubble Effect.mp3');
    }
    if (!insertCoinAudioRef.current) {
      insertCoinAudioRef.current = new Audio('/Insert_Coin.wav');
    }

    // Check local storage for audio state
    const savedState = localStorage.getItem('audioPlaying');
    if (savedState === 'true') {
      setIsPlaying(true);
      backgroundAudioRef.current.play().catch(() => {
        setIsPlaying(false);
      });
    }

    return () => {
      if (backgroundAudioRef.current) {
        backgroundAudioRef.current.pause();
      }
    };
  }, []);

  // Update audio state when isPlaying changes
  useEffect(() => {
    if (!backgroundAudioRef.current) return;

    if (isPlaying) {
      backgroundAudioRef.current.play().catch(() => {
        setIsPlaying(false);
      });
    } else {
      backgroundAudioRef.current.pause();
    }

    // Save state to localStorage
    localStorage.setItem('audioPlaying', isPlaying.toString());
  }, [isPlaying]);

  const toggleAudio = () => {
    setIsPlaying(!isPlaying);
  };

  const playBubbleSound = () => {
    if (bubbleAudioRef.current && isPlaying) {
      bubbleAudioRef.current.currentTime = 0;
      bubbleAudioRef.current.play().catch(console.error);
    }
  };

  const playInsertCoinSound = () => {
    if (insertCoinAudioRef.current && isPlaying) {
      insertCoinAudioRef.current.currentTime = 0;
      insertCoinAudioRef.current.play().catch(console.error);
    }
  };

  return (
    <AudioContext.Provider value={{ isPlaying, toggleAudio, playBubbleSound, playInsertCoinSound }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
} 