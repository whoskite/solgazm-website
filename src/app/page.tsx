'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion } from "framer-motion"
import Image from "next/image"

export default function Home() {
  const [isMuted, setIsMuted] = useState(true)
  const audioRef = useRef<HTMLAudioElement>(null)

  const toggleMute = () => {
    const audio = audioRef.current
    if (audio) {
      const currentlyMuted = !audio.muted
      audio.muted = currentlyMuted
      setIsMuted(currentlyMuted)
      if (!currentlyMuted && audio.paused) {
        audio.play().catch(error => {
          console.error("Error playing audio on unmute:", error)
          audio.muted = true
          setIsMuted(true)
        })
      }
    }
  }

  useEffect(() => {
    const audio = audioRef.current
    if (audio) {
      audio.volume = 1
      if (!audio.muted) {
        audio.muted = true
      }
      setIsMuted(true)
      console.log("Audio element ready. Click unmute to play.")
    }
  }, [])

  return (
    <div className="min-h-screen relative">
      {/* Background Audio */}
      <audio ref={audioRef} loop preload="auto" playsInline muted>
        <source src="/AUDIO_3722.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      
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
      <div className="relative z-10 min-h-screen">
        {/* Navigation Header */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed top-0 left-0 right-0 z-50 bg-black/20"
        >
          <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-8 py-2">
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
                className="w-full h-auto object-contain py-0.5"
                priority
                unoptimized
              />
            </motion.div>

            <nav className="hidden md:flex items-center space-x-8">
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
              <motion.a
                href="#drops"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center w-28 h-auto"
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
              </motion.a>
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

            <motion.button
              onClick={toggleMute}
              className={`hidden md:flex items-center justify-center w-12 h-12 p-1 rounded-full transition-colors duration-300 ${!isMuted ? 'speaker-glow' : ''}`}
              title={isMuted ? "Unmute" : "Mute"}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isMuted ? (
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
        <div className="relative min-h-screen flex items-center justify-center">
          {/* Container for centered content AND the absolute button */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 w-full flex flex-col items-center justify-center h-full pt-[80px]"> 
            {/* Centered Content (Logo, Text, and Button) */}
            <div className="flex flex-col items-center text-center">
              {/* Logo */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-0"
              >
                <Image
                  src="/WORLDOFGAZM_LOGO.png"
                  alt="World of Gazm Logo"
                  width={400}
                  height={150}
                  className="w-auto h-auto max-w-[400px] md:max-w-[500px]"
                  priority
                  unoptimized
                />
              </motion.div>

              {/* Text Below Logo */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-pangolin text-xl md:text-2xl text-white/90 max-w-lg leading-relaxed mb-12"
              >
                Explore the <span className="text-[#ca85ff]">degenerate</span> world of <span className="text-[#ca85ff]">Gazms</span> on the blockchain.
              </motion.p>

              {/* Start Your Journey Button - Back in flow */}
              <motion.a
                href="#journey"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                whileHover={{ scale: 1.03, filter: 'brightness(1.1)'}}
                whileTap={{ scale: 0.98 }}
                className="inline-block cursor-pointer mt-4 pt-20"
              >
                <Image
                  src="/Start%20Your%20Journey_Icon.png"
                  alt="Start Your Journey"
                  width={350}
                  height={70}
                  className="w-auto h-auto max-w-xs md:max-w-sm"
                  priority
                  unoptimized
                />
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
