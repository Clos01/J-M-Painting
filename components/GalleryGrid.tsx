"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface GalleryItem {
  id: string | number;
  src: string;
  category: string;
  title: string;
}

interface GalleryGridProps {
  items: GalleryItem[];
}

export default function GalleryGrid({ items }: GalleryGridProps) {
  return (
    <>
      {/* Mobile Layout: Uniform Square Grid */}
      <div className="flex flex-col gap-3 md:hidden">
        {items.map((item, index) => (
          <motion.div
            key={`mobile-${item.id}`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className="relative group rounded-2xl overflow-hidden cursor-pointer aspect-square w-full"
          >
            <Image
              src={item.src}
              alt={item.title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
            
            {/* Mobile Overlay (Always visible or simpler?) - Keeping hover for consistency, maybe touch triggers it */}
            <div className="absolute inset-0 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-500">
               <span className="text-white/80 text-xs uppercase tracking-widest font-medium mb-1">{item.category}</span>
               <h3 className="text-white text-xl font-serif">{item.title}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Desktop Layout: Dynamic Masonry */}
      <div className="hidden md:block md:columns-2 lg:columns-3 gap-6 space-y-6">
        {items.map((item, index) => (
          <motion.div
            key={`desktop-${item.id}`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.05 }}
            className="break-inside-avoid relative group rounded-2xl overflow-hidden cursor-pointer mb-6"
          >
            {/* Desktop uses intrinsic height for Masonry effect */}
            <Image
              src={item.src}
              alt={item.title}
              width={1200}
              height={1600}
              sizes="(max-width: 1200px) 50vw, 33vw"
              className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
            
            <div className="absolute inset-0 p-8 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-500">
               <span className="text-white/80 text-xs uppercase tracking-widest font-medium mb-2">{item.category}</span>
               <h3 className="text-white text-2xl font-serif">{item.title}</h3>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
}
