import Product from '../models/Product.js';
import { translate } from '../i18n/index.js';

const ARRAY_FIELDS = ['specifications', 'features'];

function normalizeArrayField(value) {
  if (Array.isArray(value)) {
    return value
      .map((item) => (typeof item === 'string' ? item.trim() : String(item)))
      .filter((item) => item.length > 0);
  }

  if (typeof value === 'string') {
    return value
      .split(/[\n;,]+/)
      .map((item) => item.trim())
      .filter((item) => item.length > 0);
  }

  return undefined;
}

function extractProductData(payload) {
  if (!payload || typeof payload !== 'object') return {};

  const scalarFields = [
    'name',
    'category',
    'description',
    'image',
    'volume',
    'oilType',
    'viscosity',
    'apiStandard',
    'aceaStandard',
    'manufacturerStandards',
    'applications',
    'technology',
    'packaging',
    'price',
  ];

  const data = {};

  scalarFields.forEach((field) => {
    if (payload[field] !== undefined) data[field] = payload[field];
  });

  ARRAY_FIELDS.forEach((field) => {
    if (payload[field] !== undefined) {
      const normalized = normalizeArrayField(payload[field]);
      if (normalized !== undefined) data[field] = normalized;
    }
  });

  return data;
}

export async function listProducts(req, res) {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    return res.json(products);
  } catch (err) {
    return res.status(500).json({ message: translate(req, 'products.fetchFailed') });
  }
}

export async function getProduct(req, res) {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: translate(req, 'products.notFound') });
    }
    return res.json(product);
  } catch (err) {
    return res.status(500).json({ message: translate(req, 'products.fetchFailed') });
  }
}

export async function createProduct(req, res) {
  try {
    const data = extractProductData(req.body);
    const product = await Product.create(data);
    return res.status(201).json(product);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: translate(req, 'products.validationError'), details: err.errors });
    }
    return res.status(500).json({ message: translate(req, 'products.createFailed') });
  }
}

export async function updateProduct(req, res) {
  try {
    const data = extractProductData(req.body);
    const product = await Product.findByIdAndUpdate(req.params.id, data, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return res.status(404).json({ message: translate(req, 'products.notFound') });
    }
    return res.json(product);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: translate(req, 'products.validationError'), details: err.errors });
    }
    return res.status(500).json({ message: translate(req, 'products.updateFailed') });
  }
}

export async function deleteProduct(req, res) {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: translate(req, 'products.notFound') });
    }
    return res.status(204).send();
  } catch (err) {
    return res.status(500).json({ message: translate(req, 'products.deleteFailed') });
  }
}

