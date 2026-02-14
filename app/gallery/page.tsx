import Navbar from "@/components/Navbar";
import GalleryGrid from "@/components/GalleryGrid";
import { client } from "@/lib/sanity";
import { motion } from "framer-motion"; // Moving motion to client component part for strictness? 
// Actually we can leave motion in page/header if we make the header a client comp or just keep page simplified.
// Let's make page server comp and header client or just standard header.
// Ideally page.tsx is server comp.

export const revalidate = 60;

export default async function Gallery() {
  const query = `*[_type == "photo"] | order(_createdAt desc) {
    _id,
    title,
    "src": image.asset->url,
    "category": tags[0]
  }`;

  const fetchedPhotos = await client.fetch(query);

  const galleryItems = fetchedPhotos.map((p: any) => ({
    id: p._id,
    src: p.src,
    category: p.category || "Portfolio",
    title: p.title || "Project"
  }));

  // Fallback for empty state (remove when real data is consistently added)
  // Or just pass empty array and let grid handle it
  
  return (
    <main className="min-h-screen bg-alabaster">
      <Navbar />
      
      {/* Header */}
      <section className="pt-48 pb-24 px-6 md:px-12 text-center">
        <div>
          <span className="text-brand-blue font-sans text-xs uppercase tracking-[0.4em] font-bold block mb-6">
            Our Portfolio
          </span>
          <h1 className="text-5xl md:text-8xl font-serif text-navy tracking-tight leading-none mb-8">
            The <span className="italic text-brand-blue">Gallery.</span>
          </h1>
          <p className="max-w-xl mx-auto text-navy/60 text-lg leading-relaxed">
            A comprehensive look at our residential and commercial transformations. Each project represents our commitment to the artisan standard.
          </p>
        </div>
      </section>

      {/* Masonry Grid */}
      <section className="px-4 md:px-12 pb-32">
        <GalleryGrid items={galleryItems} />
      </section>

      {/* Footer */}
      <footer className="py-12 text-center text-charcoal/40 text-xs uppercase tracking-[0.2em] border-t border-navy/5">
        © 2026 J&M Painting. All Rights Reserved.
      </footer>
    </main>
  );
}


