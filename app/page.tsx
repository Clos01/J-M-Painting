import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PortfolioMasonry from "@/components/PortfolioMasonry";
import Services from "@/components/Services";
import GalleryPreview from "@/components/GalleryPreview";

import { fetchHomepageData } from "@/lib/api";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Home() {
  const { homepage, services, allPhotos, showcaseProjects } = await fetchHomepageData();

  // Split for preview (first 3) and masonry (next 4)
  const previewItems = allPhotos.length > 0 ? allPhotos.slice(0, 3) : undefined;
  
  // Use showcase projects if selected, otherwise fallback to index 3-7 of all photos
  const portfolioItems = showcaseProjects.length > 0 ? showcaseProjects : (allPhotos.length > 3 ? allPhotos.slice(3, 7) : undefined);

  return (
    <main className="relative min-h-screen bg-alabaster">
      <Navbar />
      <Hero 
        title={homepage.heroTitle} 
        subtitle={homepage.heroSubtitle}
        buttonText={homepage.heroButtonText}
        backgroundImage={homepage.heroImageUrl}
      />
      <GalleryPreview items={previewItems} />
      <PortfolioMasonry items={portfolioItems} />
      <Services 
        heading={homepage.aboutHeading} 
        introText={homepage.aboutText}
        services={services}
      />
      
      {/* Contact Section will follow */}
      <footer className="py-12 text-center text-charcoal/40 text-xs uppercase tracking-[0.2em] bg-alabaster">
        © 2026 J&M Painting. All Rights Reserved.
      </footer>
    </main>
  );
}


