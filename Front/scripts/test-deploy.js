#!/usr/bin/env node

/**
 * Script de test pre-deployment
 * Vérifie que tout est prêt pour le déploiement
 * Usage: npm run test:deploy
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log('🔍 Vérification pré-déploiement...\n');

const checks = {
  '✅ Dossier public exists': () => fs.existsSync(path.join(__dirname, '../public')),
  '✅ sitemap.xml exists': () => fs.existsSync(path.join(__dirname, '../public/sitemap.xml')),
  '✅ robots.txt exists': () => fs.existsSync(path.join(__dirname, '../public/robots.txt')),
  '✅ index.html exists': () => fs.existsSync(path.join(__dirname, '../index.html')),
  '✅ Vite config exists': () => fs.existsSync(path.join(__dirname, '../vite.config.ts')),
  '✅ TypeScript config exists': () => fs.existsSync(path.join(__dirname, '../tsconfig.json')),
};

let passedChecks = 0;
let failedChecks = 0;

for (const [check, fn] of Object.entries(checks)) {
  const result = fn();
  if (result) {
    console.log(check);
    passedChecks++;
  } else {
    console.log(check.replace('✅', '❌'));
    failedChecks++;
  }
}

console.log(`\n📊 Résultat: ${passedChecks} passed, ${failedChecks} failed\n`);

if (failedChecks === 0) {
  console.log('✨ Tous les contrôles sont passés! Prêt pour le déploiement.\n');
  process.exit(0);
} else {
  console.log('⚠️ Quelques fichiers manquent. Veuillez les vérifier.\n');
  process.exit(1);
}
