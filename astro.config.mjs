import { defineConfig } from "astro/config";
import node from "@astrojs/node";

export default defineConfig({
  site: process.env.PUBLIC_SITE_URL || "https://datadoodles.my",
  output: "server",
  adapter: node({ mode: "standalone" }),
  compressHTML: true,
});
