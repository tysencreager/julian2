import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

const SITE = 'https://juliandismute.com';

// Per-route SEO weighting for the sitemap.
const ROUTE_META = {
  '/': { priority: 1.0, changefreq: 'weekly' },
  '/about': { priority: 0.9, changefreq: 'monthly' },
  '/speaking': { priority: 0.9, changefreq: 'monthly' },
  '/ministry': { priority: 0.9, changefreq: 'monthly' },
  '/media': { priority: 0.8, changefreq: 'weekly' },
  '/booking': { priority: 0.9, changefreq: 'monthly' },
  '/privacy': { priority: 0.2, changefreq: 'yearly' },
  '/terms': { priority: 0.2, changefreq: 'yearly' },
};

export default defineConfig({
  site: SITE,
  trailingSlash: 'never',
  build: {
    inlineStylesheets: 'auto',
  },
  integrations: [
    react(),
    sitemap({
      // Don't index the 404 page even though Astro emits it.
      filter: (page) => !/\/404\/?$/.test(page),
      changefreq: 'monthly',
      priority: 0.7,
      lastmod: new Date(),
      serialize(item) {
        const url = new URL(item.url);
        const path = url.pathname.replace(/\/$/, '') || '/';
        const meta = ROUTE_META[path];
        if (meta) {
          item.changefreq = meta.changefreq;
          item.priority = meta.priority;
        }
        return item;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
