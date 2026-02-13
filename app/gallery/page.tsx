"use client";

import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import Image from "next/image";

const galleryItems = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200",
    category: "Modern Living",
    title: "The Glass Penthouse",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1200",
    category: "Kitchen Detail",
    title: "Marble & Matte Black",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1628592102171-44754c0e6e73?auto=format&fit=crop&q=80&w=1200",
    category: "Estate Exterior",
    title: "Bel Air Residence",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&q=80&w=1200",
    category: "Living Space",
    title: "Minimalist Lounge",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200",
    category: "Outdoor Living",
    title: "Poolside Veranda",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&q=80&w=1200",
    category: "Master Suite",
    title: "Serene Retreat",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&q=80&w=1200",
    category: "Dining",
    title: "Formal Dining Hall",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?auto=format&fit=crop&q=80&w=1200",
    category: "Entryway",
    title: "Grand Foyer",
  },
];

export default function Gallery() {
  return (
    <main className="min-h-screen bg-alabaster">
      <Navbar />
      
      {/* Header */}
      <section className="pt-48 pb-24 px-6 md:px-12 text-center">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
        >
          <span className="text-brand-blue font-sans text-xs uppercase tracking-[0.4em] font-bold block mb-6">
            Our Portfolio
          </span>
          <h1 className="text-5xl md:text-8xl font-serif text-navy tracking-tight leading-none mb-8">
            The <span className="italic text-brand-blue">Gallery.</span>
          </h1>
          <p className="max-w-xl mx-auto text-navy/60 text-lg leading-relaxed">
            A comprehensive look at our residential and commercial transformations. Each project represents our commitment to the artisan standard.
          </p>
        </motion.div>
      </section>

      {/* Masonry Grid */}
      <section className="px-4 md:px-12 pb-32">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              className="break-inside-avoid relative group rounded-2xl overflow-hidden cursor-pointer"
            >
              <div className="relative aspect-[3/4] md:aspect-auto">
                 <Image
                   src={item.src}
                   alt={item.title}
                   width={1200}
                   height={1600}
                   className="object-cover transition-transform duration-700 group-hover:scale-105"
                 />
                 <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                 
                 {/* Overlay Text */}
                 <div className="absolute inset-0 p-8 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="text-white/80 text-xs uppercase tracking-widest font-medium mb-2">
                      {item.category}
                    </span>
                    <h3 className="text-white text-2xl font-serif">
                      {item.title}
                    </h3>
                 </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-center text-charcoal/40 text-xs uppercase tracking-[0.2em] border-t border-navy/5">
        © 2026 J&M Painting. All Rights Reserved.
      </footer>
    </main>
  );
}
