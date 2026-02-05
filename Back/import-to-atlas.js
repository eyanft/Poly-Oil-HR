// Back/import-to-atlas.js - Script pour importer les données vers MongoDB Atlas
import fs from 'fs';
import { MongoClient } from 'mongodb';

// ⚠️ REMPLACER PAR VOTRE CONNECTION STRING MONGODB ATLAS
const MONGODB_ATLAS_URI =
  'mongodb+srv://eyanaffeti01_db_user:lUyXHDa5xSSplrxQ@poly-oil-cluster.3ez1tnb.mongodb.net/poly_oil_hr?retryWrites=true&w=majority';

// Fonction pour convertir le format MongoDB Extended JSON en format normal
function convertMongoDocument(doc) {
  if (Array.isArray(doc)) {
    return doc.map(convertMongoDocument);
  }
  if (doc && typeof doc === 'object') {
    // Gérer _id avec $oid
    if (doc._id && doc._id.$oid) {
      doc._id = doc._id.$oid;
    }
    // Gérer les dates avec $date
    if (doc.createdAt && doc.createdAt.$date) {
      doc.createdAt = new Date(doc.createdAt.$date);
    }
    if (doc.updatedAt && doc.updatedAt.$date) {
      doc.updatedAt = new Date(doc.updatedAt.$date);
    }
    // Convertir récursivement les autres champs
    const converted = {};
    for (const key in doc) {
      converted[key] = convertMongoDocument(doc[key]);
    }
    return converted;
  }
  return doc;
}

async function importData() {
  const client = new MongoClient(MONGODB_ATLAS_URI);

  try {
    console.log('🔗 Connexion à MongoDB Atlas...');
    await client.connect();
    const db = client.db('poly_oil_hr');

    // Importer admins
    if (fs.existsSync('admins.json')) {
      const adminsData = JSON.parse(fs.readFileSync('admins.json', 'utf8'));
      const admins = convertMongoDocument(adminsData);

      if (admins.length > 0) {
        // Supprimer les anciens admins
        await db.collection('admins').deleteMany({});
        await db.collection('admins').insertMany(admins);
        console.log(`✅ ${admins.length} admins importés`);
      }
    }

    // Importer products
    if (fs.existsSync('products.json')) {
      const productsData = JSON.parse(fs.readFileSync('products.json', 'utf8'));
      const products = convertMongoDocument(productsData);

      if (products.length > 0) {
        // Supprimer les anciens products
        await db.collection('products').deleteMany({});
        await db.collection('products').insertMany(products);
        console.log(`✅ ${products.length} products importés`);
      }
    }

    console.log('🎉 Import réussi !');
    console.log('📊 Vérification des collections...');

    // Vérifier les données
    const adminCount = await db.collection('admins').countDocuments();
    const productCount = await db.collection('products').countDocuments();
    console.log(`   - Admins: ${adminCount}`);
    console.log(`   - Products: ${productCount}`);
  } catch (error) {
    console.error('❌ Erreur :', error.message);
    if (error.message.includes('not authorized')) {
      console.error("💡 Assurez-vous que votre utilisateur a les droits d'écriture sur la base poly_oil_hr");
    }
  } finally {
    await client.close();
  }
}

importData();
