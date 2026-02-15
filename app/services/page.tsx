import { client } from "@/lib/sanity";
import ServicesClient from "@/components/ServicesClient";

export const revalidate = 60;

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

  return <ServicesClient services={services} />;
}
