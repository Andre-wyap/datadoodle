import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const GET: APIRoute = async ({ site }) => {
  const base = site || new URL("https://datadoodles.my");
  const lastmod = new Date().toISOString().slice(0, 10);

  // /lp is a standalone ad-landing page, reached only via direct/paid links —
  // deliberately kept out of the sitemap and off internal navigation.
  const staticRoutes = [
    { path: "/", priority: "1.0" },
    { path: "/about", priority: "0.6" },
    { path: "/case-study", priority: "0.8" },
    { path: "/blog", priority: "0.7" },
    { path: "/contact", priority: "0.6" },
  ];

  const posts = await getCollection("blog", ({ data }) => !data.draft);
  const postRoutes = posts.map((post) => ({
    path: `/blog/${post.id}`,
    priority: "0.6",
    lastmod: post.data.date.toISOString().slice(0, 10),
  }));

  const urls = [...staticRoutes, ...postRoutes]
    .map(
      (route) => `  <url>
    <loc>${new URL(route.path, base).href}</loc>
    <lastmod>${"lastmod" in route ? route.lastmod : lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${route.priority}</priority>
  </url>`,
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new Response(xml, {
    headers: { "content-type": "application/xml; charset=utf-8" },
  });
};
