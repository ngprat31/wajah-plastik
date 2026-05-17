import { MetadataRoute } from "next";

import  prisma  from "@/lib/prisma"; 

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https:/wajahplastik.com"; // Ganti dengan domain utama Anda nantinya

  // 1. Rute Statis
  const staticRoutes = [
    "",
    "/about",
    "/achievement",
    "/event",
    "/gallery",
    "/news",
    "/youtube",
    "/contact",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

 
  const galleryItems = await prisma.gallery.findMany({ select: { gallery_slug: true, updated_date: true } });
  const galleryRoutes = galleryItems.map((item) => ({
    url: `${baseUrl}/gallery/${item.gallery_slug}`,
    lastModified: item.updated_date ? new Date(item.updated_date) : undefined,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  
  const newsItems = await prisma.news.findMany({ select: { news_slug: true, updated_date: true } });
  const newsRoutes = newsItems.map((item) => ({
    url: `${baseUrl}/news/${item.news_slug}`,
    lastModified: item.updated_date ? new Date(item.updated_date) : undefined,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [
    ...staticRoutes,
    ...galleryRoutes,
    ...newsRoutes,
  ];
}