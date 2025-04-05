'use client'

import React from 'react'
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { useState, useEffect } from "react"

const images = [
  'Collection/SOLGAZM_VACATION2.png',
  'Collection/SOLGAZM_VACATION.png',
  'Collection/SOLGAZM_GODSPOKE.png',
  'Collection/SOLGAZM_KING_2.png',
  'Collection/Gchord_Solgazm.png',
  'Collection/KING_SOLGAZM_3D.png',
  'Collection/Before n After_Solgazm.png',
  'Collection/MINING_SOLGAZM.png',
  'Collection/CHOIR_Solgazm.png',
  'Collection/ANNOUNCEMENT_SOLGAZM_KITE.png',
  'Collection/Laboratory_KITE_SOLGAZM.png',
  'Collection/CULT_SOLGAZM.png',
  'Collection/CaptainSol_Solgazm.png',
  'Collection/One Piece_Solgazm.png',
  'Collection/1000x2_SOLGAZM.png',
  'Collection/RIDINGTHECANDLE_SOLGAZM.png',
  'Collection/1000x_SOLGAZM.png',
  'Collection/CREATIONOFGARU_SOLGAZM.png',
  'Collection/DRINK2_SOLGAZM.png',
  'Collection/BRUCELEE_SOLGAZM.png',
  'Collection/THRONEWALK_SOLGAZM.png',
  'Collection/LASTMEME_SOLGAZM.png',
  'Collection/StarsAligning_Solgazm.png',
  'Collection/Giveaway_Solgazm.png',
  'Collection/THIEF_SOLGAZM.png',
  'Collection/SUPPORT_SOLGAZM.png',
  'Collection/ONLYCOINS_SOLGAZM.png',
  'Collection/HABACHI_SOLGAZM.png',
  'Collection/TapeCoin_Solgazm.png',
  'Collection/ui_SOLGAZM.png',
  'Collection/CHEERPOSE_GREEN_SOLGAZM.png',
  'Collection/RenaissanceThrone_solgazm_Monet.png',
  'Collection/PHONECALL_SOLGAZM.png',
  'Collection/WWESOLGAZM.png'
] as const

const socialLinks = [
  {
    name: 'Twitter',
    href: 'https://x.com/Solgazm',
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M15.7139 0.0761719H18.7412L12.1276 7.63508L19.9079 17.921H13.816L9.04453 11.6827L3.58491 17.921H0.555858L7.62975 9.83595L0.166016 0.0761719H6.41264L10.7256 5.7783L15.7139 0.0761719ZM14.6515 16.1091H16.3289L5.50118 1.79294H3.70113L14.6515 16.1091Z" fill="currentColor"/>
      </svg>
    )
  },
  {
    name: 'Telegram',
    href: 'https://t.me/SolgazmSol',
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M22.2647 2.42726C21.9927 2.19181 21.6439 2.0547 21.2851 2.03988C20.9263 2.02505 20.5697 2.13327 20.2797 2.34726L2.43969 14.9473C2.12169 15.1813 1.89645 15.5215 1.80297 15.9083C1.70948 16.2951 1.75354 16.7018 1.92769 17.0593C2.10183 17.4167 2.39609 17.7037 2.75912 17.8726C3.12215 18.0414 3.52947 18.0819 3.91769 17.9873L8.51969 16.8473L10.8797 21.5473C11.0253 21.8561 11.2584 22.1155 11.5499 22.2953C11.8414 22.4751 12.1789 22.5676 12.5227 22.5623C12.8664 22.5569 13.2005 22.4539 13.4857 22.2649C13.7709 22.0759 13.9951 21.8089 14.1297 21.4953L22.7297 3.69526C22.8897 3.34726 22.9318 2.95454 22.8489 2.57892C22.766 2.2033 22.5634 1.86597 22.2647 1.61526V2.42726ZM12.5197 20.2473L10.1497 15.5173L14.1297 12.6973L12.8597 12.0773L8.70769 15.0173L4.25969 16.1173L20.9697 4.28726L12.5197 20.2473Z" fill="currentColor"/>
      </svg>
    )
  },
  {
    name: 'Dexscreener',
    href: 'https://dexscreener.com/solana/cfsn63kax7tungn26vzanyxukj8pkpbnfqvnigrhxzza',
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <g clipPath="url(#clip0_415_68)">
          <path fillRule="evenodd" clipRule="evenodd" d="M14.0643 8.54928C14.7985 8.1832 15.7326 7.64432 16.6679 6.906C16.8651 7.31552 16.8867 7.67288 16.7851 7.96144C16.7131 8.1648 16.5774 8.34168 16.399 8.4824C16.2058 8.63448 15.9646 8.7452 15.6978 8.80504C15.1918 8.91904 14.6009 8.85248 14.0643 8.54928ZM14.1916 12.3002L15.1634 12.8615C13.1791 13.9737 12.6397 16.0388 11.9989 18.0502C11.3582 16.0388 10.8186 13.9737 8.8344 12.8615L9.80624 12.3002C9.90026 12.2646 9.98061 12.2003 10.0358 12.1163C10.091 12.0323 10.1182 11.933 10.1134 11.8326C10.0244 9.9488 10.533 9.11576 11.2191 8.59272C11.4652 8.40536 11.7338 8.31128 11.9989 8.31128C12.2639 8.31128 12.5326 8.40536 12.7787 8.59272C13.4648 9.11576 13.9734 9.9488 13.8844 11.8326C13.8797 11.933 13.9069 12.0323 13.9621 12.1163C14.0172 12.2003 14.0976 12.2646 14.1916 12.3002ZM11.9989 0C13.1222 0.03016 14.2484 0.24824 15.2258 0.67248C15.9026 0.96664 16.5341 1.3552 17.1059 1.81984C17.3642 2.0296 17.5768 2.23224 17.811 2.46552C18.4428 2.48736 19.3661 1.78552 19.7947 1.1288C19.057 3.5472 15.6908 6.40312 13.3603 7.49592C13.3594 7.49552 13.3587 7.49496 13.358 7.49448C12.9398 7.17512 12.4694 7.01544 11.9989 7.01544C11.5284 7.01544 11.0581 7.17512 10.6398 7.49448C10.6391 7.49488 10.6385 7.4956 10.6375 7.49592C8.30696 6.40312 4.9408 3.5472 4.20312 1.1288C4.63168 1.78552 5.55497 2.48736 6.18673 2.46552C6.42105 2.23232 6.63369 2.0296 6.89184 1.81984C7.46369 1.3552 8.0952 0.96664 8.77201 0.67248C9.74944 0.24824 10.8756 0.03016 11.9989 0ZM9.93344 8.54928C9.19936 8.1832 8.26512 7.64432 7.32992 6.906C7.13272 7.31552 7.11112 7.67288 7.21264 7.96144C7.28472 8.1648 7.4204 8.34168 7.59872 8.4824C7.792 8.63448 8.03328 8.7452 8.3 8.80504C8.80608 8.91904 9.39688 8.85248 9.93344 8.54928Z" fill="currentColor"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M17.6923 5.99952C18.2072 5.47992 18.6609 4.9048 19.0257 4.3916L19.2109 4.74032C19.8074 5.93368 20.1173 7.12224 20.1173 8.45984L20.1161 10.5824L20.1273 11.6827C20.1705 14.384 20.7549 17.117 22.0789 19.6182L19.3088 17.3844L17.3487 20.5651L15.2895 18.6266L11.9989 23.9666L8.70838 18.6267L6.64927 20.5652L4.68919 17.3845L1.91895 19.6182C3.24295 17.1171 3.82743 14.3841 3.87071 11.6828L3.88191 10.5825L3.88063 8.45992C3.88063 7.12224 4.19047 5.93368 4.78711 4.7404L4.97231 4.39168C5.33711 4.90488 5.79071 5.47992 6.30567 5.9996L6.14487 6.3336C5.83247 6.98232 5.72903 7.70768 5.97238 8.39752C6.12927 8.84184 6.41559 9.22288 6.78471 9.51376C7.14311 9.79624 7.56727 9.98664 8.01134 10.0866C8.30062 10.1518 8.59535 10.1786 8.88814 10.1694C8.81983 10.5567 8.78999 10.9584 8.78806 11.3677L6.17495 12.877L8.19142 14.0073C8.3526 14.0976 8.50603 14.2012 8.65015 14.3168C10.3126 15.8094 11.3121 20.2252 11.999 22.3821C12.686 20.2252 13.6854 15.8094 15.348 14.3168C15.4921 14.2012 15.6455 14.0976 15.8067 14.0073L17.8232 12.877L15.21 11.3677C15.2081 10.9584 15.1782 10.5567 15.1099 10.1694C15.4027 10.1786 15.6974 10.1518 15.9867 10.0866C16.4308 9.98664 16.855 9.79624 17.2133 9.51376C17.5824 9.22288 17.8688 8.84184 18.0256 8.39752C18.269 7.70768 18.1655 6.9824 17.8532 6.3336L17.6924 5.9996L17.6923 5.99952Z" fill="currentColor"/>
        </g>
        <defs>
          <clipPath id="clip0_415_68">
            <rect width="20.16" height="24" fill="white" transform="translate(1.91895)"/>
          </clipPath>
        </defs>
      </svg>
    )
  }
]

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [imageDimensions, setImageDimensions] = useState<{[key: string]: { width: number; height: number }}>({})
  const [showToast, setShowToast] = useState(false)

  // Helper function to get image URL
  const getImageUrl = (imagePath: string) => {
    return `/${imagePath}`;
  };

  // Function to handle copy to clipboard
  const handleCopyAddress = () => {
    navigator.clipboard.writeText("BajGbLkXCJB4sdriYNqQi5wgsiB1rQnf6avWEaM4pump");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000); // Hide toast after 3 seconds
  };

  useEffect(() => {
    images.forEach(image => {
      const img = new window.Image()
      img.src = getImageUrl(image)
      img.onerror = () => {
        console.error(`Error loading image: ${image}`);
      }
      img.onload = () => {
        setImageDimensions(prev => ({
          ...prev,
          [image]: {
            width: img.naturalWidth,
            height: img.naturalHeight
          }
        }))
      }
    })
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-black to-yellow-950/20">
      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 px-4 py-2 rounded-lg bg-yellow-400/90 backdrop-blur-sm shadow-lg"
          >
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="font-medium text-black">Address copied to clipboard!</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <div className="relative h-[90vh] flex items-center justify-center">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-[600px] h-[600px] bg-yellow-500/20 rounded-full blur-[120px] -top-48 -left-48 animate-pulse mix-blend-soft-light"></div>
          <div className="absolute w-[500px] h-[500px] bg-yellow-500/20 rounded-full blur-[100px] -bottom-32 -right-32 animate-pulse delay-700 mix-blend-soft-light"></div>
        </div>
        <div className="relative text-center z-10 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 1.2,
              type: "spring",
              stiffness: 100
            }}
            whileHover={{ 
              scale: 1.1,
              rotate: [0, -5, 5, -5, 0],
              transition: { duration: 0.5 }
            }}
            whileTap={{ scale: 0.9 }}
            className="w-48 h-48 md:w-64 md:h-64 mx-auto mb-8 cursor-pointer relative"
          >
            <motion.div
              className="absolute inset-0 rounded-full bg-yellow-500/20 filter blur-md"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <Image
              src="/SOLGAZM_NOSHADOW_ICON 2.png"
              alt="SOLGAZM Icon"
              width={256}
              height={256}
              className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(234,179,8,0.3)]"
              priority
              unoptimized
            />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-6xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-300 text-transparent bg-clip-text [text-shadow:_0_2px_10px_rgba(234,179,8,0.3)]"
          >
            SOLGAZM
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-lg md:text-xl text-yellow-500/80 mb-8"
          >
            Made to Orgasm
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex items-center justify-center mb-6"
          >
            <button
              onClick={handleCopyAddress}
              className="group flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-400/10 hover:bg-yellow-400/20 transition-all duration-300"
            >
              <span className="text-yellow-300 text-sm font-medium">BajGbLk...4pump</span>
              <svg
                className="w-4 h-4 text-yellow-300 opacity-50 group-hover:opacity-100 transition-opacity duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            </button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="flex items-center justify-center gap-6"
          >
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-500/80 hover:text-yellow-400 transition-colors duration-200"
              >
                <span className="sr-only">{link.name}</span>
                <link.icon className="w-8 h-8" />
              </a>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Gallery Section */}
      <div className="relative">
        {/* Gallery Header */}
        <div className="text-center mb-12 px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-yellow-400 mb-4"
          >
            Gallery
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="h-1 bg-yellow-500/30 mx-auto rounded-full"
          />
        </div>

        {/* Mosaic Gallery */}
        <div className="max-w-[2000px] mx-auto px-4 pb-16">
          <div className="columns-1 sm:columns-2 lg:columns-3 2xl:columns-4 gap-4">
            {images.map((image, index) => (
              <motion.div
                key={image}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative break-inside-avoid group cursor-pointer mb-4"
                onClick={() => setSelectedImage(image)}
              >
                <div className="relative overflow-hidden rounded-xl">
                  <Image
                    src={getImageUrl(image)}
                    alt={image.replace('Collection/', '').replace('.png', '')}
                    width={500}
                    height={imageDimensions[image]?.height * (500 / imageDimensions[image]?.width) || 500}
                    className="w-full transition-all duration-500 ease-out group-hover:scale-105"
                    loading="lazy"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/90 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="absolute top-0 left-0 right-0 p-6">
                      <div className="space-y-1">
                        <p className="text-yellow-200/70 text-xs font-medium tracking-wider uppercase">$GAZM Collection</p>
                        <h3 className="text-white text-base font-semibold tracking-wide">
                          {image
                            .replace('Collection/', '')
                            .replace('.png', '')
                            .replace(/_/g, ' ')
                            .replace('SOLGAZM', '')
                            .trim()}
                        </h3>
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-6 p-4">
                      <a 
                        href={getImageUrl(image)}
                        download={image.split('/').pop()}
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(getImageUrl(image), '_blank');
                        }}
                        className="p-2.5 bg-yellow-400/10 backdrop-blur-sm rounded-full hover:bg-yellow-400/20 transition-all duration-300 hover:scale-110"
                        title="Download"
                      >
                        <svg
                          className="w-4 h-4 text-yellow-300"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                      </a>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedImage(image);
                        }}
                        className="p-2.5 bg-yellow-400/10 backdrop-blur-sm rounded-full hover:bg-yellow-400/20 transition-all duration-300 hover:scale-110"
                        title="View"
                      >
                        <svg
                          className="w-4 h-4 text-yellow-300"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 z-50 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative max-w-7xl w-full h-[80vh] mx-auto mt-[10vh] flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={getImageUrl(selectedImage)}
              alt={selectedImage.replace('Collection/', '').replace('.png', '')}
              className="object-contain max-h-full rounded-lg shadow-2xl"
              width={1200}
              height={800}
              priority
              unoptimized
            />
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute top-4 right-4 bg-yellow-400/20 backdrop-blur-sm p-3 rounded-full hover:bg-yellow-400/30 transition-colors duration-300"
              onClick={() => setSelectedImage(null)}
            >
              <svg
                className="w-6 h-6 text-yellow-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
