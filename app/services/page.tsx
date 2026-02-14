import Navbar from "@/components/Navbar";
import { client } from "@/lib/sanity";
import Image from "next/image";
import { ArrowUpRight, Palette, Zap, Shield, Paintbrush, Home, Building2, Hammer } from "lucide-react";
import Link from "next/link";

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

export default async function ServicesPage() {
  const query = `*[_type == "service"] | order(_createdAt asc) {
    title,
    subtitle,
    description,
    "imageUrl": image.asset->url,
    features,
    icon
  }`;

  const services = await client.fetch(query);

  return (
    <main className="min-h-screen bg-alabaster">
      <Navbar />
      
      {/* Header */}
      <section className="pt-48 pb-16 px-6 md:px-12 text-center">
        <div>
          <span className="text-brand-blue font-sans text-xs uppercase tracking-[0.4em] font-bold block mb-6">
            Our Expertise
          </span>
          <h1 className="text-5xl md:text-7xl font-serif text-navy tracking-tight leading-none mb-8">
            Services
          </h1>
          <p className="max-w-xl mx-auto text-navy/60 text-lg leading-relaxed">
            Meticulous craftsmanship for every surface. 
          </p>
        </div>
      </section>

      {/* Services Grid (Cleaner Layout) */}
      <section className="px-6 md:px-12 pb-32">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service: any, index: number) => {
            const MainIcon = iconMap[service.icon] || Paintbrush;

            return (
              <div key={index} className="group bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-navy/5 flex flex-col h-full">
                
                {/* Image */}
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-6">
                  <Image
                    src={service.imageUrl}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-navy/10 group-hover:bg-transparent transition-colors duration-500" />
                  
                  {/* Icon details overlay */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur p-3 rounded-xl text-brand-blue shadow-sm">
                    <MainIcon size={24} strokeWidth={1.5} />
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-grow">
                   <span className="text-brand-blue font-sans text-[10px] uppercase tracking-[0.2em] font-bold mb-2 block">
                      {service.subtitle || "Service"}
                   </span>

                   <h2 className="text-2xl font-serif text-navy leading-tight mb-4 group-hover:text-brand-blue transition-colors">
                     {service.title}
                   </h2>

                   <p className="text-navy/60 leading-relaxed text-sm mb-6 flex-grow">
                     {service.description}
                   </p>

                   {/* Features Divider */}
                   <div className="w-full h-px bg-navy/5 mb-6" />

                   <div className="space-y-3">
                     {(service.features || []).slice(0, 3).map((f: any, i: number) => (
                       <div key={i} className="flex items-center gap-3">
                         <div className="w-1.5 h-1.5 rounded-full bg-brand-blue/60" />
                         <span className="font-medium text-navy/80 text-xs uppercase tracking-wide">
                           {f.text}
                         </span>
                       </div>
                     ))}
                   </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-center text-charcoal/40 text-xs uppercase tracking-[0.2em] border-t border-navy/5">
        © 2026 J&M Painting. All Rights Reserved.
      </footer>
    </main>
  );
}
