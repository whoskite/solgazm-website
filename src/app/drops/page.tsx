'use client'

import React from 'react'
import { motion } from "framer-motion"
import Image from "next/image"
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useAudio } from '@/contexts/AudioContext'
import AudioButton from '@/components/AudioButton'

// Dynamically import WalletMultiButton with no SSR
const WalletMultiButton = dynamic(
  () => import('@solana/wallet-adapter-react-ui').then((mod) => mod.WalletMultiButton),
  { ssr: false }
);

export default function Drops() {
  const { isPlaying, toggleAudio } = useAudio();

  return (
    <div className="h-screen overflow-hidden relative">
      {/* Background Image */}
      <div className="fixed inset-0 w-full h-full z-0">
        <Image
          src="/Background_worldofgazm.png"
          alt="World of Gazm Background"
          fill
          className="w-full h-full object-cover object-center"
          quality={100}
          priority
          unoptimized
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 h-screen">
        {/* Navigation Header */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 flex items-center justify-between py-3">
            {/* Left Section - Logo */}
            <Link href="/">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-[80px] md:w-[100px] cursor-pointer"
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
            <nav className="hidden md:flex items-center space-x-12">
              <Link href="/" className="flex items-center justify-center w-28 h-auto">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Image
                    src="/Home.png"
                    alt="Home Button"
                    width={100}
                    height={35}
                    className="w-full h-auto object-contain hover:opacity-80 transition-opacity duration-300 brightness-100"
                    priority
                    unoptimized
                  />
                </motion.div>
              </Link>
              <Link href="/drops" className="flex items-center justify-center w-28 h-auto">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Image
                    src="/Drop_button.png"
                    alt="Drops Button"
                    width={100}
                    height={35}
                    className="w-full h-auto object-contain hover:opacity-80 transition-opacity duration-300 brightness-100"
                    priority
                    unoptimized
                  />
                </motion.div>
              </Link>
              <Link href="/lore" className="flex items-center justify-center w-28 h-auto">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Image
                    src="/Lore_button.png"
                    alt="Lore Button"
                    width={100}
                    height={35}
                    className="w-full h-auto object-contain hover:opacity-80 transition-opacity duration-300 brightness-100"
                    priority
                    unoptimized
                  />
                </motion.div>
              </Link>
              <Link href="/academy" className="flex items-center justify-center w-28 h-auto">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Image
                    src="/Academy_button.png"
                    alt="Academy Button"
                    width={100}
                    height={35}
                    className="w-full h-auto object-contain hover:opacity-80 transition-opacity duration-300 brightness-100"
                    priority
                    unoptimized
                  />
                </motion.div>
              </Link>
            </nav>

            {/* Right Section - Connect Wallet and Audio Controls */}
            <div className="flex items-center gap-4">
              {/* Audio Button */}
              <AudioButton />
              
              {/* Connect Wallet/Profile Button */}
              <WalletMultiButton />
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="md:hidden p-2 text-white hover:text-yellow-400 transition-colors duration-300 absolute right-4"
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

        {/* Drops Content Section */}
        <div className="h-screen flex items-center justify-center overflow-hidden">
          <div className="relative z-10 max-w-7xl mx-auto px-4 w-full h-full flex items-center justify-center">
            <div className="relative flex flex-col items-center justify-center h-full py-16 md:py-14">
              {/* Drops Title */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-12"
              >
                <Image
                  src="/Drop_button.png"
                  alt="Drops"
                  width={100}
                  height={25}
                  className="w-auto h-auto max-w-[150px] md:max-w-[200px]"
                  priority
                  unoptimized
                />
              </motion.div>

              {/* Downloadable Photos Grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="w-full max-w-6xl"
              >
                <div className="grid grid-cols-1 gap-8 p-6">
                  {/* Photo Card - Kite Character */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="relative group bg-black/40 rounded-lg overflow-hidden border-2 border-purple-500/30"
                  >
                    <Image
                      src="/Kite_Character.png"
                      alt="Kite Character"
                      width={200}
                      height={200}
                      className="w-full h-auto max-w-[200px] mx-auto object-cover transition-transform duration-300 group-hover:opacity-80"
                      unoptimized
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/60">
                      <h3 className="text-white font-press-play text-lg mb-4">Kite Character</h3>
                      <motion.a
                        href="/Kite_Character.png"
                        download="Kite_Character.png"
                        className="relative inline-block"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Image
                          src="/Download_button.png"
                          alt="Download"
                          width={150}
                          height={50}
                          className="w-auto h-auto"
                          unoptimized
                        />
                      </motion.a>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 