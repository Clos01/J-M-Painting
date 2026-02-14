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
  },
  {
    id: 2,
    title: "Durham Modern",
    category: "Kitchen Renovation",
    src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: 3,
    title: "Chapel Hill Villa",
    category: "Exterior Finish",
    src: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: 4,
    title: "Cary Residence",
    category: "Cabinet Refinishing",
    src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200",
  },
];

interface PortfolioItem {
  id: string | number;
  title: string;
  category: string;
  src: string;
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
      <div className="h-[50vh] flex items-center justify-center bg-alabaster relative z-10">
        <div className="text-center">
           <motion.h2 
             style={{
               opacity: useTransform(scrollYProgress, [0, 0.15], [1, 0]),
               y: useTransform(scrollYProgress, [0, 0.15], [0, -50])
             }}
             className="text-6xl md:text-[8vw] font-serif text-charcoal leading-[0.8] tracking-tighter"
           >
              Selected <br />
              <span className="italic text-brand-blue">Projects.</span>
           </motion.h2>
           <motion.p
             style={{
               opacity: useTransform(scrollYProgress, [0, 0.10], [1, 0]),
             }}
             className="mt-6 text-charcoal/50 text-xs md:text-sm uppercase tracking-[0.3em] font-medium"
           >
              A curation of fine residences & finishes
           </motion.p>
        </div>
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

function PortfolioItem({ item, index, total }: { item: any, index: number, total: number }) {
  // We can add specific scroll transforms here if needed, but sticky does the heavy lifting
  
  return (
    <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        <Link href="/gallery" className="relative w-full h-full flex items-center justify-center group">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority={index === 0}
                    quality={90}
                />
                {/* Dark Overlay for Text Legibility */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-500" />
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 text-center text-white p-6">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: false }}
                >
                    <div className="mb-6 overflow-hidden">
                        <span className="inline-block py-1 px-3 border border-white/30 rounded-full bg-white/10 backdrop-blur-md text-xs uppercase tracking-[0.2em] font-medium">
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
    </div>
  );
}


