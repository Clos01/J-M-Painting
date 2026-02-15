"use client";

import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const navLinks = [
  { name: "About", href: "/#about" },
  { name: "Services", href: "/services" },
  { name: "Work", href: "/#portfolio" },
  { name: "Gallery", href: "/gallery" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[min(90%,1200px)]">
      <div className="glass rounded-full px-6 py-3 flex items-center justify-between gold-glow">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 md:w-12 md:h-12 overflow-hidden rounded-lg group-hover:scale-110 transition-transform duration-300">
            <Image 
              src="/brand/logo.png" 
              alt="J&M Painting Logo" 
              fill 
              className="object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-serif font-black text-charcoal tracking-tighter leading-none">
              J&M
            </span>
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-charcoal/40 -mt-0.5">
              Painting
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-navy/80 hover:text-brand-blue transition-colors tracking-wide"
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="#contact"
            className="bg-navy text-alabaster px-6 py-2 rounded-full text-sm font-semibold hover:bg-brand-blue transition-all shadow-lg active:scale-95"
          >
            Request Estimate
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-navy p-1"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="absolute top-20 left-0 w-full glass rounded-3xl p-6 flex flex-col gap-4 md:hidden border border-brand-blue/10"
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-lg font-serif text-navy text-center py-2"
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="#contact"
            onClick={() => setIsOpen(false)}
            className="bg-brand-blue text-white text-center py-4 rounded-xl font-bold"
          >
            Request Estimate
          </Link>
        </motion.div>
      )}
    </nav>
  );
}
