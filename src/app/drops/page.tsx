'use client'

import React from 'react'
import Image from "next/image"
import { Navigation } from '@/components/Navigation'
import { WalletButton } from '@/components/WalletButton'
import SignVerifyTest from './SignVerifyTest'

export default function Drops() {
  return (
    <main className="min-h-screen bg-black overflow-hidden">
      <Navigation />
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
          {/* Drops Content Section */}
          <div className="h-screen flex items-center justify-center overflow-hidden">
            <div className="relative z-10 max-w-7xl mx-auto px-4 w-full h-full flex items-center justify-center">
              <div className="relative flex flex-col items-center justify-center h-full py-16 md:py-14">
                {/* Drops Title */}
                <div className="mb-12">
                  <Image
                    src="/Drop_button.png"
                    alt="Drops"
                    width={60}
                    height={18}
                    className="w-auto h-auto max-w-[90px]"
                    priority
                    unoptimized
                  />
                </div>

                {/* Downloadable Photos Grid */}
                <div className="w-full max-w-6xl">
                  <div className="grid grid-cols-1 gap-8 p-6">
                    {/* Photo Card - Kite Character */}
                    <div className="relative group bg-black/40 rounded-lg overflow-hidden border-2 border-purple-500/30">
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
                        <a
                          href="/Kite_Character.png"
                          download="Kite_Character.png"
                          className="relative inline-block hover:scale-105 active:scale-95 transition-transform"
                        >
                          <Image
                            src="/Download_button.png"
                            alt="Download"
                            width={150}
                            height={50}
                            className="w-auto h-auto"
                            unoptimized
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Sign & Verify Test Section */}
      <div className="relative z-20 py-10">
        <SignVerifyTest />
      </div>
    </main>
  )
} 