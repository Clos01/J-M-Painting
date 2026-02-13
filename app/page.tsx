import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PortfolioMasonry from "@/components/PortfolioMasonry";
import Services from "@/components/Services";
import GalleryPreview from "@/components/GalleryPreview";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-alabaster">
      <Navbar />
      <Hero />
      <GalleryPreview />
      <PortfolioMasonry />
      <Services />
      
      {/* Contact Section will follow */}
      <footer className="py-12 text-center text-charcoal/40 text-xs uppercase tracking-[0.2em] bg-alabaster">
        © 2026 J&M Painting. All Rights Reserved.
      </footer>
    </main>
  );
}


