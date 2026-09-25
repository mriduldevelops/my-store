import { NextResponse } from "next/server";

import { getAuthenticatedUser } from "@/lib/getAuthenticatedUser";

import { getProductForOrder } from "@/sanity/lib/orderProducts";

import { razorpay } from "@/lib/razorpay";

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

    const { items, customer } = body;

    /* -------------------------------- */
    /* Basic validation                 */
    /* -------------------------------- */

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

    const missingField = requiredCustomerFields.find(
      (field) => !customer[field] || String(customer[field]).trim() === "",
    );

    if (missingField) {
      return NextResponse.json(
        {
          message: `Customer ${missingField} is required.`,
        },
        {
          status: 400,
        },
      );
    }

    /* -------------------------------- */
    /* Calculate trusted subtotal       */
    /* -------------------------------- */

    let subtotal = 0;

    for (const item of items) {
      if (!item.productId) {
        return NextResponse.json(
          {
            message: "Invalid product.",
          },
          {
            status: 400,
          },
        );
      }

      const quantity = Number(item.quantity);

      if (!Number.isInteger(quantity) || quantity <= 0) {
        return NextResponse.json(
          {
            message: "Invalid product quantity.",
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
            message: "Product not found.",
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
              message: "Selected product variant is unavailable.",
            },
            {
              status: 400,
            },
          );
        }

        if (Number(selectedVariant.stock) < quantity) {
          return NextResponse.json(
            {
              message: `${product.name} does not have enough stock.`,
            },
            {
              status: 400,
            },
          );
        }
      }

      const price = selectedVariant?.price ?? product.price;

      if (typeof price !== "number" || price < 0) {
        return NextResponse.json(
          {
            message: "Invalid product price.",
          },
          {
            status: 400,
          },
        );
      }

      subtotal += price * quantity;
    }

    /* -------------------------------- */
    /* Server-side totals               */
    /* -------------------------------- */

    const shipping = 0;
    const discount = 0;
    const tax = 0;

    const total = subtotal + shipping + tax - discount;

    if (total <= 0) {
      return NextResponse.json(
        {
          message: "Invalid order amount.",
        },
        {
          status: 400,
        },
      );
    }

    /* -------------------------------- */
    /* Create Razorpay order            */
    /* -------------------------------- */

    const receipt = `receipt_${Date.now()}`;

    const razorpayOrder = await razorpay.orders.create({
      amount: Math.round(total * 100),
      currency: "INR",
      receipt,
      notes: {
        userId: user._id.toString(),
        email: customer.email,
      },
    });

    return NextResponse.json(
      {
        order: {
          id: razorpayOrder.id,
          amount: razorpayOrder.amount,
          currency: razorpayOrder.currency,
        },
        keyId: process.env.RAZORPAY_KEY_ID,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("CREATE_RAZORPAY_ORDER_ERROR:", error);

    return NextResponse.json(
      {
        message: "Failed to create payment order.",
      },
      {
        status: 500,
      },
    );
  }
}
