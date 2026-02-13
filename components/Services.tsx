"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight, Shield, Palette, Zap } from "lucide-react";
import { useRef } from "react";

const services = [
  {
    title: "Interior & Exterior Painting",
    subtitle: "Flawless Execution",
    description: "From meticulous interior finishes to durable exterior protection, our painting services define excellence. Serving Raleigh, Durham, and Chapel Hill with precision.",
    imageUrl: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&q=80&w=1200",
    features: [
      { icon: Palette, text: "Color Consultation" },
      { icon: Zap, text: "Dust-Free Process" },
      { icon: Shield, text: "Premium Materials" }
    ],
    accent: "bg-brand-blue"
  },
  {
    title: "Kitchens & Remodeling",
    subtitle: "Complete Transformation",
    description: "Specializing in kitchen cabinet restoration, wall repair, and full interior/exterior remodeling. We revitalize spaces across the Triangle area.",
    imageUrl: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=1200",
    features: [
      { icon: Palette, text: "Cabinet Refinishing" },
      { icon: Zap, text: "Epoxy Flooring" },
      { icon: Shield, text: "Deck Staining & Repair" }
    ],
    accent: "bg-navy"
  },
];

export default function Services() {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  return (
    <section id="process" className="relative bg-alabaster border-t border-navy/5">
      <div className="max-w-[1800px] mx-auto flex flex-col lg:flex-row">
        
        {/* Left Side: Sticky Information */}
        <div className="lg:w-[40%] lg:h-screen lg:sticky lg:top-0 p-8 md:p-16 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-navy/5">
          <motion.span 
             initial={{ opacity: 0, x: -20 }}
             whileInView={{ opacity: 1, x: 0 }}
             className="text-brand-blue font-sans text-[10px] uppercase tracking-[0.5em] font-black block mb-4"
          >
            Capabilities
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-serif text-navy leading-none tracking-tighter mb-8"
          >
            Distinctive <br />
            <span className="italic">Curation.</span>
          </motion.h2>
          
          <div className="space-y-4">
            <p className="text-navy/60 text-base md:text-lg leading-relaxed">
              At J & M Painting, we are more than just contractors – we’re artisans of refined living. Based in the Triangle, we specialize in high-end interior painting, kitchen cabinet restoration, and luxury home remodeling. As a trusted partner in Raleigh, Durham, and Chapel Hill, our team combines precision, creativity, and years of expertise to bring your vision to life. From a single room refresh to a complete home transformation, J & M is your premier destination for elevating your space.
            </p>
            <div className="flex items-center gap-4">
              <div className="h-[1px] w-12 bg-brand-blue" />
              <span className="text-brand-blue font-sans text-[9px] uppercase tracking-[0.4em] font-black">
                The Artisan Standard
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Scrollable Feature Cards */}
        <div ref={scrollRef} className="lg:w-[60%] p-6 md:p-16 space-y-16 md:space-y-32">
          {services.map((service, index) => (
            <ServiceCard 
              key={service.title} 
              service={service} 
              index={index} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service, index }: { service: any, index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-[20px] md:rounded-[40px] shadow-xl mb-8">
        <Image
          src={service.imageUrl}
          alt={service.title}
          fill
          className="object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
        <div className="absolute bottom-8 left-8">
          <h3 className="text-2xl md:text-5xl font-serif text-white leading-none">
            {service.title}
          </h3>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div>
          <span className="text-brand-blue font-sans text-[9px] uppercase tracking-[0.4em] font-black block mb-3">
            {service.subtitle}
          </span>
          <p className="text-navy/70 text-lg font-sans leading-relaxed">
            {service.description}
          </p>
        </div>

        <div className="space-y-6 mt-8 md:mt-0 pt-1">
          <div className="grid grid-cols-1 gap-4">
            {service.features.map((f: any, i: number) => (
              <div key={i} className="flex gap-4 items-center group/item">
                <div className={`p-3 rounded-xl ${service.accent}/5 text-brand-blue group-hover/item:bg-brand-blue group-hover/item:text-white transition-all duration-300`}>
                  <f.icon className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-navy block mb-0.5">
                    {f.text}
                  </span>
                  <div className="h-px w-0 group-hover/item:w-full bg-brand-blue/30 transition-all duration-500" />
                </div>
              </div>
            ))}
          </div>
          
          <button className="flex items-center gap-3 group/btn mt-6">
            <span className="text-navy font-serif italic text-xl group-hover/btn:text-brand-blue transition-colors">
              Explore Experience
            </span>
            <div className="w-10 h-10 rounded-full bg-navy text-white flex items-center justify-center group-hover/btn:bg-brand-blue transition-all duration-500 transform group-hover/btn:scale-110">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

