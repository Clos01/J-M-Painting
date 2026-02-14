import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: "6dubnqgu",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false, // Set to false for real-time updates, true for caching
});

const builder = imageUrlBuilder(client);

export function getSanityImageUrl(source: any) {
  return builder.image(source);
}
