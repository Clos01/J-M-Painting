"use client";

import Navbar from "@/components/Navbar";
import { client } from "@/lib/sanity";
import Image from "next/image";
import { ArrowUpRight, Palette, Zap, Shield, Paintbrush, Home, Building2, Hammer } from "lucide-react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";

export const revalidate = 60;

// Icon mapping 
const iconMap: Record<string, any> = {
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

export default async function ServicesPage() {
  const query = `*[_type == "service"] | order(_createdAt asc) {
    title,
    subtitle,
    description,
    "imageUrl": image.asset->url,
    features,
    icon
  }`;

  let services = await client.fetch(query);

  // ---------------------------------------------------------
  // FALLBACK SEEDER: If no content in Sanity, show premium placeholders
  // ---------------------------------------------------------
  if (!services || services.length === 0) {
    services = [
      {
        title: "Interior Remodeling",
        subtitle: "Full Scale Renovation",
        description: "Reimagining your living space with structural elegance and refined reconfiguration. From open-concept transitions to master suite expansions.",
        imageUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2000&auto=format&fit=crop",
        icon: "Home",
        features: [{text: "Structural Changes"}, {text: "Flooring & Trim"}, {text: "Lighting Design"}]
      },
      {
        title: "Kitchen Cabinetry",
        subtitle: "Bespoke Refinishing",
        description: "Restoring the heart of your home. We specialize in factory-grade cabinet refinishing, hardware updates, and custom island modifications.",
        imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop", // Kitchen
        icon: "Hammer",
        features: [{text: "Factory Finish"}, {text: "Hardware Install"}, {text: "Color Consultation"}]
      },
      {
        title: "Interior & Exterior Painting",
        subtitle: "The Foundation",
        description: "Our signature service. Meticulous preparation, premium paints, and flawless execution for both the sanctuary within and the facade without.",
        imageUrl: "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?q=80&w=2000&auto=format&fit=crop", // Exterior
        icon: "Paintbrush",
        features: [{text: "Dustless sanding"}, {text: "Spray & Roll"}, {text: "2-Year Warranty"}]
      }
    ];
  }

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
             Comprehensive stewardship of your home's aesthetic.
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
