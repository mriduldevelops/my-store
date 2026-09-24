import mongoose from "mongoose";

const ProductVariantSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    options: {
      type: Map,
      of: String,
      default: {},
    },

    price: {
      type: Number,
      default: null,
      min: 0,
    },

    sku: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    image: {
      type: String,
      default: null,
    },

    stock: {
      type: Number,
      default: 0,
      min: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.ProductVariant ||
  mongoose.model("ProductVariant", ProductVariantSchema);
