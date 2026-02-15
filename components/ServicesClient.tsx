"use client";

import Image from "next/image";
import { Paintbrush, Home, Building2, Hammer, Palette, Zap, Shield } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Navbar from "@/components/Navbar";

// Icon mapping 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const iconMap: Record<string, React.ComponentType<any>> = {
  Paintbrush,
  Home,
  Building2,
  Hammer,
  Palette,
  Zap,
  Shield
};

interface ServiceItem {
    title: string;
    subtitle: string;
    description: string;
    imageUrl: string;
    icon: string;
    features: { text: string }[];
}

interface ServicesClientProps {
    services: ServiceItem[];
}

export default function ServicesClient({ services }: ServicesClientProps) {
  return (
    <main className="min-h-screen bg-alabaster">
      <Navbar />
      
      {/* Intro Header */}
      <section className="pt-48 pb-24 px-6 md:px-12 text-center bg-alabaster z-10 relative">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
        >
          <span className="text-brand-blue font-sans text-xs uppercase tracking-[0.4em] font-bold block mb-6">
            Our Expertise
          </span>
          <h1 className="text-5xl md:text-7xl font-serif text-charcoal tracking-tight leading-none mb-8">
            Services
          </h1>
          <div className="w-12 h-1 bg-brand-blue mx-auto mb-8" />
          <p className="max-w-xl mx-auto text-navy/60 text-lg leading-relaxed font-medium">
             Comprehensive stewardship of your home&apos;s aesthetic.
          </p>
        </motion.div>
      </section>

      {/* Immersive Sticky Scroll */}
      <section className="relative pb-32">
        {services.map((service: ServiceItem, index: number) => (
            <ServiceSection key={index} service={service} index={index} total={services.length} />
        ))}
      </section>

      {/* Footer */}
      <footer className="py-12 text-center text-charcoal/40 text-xs uppercase tracking-[0.2em] border-t border-navy/5 relative z-20 bg-alabaster">
        © 2026 J&M Painting. All Rights Reserved.
      </footer>
    </main>
  );
}

function ServiceSection({ service, index }: { service: ServiceItem, index: number, total: number }) {
    const ref = useRef<HTMLDivElement>(null);
    
    const { scrollYProgress } = useScroll({
      target: ref,
      offset: ["start start", "end start"],
    });
  
    // Parallax & Depth Effects (Matching PortfolioMasonry)
    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.90]);
    const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0, 0.95]); // Darken as it leaves
    
    const MainIcon = iconMap[service.icon] || Paintbrush;
  
    return (
      <div ref={ref} className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
          <motion.div 
              style={{ scale }}
              className="relative w-full h-full shadow-2xl"
          >
              {/* Background Image */}
              <div className="absolute inset-0 z-0">
                  <Image
                      src={service.imageUrl}
                      alt={service.title}
                      fill
                      className="object-cover"
                      priority={index <= 1}
                      quality={80}
                      sizes="100vw"
                  />
                  {/* Base overlay for text legibility */}
                  <div className="absolute inset-0 bg-black/50" />
                  
                  {/* Scroll Dimming Overlay */}
                  <motion.div 
                      style={{ opacity: overlayOpacity }}
                      className="absolute inset-0 bg-black z-10 pointer-events-none"
                  />
              </div>
  
              {/* Content Card */}
              <div className="relative z-20 h-full flex flex-col items-center justify-center p-6 md:p-12">
                  <motion.div 
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    viewport={{ once: false, margin: "-100px" }}
                    className="max-w-4xl w-full bg-white/10 backdrop-blur-md border border-white/20 p-8 md:p-16 rounded-[2rem] text-center shadow-2xl overflow-hidden relative"
                  >
                      {/* Decorative Gloss */}
                      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />

                      <div className="relative z-30">
                        <div className="flex justify-center mb-6 text-white/90">
                            <MainIcon size={32} strokeWidth={1} />
                        </div>

                        <span className="text-white/80 font-sans text-xs uppercase tracking-[0.3em] font-bold block mb-4">
                            {service.subtitle}
                        </span>
                        
                        <h2 className="text-4xl md:text-7xl font-serif text-white mb-8 tracking-tight">
                            {service.title}
                        </h2>
                        
                        <p className="max-w-2xl mx-auto text-white/90 text-lg md:text-xl leading-relaxed mb-10 font-light">
                            {service.description}
                        </p>

                        <div className="flex flex-wrap justify-center gap-4">
                            {service.features?.map((f, i) => (
                                <span key={i} className="px-4 py-2 rounded-full border border-white/30 bg-black/20 text-white text-xs uppercase tracking-wider backdrop-blur-sm">
                                    {f.text}
                                </span>
                            ))}
                        </div>
                      </div>
                  </motion.div>
              </div>
          </motion.div>
      </div>
    );
  }
