'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type CursorType = 'default' | 'hover';

export interface CursorContextType {
  cursorType: CursorType;
  updateCursorType: (type: CursorType) => void;
  cursorPosition: { x: number; y: number };
  isClicking: boolean;
}

const CursorContext = createContext<CursorContextType>({
  cursorType: 'default',
  updateCursorType: () => {},
  cursorPosition: { x: 0, y: 0 },
  isClicking: false,
});

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const [cursorType, setCursorType] = useState<CursorType>('default');
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => {
      setIsClicking(true);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    // Prevent right-click context menu
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('contextmenu', handleContextMenu);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  const updateCursorType = (type: CursorType) => {
    setCursorType(type);
  };

  return (
    <CursorContext.Provider value={{ cursorType, updateCursorType, cursorPosition, isClicking }}>
      {children}
    </CursorContext.Provider>
  );
}

export function useCursor() {
  const context = useContext(CursorContext);
  if (!context) {
    throw new Error('useCursor must be used within a CursorProvider');
  }
  return context;
} 