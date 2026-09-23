import mongoose from "mongoose";

const VariantSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },

    options: {
      type: Map,
      of: String,
      default: {},
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    compareAtPrice: {
      type: Number,
      default: null,
    },

    stock: {
      type: Number,
      default: 0,
      min: 0,
    },

    sku: {
      type: String,
      default: null,
    },
  },
  {
    _id: false,
  }
);

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    stock: {
      type: Number,
      default: 0,
      min: 0,
    },

    sku: {
      type: String,
      default: null,
    },

    variants: {
      type: [VariantSchema],
      default: [],
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product =
  mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);

export default Product;