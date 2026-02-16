"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import ServiceCard, { ServiceItemData } from "./ServiceCard";

export default function Services({
  heading = "Hello.",
  introText = "At J & M Painting, we are artisans of refined living. Specializing in high-end painting, kitchen restoration, and luxury remodeling across the Triangle. We bring precision and creativity to elevate your space.",
  services = []
}: {
  heading?: string;
  introText?: string;
  services?: ServiceItemData[];
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const displayServices = services.length > 0 ? services : [
    {
      title: "Interior & Exterior Painting",
      subtitle: "Flawless Execution",
      description: "From meticulous interior finishes to durable exterior protection, our painting services define excellence.",
      imageUrl: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&q=80&w=1200",
      features: [
        { icon: "Palette", text: "Color Consultation" },
        { icon: "Zap", text: "Sanding" }
      ],
      accent: "bg-brand-blue"
    }
  ]; // Fallback if no services passed

  return (
    <section id="about" className="relative bg-alabaster border-t border-navy/5">
      <div className="max-w-[1800px] mx-auto flex flex-col lg:flex-row">
        
        {/* Left Side: Sticky Information */}
        <div className="lg:w-[40%] lg:h-screen lg:sticky lg:top-0 p-6 md:p-12 lg:p-16 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-navy/5">
          <motion.span 
             initial={{ opacity: 0, x: -20 }}
             whileInView={{ opacity: 1, x: 0 }}
             className="text-brand-blue font-sans text-[10px] uppercase tracking-[0.5em] font-black block mb-4"
          >
            Our Expertise
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-serif text-navy leading-none tracking-tighter mb-8"
          >
             Hello.
          </motion.h2>
          
          <div className="space-y-4">
            <p className="text-navy/60 text-base md:text-lg leading-relaxed">
              At J & M Painting, we are artisans of refined living. Specializing in high-end painting, kitchen restoration, and luxury remodeling across the Triangle. We bring precision and creativity to elevate your space.
            </p>
            <div className="flex items-center gap-4">
              <div className="h-[1px] w-12 bg-brand-blue" />
              <span className="text-brand-blue font-sans text-[9px] uppercase tracking-[0.4em] font-black">
                The Artisan Standard
              </span>
            </div>
          </div>
        </div>

        {/* Mobile Sticky Section Header */}
        <div className="lg:hidden sticky top-24 left-0 w-full h-16 z-30 px-6 flex items-center bg-alabaster/80 backdrop-blur-md border-b border-navy/5">
           <span className="text-[10px] uppercase tracking-[0.3em] font-black text-brand-blue">
              {heading}
           </span>
        </div>

        {/* Right Side: Scrollable Feature Cards */}
        <div ref={scrollRef} className="lg:w-[60%] p-6 md:p-16 space-y-16 md:space-y-32">
          {displayServices.map((service) => (
            <ServiceCard 
              key={service.title} 
              service={service} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}

