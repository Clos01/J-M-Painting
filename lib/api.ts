import { client } from "@/lib/sanity";

export const revalidate = 60; // Revalidate every 60 seconds

const HOMEPAGE_QUERY = `{
  "homepage": *[_type == "homepage"][0] {
    ...,
    "heroImageUrl": heroImage.asset->url,
    "showcaseProjects": showcaseProjects[]->{
      _id,
      title,
      "src": image.asset->url,
      "category": coalesce(category, tags[0], "Residential")
    }
  },
  "services": *[_type == "service"] | order(_createdAt asc) {
    title,
    description,
    "imageUrl": image.asset->url,
    subtitle, 
    features, 
    icon,
    "accent": "bg-brand-blue" 
  },
  "photos": *[_type == "photo"] | order(_createdAt desc) {
    _id,
    title,
    "src": image.asset->url,
    "category": coalesce(category, tags[0], "Residential")
  }
}`;

export async function fetchHomepageData() {
  const data = await client.fetch(HOMEPAGE_QUERY);
  const homepage = data.homepage || {};
  const services = data.services || [];
  const fetchedPhotos = data.photos || [];

  // Map Sanity results to component expected format
  const mappedPhotos = fetchedPhotos.map((p: any) => ({
    id: p._id,
    title: p.title || "Untitled Project",
    category: p.category || "Residential",
    src: p.src
  }));

  const mappedShowcase = (homepage.showcaseProjects || []).map((p: any) => ({
    id: p._id,
    title: p.title || "Untitled Project",
    category: p.category || "Residential",
    src: p.src
  }));

  return {
    homepage,
    services,
    allPhotos: mappedPhotos,
    showcaseProjects: mappedShowcase
  };
}
