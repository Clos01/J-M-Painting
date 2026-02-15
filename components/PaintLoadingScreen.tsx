"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const strokes = [
  { color: "bg-brand-blue", delay: 0 },
  { color: "bg-navy", delay: 0.1 },
  { color: "bg-alabaster", delay: 0.2 },
];

export default function PaintLoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-white"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, delay: 0.4, ease: "easeInOut" }}
      role="progressbar"
      aria-busy="true"
      aria-label="Loading J&M Painting Experience"
    >
      {/* Texture Filter */}
      <svg className="hidden">
        <filter id="paint-texture">
          <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.05" />
          </feComponentTransfer>
          <feComposite operator="in" in2="SourceGraphic" />
        </filter>
      </svg>

      {/* Dynamic Brush Strokes */}
      <div className="absolute inset-0 flex flex-col" style={{ filter: "url(#paint-texture)" }}>
        {strokes.map((stroke, i) => (
          <motion.div
            key={i}
            className={`flex-1 w-full ${stroke.color}`}
            initial={{ x: "-100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "100%" }}
            transition={{
              duration: 1,
              delay: stroke.delay,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        ))}
      </div>

      {/* Centered Logo Reveal */}
      <motion.div
        className="relative z-10 flex flex-col items-center"
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 1.1, y: -20 }}
        transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="relative w-24 h-24 md:w-32 md:h-32 mb-6">
          <Image
            src="/brand/logo.png"
            alt="J&M Painting Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
        <div className="flex flex-col items-center">
          <motion.span 
            className="text-2xl md:text-4xl font-serif font-black text-navy tracking-tighter leading-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            J&M PAINTING
          </motion.span>
          <motion.div 
            className="h-[1px] w-12 bg-gold mt-2"
            initial={{ width: 0 }}
            animate={{ width: 48 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
