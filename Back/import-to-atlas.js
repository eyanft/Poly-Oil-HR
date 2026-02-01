// Back/import-to-atlas.js
import fs from 'fs';
import { MongoClient } from 'mongodb';

// ⚠️ REMPLACER PAR VOTRE CONNECTION STRING MONGODB ATLAS
const MONGODB_ATLAS_URI =
  'mongodb+srv://eyanaffeti01_db_user:lUyXHDa5xSSplrxQ@poly-oil-cluster.3ez1tnb.mongodb.net/poly_oil_hr?retryWrites=true&w=majority';

async function importData() {
  const client = new MongoClient(MONGODB_ATLAS_URI);

  try {
    console.log('🔗 Connexion à MongoDB Atlas...');
    await client.connect();
    const db = client.db('poly_oil_hr');

    // Importer admins
    if (fs.existsSync('admins.json')) {
      const adminsData = JSON.parse(fs.readFileSync('admins.json', 'utf8'));
      if (adminsData.length > 0) {
        await db.collection('admins').insertMany(adminsData);
        console.log(`✅ ${adminsData.length} admins importés`);
      }
    }

    // Importer products
    if (fs.existsSync('products.json')) {
      const productsData = JSON.parse(fs.readFileSync('products.json', 'utf8'));
      if (productsData.length > 0) {
        await db.collection('products').insertMany(productsData);
        console.log(`✅ ${productsData.length} products importés`);
      }
    }

    console.log('🎉 Import réussi !');
  } catch (error) {
    console.error('❌ Erreur :', error.message);
  } finally {
    await client.close();
  }
}

importData();
