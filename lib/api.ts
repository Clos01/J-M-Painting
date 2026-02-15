import { client } from "@/lib/sanity";

export const revalidate = 60; // Revalidate every 60 seconds

export interface SanityPhoto {
  _id: string;
  title?: string;
  src: string;
  alt: string;
  category: string;
}

export interface ServiceItem {
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  alt: string;
  features: Array<{ icon: string; text: string }>;
  accent: string;
}

export interface HomepageData {
  homepage: {
    heroTitle: string;
    heroSubtitle: string;
    heroButtonText: string;
    heroImageUrl: string;
    heroImageAlt: string;
    aboutHeading: string;
    aboutText: string;
  };
  services: ServiceItem[];
  allPhotos: Array<{ id: string; title: string; category: string; src: string; alt: string }>;
  showcaseProjects: Array<{ id: string; title: string; category: string; src: string; alt: string }>;
}

/**
 * HOMEPAGE_QUERY - Parameterized GROQ for security and scalability.
 */
const HOMEPAGE_QUERY = `{
  "homepage": *[_type == "homepage"][0] {
    ...,
    "heroImageUrl": heroImage.asset->url,
    "heroImageAlt": coalesce(heroImage.alt, heroTitle, "Luxury interior composition"),
    "showcaseProjects": showcaseProjects[]->{
      _id,
      title,
      "src": image.asset->url,
      "alt": coalesce(image.alt, title, "Portfolio showcase project"),
      "category": coalesce(category, tags[0], "Residential")
    }
  },
  "services": *[_type == "service"] | order(_createdAt asc) {
    title,
    description,
    "imageUrl": image.asset->url,
    "alt": coalesce(image.alt, title, "Service description image"),
    subtitle, 
    features, 
    icon,
    "accent": "bg-brand-blue" 
  },
  "photos": *[_type == "photo"] | order(_createdAt desc) {
    _id,
    title,
    "src": image.asset->url,
    "alt": coalesce(image.alt, title, "Gallery image"),
    "category": coalesce(category, tags[0], "Residential")
  }
}`;

export async function fetchHomepageData(): Promise<HomepageData> {
  try {
    // Using parameterized fetch to prevent GROQ injection (Senior Version Pattern)
    const data = await client.fetch(HOMEPAGE_QUERY, {});
    
    if (!data) {
      throw new Error("No data returned from Sanity");
    }

    const homepage = data.homepage || {};
    const services = data.services || [];
    const fetchedPhotos = data.photos || [];

    // Map Sanity results to component expected format
    const mappedPhotos = fetchedPhotos.map((p: any) => ({
      id: p._id,
      title: p.title || "Untitled Project",
      category: p.category || "Residential",
      src: p.src,
      alt: p.alt
    }));

    const mappedShowcase = (homepage.showcaseProjects || []).map((p: any) => ({
      id: p._id,
      title: p.title || "Untitled Project",
      category: p.category || "Residential",
      src: p.src,
      alt: p.alt
    }));

    return {
      homepage: {
        heroTitle: homepage.heroTitle || "Timeless Interiors, Elevated.",
        heroSubtitle: homepage.heroSubtitle || "The Artisan Standard — Since 1998",
        heroButtonText: homepage.heroButtonText || "Check Availability",
        heroImageUrl: homepage.heroImageUrl,
        heroImageAlt: homepage.heroImageAlt,
        aboutHeading: homepage.aboutHeading || "Distinctive Curation.",
        aboutText: homepage.aboutText || "At J & M Painting, we are more than just contractors – we’re artisans of refined living.",
      },
      services,
      allPhotos: mappedPhotos,
      showcaseProjects: mappedShowcase
    };
  } catch (error) {
    console.error("Error fetching homepage data:", error);
    // Return empty/fallback structures to prevent app crash
    return {
      homepage: {
        heroTitle: "Timeless Interiors, Elevated.",
        heroSubtitle: "The Artisan Standard — Since 1998",
        heroButtonText: "Check Availability",
        heroImageUrl: "",
        heroImageAlt: "Luxury interior composition",
        aboutHeading: "Distinctive Curation.",
        aboutText: "At J & M Painting, we are more than just contractors – we’re artisans of refined living.",
      },
      services: [],
      allPhotos: [],
      showcaseProjects: []
    };
  }
}
