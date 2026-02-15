"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const previewItems = [
  {
    id: 1,
    title: "Kitchen Cabinets",
    src: "https://images.unsplash.com/photo-1556910103-1c02745a30bf?auto=format&fit=crop&q=80&w=800",
    alt: "Luxurious kitchen cabinets showcase"
  },
  {
    id: 2,
    title: "Interior & Exterior Painting",
    src: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=800",
    alt: "Expert interior and exterior painting work"
  },
  {
    id: 3,
    title: "Home Remodeling",
    src: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=800",
    alt: "High-end home remodeling project"
  },
];

interface GalleryItem {
  id: string | number;
  title: string;
  src: string;
  alt?: string;
}

interface GalleryPreviewProps {
  items?: GalleryItem[];
}

export default function GalleryPreview({ items }: GalleryPreviewProps) {
  const displayItems = items && items.length > 0 ? items : previewItems;

  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <section 
      ref={containerRef} 
      className="relative bg-alabaster py-24 px-6 md:px-12 overflow-hidden"
    >
      <motion.div style={{ y, opacity }} className="max-w-[1800px] mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-16 border-b border-navy/10 pb-8 gap-6 md:gap-0">
            <div className="w-full md:w-auto">
                <span className="text-brand-blue font-sans text-xs uppercase tracking-[0.4em] font-bold block mb-4">
                  Curated Portfolio
                </span>
                <h2 className="text-4xl md:text-6xl font-serif text-charcoal tracking-tight leading-none">
                  The <br />
                  <span className="italic text-brand-blue">Collection.</span>
                </h2>
            </div>
            <Link href="/gallery" className="group flex items-center gap-2">
                <span className="text-charcoal text-xs uppercase tracking-[0.2em] group-hover:text-brand-blue transition-colors">
                    Explore Experience
                </span>
                <ArrowRight className="w-4 h-4 text-brand-blue transform group-hover:translate-x-1 transition-transform" />
            </Link>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-12">
            {displayItems.map((item, index) => (
                <Link href="/gallery" key={item.id} className="group relative aspect-[3/4] overflow-hidden rounded-2xl cursor-pointer block">
                    <Image
                        src={item.src}
                        alt={item.alt || item.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <h3 className="text-white text-2xl font-serif italic opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
                            {item.title}
                        </h3>
                    </div>
                </Link>
            ))}
        </div>

      </motion.div>
    </section>
  );
}
