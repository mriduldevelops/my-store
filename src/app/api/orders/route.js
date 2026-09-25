import { NextResponse } from "next/server";

import { connectDB } from "@/lib/db";
import { getAuthenticatedUser } from "@/lib/getAuthenticatedUser";

import Order from "@/models/Order";

import { getProductForOrder } from "@/sanity/lib/orderProducts";
import { urlFor } from "@/sanity/lib/image";

/* -------------------------------- */
/* Generate Order Number             */
/* -------------------------------- */

function generateOrderNumber() {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();

  return `ORD-${timestamp}-${random}`;
}

/* -------------------------------- */
/* GET - User Orders                 */
/* -------------------------------- */

export async function GET() {
  try {
    const user = await getAuthenticatedUser();

    if (!user) {
      return NextResponse.json(
        {
          message: "Unauthorized.",
        },
        {
          status: 401,
        },
      );
    }

    await connectDB();

    const orders = await Order.find({
      userId: user._id,
    })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(
      {
        orders,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("GET_ORDERS_ERROR:", error);

    return NextResponse.json(
      {
        message: "Failed to load orders.",
      },
      {
        status: 500,
      },
    );
  }
}

/* -------------------------------- */
/* POST - COD Order Only             */
/* -------------------------------- */

export async function POST(request) {
  try {
    /* -------------------------------- */
    /* Authentication                    */
    /* -------------------------------- */

    const user = await getAuthenticatedUser();

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized.",
        },
        {
          status: 401,
        },
      );
    }

    /* -------------------------------- */
    /* Request Body                      */
    /* -------------------------------- */

    const body = await request.json();

    const { items, customer, paymentMethod } = body;

    /* -------------------------------- */
    /* Payment Method                    */
    /* -------------------------------- */

    // This endpoint is ONLY for COD.
    // Online payments must go through Razorpay.
    if (paymentMethod !== "cod") {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid payment method. Use the Razorpay payment flow for online payments.",
        },
        {
          status: 400,
        },
      );
    }

    /* -------------------------------- */
    /* Basic Validation                  */
    /* -------------------------------- */

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Cart is empty.",
        },
        {
          status: 400,
        },
      );
    }

    if (!customer) {
      return NextResponse.json(
        {
          success: false,
          message: "Customer details are required.",
        },
        {
          status: 400,
        },
      );
    }

    /* -------------------------------- */
    /* Validate Customer                 */
    /* -------------------------------- */

    const firstName = String(customer.firstName || "").trim();

    const lastName = String(customer.lastName || "").trim();

    const email = String(customer.email || "")
      .trim()
      .toLowerCase();

    const phone = String(customer.phone || "").trim();

    const address = String(customer.address || "").trim();

    const city = String(customer.city || "").trim();

    const state = String(customer.state || "").trim();

    const pincode = String(customer.pincode || "").trim();

    const apartment = String(customer.apartment || "").trim();

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !address ||
      !city ||
      !state ||
      !pincode
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Complete customer details are required.",
        },
        {
          status: 400,
        },
      );
    }

    /* -------------------------------- */
    /* Validate Products From Sanity     */
    /* -------------------------------- */

    const validatedItems = [];

    for (const item of items) {
      const productId = String(item.productId || "").trim();

      const variantId = item.variantId ? String(item.variantId).trim() : null;

      const quantity = Number(item.quantity);

      /* -------------------------------- */
      /* Product ID                       */
      /* -------------------------------- */

      if (!productId) {
        return NextResponse.json(
          {
            success: false,
            message: "Invalid product.",
          },
          {
            status: 400,
          },
        );
      }

      /* -------------------------------- */
      /* Quantity                         */
      /* -------------------------------- */

      if (!Number.isInteger(quantity) || quantity < 1) {
        return NextResponse.json(
          {
            success: false,
            message: "Invalid product quantity.",
          },
          {
            status: 400,
          },
        );
      }

      /* -------------------------------- */
      /* Fetch Product From Sanity        */
      /* -------------------------------- */

      const product = await getProductForOrder(productId);

      if (!product) {
        return NextResponse.json(
          {
            success: false,
            message: "One of the products is no longer available.",
          },
          {
            status: 400,
          },
        );
      }

      /* -------------------------------- */
      /* Variant                          */
      /* -------------------------------- */

      let selectedVariant = null;

      if (variantId) {
        selectedVariant = product.variants?.find(
          (variant) => variant._key === variantId,
        );

        if (!selectedVariant) {
          return NextResponse.json(
            {
              success: false,
              message: `Variant for "${product.name}" is no longer available.`,
            },
            {
              status: 400,
            },
          );
        }

        /* -------------------------------- */
        /* Variant Active                    */
        /* -------------------------------- */

        if (selectedVariant.isActive === false) {
          return NextResponse.json(
            {
              success: false,
              message: `Variant for "${product.name}" is inactive.`,
            },
            {
              status: 400,
            },
          );
        }

        /* -------------------------------- */
        /* Stock                             */
        /* -------------------------------- */

        if (
          !Number.isInteger(selectedVariant.stock) ||
          selectedVariant.stock < quantity
        ) {
          return NextResponse.json(
            {
              success: false,
              message: `"${product.name}" does not have enough stock.`,
            },
            {
              status: 400,
            },
          );
        }
      }

      /* -------------------------------- */
      /* Server-Side Price                 */
      /* -------------------------------- */

      const price = selectedVariant?.price ?? product.price;

      if (typeof price !== "number" || price < 0) {
        return NextResponse.json(
          {
            success: false,
            message: `Invalid price for "${product.name}".`,
          },
          {
            status: 400,
          },
        );
      }

      /* -------------------------------- */
      /* Product Image                     */
      /* -------------------------------- */

      const productImage = selectedVariant?.image
        ? urlFor(selectedVariant.image).width(600).url()
        : product.image
          ? urlFor(product.image).width(600).url()
          : null;

      /* -------------------------------- */
      /* Trusted Order Item                */
      /* -------------------------------- */

      validatedItems.push({
        productId: product._id,

        variantId: selectedVariant?._key ?? null,

        productName: product.name,

        productImage,

        quantity,

        price,

        sku: selectedVariant?.sku ?? null,

        variants: selectedVariant?.options || {},
      });
    }

    /* -------------------------------- */
    /* Calculate Subtotal                */
    /* -------------------------------- */

    const subtotal = validatedItems.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);

    /* -------------------------------- */
    /* Shipping                          */
    /* -------------------------------- */

    const shipping = 0;

    /* -------------------------------- */
    /* Discount                          */
    /* -------------------------------- */

    const discount = 0;

    /* -------------------------------- */
    /* Tax                               */
    /* -------------------------------- */

    const tax = 0;

    /* -------------------------------- */
    /* Final Total                       */
    /* -------------------------------- */

    const total = subtotal + shipping + tax - discount;

    /* -------------------------------- */
    /* Connect Database                  */
    /* -------------------------------- */

    await connectDB();

    /* -------------------------------- */
    /* Create COD Order                  */
    /* -------------------------------- */

    const order = await Order.create({
      userId: user._id,

      orderNumber: generateOrderNumber(),

      // COD orders are confirmed immediately.
      status: "confirmed",

      customer: {
        firstName,
        lastName,
        email,
        phone,
        address,
        apartment,
        city,
        state,
        pincode,
      },

      items: validatedItems,

      paymentMethod: "cod",

      // Payment is still pending because
      // customer pays on delivery.
      paymentStatus: "pending",

      subtotal,

      shipping,

      discount,

      tax,

      total,
    });

    /* -------------------------------- */
    /* Response                          */
    /* -------------------------------- */

    return NextResponse.json(
      {
        success: true,

        order: {
          id: order._id,
          orderNumber: order.orderNumber,
          status: order.status,
          paymentMethod: order.paymentMethod,
          paymentStatus: order.paymentStatus,
          subtotal: order.subtotal,
          shipping: order.shipping,
          discount: order.discount,
          tax: order.tax,
          total: order.total,
          createdAt: order.createdAt,
        },
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error("CREATE_COD_ORDER_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to place COD order.",
      },
      {
        status: 500,
      },
    );
  }
}
