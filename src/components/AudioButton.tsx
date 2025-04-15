import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useAudio } from '@/contexts/AudioContext';

const AudioButton = () => {
  const { isPlaying, toggleAudio } = useAudio();

  return (
    <motion.button
      onClick={toggleAudio}
      className="hidden md:flex items-center justify-center w-10 h-10 rounded-full"
      title={isPlaying ? "Mute" : "Unmute"}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {!isPlaying ? (
        <Image 
          src="/Mute_Icon.png" 
          alt="Unmute" 
          width={32}
          height={32}
          className="w-full h-full object-contain"
          unoptimized
        />
      ) : (
        <Image 
          src="/Speaker_Icon.png" 
          alt="Mute" 
          width={32}
          height={32}
          className="w-full h-full object-contain"
          unoptimized
        />
      )}
    </motion.button>
  );
};

export default AudioButton; 