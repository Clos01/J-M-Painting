"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import Link from "next/link";

const portfolioItems = [
  {
    id: 1,
    title: "Raleigh Estate",
    category: "Full Interior",
    src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1200",
    alt: "Raleigh Estate full interior painting project"
  },
  {
    id: 2,
    title: "Durham Modern",
    category: "Kitchen Renovation",
    src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200",
    alt: "Durham Modern kitchen renovation"
  },
  {
    id: 3,
    title: "Chapel Hill Villa",
    category: "Exterior Finish",
    src: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=1200",
    alt: "Chapel Hill Villa exterior finish"
  },
  {
    id: 4,
    title: "Cary Residence",
    category: "Cabinet Refinishing",
    src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200",
    alt: "Cary Residence cabinet refinishing"
  },
];

interface PortfolioItem {
  id: string | number;
  title: string;
  category: string;
  src: string;
  alt?: string;
}

interface PortfolioMasonryProps {
  items?: PortfolioItem[];
}

export default function PortfolioMasonry({ items }: PortfolioMasonryProps) {
  const displayItems = items && items.length > 0 ? items : portfolioItems;
  
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section 
      id="portfolio" 
      ref={containerRef}
      className="relative bg-alabaster"
    >
      {/* Intro / Header Section - Scrolls away naturally */}
      <div className="h-[50vh] flex items-center justify-center bg-alabaster relative z-10 px-6">
        <div className="text-left md:text-center w-full md:w-auto">
           <motion.h2 
             style={{
               opacity: useTransform(scrollYProgress, [0, 0.15], [1, 0]),
               y: useTransform(scrollYProgress, [0, 0.15], [0, -50])
             }}
             className="text-6xl md:text-[8vw] font-serif text-charcoal leading-[0.8] tracking-tighter"
           >
              The <br />
              <span className="italic text-brand-blue">Collection.</span>
           </motion.h2>
           <motion.p
             style={{
               opacity: useTransform(scrollYProgress, [0, 0.10], [1, 0]),
             }}
             className="mt-6 text-charcoal/50 text-xs md:text-sm uppercase tracking-[0.3em] font-medium"
           >
              Selected works & fine finishes
           </motion.p>
        </div>
      </div>

      {/* Mobile Sticky Header Background Overlay (Blur) */}
      <div className="md:hidden sticky top-24 left-0 w-full h-16 z-40 px-6 flex items-center pointer-events-none">
        <motion.div 
           style={{ 
             opacity: useTransform(scrollYProgress, [0.08, 0.12], [0, 1]),
           }}
           className="absolute inset-0 bg-alabaster/80 backdrop-blur-md border-b border-navy/5"
        />
        <motion.div
           style={{ 
             opacity: useTransform(scrollYProgress, [0.08, 0.12], [0, 1]),
             y: useTransform(scrollYProgress, [0.08, 0.12], [10, 0])
           }}
           className="relative"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] font-black text-brand-blue">
            The Collection
          </span>
        </motion.div>
      </div>

      {/* Full Screen Sticky Items */}
      <div className="relative">
        {displayItems.map((item, index) => (
          <PortfolioItem key={`${item.id}-${index}`} item={item} index={index} total={displayItems.length} />
        ))}
      </div>
    </section>
  );
}

interface PortfolioItemProps {
  item: {
    id: string | number;
    title: string;
    category: string;
    src: string;
    alt?: string;
  };
  index: number;
  total: number;
}

function PortfolioItem({ item, index }: PortfolioItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  // Track scroll progress of this specific item
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"], // Track while sticky
  });

  // Apple-style Transforms
  // 1. Scale down slightly (depth effect)
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.90]);
  
  // 2. Dim effect (Darken instead of fade out)
  // We map the scroll to the opacity of a BLACK overlay
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0, 0.6]);

  return (
    <div ref={ref} className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        <motion.div 
            style={{ scale }}
            className="relative w-full h-full flex items-center justify-center group shadow-[0_-50px_100px_-20px_rgba(0,0,0,0.5)] z-0"
        >
            <Link href="/gallery" className="relative w-full h-full block">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src={item.src}
                        alt={item.alt || item.title}
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-105"
                        priority={index <= 1} // Preload the first *two* images
                        quality={80} // Reduce quality for speed (indistinguishable visually)
                        sizes="100vw" // Tells browser it's full width, so it downloads correct size
                        loading={index <= 1 ? "eager" : "lazy"}
                    />
                    
                    {/* Hover Overlay (Original) */}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500 z-10" />

                    {/* Parallax Dimming Overlay (New) */}
                    <motion.div 
                        style={{ opacity: overlayOpacity }}
                        className="absolute inset-0 bg-black z-20 pointer-events-none"
                    />
                </div>

                {/* Content Overlay */}
                <div className="relative z-30 h-full flex flex-col items-center justify-center text-center text-white p-6">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: false }}
                    >
                        <div className="mb-6 overflow-hidden">
                            <span className="inline-block py-1 px-3 border border-white/30 rounded-full bg-white/10 backdrop-blur-md text-xs uppercase tracking-[0.2em] font-medium shadow-lg">
                                {item.category}
                            </span>
                        </div>
                        <h3 className="text-5xl md:text-8xl font-serif mb-4 tracking-tight drop-shadow-2xl">
                            {item.title}
                        </h3>
                        <div className="mt-8 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                            <span className="text-white text-xs uppercase tracking-[0.2em] border-b border-white pb-1">View Project</span>
                        </div>
                    </motion.div>
                </div>
            </Link>
        </motion.div>
    </div>
  );
}


