import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
      trim: true,
    },
    volume: {
      type: String,
      required: true,
      trim: true,
    },
    oilType: {
      type: String,
      default: '',
      trim: true,
    },
    viscosity: {
      type: String,
      default: '',
      trim: true,
    },
    apiStandard: {
      type: String,
      default: '',
      trim: true,
    },
    aceaStandard: {
      type: String,
      default: '',
      trim: true,
    },
    manufacturerStandards: {
      type: String,
      default: '',
      trim: true,
    },
    applications: {
      type: String,
      default: '',
      trim: true,
    },
    technology: {
      type: String,
      default: '',
      trim: true,
    },
    packaging: {
      type: String,
      default: '',
      trim: true,
    },
    specifications: {
      type: [String],
      default: [],
    },
    features: {
      type: [String],
      default: [],
    },
    price: {
      type: String,
      default: '',
      trim: true,
    },
    translations: {
      en: {
        description: {
          type: String,
          default: '',
          trim: true,
        },
        specifications: {
          type: [String],
          default: [],
        },
        features: {
          type: [String],
          default: [],
        },
      },
      ar: {
        description: {
          type: String,
          default: '',
          trim: true,
        },
        specifications: {
          type: [String],
          default: [],
        },
        features: {
          type: [String],
          default: [],
        },
      },
    },
  },
  {
    timestamps: true,
  },
);

const Product = mongoose.model('Product', productSchema);

export default Product;
