#!/usr/bin/env node

/**
 * Script pour générer dynamiquement le sitemap.xml
 * Utilisation: npm run generate:sitemap
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, '../public');

// Configuration des pages et leurs priorités
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

// Déterminer le domaine (depuis variables d'environnement ou par défaut)
const domain = process.env.SITE_URL || 'https://polyoil.com';

// Générer le contenu du sitemap
const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${pages
  .map(
    (page) => `  <url>
    <loc>${domain}${page.path}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

// Écrire le fichier sitemap.xml
const sitemapPath = path.join(publicDir, 'sitemap.xml');
fs.writeFileSync(sitemapPath, sitemapContent);

console.log('✅ Sitemap généré avec succès!');
console.log(`📍 Localisation: ${sitemapPath}`);
console.log(`🌐 Domaine utilisé: ${domain}`);
console.log(`📄 Pages incluses: ${pages.length}`);
