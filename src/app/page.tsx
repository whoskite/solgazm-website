'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { WalletButton } from "@/components/WalletButton"
import { useAudio } from '@/contexts/AudioContext'

export default function Home() {
  const { isPlaying, toggleAudio, playBubbleSound } = useAudio()
  const [hoveredCharacter, setHoveredCharacter] = useState<string | null>(null)

  // Custom cursor implementation
  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      // Check if the click is on the connect wallet button
      const target = e.target as HTMLElement;
      const isConnectWalletButton = target.closest('img[alt="Connect Wallet"]') !== null ||
                                   target.closest('button')?.querySelector('img[alt="Connect Wallet"]') !== null ||
                                   target.closest('button')?.querySelector('img[src="/ConnectWallet_button.png"]') !== null;
      
      // Play bubble sound if not clicking connect wallet button
      if (!isConnectWalletButton) {
        playBubbleSound();
      }
    };

    // Prevent right-click context menu
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    // Add event listeners
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('contextmenu', handleContextMenu);

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  return (
    <div className="h-screen overflow-hidden relative">
      {/* SVG Filter for Graffiti Texture */}
      <svg width="0" height="0" className="absolute">
        <filter id="gritty-texture" x="-50%" y="-50%" width="200%" height="200%">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" xChannelSelector="R" yChannelSelector="G" />
          <feGaussianBlur stdDeviation="0.5" />
        </filter>
      </svg>

      {/* CSS Animations */}
      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          25% {
            opacity: 0.7;
          }
          50% {
            transform: translateY(-15px) translateX(5px);
          }
          75% {
            transform: translateY(-5px) translateX(-10px);
            opacity: 0.8;
          }
          100% {
            transform: translateY(-20px) translateX(0);
            opacity: 0;
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>

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
      <main className="relative min-h-screen z-10">
        {/* Navigation Header */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-sm"
        >
          <div className="max-w-7xl mx-auto px-4 flex items-center justify-between py-3">
            {/* Left Section - Logo */}
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

            {/* Center Section - Navigation */}
            <nav className="hidden md:flex items-center space-x-12">
              <motion.a
                href="#home"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center w-28 h-auto"
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
              </motion.a>
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
              <motion.a
                href="#lore"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center w-28 h-auto"
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
              </motion.a>
              <motion.a
                href="#academy"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center w-28 h-auto"
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
              </motion.a>
            </nav>

            {/* Right Section - Connect Wallet and Audio Controls */}
            <div className="flex items-center space-x-6 mr-4">
              {/* Audio Button */}
              <motion.button
                onClick={toggleAudio}
                className="hidden md:flex items-center justify-center w-12 h-12 p-1 rounded-full transition-colors duration-300"
                title={isPlaying ? "Mute" : "Unmute"}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
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
              
              {/* Connect Wallet/Profile Button */}
              <WalletButton />
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
        </motion.header>

        {/* Hero Section */}
        <div className="h-screen flex items-center justify-center overflow-hidden">
          {/* Container for all content */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 w-full h-full flex items-center justify-center"> 
            <div className="relative flex flex-col items-center justify-between h-full py-16 md:py-14">
              {/* Logo (at top with appropriate spacing) */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="z-20 mt-14 md:mt-10"
              >
                <Image
                  src="/WORLDOFGAZM_LOGO.png"
                  alt="World of Gazm Logo"
                  width={500}
                  height={200}
                  className="w-auto h-auto max-w-[350px] md:max-w-[450px]"
                  priority
                  unoptimized
                />
              </motion.div>

              {/* Character Layer (below logo) */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="z-20 flex-1 flex items-center relative"
              >
                <div className="flex justify-center w-full">
                  {/* Characters in a row */}
                  <div className="flex gap-0 -mt-10 -mb-2">
                    {/* Kite Character */}
                    <div 
                      className={`w-[200px] md:w-[400px] lg:w-[500px] -mr-8 md:-mr-16 lg:-mr-20 relative transition-all duration-300 ${hoveredCharacter === 'kite' ? 'scale-105 z-20' : ''}`}
                      onMouseEnter={() => setHoveredCharacter('kite')}
                      onMouseLeave={() => setHoveredCharacter(null)}
                    >
                      {hoveredCharacter === 'kite' && (
                        <>
                          {/* Character silhouette glow */}
                          <div className="absolute inset-0 z-0">
                            <div className="absolute w-full h-full" style={{ filter: "drop-shadow(0 0 8px rgba(0, 255, 0, 0.8)) drop-shadow(0 0 20px rgba(50, 255, 50, 0.6))" }}>
                              <Image
                                src="/Kite_Character.png"
                                alt="Kite Glow"
                                width={800}
                                height={1280}
                                className="w-full h-auto opacity-70"
                                unoptimized
                              />
                            </div>
                          </div>
                        </>
                      )}
                      <Image
                        src="/Kite_Character.png"
                        alt="Kite Gazm"
                        width={800}
                        height={1280}
                        className="w-full h-auto relative z-10"
                        unoptimized
                      />
                    </div>

                    {/* PROD Character */}
                    <div 
                      className={`w-[200px] md:w-[400px] lg:w-[500px] -mr-8 md:-mr-16 lg:-mr-20 relative transition-all duration-300 ${hoveredCharacter === 'prod' ? 'scale-105 z-20' : ''}`}
                      onMouseEnter={() => setHoveredCharacter('prod')}
                      onMouseLeave={() => setHoveredCharacter(null)}
                    >
                      {hoveredCharacter === 'prod' && (
                        <>
                          {/* Character silhouette glow */}
                          <div className="absolute inset-0 z-0">
                            <div className="absolute w-full h-full" style={{ filter: "drop-shadow(0 0 8px rgba(255, 215, 0, 0.8)) drop-shadow(0 0 20px rgba(255, 215, 0, 0.6))" }}>
                              <Image
                                src="/PROD_Character.png"
                                alt="PROD Glow"
                                width={800}
                                height={1280}
                                className="w-full h-auto opacity-70"
                                unoptimized
                              />
                            </div>
                          </div>
                        </>
                      )}
                      <Image
                        src="/PROD_Character.png"
                        alt="PROD Gazm"
                        width={800}
                        height={1280}
                        className="w-full h-auto relative z-10"
                        unoptimized
                      />
                    </div>
                    
                    {/* Wizard Character (Center) */}
                    <div 
                      className={`w-[200px] md:w-[400px] lg:w-[500px] z-10 relative transition-all duration-300 ${hoveredCharacter === 'wizard' ? 'scale-105 z-20' : ''}`}
                      onMouseEnter={() => setHoveredCharacter('wizard')}
                      onMouseLeave={() => setHoveredCharacter(null)}
                    >
                      {hoveredCharacter === 'wizard' && (
                        <>
                          {/* Character silhouette glow */}
                          <div className="absolute inset-0 z-0">
                            <div className="absolute w-full h-full" style={{ filter: "drop-shadow(0 0 8px rgba(100, 143, 255, 0.8)) drop-shadow(0 0 20px rgba(100, 143, 255, 0.6))" }}>
                              <Image
                                src="/Wizard_Character.png"
                                alt="Wizard Glow"
                                width={800}
                                height={1280}
                                className="w-full h-auto opacity-70"
                                unoptimized
                              />
                            </div>
                          </div>
                        </>
                      )}
                      <Image
                        src="/Wizard_Character.png"
                        alt="Wizard Gazm"
                        width={800}
                        height={1280}
                        className="w-full h-auto relative z-10"
                        unoptimized
                      />
                    </div>
                    
                    {/* Solgazm Character */}
                    <div 
                      className={`w-[200px] md:w-[400px] lg:w-[500px] -ml-8 md:-ml-16 lg:-ml-20 relative transition-all duration-300 ${hoveredCharacter === 'solgazm' ? 'scale-105 z-20' : ''}`}
                      onMouseEnter={() => setHoveredCharacter('solgazm')}
                      onMouseLeave={() => setHoveredCharacter(null)}
                    >
                      {hoveredCharacter === 'solgazm' && (
                        <>
                          {/* Character silhouette glow */}
                          <div className="absolute inset-0 z-0">
                            <div className="absolute w-full h-full" style={{ filter: "drop-shadow(0 0 8px rgba(255, 0, 0, 0.8)) drop-shadow(0 0 20px rgba(255, 50, 50, 0.6))" }}>
                              <Image
                                src="/Solgazm_Character.png"
                                alt="Solgazm Glow"
                                width={800}
                                height={1280}
                                className="w-full h-auto opacity-70"
                                unoptimized
                              />
                            </div>
                          </div>
                        </>
                      )}
                      <Image
                        src="/Solgazm_Character.png"
                        alt="Solgazm"
                        width={800}
                        height={1280}
                        className="w-full h-auto relative z-10"
                        unoptimized
                      />
                    </div>
                  </div>
                </div>
                
                {/* Start Your Journey Button - Overlapping Characters */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none"
                  style={{ paddingTop: "15%" }}
                >
                  <motion.a
                    href="#journey"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    whileHover={{ scale: 1.03, filter: 'brightness(1.1)'}}
                    whileTap={{ scale: 0.98 }}
                    className="cursor-pointer pointer-events-auto"
                  >
                    <Image
                      src="/Start%20Your%20Journey_Icon.png"
                      alt="Start Your Journey"
                      width={300}
                      height={60}
                      className="w-auto h-auto max-w-[280px] md:max-w-[300px]"
                      priority
                      unoptimized
                    />
                  </motion.a>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
