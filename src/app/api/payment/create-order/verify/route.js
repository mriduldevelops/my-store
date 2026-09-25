import crypto from "crypto";

import { NextResponse } from "next/server";

import { getAuthenticatedUser } from "@/lib/getAuthenticatedUser";

import { connectDB } from "@/lib/db";
import Order from "@/models/Order";

import { getProductForOrder } from "@/sanity/lib/orderProducts";
import { urlFor } from "@/sanity/lib/image";

export async function POST(request) {
  try {
    /* -------------------------------- */
    /* Authentication                   */
    /* -------------------------------- */

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

    /* -------------------------------- */
    /* Request body                     */
    /* -------------------------------- */

    const body = await request.json();

    const {
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
      items,
      customer,
    } = body;

    /* -------------------------------- */
    /* Validate payment response        */
    /* -------------------------------- */

    if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
      return NextResponse.json(
        {
          message: "Incomplete payment information.",
        },
        {
          status: 400,
        },
      );
    }

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        {
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
          message: "Customer details are required.",
        },
        {
          status: 400,
        },
      );
    }

    /* -------------------------------- */
    /* Verify Razorpay signature        */
    /* -------------------------------- */

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpayOrderId}|${razorpayPaymentId}`)
      .digest("hex");

    if (
      !crypto.timingSafeEqual(
        Buffer.from(generatedSignature),
        Buffer.from(razorpaySignature),
      )
    ) {
      return NextResponse.json(
        {
          message: "Payment verification failed.",
        },
        {
          status: 400,
        },
      );
    }

    /* -------------------------------- */
    /* Connect MongoDB                  */
    /* -------------------------------- */

    await connectDB();

    /* -------------------------------- */
    /* Prevent duplicate payment        */
    /* -------------------------------- */

    const existingOrder = await Order.findOne({
      razorpayOrderId,
    });

    if (existingOrder) {
      return NextResponse.json(
        {
          message: "Order already exists.",
          order: existingOrder,
        },
        {
          status: 200,
        },
      );
    }

    /* -------------------------------- */
    /* Rebuild trusted order items      */
    /* -------------------------------- */

    const trustedItems = [];

    let subtotal = 0;

    for (const item of items) {
      const quantity = Number(item.quantity);

      if (!item.productId || !Number.isInteger(quantity) || quantity <= 0) {
        return NextResponse.json(
          {
            message: "Invalid order item.",
          },
          {
            status: 400,
          },
        );
      }

      const product = await getProductForOrder(item.productId);

      if (!product) {
        return NextResponse.json(
          {
            message: "Product no longer exists.",
          },
          {
            status: 400,
          },
        );
      }

      let selectedVariant = null;

      if (item.variantId) {
        selectedVariant = product.variants?.find(
          (variant) => variant._key === item.variantId,
        );

        if (!selectedVariant) {
          return NextResponse.json(
            {
              message: "Product variant not found.",
            },
            {
              status: 400,
            },
          );
        }

        if (selectedVariant.isActive === false) {
          return NextResponse.json(
            {
              message: "Selected variant is unavailable.",
            },
            {
              status: 400,
            },
          );
        }

        if (Number(selectedVariant.stock) < quantity) {
          return NextResponse.json(
            {
              message: `${product.name} is out of stock.`,
            },
            {
              status: 400,
            },
          );
        }
      }

      const price = selectedVariant?.price ?? product.price;

      subtotal += price * quantity;

      const productImage = selectedVariant?.image
        ? urlFor(selectedVariant.image).width(600).url()
        : product.image
          ? urlFor(product.image).width(600).url()
          : null;

      trustedItems.push({
        productId: product._id,

        variantId: selectedVariant?._key ?? null,

        productName: product.name,

        productImage,

        quantity,

        price,

        sku: selectedVariant?.sku ?? null,

        variants: selectedVariant?.options ?? {},
      });
    }

    /* -------------------------------- */
    /* Server totals                    */
    /* -------------------------------- */

    const shipping = 0;
    const discount = 0;
    const tax = 0;

    const total = subtotal + shipping + tax - discount;

    /* -------------------------------- */
    /* Generate order number            */
    /* -------------------------------- */

    const orderNumber = `ORD-${Date.now()}`;

    /* -------------------------------- */
    /* Create MongoDB order             */
    /* -------------------------------- */

    const order = await Order.create({
      userId: user._id,

      orderNumber,

      status: "confirmed",

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

      items: trustedItems,

      paymentMethod: "online",

      paymentStatus: "paid",

      razorpayOrderId,

      razorpayPaymentId,

      razorpaySignature,

      subtotal,

      shipping,

      discount,

      tax,

      total,
    });

    return NextResponse.json(
      {
        message: "Payment verified and order created.",
        order,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error("VERIFY_PAYMENT_ERROR:", error);

    return NextResponse.json(
      {
        message: "Payment verification failed.",
      },
      {
        status: 500,
      },
    );
  }
}
