"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";

export default function Hero({ 
  title = "Timeless Interiors, Elevated.", 
  subtitle = "The Artisan Standard — Since 1998",
  buttonText = "Check Availability",
  backgroundImage,
  backgroundImageAlt = "Luxury interior composition"
}: { 
  title?: string;
  subtitle?: string;
  buttonText?: string;
  backgroundImage?: string;
  backgroundImageAlt?: string;
}) {
  const containerRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  // Default fallback image if none provided in Sanity
  const bgImage = backgroundImage || "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=2000";

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", isMobile || shouldReduceMotion ? "0%" : "20%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen md:min-h-[140vh] w-full bg-bespoke-gradient overflow-hidden pt-32 pb-24"
      aria-label="Welcome section with luxury architectural composition"
    >
      <div className="max-w-[1800px] mx-auto grid grid-cols-12 gap-6 px-6 md:px-12 relative z-20">
        
        {/* Left Side: Editorial Typography */}
        <div className="col-span-12 lg:col-span-7 xl:col-span-6 flex flex-col justify-center order-2 lg:order-1 mt-12 lg:mt-0">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8"
          >
             <span className="text-brand-blue font-sans text-xs uppercase tracking-[0.5em] font-black mb-4 block">
              {subtitle}
            </span>
          </motion.div>

          <motion.div
            style={{ y: textY }}
            className="relative"
          >
            <motion.h1
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-[clamp(3rem,8vw,7rem)] font-serif text-charcoal leading-[0.85] tracking-tight mb-8"
            >
              <div dangerouslySetInnerHTML={{ __html: title.replace(/\n/g, '<br/>') }} />
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="max-w-xl"
            >
              <p className="text-lg md:text-xl text-navy/80 font-sans leading-relaxed mb-10 border-l-2 border-brand-blue pl-6">
                At J & M Painting, we are artisans of refined living. Specializing in high-end painting, kitchen restoration, and luxury remodeling across the Triangle. We bring precision and creativity to elevate your space.
              </p>
              
              <div className="flex flex-wrap gap-6 items-center">
                <button className="group relative bg-navy text-alabaster px-8 py-4 overflow-hidden rounded-full transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl">
                  <div className="absolute inset-0 bg-brand-blue translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <span className="relative z-10 font-bold uppercase tracking-widest text-xs md:text-sm">{buttonText}</span>
                </button>
                <div className="w-12 h-[1px] bg-brand-blue/30 hidden md:block" />
                <button className="text-navy font-black uppercase tracking-widest text-xs hover:text-brand-blue transition-colors">
                  View Portfolio
                </button>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Right Side: Asymmetrical Visual Element */}
        <div className="col-span-12 lg:col-span-5 xl:col-span-6 relative order-1 lg:order-2">
          <motion.div 
            style={{ y, scale: imgScale }}
            className="relative aspect-[3/4] lg:aspect-auto lg:h-[80vh] w-full rounded-[40px] md:rounded-[100px] overflow-hidden shadow-2xl lg:mt-0 lg:ml-12"
          >
            <Image
              src={bgImage}
              alt={backgroundImageAlt}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              quality={90}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent opacity-60" />
          </motion.div>

          {/* Floating Element: The "Abstract" overlap */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute -bottom-10 -left-10 lg:-left-20 w-48 h-48 md:w-64 md:h-64 bg-alabaster/90 backdrop-blur-3xl rounded-full p-8 shadow-2xl flex flex-col items-center justify-center border border-navy/10 hidden sm:flex"
          >
            <span className="text-brand-blue font-serif text-4xl italic">1998</span>
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-charcoal mt-2">Authenticity</span>
          </motion.div>
        </div>

      </div>

      {/* Decorative Text */}
      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 select-none pointer-events-none w-max">
        <h2 className="text-[25vw] font-serif text-charcoal/[0.03] whitespace-nowrap leading-none italic">
          Masterpiece / Curation
        </h2>
      </div>

    </section>
  );
}


