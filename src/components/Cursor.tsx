import React from 'react';
import Image from 'next/image';
import { useCursor } from '@/contexts/CursorContext';

const Cursor: React.FC = () => {
  const { cursorPosition, isClicking, cursorType } = useCursor();

  return (
    <div
      className="fixed pointer-events-none z-[9999]"
      style={{
        left: `${cursorPosition.x}px`,
        top: `${cursorPosition.y}px`,
        transform: 'translate(-15%, -15%)',
        width: '50px',
        height: '50px'
      }}
    >
      <Image
        src={isClicking ? "/handcursor_solgazm_2.png" : "/handcursor_solgazm1.png"}
        alt="Cursor"
        width={50}
        height={50}
        priority
        unoptimized
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain'
        }}
        className={`transition-transform duration-100 ${isClicking ? 'scale-90' : 'scale-100'}`}
      />
    </div>
  );
};

export default Cursor; 