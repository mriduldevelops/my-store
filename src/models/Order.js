import mongoose from "mongoose";

const OrderItemSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: true,
    },

    variantId: {
      type: String,
      default: null,
    },

    productName: {
      type: String,
      required: true,
      trim: true,
    },

    productImage: {
      type: String,
      default: null,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    sku: {
      type: String,
      default: null,
    },

    variants: {
      type: Map,
      of: String,
      default: {},
    },
  },
  {
    _id: false,
  },
);

const OrderSchema = new mongoose.Schema(
  {
    /* ----------------------------- */
    /* User                           */
    /* ----------------------------- */

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
      index: true,
    },

    /* ----------------------------- */
    /* Order                         */
    /* ----------------------------- */

    orderNumber: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    status: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "processing",
        "shipped",
        "delivered",
        "cancelled",
      ],
      default: "pending",
      index: true,
    },

    /* ----------------------------- */
    /* Customer / Delivery           */
    /* ----------------------------- */

    customer: {
      firstName: {
        type: String,
        required: true,
        trim: true,
      },

      lastName: {
        type: String,
        required: true,
        trim: true,
      },

      email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
      },

      phone: {
        type: String,
        required: true,
        trim: true,
      },

      address: {
        type: String,
        required: true,
        trim: true,
      },

      apartment: {
        type: String,
        default: "",
        trim: true,
      },

      city: {
        type: String,
        required: true,
        trim: true,
      },

      state: {
        type: String,
        required: true,
        trim: true,
      },

      pincode: {
        type: String,
        required: true,
        trim: true,
      },
    },

    /* ----------------------------- */
    /* Items                          */
    /* ----------------------------- */

    items: {
      type: [OrderItemSchema],
      required: true,
      validate: {
        validator: (items) => Array.isArray(items) && items.length > 0,
        message: "Order must contain at least one item.",
      },
    },

    /* ----------------------------- */
    /* Payment                        */
    /* ----------------------------- */

    paymentMethod: {
      type: String,
      enum: ["cod", "online"],
      required: true,
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
    },

    razorpayOrderId: {
      type: String,
      default: null,
      index: true,
    },

    razorpayPaymentId: {
      type: String,
      default: null,
    },

    razorpaySignature: {
      type: String,
      default: null,
    },

    /* ----------------------------- */
    /* Totals                         */
    /* ----------------------------- */

    subtotal: {
      type: Number,
      required: true,
      min: 0,
    },

    shipping: {
      type: Number,
      default: 0,
      min: 0,
    },

    discount: {
      type: Number,
      default: 0,
      min: 0,
    },

    tax: {
      type: Number,
      default: 0,
      min: 0,
    },

    total: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
