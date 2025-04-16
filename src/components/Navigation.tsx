import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAudio } from '@/contexts/AudioContext';
import { WalletButton } from './WalletButton';
import { motion } from 'framer-motion';

export const Navigation: FC = () => {
  const { isPlaying, toggleAudio } = useAudio();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between py-3">
        {/* Left Section - Logo */}
        <Link href="/">
          <motion.div 
            className="w-[80px] md:w-[100px] cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Image
              src="/1_World of Gazm.png"
              alt="World of Gazm"
              width={100}
              height={100}
              className="w-full h-auto object-contain"
              priority
              unoptimized
            />
          </motion.div>
        </Link>

        {/* Center Section - Navigation */}
        <nav className="hidden md:flex items-center space-x-4">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/" className="flex items-center justify-center w-28 h-auto">
              <Image
                src="/Home.png"
                alt="Home Button"
                width={100}
                height={35}
                className="w-full h-auto object-contain hover:opacity-80 transition-opacity duration-300 brightness-100"
                priority
                unoptimized
              />
            </Link>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/drops" className="flex items-center justify-center w-28 h-auto">
              <Image
                src="/Drop_button.png"
                alt="Drops Button"
                width={100}
                height={35}
                className="w-full h-auto object-contain hover:opacity-80 transition-opacity duration-300 brightness-100"
                priority
                unoptimized
              />
            </Link>
          </motion.div>
          
          {/*
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/lore" className="flex items-center justify-center w-28 h-auto">
              <Image
                src="/Lore_button.png"
                alt="Lore Button"
                width={100}
                height={35}
                className="w-full h-auto object-contain hover:opacity-80 transition-opacity duration-300 brightness-100"
                priority
                unoptimized
              />
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/academy" className="flex items-center justify-center w-28 h-auto">
              <Image
                src="/Academy_button.png"
                alt="Academy Button"
                width={100}
                height={35}
                className="w-full h-auto object-contain hover:opacity-80 transition-opacity duration-300 brightness-100"
                priority
                unoptimized
              />
            </Link>
          </motion.div>
          */}
        </nav>

        {/* Right Section - Connect Wallet and Audio Controls */}
        <div className="flex items-center space-x-4">
          {/* Audio Button */}
          <motion.button
            onClick={toggleAudio}
            className="hidden md:flex items-center justify-center w-12 h-12 p-1 rounded-full transition-colors duration-300"
            title={isPlaying ? "Mute" : "Unmute"}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {!isPlaying ? (
              <Image 
                src="/Mute_Icon.png" 
                alt="Unmute" 
                width={40}
                height={40}
                className="w-full h-full object-contain"
                unoptimized
              />
            ) : (
              <Image 
                src="/Speaker_Icon.png" 
                alt="Mute" 
                width={40}
                height={40}
                className="w-full h-full object-contain"
                unoptimized
              />
            )}
          </motion.button>
          
          {/* Wallet Button */}
          <WalletButton />
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          className="md:hidden p-2 text-white hover:text-yellow-400 transition-colors duration-300 absolute right-4"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </motion.button>
      </div>
    </header>
  );
}; 