"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const strokes = [
  { color: "bg-brand-blue", delay: 0 },
  { color: "bg-alabaster", delay: 0.1 },
  { color: "bg-navy", delay: 0.2 },
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
      {/* Dynamic Brush Strokes - Simplified for Performance */}
      <div className="absolute inset-0 flex flex-col">
        {strokes.map((stroke, i) => (
          <motion.div
            key={i}
            className={`flex-1 w-full ${stroke.color}`}
            initial={{ x: "-100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "100%" }}
            transition={{
              duration: 0.8,
              delay: stroke.delay,
              ease: [0.22, 1, 0.36, 1], // Custom bezier for snappy feel
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
          <div className="overflow-hidden flex flex-col items-center gap-1">
            {/* J&M */}
            <motion.div 
              className="text-2xl md:text-3xl font-serif font-bold text-navy tracking-widest uppercase flex"
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.05, delayChildren: 0.6 } }
              }}
            >
              {"J&M".split("").map((char, index) => (
                <motion.span
                  key={index}
                  variants={{
                    hidden: { y: "100%" },
                    visible: { y: "0%", transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] } }
                  }}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
            </motion.div>

            {/* PAINTING & REMODELING */}
            <motion.div 
              className="text-sm md:text-base font-sans font-medium text-navy/70 tracking-[0.3em] uppercase flex gap-3"
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.02, delayChildren: 0.9 } }
              }}
            >
              {/* Painting */}
              <div className="flex">
                {"PAINTING".split("").map((char, index) => (
                  <motion.span
                    key={index}
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </div>
              
              <motion.span 
                variants={{
                  hidden: { opacity: 0, scale: 0 },
                  visible: { opacity: 1, scale: 1 }
                }}
                className="text-gold"
              >
                &
              </motion.span>

              {/* Remodeling */}
              <div className="flex">
                {"REMODELING".split("").map((char, index) => (
                  <motion.span
                    key={index}
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
          <motion.div 
            className="h-[1px] bg-navy/10 mt-6"
            initial={{ width: 0 }}
            animate={{ width: 60 }}
            transition={{ delay: 1.5, duration: 1.0, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
