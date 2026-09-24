import mongoose from "mongoose";
import { NextResponse } from "next/server";

import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import Product from "@/models/Product";
import ProductVariant from "@/models/ProductVariant";
import { getAuthenticatedUser } from "@/lib/getAuthenticatedUser";

function generateOrderNumber() {
  return `TRK-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;
}

export async function POST(request) {
  try {
    await connectDB();

    const user = await getAuthenticatedUser();

    if (!user) {
      return NextResponse.json(
        {
          message: "Authentication required.",
        },
        {
          status: 401,
        },
      );
    }

    const body = await request.json();

    const { items, customer, paymentMethod } = body;

    /* -------------------------------- */
    /* Validate basic request           */
    /* -------------------------------- */

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        {
          message: "Order must contain at least one item.",
        },
        {
          status: 400,
        },
      );
    }

    if (!customer) {
      return NextResponse.json(
        {
          message: "Customer details are required.",
        },
        {
          status: 400,
        },
      );
    }

    if (!["online", "cod"].includes(paymentMethod)) {
      return NextResponse.json(
        {
          message: "Invalid payment method.",
        },
        {
          status: 400,
        },
      );
    }

    /* -------------------------------- */
    /* Validate customer                */
    /* -------------------------------- */

    const requiredCustomerFields = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "address",
      "city",
      "state",
      "pincode",
    ];

    for (const field of requiredCustomerFields) {
      if (!customer[field]?.toString().trim()) {
        return NextResponse.json(
          {
            message: `${field} is required.`,
          },
          {
            status: 400,
          },
        );
      }
    }

    /* -------------------------------- */
    /* Load products from database      */
    /* -------------------------------- */

    const productIds = [
      ...new Set(items.map((item) => item.productId?.toString())),
    ];

    const invalidProductId = productIds.find(
      (id) => !mongoose.Types.ObjectId.isValid(id),
    );

    if (invalidProductId) {
      return NextResponse.json(
        {
          message: "Invalid product ID.",
        },
        {
          status: 400,
        },
      );
    }

    const products = await Product.find({
      _id: {
        $in: productIds,
      },
      isActive: true,
    }).lean();

    const productMap = new Map(
      products.map((product) => [product._id.toString(), product]),
    );

    /* -------------------------------- */
    /* Prepare order items              */
    /* -------------------------------- */

    const orderItems = [];

    let subtotal = 0;

    for (const item of items) {
      const productId = item.productId?.toString();

      const product = productMap.get(productId);

      if (!product) {
        return NextResponse.json(
          {
            message: "One of the products is unavailable.",
          },
          {
            status: 400,
          },
        );
      }

      const quantity = Number(item.quantity);

      if (!Number.isInteger(quantity) || quantity < 1) {
        return NextResponse.json(
          {
            message: "Invalid product quantity.",
          },
          {
            status: 400,
          },
        );
      }

      let variant = null;

      /* -------------------------------- */
      /* Variant validation                */
      /* -------------------------------- */

      if (item.variantId) {
        if (!mongoose.Types.ObjectId.isValid(item.variantId)) {
          return NextResponse.json(
            {
              message: "Invalid variant ID.",
            },
            {
              status: 400,
            },
          );
        }

        variant = await ProductVariant.findOne({
          _id: item.variantId,
          productId: product._id,
          isActive: true,
        }).lean();

        if (!variant) {
          return NextResponse.json(
            {
              message: "Selected product variant is unavailable.",
            },
            {
              status: 400,
            },
          );
        }

        /* ------------------------------ */
        /* Stock validation                */
        /* ------------------------------ */

        if (variant.stock < quantity) {
          return NextResponse.json(
            {
              message: `Only ${variant.stock} item(s) are available.`,
            },
            {
              status: 400,
            },
          );
        }
      }

      /* -------------------------------- */
      /* Server-side price                */
      /* -------------------------------- */

      const unitPrice =
        variant?.price !== null && variant?.price !== undefined
          ? variant.price
          : product.price;

      const lineTotal = unitPrice * quantity;

      subtotal += lineTotal;

      orderItems.push({
        productId: product._id,
        variantId: variant?._id || null,

        productName: product.name,

        productImage: variant?.image || product.images?.[0] || null,

        quantity,

        price: unitPrice,

        sku: variant?.sku || null,

        variants: variant?.options || {},
      });
    }

    /* -------------------------------- */
    /* Calculate totals on server       */
    /* -------------------------------- */

    const shipping = 0;
    const discount = 0;
    const tax = 0;

    const total = subtotal + shipping + tax - discount;

    /* -------------------------------- */
    /* Create order                     */
    /* -------------------------------- */

    const order = await Order.create({
      userId: user._id,

      orderNumber: generateOrderNumber(),

      status: paymentMethod === "cod" ? "confirmed" : "pending",

      customer: {
        firstName: customer.firstName.trim(),
        lastName: customer.lastName.trim(),
        email: customer.email.trim().toLowerCase(),
        phone: customer.phone.trim(),
        address: customer.address.trim(),
        apartment: customer.apartment?.trim() || "",
        city: customer.city.trim(),
        state: customer.state.trim(),
        pincode: customer.pincode.trim(),
      },

      items: orderItems,

      paymentMethod,

      paymentStatus: paymentMethod === "cod" ? "pending" : "pending",

      subtotal,
      shipping,
      discount,
      tax,
      total,
    });

    return NextResponse.json(
      {
        message: "Order created successfully.",
        order,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error("CREATE_ORDER_ERROR:", error);

    return NextResponse.json(
      {
        message: "Failed to create order.",
      },
      {
        status: 500,
      },
    );
  }
}
