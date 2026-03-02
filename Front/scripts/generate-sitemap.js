#!/usr/bin/env node

/**
 * Generate sitemap.xml with image entries.
 * Usage: npm run generate:sitemap
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, '../public');
const distDir = path.join(__dirname, '../dist');

// Pages to include
const pages = [
  {
    path: '',
    priority: 1.0,
    changefreq: 'weekly',
    lastmod: new Date().toISOString().split('T')[0],
  },
  {
    path: '/huile-moteur-tunisie',
    priority: 0.9,
    changefreq: 'monthly',
    lastmod: new Date().toISOString().split('T')[0],
  },
  {
    path: '/lubrifiants-automobiles',
    priority: 0.9,
    changefreq: 'monthly',
    lastmod: new Date().toISOString().split('T')[0],
  },
  {
    path: '/eau-lave-glace',
    priority: 0.8,
    changefreq: 'monthly',
    lastmod: new Date().toISOString().split('T')[0],
  },
  {
    path: '/contact',
    priority: 0.7,
    changefreq: 'monthly',
    lastmod: new Date().toISOString().split('T')[0],
  },
];

// Domain (from env or default)
const domain = process.env.SITE_URL || 'https://polyoil.netlify.app';

// Choose output dir (dist after build, else public)
const outputDir = fs.existsSync(distDir) ? distDir : publicDir;

const imageExtensions = new Set(['.png', '.jpg', '.jpeg', '.webp', '.gif', '.svg']);

function collectImages(dir, rootDir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const results = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...collectImages(fullPath, rootDir));
      continue;
    }

    const ext = path.extname(entry.name).toLowerCase();
    if (!imageExtensions.has(ext)) continue;

    const relPath = path.relative(rootDir, fullPath).split(path.sep).join('/');
    results.push(relPath);
  }

  return results;
}

const imagePaths = collectImages(outputDir, outputDir);
const imageTags = imagePaths
  .map(
    p =>
      `    <image:image>\n      <image:loc>${domain}/${encodeURI(p)}</image:loc>\n    </image:image>`,
  )
  .join('\n');

const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${pages
  .map(page => {
    const pageImages = page.path === '' ? imageTags : '';
    return `  <url>
    <loc>${domain}${page.path}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
${pageImages ? `${pageImages}\n` : ''}  </url>`;
  })
  .join('\n')}
</urlset>`;

// Write sitemap.xml
const sitemapPath = path.join(outputDir, 'sitemap.xml');
fs.writeFileSync(sitemapPath, sitemapContent);

console.log('Sitemap generated successfully.');
console.log(`Output: ${sitemapPath}`);
console.log(`Domain: ${domain}`);
console.log(`Pages: ${pages.length}`);
console.log(`Images: ${imagePaths.length}`);
