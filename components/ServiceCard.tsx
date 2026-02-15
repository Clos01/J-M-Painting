"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight, Shield, Palette, Zap, Paintbrush, Home, Building2, Hammer } from "lucide-react";

// Icon mapping
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ICON_MAP: Record<string, React.ComponentType<any>> = {
  Paintbrush,
  Home,
  Building2,
  Hammer,
  Palette,
  Zap,
  Shield
};

interface FeatureItem {
  icon: string;
  text: string;
}

export interface ServiceItemData {
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  alt?: string;
  features: FeatureItem[];
  accent: string;
}

interface ServiceCardProps {
  service: ServiceItemData;
  index: number;
}

export default function ServiceCard({ service }: Omit<ServiceCardProps, "index">) {
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
          alt={service.alt || service.title}
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
            {service.features.map((f: FeatureItem, i: number) => {
               const Icon = ICON_MAP[f.icon] || Palette;
               return (
              <div key={i} className="flex gap-4 items-center group/item">
                <div className={`p-3 rounded-xl ${service.accent || "bg-brand-blue"}/5 text-brand-blue group-hover/item:bg-brand-blue group-hover/item:text-white transition-all duration-300`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-navy block mb-0.5">
                    {f.text}
                  </span>
                  <div className="h-px w-0 group-hover/item:w-full bg-brand-blue/30 transition-all duration-500" />
                </div>
              </div>
            )})}
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
